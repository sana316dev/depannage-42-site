import { services } from "@/content/site";
import { BoutonAppel } from "./BoutonAppel";

/**
 * SERVICES
 *
 * Motif retenu : rangées de prestations, pas une grille de trois cartes
 * identiques. Le brief rejette explicitement « quatre cartes identiques avec
 * une icône et deux lignes de texte », et les trois prestations n'ont de
 * toute façon pas le même poids commercial : le dépannage est l'urgence qui
 * déclenche l'appel, le transport se planifie, l'ouverture est un dépannage
 * express. Elles méritent donc des traitements différents.
 *
 * Chaque rangée commence par le besoin du visiteur, et seulement ensuite la
 * prestation. C'est l'ordre dans lequel il pense quand il est en panne.
 */

/**
 * Illustrations au trait, dessinées pour ces trois prestations précisément.
 *
 * Le brief interdit « les icônes génériques utilisées comme seul élément
 * graphique » : un cadenas pour l'ouverture de véhicule, par exemple, ne dit
 * rien du métier. Chaque dessin montre donc le geste réel, à savoir le
 * véhicule sur le plateau incliné, la route parcourue, la portière ouverte.
 *
 * L'ambre ne souligne qu'un seul détail par dessin : celui qui porte le sens.
 */
const traits = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const illustrations = {
  /* Le plateau basculé, la voiture en panne qui monte dessus par le treuil. */
  depannage: (
    <svg aria-hidden="true" viewBox="0 0 160 84" className="dessin" {...traits}>
      {/* Camion : cabine et châssis */}
      <path d="M12 62V40h22l9 13h4" />
      <path d="M12 40h22" opacity=".45" />
      <path d="M16 44h12v7H16z" opacity=".35" />
      {/* Plateau incliné */}
      <path d="M47 62 144 36" className="text-ambre" strokeWidth="2.2" />
      <path d="M47 62h97" opacity=".3" />
      {/* Voiture en cours de chargement sur le plateau */}
      <path d="m86 46 7-8h17l9 7" opacity=".8" />
      <path d="M79 48h48" opacity=".8" />
      <path d="M96 38v7" opacity=".45" />
      {/* Roues */}
      <circle cx="26" cy="68" r="6" />
      <circle cx="60" cy="68" r="6" />
      <circle cx="88" cy="52" r="4" opacity=".8" />
      <circle cx="120" cy="44" r="4" opacity=".8" />
      <path d="M8 74h144" opacity=".25" />
    </svg>
  ),

  /* Le transport planifié : le véhicule arrimé, et la distance parcourue. */
  transport: (
    <svg aria-hidden="true" viewBox="0 0 160 84" className="dessin" {...traits}>
      {/* Camion porte-voiture, vu de profil */}
      <path d="M14 56V34h20l8 12h4" />
      <path d="M18 38h11v6H18z" opacity=".35" />
      <path d="M46 56h96V40H46z" opacity=".55" />
      {/* La voiture, arrimée sur le plateau */}
      <path d="m64 40 6-7h16l8 7" opacity=".85" />
      <path d="M58 40h46" opacity=".85" />
      {/* Sangles d'arrimage */}
      <path d="M72 33v7M96 33v7" className="text-ambre" opacity=".9" />
      <circle cx="28" cy="62" r="6" />
      <circle cx="62" cy="62" r="6" />
      <circle cx="124" cy="62" r="6" />
      {/* La distance : la route qui file, en pointillé ambre */}
      <path
        d="M6 74h148"
        className="text-ambre"
        strokeDasharray="10 9"
        opacity=".75"
      />
    </svg>
  ),

  /* L'ouverture : la portière entrouverte et les clés restées sur le siège. */
  ouverture: (
    <svg aria-hidden="true" viewBox="0 0 160 84" className="dessin" {...traits}>
      {/* Silhouette du véhicule, vue de trois quarts */}
      <path d="M22 58V44l12-16h52l16 16h14v14" opacity=".55" />
      <path d="M22 58h94" opacity=".3" />
      <path d="M40 30v14M86 28v16" opacity=".35" />
      {/* La portière, ouverte */}
      <path
        d="M86 44 118 32v22l-32 4z"
        className="text-ambre"
        strokeWidth="2"
      />
      {/* La poignée */}
      <path d="M104 42h7" className="text-ambre" opacity=".8" />
      {/* Les clés, restées à l'intérieur */}
      <circle cx="62" cy="48" r="4.5" opacity=".9" />
      <path d="M66 48h12m-4 0v4m8-4v3" opacity=".9" />
      <circle cx="28" cy="64" r="6" />
      <circle cx="104" cy="64" r="6" />
    </svg>
  ),
} as const;

