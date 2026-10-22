/**
 * SOURCE DE VÉRITÉ DU CONTENU — Dépannage 42 (ISRA-TRANS SAS)
 * ============================================================
 * Tout le texte, les coordonnées et les preuves du site viennent d'ici.
 * Aucun composant ne doit contenir de texte client en dur.
 *
 * Chaque donnée porte une étiquette de provenance :
 *   VÉRIFIÉ    = recoupé sur au moins deux sources indépendantes (fiche Google,
 *                site existant, registre des entreprises, logo).
 *   À VALIDER  = plausible mais non confirmé. À faire confirmer par le client
 *                avant mise en ligne.
 *
 * Les garde-fous à respecter pour toute modification figurent dans l'objet
 * `reglesContenu`, en fin de fichier.
 */

export const PROVENANCE = {
  verified: "VÉRIFIÉ",
  toConfirm: "À VALIDER",
} as const;

/* -------------------------------------------------------------------------
 * IDENTITÉ LÉGALE
 * Source : registre des entreprises (API recherche-entreprises.api.gouv.fr),
 * SIREN 979045465, consulté le 22/10/2026.
 * ---------------------------------------------------------------------- */
export const legal = {
  /** VÉRIFIÉ — raison sociale au registre */
  raisonSociale: "ISRA-TRANS",
  /** VÉRIFIÉ — nom commercial déclaré au registre, et nom de la fiche Google */
  nomCommercial: "Dépannage 42",
  /** VÉRIFIÉ — mention portée sur le logo : « Dépannage42 BY ISRA TRANS » */
  signatureLogo: "by Isra Trans",
  /** VÉRIFIÉ — nature juridique 5710 */
  formeJuridique: "SAS",
  /** VÉRIFIÉ */
  siren: "979 045 465",
  /** VÉRIFIÉ — SIRET du siège */
  siret: "979 045 465 00031",
  /** VÉRIFIÉ — code NAF 52.21Z */
  naf: "52.21Z",
  nafLibelle: "Services auxiliaires des transports terrestres",
  /** VÉRIFIÉ — président au RNE */
  dirigeant: "Abdelhalim Chakkah",
  dirigeantQualite: "Président",
  /** VÉRIFIÉ — date d'immatriculation */
  dateCreation: "2023-06-05",
  /** À VALIDER — non publié. Nécessaire pour les mentions légales complètes. */
  rcs: null as string | null,
  /** À VALIDER — régime de TVA non déterminé (cf. proposition commerciale). */
  tva: null as string | null,
} as const;

/* -------------------------------------------------------------------------
 * CONTACT
 * Le téléphone est le seul point de conversion du site.
 * Trois sources concordent : fiche Google Business Profile, site existant
 * (lien tel:0752148160), et en-tête du site. Le numéro 07 57 92 03 69 qui
 * circule appartient à HK AUTO, une autre société : il n'est pas repris.
 * ---------------------------------------------------------------------- */
export const contact = {
  /** VÉRIFIÉ — fiche Google + site existant */
  telephone: "07 52 14 81 60",
  /** Format E.164 pour les liens tel: et les données structurées */
  telephoneHref: "tel:+33752148160",
  telephoneE164: "+33752148160",
  /** VÉRIFIÉ — fiche Google + registre (siège) + site existant */
  adresse: {
    rue: "7 boulevard Sagnat",
    codePostal: "42230",
    ville: "Roche-la-Molière",
    pays: "FR",
    /** VÉRIFIÉ — coordonnées de l'embed Google Maps du site existant */
    latitude: 45.434066,
    longitude: 4.329431,
  },
  /** VÉRIFIÉ — fiche Google affiche « Ouvert 24h/24 » */
  disponibilite: "24 h/24 et 7 j/7",
  /** À VALIDER — aucune adresse e-mail publiée sur les sites existants */
  email: null as string | null,
  /** VÉRIFIÉ — lien court présent dans l'ancien site, pointe bien sur la fiche */
  googleBusinessUrl: "https://maps.app.goo.gl/7aFVRdiotkTFZ6Ue6",
  /** VÉRIFIÉ — domaine à conserver (proposition commerciale Aïna Studio) */
  siteUrl: "https://depannageremorquage42.com",
} as const;

