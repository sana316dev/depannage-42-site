import { contact, zone } from "@/content/site";
import { BoutonAppel } from "./BoutonAppel";

/**
 * ZONE D'INTERVENTION
 *
 * Le brief demande de distinguer trois choses que l'ancien site confondait :
 * l'établissement, la zone de dépannage de proximité, et le transport longue
 * distance. Annoncer « intervention sur toute la France » pour une urgence
 * n'est pas crédible ; pour un transport planifié, ça l'est.
 *
 * Pas de carte interactive : une iframe Google Maps coûte plusieurs centaines
 * de kilo-octets et des cookies tiers, pour une information qu'une adresse et
 * un lien d'itinéraire donnent mieux. Le lien ouvre l'application de
 * cartographie native du téléphone, qui est de toute façon ce que fait un
 * visiteur sur mobile.
 */

const paliers = [zone.etablissement, zone.local, zone.longueDistance];

export function Zone() {
  const itineraire = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${contact.adresse.rue}, ${contact.adresse.codePostal} ${contact.adresse.ville}`,
  )}`;

  return (
    <section
      id="zone"
      className="relative scroll-mt-24 overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32"
    >
      <div className="mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="revele mesure-large">
          <span aria-hidden="true" className="marqueur mb-7" />
          <h2 className="text-[2.3rem] sm:text-[3rem]">
            D&rsquo;où part le camion, et jusqu&rsquo;où
          </h2>
          <p className="mesure mt-5 text-[1.06rem] leading-[1.6] text-doux">
            Le dépannage d&rsquo;urgence et le transport planifié ne couvrent
            pas le même périmètre. Autant le dire clairement.
          </p>
        </div>

        <div className="relative mt-12">
          {/* La trajectoire, deuxième et dernière apparition : elle descend
              le long des trois paliers, du plus local au plus lointain. */}
          <svg
            aria-hidden="true"
            className="trajectoire pointer-events-none absolute top-0 left-[25px] hidden h-full w-6 [mask-image:linear-gradient(to_bottom,transparent,black_6%,black_92%,transparent)] md:block"
            viewBox="0 0 24 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M12 10 L12 590"
              stroke="var(--color-ambre)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="600"
            />
          </svg>

          <ul className="space-y-7 md:space-y-9">
            {paliers.map((palier, i) => (
              <li
                key={palier.titre}
                className="revele relative md:pl-[76px]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 hidden size-[26px] items-center justify-center rounded-full border-2 border-ambre bg-nuit md:flex"
                >
                  <span className="size-2 rounded-full bg-ambre" />
                </span>

                <p className="text-[0.92rem] font-medium text-sourd">
                  {palier.titre}
                </p>
                <h3 className="mt-2 text-[1.6rem] md:text-[1.95rem]">
                  {palier.valeur}
                </h3>
                <p className="mt-2 max-w-[42rem] leading-relaxed text-doux">
                  {palier.detail}
                </p>

                {/* Signalé honnêtement plutôt que comblé par une invention */}
                {"aValider" in palier && palier.aValider && (
                  <p className="mt-3 inline-flex items-start gap-2 rounded-[4px] border border-dashed border-trait-vif px-3 py-2 text-[0.8rem] leading-snug text-sourd">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="mt-0.5 size-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M12 8v5m0 4h.01" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    À confirmer avec l&rsquo;entreprise avant mise en ligne.
                  </p>
                )}

                {i === 0 && (
                  <a
                    href={itineraire}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.92rem] font-semibold text-ambre underline decoration-ambre/40 decoration-2 underline-offset-4 transition-colors duration-(--duree-ui) hover:decoration-ambre"
                  >
                    Ouvrir l&rsquo;itinéraire
                    <span className="lecteur-ecran">
                      vers {contact.adresse.rue}, {contact.adresse.ville}{" "}
                      (ouvre un nouvel onglet)
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="revele arete relative mt-14 flex flex-col gap-5 overflow-hidden rounded-[var(--radius-bloc)] border border-trait/70 bg-acier/60 p-7 shadow-[var(--ombre-posee)] sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="max-w-[34rem] leading-relaxed text-doux">
            Vous ne savez pas si vous êtes dans la zone ? Donnez votre
            localisation au téléphone, la réponse est immédiate.
          </p>
          <BoutonAppel
            emplacement="zone"
            variante="principal"
            libelle="Appeler"
            afficherNumero={false}
            className="shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
