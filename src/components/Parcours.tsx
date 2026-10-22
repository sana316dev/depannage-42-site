import { parcours } from "@/content/site";

/**
 * PARCOURS D'INTERVENTION
 *
 * Lu comme un TRAJET, pas comme une liste. Les quatre étapes sont des bornes
 * sur une chaussée : le marquage se remplit à mesure que l'on descend, et
 * chaque borne s'allume quand elle est atteinte. Le passage d'une étape à la
 * suivante devient un déplacement, ce qui est exactement ce que décrit le
 * contenu.
 *
 * Les étapes numérotées sont ici justifiées : c'est une vraie séquence
 * chronologique, pas une liste d'arguments déguisée en processus.
 *
 * L'activation au scroll est posée par `Revelations`, via l'attribut
 * `data-atteinte` sur les bornes et la propriété `--franchi` sur les
 * tronçons. Sans JavaScript, toutes les bornes restent lisibles et le
 * marquage reste à son état de base : le contenu ne dépend jamais de
 * l'animation.
 *
 * Aucun délai n'est annoncé : le brief l'interdit, et aucune source ne
 * permettrait de l'affirmer.
 */
export function Parcours() {
  return (
    <section className="bitume relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-28">
      <div className="relative z-10 mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="revele mesure-large">
          <span aria-hidden="true" className="marqueur mb-7" />
          <h2 className="text-[2.3rem] sm:text-[3rem]">
            Ce qui se passe quand vous appelez
          </h2>
          <p className="mesure mt-5 text-[1.06rem] leading-[1.6] text-doux">
            Un déroulé indicatif, pour savoir à quoi vous attendre. Les
            modalités exactes vous sont confirmées pendant l&rsquo;appel.
          </p>
        </div>

        <ol
          data-trajet
          className="relative mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6"
        >
          {parcours.map((etape, i) => (
            <li key={etape.numero} className="revele relative lg:pr-4">
              {/* La borne, et le tronçon de chaussée qui mène à la suivante. */}
              <div className="mb-6 flex items-center">
                <span
                  data-borne={i}
                  className="etape-borne relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-trait-vif bg-asphalte font-(family-name:--font-titre) text-[1.3rem] font-extrabold text-doux tabular-nums"
                >
                  {etape.numero}
                </span>

                {/* Pas de tronçon après la dernière borne : la route s'arrête
                    là où l'intervention est terminée. */}
                {i < parcours.length - 1 && (
                  <span
                    aria-hidden="true"
                    data-troncon={i}
                    className="etape-troncon ml-3 hidden h-[3px] flex-1 lg:block"
                  />
                )}
              </div>

              <h3 className="text-[1.28rem]">{etape.titre}</h3>
              <p className="mt-2.5 leading-[1.6] text-doux">{etape.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
