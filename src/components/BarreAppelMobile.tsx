import { contact } from "@/content/site";

/**
 * BARRE D'APPEL COLLANTE — MOBILE UNIQUEMENT
 *
 * C'est le dispositif de conversion principal du site : quelqu'un au bord de
 * la route, sur son téléphone, doit pouvoir appeler sans chercher.
 *
 * Deux précautions imposées par le brief :
 *   1. Elle ne doit masquer aucun contenu. Le <body> réserve en bas un
 *      espace égal à sa hauteur (--h-barre-appel), donc la fin de page et le
 *      pied de page restent intégralement atteignables.
 *   2. Elle ne doit pas recouvrir les contrôles du système. D'où le
 *      env(safe-area-inset-bottom), qui la fait passer au-dessus de la barre
 *      de navigation gestuelle sur iPhone et Android récents.
 *
 * Elle est toujours visible, jamais animée : sur ce site, un bouton d'appel
 * qui apparaît et disparaît au scroll serait un défaut, pas un effet.
 */
export function BarreAppelMobile() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-trait bg-nuit/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-sourd">
            Disponible {contact.disponibilite}
          </p>
          <p className="truncate font-(family-name:--font-titre) text-[1.05rem] font-bold tabular-nums">
            {contact.telephone}
          </p>
        </div>

        <a
          href={contact.telephoneHref}
          data-appel="barre_mobile"
          aria-label={`Appeler Dépannage 42 au ${contact.telephone}`}
          className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-[6px] bg-ambre px-5 font-bold text-nuit transition-colors duration-(--duree-ui) ease-(--ease-sortie) active:bg-ambre-sombre"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[1.15em]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
          </svg>
          Appeler
        </a>
      </div>
    </div>
  );
}
