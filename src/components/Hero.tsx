import { contact, copy, preuves } from "@/content/site";
import { BoutonAppel } from "./BoutonAppel";

/**
 * HERO
 *
 * Une SCÈNE, pas une mise en page.
 *
 * La flotte réelle du client, détourée, se tient sur une route qui fuit vers
 * l'horizon. Les marquages au sol défilent vers le spectateur, deux
 * gyrophares balaient la nuit, et une ombre portée ancre les véhicules au
 * bitume. La route et les gyrophares sont de la 3D réelle, en transformations
 * CSS : pas une ligne de JavaScript, pas un octet de bibliothèque.
 *
 * Pourquoi pas Three.js : une scène WebGL coûterait entre 150 et 200 Ko
 * compressés et un contexte GPU permanent, pour un visiteur qui est au bord
 * d'une route avec un réseau médiocre.
 *
 * Le détourage change tout par rapport à la photo brute : les véhicules ne
 * sont plus enfermés dans un cadre rectangulaire, ils habitent la page. C'est
 * aussi la seule apparition de cette image sur tout le site.
 *
 * Le titre monte mot par mot, en moins d'une seconde, et ne retarde jamais le
 * bouton d'appel, présent et cliquable dès le premier rendu.
 */

/** Découpe une phrase en mots animés, chacun avec son propre masque. */
function Mots({ texte, depart = 0 }: { texte: string; depart?: number }) {
  const mots = texte.split(" ");
  return (
    <>
      {mots.map((mot, i) => (
        <span
          key={`${mot}-${i}`}
          className="inline-block overflow-hidden pb-[0.09em] align-bottom"
        >
          <span
            className="mot"
            style={{ animationDelay: `${depart + i * 70}ms` }}
          >
            {mot}
          </span>
          {i < mots.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="contenu"
      className="relative isolate overflow-hidden bg-nuit pt-[104px] pb-0 md:pt-[118px]"
    >
      {/* ---------------------------------------------------------------
          LA SCÈNE. Entièrement décorative, masquée aux lecteurs d'écran.
          La perspective est portée ici, sur le parent DIRECT de la route :
          une propriété perspective ne s'applique qu'aux enfants immédiats.
      --------------------------------------------------------------- */}
      <div aria-hidden="true" className="scene pointer-events-none absolute inset-0">
        <div className="route" />
        <div className="horizon" />
        <div className="gyrophare top-[-10%] left-[48%] w-[88%] opacity-70" />
        <div className="gyrophare top-[6%] left-[-16%] w-[54%] opacity-45 [animation-direction:reverse] [animation-duration:11s]" />
      </div>

      {/* ---------------------------------------------------------------
          LE TEXTE
      --------------------------------------------------------------- */}
      <div className="relative z-20 mx-auto max-w-[1180px] px-4 md:px-6">
        {/* Filet rayé : le marquage des véhicules d'intervention. */}
        <div
          aria-hidden="true"
          className="bande-danger hero-apparition mb-5 h-[6px] w-[78px] opacity-90"
        />

        <p className="hero-apparition mb-5 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-doux [animation-delay:120ms]">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-70 [animation-duration:2.6s]" />
            <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
          </span>
          Quelqu&rsquo;un répond, {contact.disponibilite}
        </p>

        <h1 className="max-w-[17ch] text-[2.7rem] leading-[0.94] sm:text-[3.6rem] lg:text-[4.5rem]">
          <span className="block">
            <Mots texte={copy.hero.titre} />
          </span>
          <span className="block text-action">
            <Mots texte={copy.hero.titreAccent} depart={260} />
          </span>
        </h1>

        <p className="hero-apparition mesure mt-6 text-[1.04rem] leading-[1.6] text-doux [animation-delay:620ms] md:text-[1.15rem]">
          {copy.hero.sousTitre}
        </p>

        <div className="hero-apparition mt-8 flex flex-col gap-3 [animation-delay:740ms] sm:flex-row sm:items-center">
          <BoutonAppel
            emplacement="hero"
            variante="principal"
            libelle={copy.hero.ctaPrincipal}
            afficherNumero={false}
            className="h-16 min-h-16 text-[1.14rem] sm:px-9"
          />
          <a
            href="#services"
            className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 px-4 text-[1rem] font-medium text-doux transition-colors duration-(--duree-ui) ease-(--ease-sortie) hover:text-clair"
          >
            {copy.hero.ctaSecondaire}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-(--duree-ui-lente) ease-(--ease-sortie) group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>

        <p className="hero-apparition mt-5 text-[0.95rem] text-sourd [animation-delay:740ms] sm:hidden">
          ou composez le{" "}
          <a
            href={contact.telephoneHref}
            data-appel="hero"
            className="inline-flex min-h-[44px] items-center font-semibold text-clair underline decoration-signal decoration-2 underline-offset-4"
          >
            {contact.telephone}
          </a>
        </p>
      </div>

      {/* ---------------------------------------------------------------
          LA FLOTTE, posée sur la route.
      --------------------------------------------------------------- */}
      <div className="relative z-10 -mt-2 md:-mt-20 lg:-mt-28">
        {/* Ombre portée au sol. En noir et non en bleu nuit : le fond étant
            déjà presque noir, une ombre de la couleur du fond ne se voit pas,
            et donnait même l'impression d'éclaircir. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[6%] bottom-[4%] h-[18%] rounded-[50%] bg-black/75 blur-[48px]"
        />

        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/assets/flotte-detouree.webp"
          />
          <img
            src="/assets/flotte-detouree-mobile.webp"
            alt="Les quatre véhicules de Dépannage 42 alignés, gyrophares allumés, avec un technicien de dos portant un sweat floqué au nom de l'entreprise."
            width={1480}
            height={740}
            fetchPriority="high"
            decoding="async"
            className="hero-flotte mx-auto block w-full max-w-[1320px] object-contain"
          />
        </picture>
      </div>

      {/* ---------------------------------------------------------------
          LA PREUVE, en pied de scène.
      --------------------------------------------------------------- */}
      <div className="relief-leger relative z-20 border-t border-trait/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-5 text-[0.92rem] text-doux md:px-6">
          <span className="inline-flex items-baseline gap-2.5">
            <strong className="font-(family-name:--font-titre) text-[1.6rem] font-extrabold tracking-[-0.03em] text-signal tabular-nums">
              {preuves.note.toFixed(1).replace(".", ",")}
            </strong>
            <span>
              sur {preuves.nombreAvis} avis&nbsp;Google
              <span className="lecteur-ecran">
                , note de {preuves.note.toFixed(1).replace(".", ",")} sur 5
              </span>
            </span>
          </span>

          <span aria-hidden="true" className="hidden h-6 w-px bg-trait sm:block" />
          <span>Quatre véhicules, plateau et treuil</span>
          <span aria-hidden="true" className="hidden h-6 w-px bg-trait sm:block" />
          <span>Au départ de Roche-la-Molière</span>
        </div>
      </div>
    </section>
  );
}
