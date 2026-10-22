import { contact } from "@/content/site";
import type { EmplacementAppel } from "@/lib/tracking";

type Variante = "principal" | "secondaire" | "discret";

const styles: Record<Variante, string> = {
  principal:
    "bg-action text-nuit font-bold shadow-[0_8px_28px_-6px_rgba(255,154,31,0.45)] hover:bg-action-clair hover:shadow-[0_10px_34px_-6px_rgba(255,154,31,0.6)] active:translate-y-px",
  secondaire:
    "border-2 border-action text-action font-bold hover:bg-action hover:text-nuit",
  discret:
    "border border-trait text-clair font-semibold hover:border-action hover:text-action",
};

/**
 * Lien d'appel. C'est la seule action de conversion du site, donc le seul
 * composant autorisé à porter la couleur action en aplat.
 *
 * `emplacement` est obligatoire : sans lui, impossible de savoir quel bloc
 * de la page génère réellement les appels.
 */
export function BoutonAppel({
  emplacement,
  variante = "principal",
  libelle,
  afficherNumero = true,
  className = "",
}: {
  emplacement: EmplacementAppel;
  variante?: Variante;
  libelle?: string;
  afficherNumero?: boolean;
  className?: string;
}) {
  return (
    <a
      href={contact.telephoneHref}
      /* WCAG 2.5.3 « Label in Name » : le nom accessible doit contenir le
         texte visible, sinon la commande vocale ne peut pas activer le lien.
         On préfixe donc par le libellé affiché avant d'ajouter le contexte. */
      aria-label={`${libelle ?? "Appeler"}${
        afficherNumero ? ` ${contact.telephone}` : ""
      }, Dépannage 42`}
      data-appel={emplacement}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[6px] px-6 text-[1.02rem] leading-none transition-all duration-(--duree-ui) ease-(--ease-sortie) ${styles[variante]} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[1.15em] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
      </svg>
      <span className="whitespace-nowrap">
        {libelle ?? "Appeler"}
        {afficherNumero && (
          <span className="ml-2 font-(family-name:--font-titre) tracking-tight tabular-nums">
            {contact.telephone}
          </span>
        )}
      </span>
    </a>
  );
}
