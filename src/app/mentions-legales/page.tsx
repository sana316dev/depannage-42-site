import type { Metadata } from "next";
import Link from "next/link";
import { contact, legal } from "@/content/site";

export const metadata: Metadata = {
  title: `Mentions légales : ${legal.nomCommercial}`,
  description: `Mentions légales de ${legal.raisonSociale} ${legal.formeJuridique}, exerçant sous le nom commercial ${legal.nomCommercial}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

/**
 * Mentions légales.
 *
 * Rédigées à partir du registre des entreprises, pas de l'ancien site qui
 * n'en comportait aucune. Deux informations manquent encore et sont
 * signalées comme telles dans la page plutôt qu'inventées : le numéro RCS et
 * le régime de TVA. L'hébergeur est également à confirmer — l'analyse
 * publique a relevé Cloudflare devant le site et Hostinger au WHOIS, ce qui
 * ne suffit pas à désigner l'hébergeur réel.
 */
export default function MentionsLegales() {
  const aCompleter = (
    <em className="text-action not-italic">[à compléter par l&rsquo;entreprise]</em>
  );

  return (
    <main className="mx-auto max-w-[46rem] px-4 pt-[120px] pb-20 md:px-6">
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center gap-2 text-[0.92rem] font-semibold text-doux transition-colors duration-(--duree-ui) hover:text-action"
      >
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
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
        Retour à l&rsquo;accueil
      </Link>

      <h1 className="mt-8 text-[2.1rem] sm:text-[2.6rem]">Mentions légales</h1>

      <div className="mt-10 space-y-9 leading-relaxed text-doux">
        <section>
          <h2 className="text-[1.3rem] text-clair">Éditeur du site</h2>
          <dl className="mt-4 space-y-2 text-[0.95rem]">
            <div>
              <dt className="inline font-semibold text-clair">
                Raison sociale :{" "}
              </dt>
              <dd className="inline">
                {legal.raisonSociale} ({legal.formeJuridique})
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">
                Nom commercial :{" "}
              </dt>
              <dd className="inline">{legal.nomCommercial}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">
                Siège social :{" "}
              </dt>
              <dd className="inline">
                {contact.adresse.rue}, {contact.adresse.codePostal}{" "}
                {contact.adresse.ville}
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">SIREN : </dt>
              <dd className="inline">{legal.siren}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">SIRET : </dt>
              <dd className="inline">{legal.siret}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">Code APE : </dt>
              <dd className="inline">
                {legal.naf}, {legal.nafLibelle}
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">
                Numéro de TVA intracommunautaire :{" "}
              </dt>
              <dd className="inline">{legal.tva ?? aCompleter}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">RCS : </dt>
              <dd className="inline">{legal.rcs ?? aCompleter}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">
                Directeur de la publication :{" "}
              </dt>
              <dd className="inline">
                {legal.dirigeant}, {legal.dirigeantQualite.toLowerCase()}
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">Téléphone : </dt>
              <dd className="inline">
                <a
                  href={contact.telephoneHref}
                  className="font-semibold text-clair underline decoration-action decoration-2 underline-offset-4"
                >
                  {contact.telephone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-clair">
                Adresse électronique :{" "}
              </dt>
              <dd className="inline">{contact.email ?? aCompleter}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-[1.3rem] text-clair">Hébergement</h2>
          <p className="mt-3 text-[0.95rem]">
            Hébergeur : {aCompleter}. Nom, raison sociale, adresse et
            téléphone de l&rsquo;hébergeur doivent figurer ici une fois le
            prestataire d&rsquo;hébergement confirmé.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] text-clair">Propriété intellectuelle</h2>
          <p className="mt-3 text-[0.95rem]">
            Les textes, le logo et les photographies présentés sur ce site sont
            la propriété de {legal.raisonSociale} ou de ses ayants droit. Toute
            reproduction, même partielle, est soumise à autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] text-clair">Données personnelles</h2>
          <p className="mt-3 text-[0.95rem]">
            Ce site ne comporte aucun formulaire et ne collecte aucune donnée
            saisie par les visiteurs. Une mesure d&rsquo;audience peut être
            activée, mais uniquement après consentement explicite : aucun
            traceur de mesure ni de publicité n&rsquo;est déposé tant que ce
            consentement n&rsquo;a pas été donné, et le refus est pris en
            compte sans restriction d&rsquo;usage du site. Le choix est
            conservé localement dans le navigateur et peut être modifié en
            effaçant les données du site.
          </p>
          <p className="mt-3 text-[0.95rem]">
            Conformément au règlement général sur la protection des données,
            toute demande relative à vos données peut être adressée à
            l&rsquo;entreprise par téléphone au{" "}
            <a
              href={contact.telephoneHref}
              className="font-semibold text-clair underline decoration-action decoration-2 underline-offset-4"
            >
              {contact.telephone}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[1.3rem] text-clair">Avis clients</h2>
          <p className="mt-3 text-[0.95rem]">
            La note et les avis reproduits sur ce site proviennent de la fiche
            Google Business Profile de l&rsquo;entreprise. Ils ne sont ni
            sélectionnés ni modifiés par l&rsquo;éditeur du site, et sont
            consultables dans leur intégralité sur{" "}
            <a
              href={contact.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-clair underline decoration-action decoration-2 underline-offset-4"
            >
              la fiche Google de l&rsquo;entreprise
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
