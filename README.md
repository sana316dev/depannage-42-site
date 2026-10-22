# Dépannage 42 — refonte du site

Site de **ISRA-TRANS SAS**, exerçant sous le nom commercial *Dépannage 42*
(Roche-la-Molière, Loire). Réalisé par Aïna Studio.

Le domaine `depannageremorquage42.com` est conservé. **Aucune modification de
DNS, de registrar ou d'hébergement n'a été effectuée.**

- L'audit préalable (sites existants, fiche Google, divergences relevées)
  est tenu hors du dépôt, dans les documents de travail d'Aïna Studio.
- Source de vérité du contenu : [`src/content/site.ts`](./src/content/site.ts)

---

## Lancer le projet

```bash
npm install
```

```bash
npm run dev
```

Le site est alors sur `http://localhost:3000`. Pour un autre port :
`npm run dev -- --port 3142`.

## Construire

```bash
npm run build
```

Build standard, entièrement prérendu, à déployer sur Vercel ou tout
hébergement Node.

```bash
npm run build:statique
```

Produit un dossier `out/` composé uniquement de fichiers statiques, déposable
sur n'importe quel hébergement, **y compris le serveur nginx actuel du
client**. Cette variante désactive l'optimisation d'images de Next, d'où les
images déjà optimisées dans `public/assets`.

---

## Architecture

```
src/
  content/site.ts        Tout le contenu client. Rien n'est écrit en dur ailleurs.
  lib/tracking.ts        Événements de conversion (dataLayer).
  app/
    layout.tsx           Polices, métadonnées, Consent Mode, données structurées.
    page.tsx             Assemblage des sections.
    mentions-legales/    Page légale.
    robots.ts  sitemap.ts
  components/            Une section par fichier.
public/assets/           Logo détouré, flotte détourée (2 tailles), silhouette.
```

### Modifier un texte, un tarif, une coordonnée

Tout passe par `src/content/site.ts`. Chaque donnée y porte une étiquette de
provenance : `VÉRIFIÉ` (recoupé sur au moins deux sources) ou `À VALIDER` (à
faire confirmer par le client). Un objet `reglesContenu` en fin de fichier
énonce les garde-fous à respecter pour toute modification du contenu.

### Jetons de design

Aucune couleur, police, durée ou rayon n'est écrit en dur dans un composant :
tout est défini dans le bloc `@theme` de `src/app/globals.css`.

| Rôle | Jeton | Valeur | Contraste sur le fond |
|---|---|---|---|
| Fond | `nuit` | `#070C14` | — |
| Surfaces | `asphalte` / `acier` / `acier-clair` | `#0C1420` / `#121D2C` / `#182537` | — |
| Traits | `trait` / `trait-vif` | `#23344A` / `#36506E` | — |
| Repères chiffrés | `repere` | `#52739A` | 3,99:1 (AA grand corps) |
| Texte | `clair` / `doux` / `sourd` | `#F3F7FB` / `#A6BACE` / `#6E8399` | 18,2:1 / 9,8:1 / 5,0:1 |
| **Action, et rien d'autre** | `ambre` | `#FF8400` | 8,0:1 |
| **Signal** | `hivis` | `#D8FF33` | 17,1:1 |

Deux accents coexistent, avec des rôles qui ne se recouvrent jamais.
**L'ambre** est la couleur du gyrophare et sert exclusivement aux appels à
l'action : si elle servait aussi à décorer, le bouton d'appel ne se
détacherait plus de rien. **Le jaune haute visibilité** est celui du gilet
porté sur la photo du client et du secours routier en général ; il marque, il
souligne, il signale ce qui est vivant, et ne devient jamais un bouton.

Polices : **Archivo** pour les titres (graisse 800, approche à -0,035em),
**Geist** pour le texte, les deux en version variable. Inter a été écartée :
c'est la police par défaut de tout site généré, au point d'en être une
signature, et sa neutralité participait de la platitude du premier rendu.

---

## Mesure des conversions

Le site **n'installe aucun identifiant inventé**. Il pousse des événements
nommés dans `window.dataLayer`, que le conteneur GTM existant du client
(`GTM-PL3DVB2B`, relevé dans le code en production) pourra consommer.

| Événement | Déclenché par | Paramètre |
|---|---|---|
| `appel_telephone` | tout clic sur un lien `tel:` | `emplacement_appel` |
| `clic_avis_google` | clic vers la fiche Google | — |
| `ouverture_faq` | ouverture d'une question | `question_faq` |
| `consentement_choisi` | acceptation ou refus | `choix_consentement` |

Les clics d'appel sont captés par **un écouteur délégué unique**
(`SuiviAppels.tsx`), et non par un gestionnaire sur chaque bouton : plusieurs
liens d'appel vivent dans des composants serveur, et un lien oublié serait une
conversion invisible.

`emplacement_appel` prend les valeurs `entete`, `hero`, `barre_mobile`,
`service`, `zone`, `contact_final`, `pied_de_page`.

### Ce qu'il reste à faire, et qui demande les accès du client

