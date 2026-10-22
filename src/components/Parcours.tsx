import { parcours } from "@/content/site";

/**
 * PARCOURS D'INTERVENTION
 *
 * Motif retenu : étapes numérotées — et ici c'est justifié, parce que c'est
 * une vraie séquence chronologique, pas une liste d'arguments déguisée en
 * processus.
 *
 * C'est aussi la section qui porte la signature du site : la trajectoire
 * ambre, tracée au scroll, qui relie les quatre étapes comme un itinéraire.
 * Elle n'apparaît qu'ici et dans la zone d'intervention. Partout ailleurs le
 * site reste calme.
 *
 * Aucun délai n'est annoncé : le brief l'interdit, et aucune source ne
 * permet de l'affirmer.
 */
export function Parcours() {
  return (
    <section className="relative overflow-hidden border-y border-trait/40 bg-acier/25 pt-20 pb-24 md:pt-24 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="revele mesure-large">
          <h2 className="text-[2.3rem] sm:text-[3rem]">
            Ce qui se passe quand vous appelez
          </h2>
          <p className="mesure mt-5 text-[1.06rem] leading-[1.6] text-doux">
            Un déroulé indicatif, pour savoir à quoi vous attendre. Les
            modalités exactes vous sont confirmées pendant l&rsquo;appel.
          </p>
        </div>

        <div className="relative mt-14">
          {/* La trajectoire, en fond, alignée sur la rangée des numéros.
              Masquée aux lecteurs d'écran : c'est de l'habillage, l'ordre
              logique des étapes est déjà porté par la liste ordonnée. */}
          {/* Les extrémités sont estompées : sans cela le trait s'arrête net
              après la dernière étape, ce qui se lit comme un bug et non comme
              un itinéraire qui continue. */}
          <svg
            aria-hidden="true"
            className="trajectoire pointer-events-none absolute inset-x-0 top-[26px] hidden h-10 w-full [mask-image:linear-gradient(to_right,transparent,black_7%,black_88%,transparent)] lg:block"
            viewBox="0 0 1100 40"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M40 20 C 250 20, 250 20, 400 20 S 700 20, 820 20 S 1000 20, 1060 20"
              stroke="var(--color-ambre)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1000"
            />
          </svg>

          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {parcours.map((etape) => (
              <li key={etape.numero} className="revele relative">
                <div className="flex size-[52px] items-center justify-center rounded-full border-2 border-ambre bg-nuit font-(family-name:--font-titre) text-[1.3rem] font-extrabold text-ambre tabular-nums">
                  {etape.numero}
                </div>
                <h3 className="mt-5 text-[1.28rem]">{etape.titre}</h3>
                <p className="mt-2.5 leading-[1.6] text-doux">
                  {etape.texte}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
