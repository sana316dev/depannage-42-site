"use client";

import { faq } from "@/content/site";
import { suivreOuvertureFaq } from "@/lib/tracking";

/**
 * FAQ
 *
 * Construite sur <details>/<summary> : l'ouverture et la fermeture sont
 * natives, donc elles fonctionnent sans JavaScript, au clavier, et sont
 * correctement annoncées par les lecteurs d'écran sans aucun attribut ARIA
 * à maintenir.
 *
 * Les réponses ne promettent ni prix, ni délai, ni prestation non vérifiée.
 * Deux d'entre elles disent explicitement ce que l'entreprise NE peut PAS
 * faire (autoroute, tarif fixe) : une FAQ qui ne répond que par oui est une
 * FAQ qui ne lève aucune objection.
 */
export function Faq() {
  return (
    <section
      id="questions"
      className="relative scroll-mt-24 border-y border-trait/40 bg-acier/25 pt-20 pb-24 md:pt-24 md:pb-28"
    >
      <div className="mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Solidaire du scroll, comme la note dans la section des avis :
              sinon la colonne laisse un grand vide pendant la lecture. */}
          <div className="revele lg:sticky lg:top-28 lg:self-start">
            <span aria-hidden="true" className="marqueur mb-7" />
            <h2 className="text-[2.3rem] sm:text-[3rem]">
              Les questions qui reviennent
            </h2>
            <p className="mesure mt-5 leading-[1.6] text-doux">
              Si la vôtre n&rsquo;y est pas, posez-la directement au
              téléphone.
            </p>
          </div>

          <div className="revele divide-y divide-trait/60 border-y border-trait/60">
            {faq.map((item) => (
              <details key={item.question} className="group">
                <summary
                  onClick={(e) => {
                    // Ne compter que les ouvertures, pas les fermetures.
                    if (!e.currentTarget.parentElement?.hasAttribute("open")) {
                      suivreOuvertureFaq(item.question);
                    }
                  }}
                  className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-[1.1rem] font-medium transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:text-ambre [&::-webkit-details-marker]:hidden"
                >
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-ambre transition-transform duration-(--duree-ui-lente) ease-(--ease-sortie) group-open:rotate-45"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mesure-large pb-7 leading-[1.65] text-doux">
                  {item.reponse}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/*
        Données structurées de la FAQ, générées depuis la même source que le
        texte affiché : les deux ne peuvent pas diverger.
        Note SEO : Google n'affiche plus les résultats enrichis FAQ que pour
        les sites gouvernementaux et de santé. Ce balisage n'est donc pas là
        pour gagner un affichage enrichi, mais parce qu'il aide les moteurs et
        les assistants à comprendre les réponses.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.reponse },
            })),
          }),
        }}
      />
    </section>
  );
}