/**
 * SERVICES
 *
 * La hiérarchie suit la réalité commerciale, pas la mise en page. Les trois
 * prestations n'ont pas le même poids : le dépannage est l'urgence qui
 * déclenche l'appel, le transport se planifie, l'ouverture est un dépannage
 * express. Les présenter en trois rangées identiques, c'était leur donner à
 * toutes la même importance et produire exactement la monotonie que le brief
 * rejette.
 *
 * Le premier service occupe donc un bloc large, sur une surface détachée du
 * fond par une arête lumineuse. Les deux autres suivent en deux colonnes plus
 * calmes. L'œil comprend l'ordre de priorité avant d'avoir lu un mot.
 */
export function Services() {
  const [principal, ...secondaires] = services;

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32"
    >
      <div className="relative z-10 mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="revele mesure-large">
          <span aria-hidden="true" className="marqueur mb-7" />
          <h2 className="text-[2.3rem] sm:text-[3rem] lg:text-[3.4rem]">
            Trois situations,
            <br className="hidden sm:block" /> trois réponses
          </h2>
          <p className="mesure mt-5 text-[1.06rem] leading-[1.6] text-doux">
            Dans les trois cas, la destination du véhicule et les conditions
            sont convenues avec vous pendant l&rsquo;appel, avant tout
            déplacement.
          </p>
        </div>

        {/* ---------------------------------------------------------------
            Le service qui déclenche l'appel : traité en grand.
        --------------------------------------------------------------- */}
        <article className="revele arete relative mt-14 overflow-hidden rounded-[var(--radius-bloc)] border border-trait/70 bg-acier/60 shadow-[var(--ombre-posee)]">
          <div className="grid gap-8 p-7 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-10 md:p-10">
            <div>
              <p className="text-[1.02rem] font-medium text-ambre">
                {principal.besoin}
              </p>
              <h3 className="mt-3 text-[1.9rem] md:text-[2.4rem]">
                {principal.titre}
              </h3>
              <p className="mesure mt-4 text-[1.02rem] leading-[1.6] text-doux">
                {principal.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.9rem] text-sourd">
                {principal.details.map((d) => (
                  <li key={d} className="inline-flex items-center gap-2">
                    <Coche />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <BoutonAppel
                  emplacement="service"
                  variante="principal"
                  libelle="Appeler maintenant"
                  afficherNumero={false}
                  className="h-14 min-h-14 w-full justify-center sm:w-auto sm:px-8"
                />
              </div>
            </div>

            {/* L'illustration prend ici la place qu'elle mérite : à 130 px de
                large, un dessin au trait n'est qu'un pictogramme. */}
            <div className="text-doux md:pl-4">
              {illustrations[principal.id]}
            </div>
          </div>
        </article>

        {/* ---------------------------------------------------------------
            Les deux prestations qui se planifient : plus calmes.
        --------------------------------------------------------------- */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {secondaires.map((service) => (
            <article
              key={service.id}
              className="revele group relative flex flex-col rounded-[var(--radius-bloc)] border border-trait/50 p-7 transition-colors duration-(--duree-ui-lente) ease-(--ease-sortie) hover:border-trait-vif md:p-8"
            >
              <div className="mb-6 w-[150px] text-sourd transition-colors duration-(--duree-ui-lente) ease-(--ease-sortie) group-hover:text-doux">
                {illustrations[service.id]}
              </div>

              <p className="text-[0.96rem] font-medium text-ambre">
                {service.besoin}
              </p>
              <h3 className="mt-2.5 text-[1.5rem]">{service.titre}</h3>
              <p className="mt-3 leading-[1.6] text-doux">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 text-[0.88rem] text-sourd">
                {service.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-[0.32em]">
                      <Coche />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              {/* Les boutons sont alignés en bas quelle que soit la longueur
                  du texte au-dessus : sans cela ils flottent à des hauteurs
                  différentes et la rangée se lit comme cassée. */}
              <div className="mt-auto pt-7">
                <BoutonAppel
                  emplacement="service"
                  variante="discret"
                  libelle="Demander"
                  afficherNumero={false}
                  className="w-full justify-center sm:w-auto"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coche() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 text-ambre"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 12 6 6L20 6" />
    </svg>
  );
}
