import { contact, legal } from "@/content/site";
import { BoutonAppel } from "./BoutonAppel";

/**
 * CONTACT FINAL
 *
 * C'est le point culminant de la page, et il doit en avoir l'air. La version
 * précédente était un encadré de plus : même largeur, même rayon, même
 * traitement que les autres blocs. Or pour beaucoup de visiteurs, le numéro
 * est la seule information qu'ils sont venus chercher.
 *
 * Trois partis pris :
 *   - Pleine largeur, sans conteneur encadré, pour rompre le rythme du reste.
 *   - Le numéro composé en très grand, gradué selon l'écran. C'est le plus
 *     gros élément typographique du site, devant même le titre du hero, et
 *     c'est assumé : sur un site de dépannage, c'est l'information.
 *   - Une lueur action montant depuis le bas, comme des phares qui arrivent,
 *     plus un halo propre au numéro qui s'intensifie au survol.
 *
 * Pas de formulaire : l'entreprise ne publie aucune adresse e-mail, et poser
 * un formulaire sans destinataire reviendrait à faire croire à un envoi qui
 * n'arrive nulle part. Si le client en veut un, il faudra d'abord une adresse
 * de réception et un service d'envoi.
 */
export function ContactFinal() {
  return (
    <section
      className="lueur bitume relative isolate overflow-hidden py-24 text-center md:py-32"
      style={
        {
          "--lueur-x": "50%",
          "--lueur-y": "100%",
        } as React.CSSProperties
      }
    >
      {/* Arête lumineuse : elle détache la bande du reste de la page sans
          recourir à une bordure franche sur toute la largeur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-action/70 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 md:px-6">
        <p className="revele inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-doux">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-action opacity-70 [animation-duration:2.6s]" />
            <span className="relative inline-flex size-2.5 rounded-full bg-action" />
          </span>
          Disponible {contact.disponibilite}
        </p>

        <h2 className="revele mx-auto mt-5 max-w-[16ch] text-[2.1rem] sm:text-[2.8rem] lg:text-[3.2rem]">
          Un seul numéro, à toute heure
        </h2>

        <a
          href={contact.telephoneHref}
          data-appel="contact_final"
          /* min-h et padding : à 2,4 rem avec une interligne de 0,9, le lien ne
             faisait que 35 px de haut sur mobile, sous le seuil tactile. */
          className="revele group relative mt-10 inline-flex min-h-[52px] items-center px-2 py-2"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-[-12%] inset-y-[-40%] rounded-full bg-action/12 blur-3xl transition-colors duration-500 ease-(--ease-sortie) group-hover:bg-action/20"
          />
          <span className="relative block font-(family-name:--font-titre) text-[2.4rem] leading-[0.9] font-extrabold tracking-[-0.045em] text-clair tabular-nums transition-colors duration-(--duree-ui-lente) ease-(--ease-sortie) group-hover:text-action sm:text-[4rem] md:text-[5.2rem] lg:text-[6.2rem]">
            {contact.telephone}
          </span>
        </a>

        <div className="revele mt-11 flex justify-center">
          <BoutonAppel
            emplacement="contact_final"
            variante="principal"
            libelle="Appeler maintenant"
            afficherNumero={false}
            className="h-16 min-h-16 px-9 text-[1.12rem]"
          />
        </div>

        <p className="revele mesure mx-auto mt-9 text-[0.9rem] leading-[1.6] text-sourd">
          {legal.nomCommercial}, {contact.adresse.rue},{" "}
          {contact.adresse.codePostal} {contact.adresse.ville}. Décrivez votre
          situation, les modalités vous seront confirmées avant tout
          déplacement.
        </p>
      </div>
    </section>
  );
}
