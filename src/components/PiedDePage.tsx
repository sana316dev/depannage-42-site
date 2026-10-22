import Image from "next/image";
import { contact, legal, services } from "@/content/site";

/**
 * PIED DE PAGE
 *
 * Les mentions légales sont rédigées à partir du registre des entreprises
 * (SIREN 979045465), pas à partir de ce qu'affichait l'ancien site, qui se
 * contentait d'un « © 2026 - Expert Dépannage & Transport » sans aucune des
 * mentions obligatoires.
 *
 * Deux champs restent à compléter par le client : le numéro RCS et le régime
 * de TVA. Ils sont affichés comme manquants plutôt qu'inventés.
 */
export function PiedDePage() {
  const annee = new Date().getFullYear();

  return (
    // La réserve basse empêche la barre d'appel collante de recouvrir la fin
    // du pied de page sur mobile. C'est le dernier élément de la page, donc
    // c'est ici que l'espace doit être pris.
    <footer
      className="border-t border-trait/60 bg-acier/40"
      style={{ paddingBottom: "var(--h-barre-appel)" }}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Identité */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo-camion.png"
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <span className="flex flex-col leading-none">
                <span className="font-(family-name:--font-titre) text-[1.1rem] font-extrabold">
                  {legal.nomCommercial}
                </span>
                <span className="mt-1 text-[0.72rem] text-sourd">
                  {legal.signatureLogo}
                </span>
              </span>
            </div>
            <address className="mt-5 text-[0.92rem] leading-relaxed text-doux not-italic">
              {contact.adresse.rue}
              <br />
              {contact.adresse.codePostal} {contact.adresse.ville}
              <br />
              <a
                href={contact.telephoneHref}
                data-appel="pied_de_page"
                className="mt-1 inline-flex min-h-[44px] items-center font-semibold text-clair transition-colors duration-(--duree-ui) hover:text-ambre"
              >
                {contact.telephone}
              </a>
            </address>
            <p className="mt-3 text-[0.85rem] text-sourd">
              Disponible {contact.disponibilite}
            </p>
          </div>

          {/* Prestations */}
          <nav aria-label="Prestations">
            <h2 className="text-[0.9rem] font-medium text-sourd">
              Prestations
            </h2>
            <ul className="mt-3 space-y-1 text-[0.92rem] text-doux">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="inline-flex min-h-[40px] items-center transition-colors duration-(--duree-ui) hover:text-clair"
                  >
                    {s.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liens utiles */}
          <nav aria-label="Liens utiles">
            <h2 className="text-[0.9rem] font-medium text-sourd">
              Informations
            </h2>
            <ul className="mt-3 space-y-1 text-[0.92rem] text-doux">
              <li>
                <a
                  href="#zone"
                  className="inline-flex min-h-[40px] items-center transition-colors duration-(--duree-ui) hover:text-clair"
                >
                  Zone d&rsquo;intervention
                </a>
              </li>
              <li>
                <a
                  href="#questions"
                  className="inline-flex min-h-[40px] items-center transition-colors duration-(--duree-ui) hover:text-clair"
                >
                  Questions fréquentes
                </a>
              </li>
              <li>
                <a
                  href={contact.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center transition-colors duration-(--duree-ui) hover:text-clair"
                >
                  Avis Google
                </a>
              </li>
              <li>
                <a
                  href="/mentions-legales"
                  className="inline-flex min-h-[40px] items-center transition-colors duration-(--duree-ui) hover:text-clair"
                >
                  Mentions légales
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mentions légales condensées */}
        <div className="mt-12 flex flex-col gap-3 border-t border-trait/60 pt-6 text-[0.8rem] leading-relaxed text-sourd md:flex-row md:items-center md:justify-between">
          <p>
            {legal.raisonSociale} {legal.formeJuridique}, exerçant sous le nom
            commercial {legal.nomCommercial}. SIRET {legal.siret}, APE{" "}
            {legal.naf}
          </p>
          <p>© {annee} {legal.raisonSociale}</p>
        </div>
      </div>
    </footer>
  );
}
