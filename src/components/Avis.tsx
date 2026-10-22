import { contact, preuves } from "@/content/site";

/**
 * PREUVES ET AVIS
 *
 * Motif retenu : éditorial, pas une grille de témoignages. Les trois thèmes
 * qui ressortent vraiment des avis sont mis en avant comme une lecture, et
 * les citations servent à les étayer — et non l'inverse.
 *
 * Tout ce qui est affiché ici a été relevé sur la fiche Google le 22/10/2026.
 * Aucun compteur décoratif, aucun témoignage réécrit, aucune note inventée.
 * Les 18 autres avis de la fiche ne sont pas lisibles publiquement : ils
 * seront ajoutés quand le client fournira l'accès.
 */

function Etoiles({ note }: { note: number }) {
  return (
    <span className="inline-flex gap-0.5 text-action" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-[0.95rem]"
          fill={i < Math.round(note) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m12 2.6 2.9 5.88 6.5.95-4.7 4.58 1.1 6.47L12 17.43 6.2 20.48l1.1-6.47-4.7-4.58 6.5-.95Z" />
        </svg>
      ))}
    </span>
  );
}

export function Avis() {
  const noteFr = preuves.note.toFixed(1).replace(".", ",");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ------------------------------------------------------------
              La note, posée comme un fait sourcé
          ------------------------------------------------------------ */}
          {/* La note reste visible pendant la lecture des avis : sans cela, la
              colonne de gauche laisse plusieurs centaines de pixels vides sur
              grand écran. */}
          <div className="revele lg:sticky lg:top-28 lg:self-start">
            <span aria-hidden="true" className="marqueur mb-7" />
            <h2 className="text-[2.3rem] sm:text-[3rem]">
              Ce que disent les clients
            </h2>

            <div className="mt-7 flex items-end gap-4">
              <span className="font-(family-name:--font-titre) text-[5.2rem] leading-[0.82] tracking-[-0.04em] font-extrabold text-clair tabular-nums">
                {noteFr}
              </span>
              <div className="pb-1.5">
                <Etoiles note={preuves.note} />
                <p className="mt-1.5 text-[0.9rem] text-doux">
                  <span className="lecteur-ecran">
                    Note de {noteFr} sur 5, établie sur{" "}
                  </span>
                  {preuves.nombreAvis} avis Google
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-[26rem] text-[0.88rem] leading-relaxed text-sourd">
              Relevé sur la fiche Google de l&rsquo;entreprise le{" "}
              {new Date(preuves.dateReleve).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              . La note vit sur Google, pas sur ce site : elle peut donc avoir
              évolué depuis.
            </p>

            <a
              href={contact.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-avis=""
              className="mt-6 inline-flex min-h-[48px] items-center gap-2.5 rounded-[6px] border border-trait px-5 font-semibold transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:border-action hover:text-action"
            >
              Lire les avis sur Google
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
              <span className="lecteur-ecran">(ouvre un nouvel onglet)</span>
            </a>
          </div>

          {/* ------------------------------------------------------------
              Les thèmes, puis les citations qui les étayent
          ------------------------------------------------------------ */}
          <div>
            <ul className="revele space-y-px">
              {preuves.themes.map((theme, i) => (
                <li
                  key={theme.titre}
                  className="group relative border-l-2 border-trait py-4 pl-6 transition-colors duration-(--duree-ui-lente) ease-(--ease-sortie) hover:border-action"
                >
                  <h3 className="flex items-baseline gap-3 text-[1.18rem]">
                    <span className="font-(family-name:--font-titre) text-[0.82rem] font-bold text-repere tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {theme.titre}
                  </h3>
                  <p className="mt-1.5 leading-[1.6] text-doux">
                    {theme.detail}
                  </p>
                </li>
              ))}
            </ul>

            {/* Les citations ne sont pas encadrées. Bordure + fond + ombre,
                c'est le trio qui fait « carte de gabarit » ; ici le guillemet
                action et le filet suffisent à séparer, et le texte respire. */}
            <div className="mt-12 divide-y divide-trait/50 border-t border-trait/50">
              {preuves.avis.map((avis, i) => (
                <figure
                  key={avis.auteur}
                  className="derive py-7"
                  style={
                    {
                      // Alternance du sens : une dérive identique pour chaque
                      // citation produirait de nouveau un effet de liste.
                      "--derive": i % 2 === 0 ? "-26px" : "26px",
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="mt-[-0.35em] font-(family-name:--font-titre) text-[3.2rem] leading-none font-extrabold text-action/35 select-none"
                    >
                      &ldquo;
                    </span>
                    <div className="min-w-0">
                      <blockquote
                        className={`text-clair ${
                          i === 0
                            ? "text-[1.18rem] leading-[1.55]"
                            : "text-[1rem] leading-[1.6]"
                        }`}
                      >
                        {avis.texte}
                      </blockquote>
                      <figcaption className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.84rem] text-sourd">
                        <Etoiles note={avis.note} />
                        <span>{avis.auteur}, avis Google</span>
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