1. Dans GTM, créer un déclencheur « Événement personnalisé » par nom ci-dessus.
2. Dans Google Ads, créer l'action de conversion « Appel depuis le site » et
   la relier au déclencheur `appel_telephone`.
3. Vérifier en mode Aperçu GTM que chaque événement remonte.

**Émettre un événement n'est pas vérifier une conversion.** Tant que ces trois
points ne sont pas faits, aucune conversion n'est enregistrée. Aucune campagne
payante n'a été créée ni lancée.

### Consentement

Consent Mode v2 est initialisé **avant tout chargement de balise**, avec tous
les signaux publicitaires et analytiques sur `denied`. GTM n'est chargé
qu'après acceptation explicite. Le refus n'entraîne aucune restriction d'usage.
Le choix est conservé dans le `localStorage` du visiteur.

---

## Choix techniques, et pourquoi

**Next.js 16, React 19, Tailwind 4, sans aucune autre dépendance.**

- **`cacheComponents` retiré.** Activé par défaut par `create-next-app`, il
  interdit `export const dynamic`, ce qui empêchait de prérendre `robots.txt`
  et `sitemap.xml`, ce qui bloquait tout export statique. Le site du client
  étant servi en statique, la portabilité a primé.
- **GSAP retiré.** Environ 70 Ko compressés pour une séquence d'entrée et un
  tracé au scroll. Toute la mise en scène est désormais en CSS, et les
  révélations au scroll reposent sur un observateur d'intersection.
- **De la 3D, mais en CSS.** Le sol du hero est un vrai plan incliné par
  `rotateX` dans un conteneur en perspective, avec une grille dont les
  fuyantes convergent et dont les transversales défilent vers le spectateur.
  Les gyrophares sont des dégradés coniques en rotation. Une scène Three.js
  équivalente coûterait 150 à 200 Ko compressés et un contexte GPU permanent,
  pour un visiteur qui est au bord d'une route avec un réseau médiocre.
- **Pas de carte interactive.** Une iframe Google Maps coûte plusieurs
  centaines de kilo-octets et des cookies tiers pour afficher une adresse. Un
  lien d'itinéraire ouvre l'application de cartographie du téléphone, ce qui
  est de toute façon ce que fait un visiteur sur mobile.
- **Pas de formulaire de contact.** L'entreprise ne publie aucune adresse
  e-mail. Poser un formulaire sans destinataire reviendrait à faire croire à
  un envoi qui n'arrive nulle part.

### Deux pièges rencontrés, notés pour la suite

**Les réinitialisations CSS doivent vivre dans `@layer base`.** En cascade CSS,
une règle non layerée bat toujours une règle layerée, quelle que soit la
spécificité. Un simple `img { height: auto }` écrit hors couche annulait
silencieusement toutes les hauteurs d'image du site.

**Une animation pilotée par script ne doit jamais masquer du contenu.** Une
première version masquait les blocs en CSS pour les révéler au scroll : les 22
blocs de la page sont restés invisibles. Le principe retenu inverse le risque.
Tout est visible par défaut ; un bloc n'est masqué que par un attribut
`data-cache` posé en JavaScript juste avant d'être observé, retiré dès qu'il
entre à l'écran, et levé d'office par un filet de sécurité au bout de 6 s. Une
règle `@media print` lève également tous les masquages, car une impression ou
un export PDF ne déclenche aucun observateur. Si le JavaScript échoue, rien ne
disparaît.

---

## Accessibilité et tests effectués

Tests menés au navigateur automatisé (Playwright), en 1440 × 900 et
390 × 844.

| Contrôle | Résultat |
|---|---|
| Erreurs console | 0 |
| Requêtes en échec | 0 |
| Débordement horizontal | aucun, aux deux largeurs |
| Liens sans destination | aucun |
| Liens `tel:` | 12, tous instrumentés |
| Contrastes WCAG AA | conformes, mesurés et consignés dans le tableau des jetons |
| Anneau de focus | présent sur les 32 éléments focusables |
| Ordre de tabulation | ordre du DOM, aucun `tabindex` artificiel |
| Lien d'évitement | premier élément focusable |
| Zones tactiles mobiles | ≥ 44 px pour tout lien d'appel, ≥ 40 px ailleurs |
| `prefers-reduced-motion` | aucune animation ne démarre, tout reste visible |
| Sans JavaScript | contenu intégralement lisible, FAQ fonctionnelle (`<details>`) |

La FAQ repose sur `<details>`/`<summary>` : ouverture native, donc clavier et
lecteurs d'écran corrects sans aucun attribut ARIA à maintenir.

---

## Déploiement

**Rien n'a été mis en ligne.** La mise en production demande une décision du
client sur l'hébergement cible.

Pour Vercel, depuis la racine du projet :

```bash
npx vercel --prod
```

Pour l'hébergement statique actuel : lancer `npm run build:statique` et
déposer le contenu de `out/` à la racine du serveur. Le domaine reste intact
tant que les DNS ne sont pas touchés ; prévoir une préproduction sur une URL
temporaire pour validation avant bascule.