/* -------------------------------------------------------------------------
 * PREUVES
 * Uniquement ce que la fiche Google affiche réellement au 22/10/2026.
 * ÉCARTÉ : « 1500 interventions », « 20 min d'attente moyenne »,
 * « 100 % satisfaction » (compteurs codés en dur dans l'ancien script.js),
 * et « 4,9 étoiles / 104 personnes » (chiffre du site de HK AUTO).
 * ---------------------------------------------------------------------- */
export const preuves = {
  /** VÉRIFIÉ — relevé sur la fiche Google le 22/10/2026 */
  note: 5.0,
  nombreAvis: 21,
  dateReleve: "2026-10-22",
  /** VÉRIFIÉ — catégorie Google de la fiche */
  categorieGoogle: "Service de transport",
  /**
   * VÉRIFIÉ — avis publics, cités mot pour mot.
   * Noms réduits à l'initiale du nom de famille par prudence RGPD.
   * 18 autres avis existent mais ne sont pas lisibles sans accès à la fiche :
   * demander au client un export ou des captures.
   */
  avis: [
    {
      auteur: "Gouacem I.",
      note: 5,
      date: "2026-05",
      texte:
        "Service impeccable ! Intervention rapide, professionnelle et efficace. L'équipe est très sympathique et rassurante, avec un vrai sens du service. Mon véhicule a été pris en charge rapidement et dans de très bonnes conditions.",
    },
    {
      auteur: "Walid H.",
      note: 5,
      date: "2026-05",
      texte:
        "Service rapide et très professionnel. Le dépanneur est arrivé à l'heure, a trouvé la panne rapidement et a tout réparé efficacement. Très sympa et explique bien ce qu'il fait. Prix correct et travail propre.",
    },
    {
      auteur: "Othmane F.",
      note: 5,
      date: "2026-03",
      texte:
        "Extrêmement efficace et tarifs qui bat absolument toute concurrence je recommande fortement",
    },
  ],
  /**
   * Thèmes dégagés de la lecture des avis accessibles. Ce sont des
   * constats de lecture, pas des promesses commerciales : ils servent à
   * hiérarchiser la page, et sont formulés comme ce que disent les clients.
   */
  themes: [
    {
      titre: "La rapidité de prise en charge",
      detail:
        "C'est ce qui revient dans chacun des avis lisibles : le véhicule est pris en charge vite.",
    },
    {
      titre: "Le dépanneur explique ce qu'il fait",
      detail:
        "Plusieurs clients relèvent que la panne leur est expliquée, pas seulement réparée.",
    },
    {
      titre: "Des tarifs jugés compétitifs",
      detail:
        "Le prix revient comme un point positif dans les avis, sans qu'aucun tarif ne soit affiché.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
 * SERVICES
 * Les trois prestations du site à conserver, confirmées par le code NAF
 * 52.21Z et par le bandeau de l'ancien site.
 * ÉCARTÉ : batterie, pneu, livraison de carburant, remorquage moto, et la
 * liste des 15 communes — tout cela vient du site de HK AUTO (NAF 45.20A),
 * société distincte. À réintégrer seulement si le client confirme qu'il
 * assure lui aussi ces prestations.
 * ---------------------------------------------------------------------- */
export const services = [
  {
    id: "depannage",
    /** VÉRIFIÉ — bandeau et carte de l'ancien site */
    titre: "Dépannage et remorquage",
    besoin: "Votre véhicule ne roule plus, là où il est.",
    description:
      "Panne, accident, véhicule immobilisé : le véhicule est chargé et transporté jusqu'au lieu convenu avec vous au téléphone.",
    details: [
      "Véhicules légers et utilitaires",
      "Chargement sur plateau",
      "Destination définie avec vous à l'appel",
    ],
  },
  {
    id: "transport",
    /** VÉRIFIÉ — « LIVRAISON DE VÉHICULES TOUTES DISTANCES » (ancien site) */
    titre: "Transport de véhicules",
    besoin: "Un véhicule à déplacer, pas forcément en panne.",
    description:
      "Achat à l'autre bout du pays, véhicule de collection, voiture qui ne doit pas rouler : le transport est organisé sur plateau, toutes distances.",
    details: [
      "Toutes distances",
      "Véhicule non roulant accepté",
      "Enlèvement et livraison convenus à l'avance",
    ],
  },
  {
    id: "ouverture",
    /** VÉRIFIÉ — « OUVERTURE DE VÉHICULE SANS DÉGÂTS » (ancien site) */
    titre: "Ouverture de véhicule",
    besoin: "Les clés sont restées à l'intérieur.",
    description:
      "Ouverture de la portière sans forcer et sans dégât sur le véhicule, pour récupérer vos clés.",
    details: [
      "Sans dégât sur la serrure ni la carrosserie",
      "Intervention sur place",
      "Justificatif de propriété demandé",
    ],
  },
] as const;

/* -------------------------------------------------------------------------
 * ZONE D'INTERVENTION
 * Distinction demandée au brief entre établissement, zone locale et
 * transport longue distance. Le périmètre local exact reste à confirmer :
 * l'ancien site annonce « toute la France » en dépannage, ce qui n'est pas
 * crédible pour une intervention d'urgence.
 * ---------------------------------------------------------------------- */
export const zone = {
  /** VÉRIFIÉ — siège au registre + fiche Google */
  etablissement: {
    titre: "L'établissement",
    valeur: "Roche-la-Molière, dans l'agglomération stéphanoise",
    detail: "7 boulevard Sagnat, 42230 Roche-la-Molière.",
  },
  /** À VALIDER — périmètre local non confirmé */
  local: {
    titre: "Le dépannage de proximité",
    valeur: "Saint-Étienne et la Loire",
    detail:
      "Le rayon exact et la prise en charge sur autoroute restent à préciser avec l'entreprise.",
    aValider: true,
  },
  /** VÉRIFIÉ — mention constante de l'ancien site et du logo (plateau) */
  longueDistance: {
    titre: "Le transport de véhicules",
    valeur: "Toutes distances",
    detail:
      "Le transport sur plateau s'organise au départ de la Loire vers le reste du pays.",
  },
} as const;

/* -------------------------------------------------------------------------
 * PARCOURS D'INTERVENTION
 * Présenté comme indicatif, conformément au brief. Aucun délai annoncé.
 * ---------------------------------------------------------------------- */
export const parcours = [
  {
    numero: 1,
    titre: "Vous appelez",
    texte:
      "Un seul numéro, à toute heure. C'est le moyen le plus rapide d'obtenir une réponse.",
  },
  {
    numero: 2,
    titre: "Vous décrivez la situation",
    texte:
      "Où vous êtes, ce qui s'est passé, le type de véhicule. Ces trois informations suffisent à évaluer l'intervention.",
  },
  {
    numero: 3,
    titre: "Les modalités vous sont confirmées",
    texte:
      "Possibilité d'intervenir, destination du véhicule et conditions vous sont annoncées avant tout déplacement.",
  },
  {
    numero: 4,
    titre: "Le véhicule est pris en charge",
    texte:
      "Chargement sur plateau et transport jusqu'au lieu convenu ensemble.",
  },
] as const;

/* -------------------------------------------------------------------------
 * FAQ
 * Aucune réponse n'avance de prix, de délai garanti ni de prestation non
 * confirmée. Les questions viennent du brief et des objections que les avis
 * laissent deviner.
 * ---------------------------------------------------------------------- */
export const faq = [
  {
    question: "Que faire si je tombe en panne sur la route ?",
    reponse:
      "Mettez-vous en sécurité avant tout : gilet, triangle, et sortez du véhicule côté opposé à la circulation si vous êtes sur une voie passante. Appelez ensuite. Si vous êtes sur autoroute ou sur voie rapide, la réglementation impose de passer par les bornes d'appel d'urgence : c'est le gestionnaire de l'autoroute qui envoie le dépanneur agréé, et nous ne pouvons pas intervenir à sa place.",
  },
  {
    question: "Quelles informations préparer avant d'appeler ?",
    reponse:
      "Votre localisation la plus précise possible (une commune, une route, un point de repère, ou le partage de position de votre téléphone), la marque et le modèle du véhicule, ce qui s'est passé, et si le véhicule roule encore ou non. Avec ça, la situation est évaluée en quelques minutes.",
  },
  {
    question: "Quels véhicules sont pris en charge ?",
    reponse:
      "Les véhicules légers et les utilitaires, roulants ou non, chargés sur plateau. Pour un véhicule hors gabarit, un deux-roues ou un poids lourd, posez la question au téléphone : la réponse dépend du matériel disponible.",
  },
  {
    question: "Comment se passe un remorquage ?",
    reponse:
      "Le véhicule est chargé sur le plateau, arrimé, puis transporté jusqu'au lieu décidé avec vous pendant l'appel : garage, domicile, ou autre adresse. La destination est convenue avant le départ, jamais imposée sur place.",
  },
  {
    question: "Le transport longue distance est-il possible ?",
    reponse:
      "Oui, le transport de véhicules s'effectue toutes distances. Contrairement au dépannage d'urgence, il se planifie : l'enlèvement et la livraison sont fixés à l'avance.",
  },
  {
    question: "Combien ça coûte ?",
    reponse:
      "Le prix dépend de l'endroit, de la distance, du type de véhicule et du moment de l'intervention. Aucun tarif fixe ne peut donc être affiché honnêtement ici. Décrivez votre situation au téléphone, les conditions vous seront précisées avant toute intervention. Si votre panne survient sur autoroute, les tarifs sont réglementés par l'État et fixés par le gestionnaire du réseau, pas par nous.",
  },
  {
    question: "Mon assurance peut-elle prendre en charge le dépannage ?",
    reponse:
      "C'est fréquent, via une garantie assistance ou une carte bancaire. Vérifiez votre contrat avant d'appeler, et gardez la facture dans tous les cas : c'est elle qui permet le remboursement.",
  },
] as const;

/* -------------------------------------------------------------------------
 * TEXTES D'INTERFACE
 * ---------------------------------------------------------------------- */
export const copy = {
  hero: {
    /** Formulation de l'aide apportée, pas de la prestation */
    titre: "Votre véhicule ne roule plus.",
    titreAccent: "On vient le chercher.",
    sousTitre:
      "Dépannage, remorquage et transport de véhicules au départ de Roche-la-Molière, dans l'agglomération stéphanoise. Un seul numéro, à toute heure.",
    ctaPrincipal: "Appeler maintenant",
    ctaSecondaire: "Voir les prestations",
  },
  meta: {
    titre:
      "Dépannage 42 : remorquage et transport de véhicules à Saint-Étienne",
    description:
      "Dépannage, remorquage et transport de véhicules toutes distances au départ de Roche-la-Molière, près de Saint-Étienne. Disponible 24 h/24 et 7 j/7. Appelez le 07 52 14 81 60.",
  },
  stickyCta: "Appeler",
} as const;

/* -------------------------------------------------------------------------
 * RÈGLES DE CONTENU
 * Conservé en code pour que toute reprise du projet applique les mêmes
 * garde-fous. Le détail des écarts constatés lors de l'audit préalable est
 * tenu hors du dépôt, dans les documents de travail d'Aïna Studio.
 * ---------------------------------------------------------------------- */
export const reglesContenu = {
  chiffres:
    "Aucun compteur ni statistique n'est affiché sans source vérifiable et datée. La note Google est relevée à une date précise, et cette date est indiquée.",
  temoignages:
    "Seuls des avis réellement publiés sur la fiche Google sont repris, cités mot pour mot, avec le nom réduit à l'initiale.",
  delais:
    "Aucun délai d'intervention n'est annoncé. Un engagement de durée est juridiquement risqué et invérifiable.",
  zone:
    "Le dépannage d'urgence et le transport planifié ne couvrent pas le même périmètre, et le site le distingue explicitement. Le rayon local exact reste signalé comme à confirmer.",
  prestations:
    "Seules les prestations confirmées pour cette société figurent sur le site. Toute prestation supplémentaire doit être validée avant ajout.",
  tarifs:
    "Aucun prix n'est affiché : il dépend du lieu, de la distance, du véhicule et du moment.",
} as const;
