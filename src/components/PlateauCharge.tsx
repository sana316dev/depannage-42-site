/**
 * PLATEAU CHARGÉ
 *
 * Un encadré dont la silhouette est le camion de l'entreprise : la cabine en
 * profil à gauche, le plateau qui porte le contenu, les roues posées sur une
 * ligne de sol. Le texte est littéralement « chargé » comme un véhicule
 * arrimé.
 *
 * ALIGNEMENT, qui est tout le problème de ce composant.
 * Une LIGNE DE SOL partagée, posée à 44 px du bas, sert de référence unique.
 * La cabine est dessinée pour que son châssis tombe exactement à cette
 * hauteur, et la colonne de droite reçoit la même réserve basse. Les versions
 * précédentes dessinaient un châssis dans la cabine et un tablier séparé dans
 * la colonne : les deux ne se rejoignaient jamais, et le camion paraissait
 * coupé en deux.
 *
 * Construction en pièces séparées plutôt qu'un seul SVG étiré : la cabine et
 * les roues gardent des dimensions fixes, le plateau est un trait CSS net à
 * toute largeur. Un SVG unique en `preserveAspectRatio="none"` écraserait la
 * cabine et ovaliserait les roues dès que le conteneur change de largeur.
 *
 * Sous 1024 px la cabine disparaît : à 390 px de large, un camion complet
 * réduirait le contenu à une colonne de deux mots. Il reste le plateau, sa
 * ligne de sol et ses roues, ce qui suffit à garder le motif.
 *
 * Le dessin porte la classe `dessin` : il se trace trait par trait à l'entrée
 * dans l'écran, par le même mécanisme que les illustrations des prestations.
 */

/** Hauteur de la ligne de sol au-dessus du bas du composant. */
const SOL = 44;

const traits = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Roue de profil, centrée sur la ligne de sol. Taille fixe pour rester ronde. */
function Roue({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 44"
      className={`dessin absolute size-[44px] translate-y-1/2 text-trait-vif ${className}`}
      style={{ bottom: SOL }}
      {...traits}
    >
      <circle cx="22" cy="22" r="18" />
      <circle cx="22" cy="22" r="7" className="text-signal" opacity=".85" />
    </svg>
  );
}

export function PlateauCharge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* La ligne de sol, référence commune à toutes les pièces. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 h-[3px] rounded-full bg-gradient-to-r from-trait-vif/30 via-trait-vif to-trait-vif/50 lg:left-[26px]"
        style={{ bottom: SOL }}
      />

      <div className="flex items-end">
        {/* ----------------------------------------------------------------
            La cabine, en profil, tournée vers la GAUCHE : le plateau s'étend
            derrière elle. Dans l'autre sens, la charge serait devant le
            camion.
        ---------------------------------------------------------------- */}
        <svg
          aria-hidden="true"
          viewBox="0 0 190 170"
          className="dessin hidden h-[170px] w-[190px] shrink-0 text-trait-vif lg:block"
          {...traits}
        >
          {/* Nez, capot, pare-brise incliné, pavillon, et montant arrière */}
          <path d="M16 126V96l10-10h22l20-26h78v66" />
          {/* Vitre de la cabine */}
          <path
            d="M54 64h26v20H40l14-20Z"
            className="text-signal"
            opacity=".5"
          />
          {/* Rampe de gyrophares sur le pavillon */}
          <path d="M88 60v-9h44v9" className="text-signal" />
          {/* Calandre, marchepied */}
          <path d="M16 114h12" opacity=".55" />
          <path d="M100 102h36" opacity=".4" />
          {/* Roue avant, centrée sur la ligne de sol (y = 126 = 170 - 44) */}
          <circle cx="54" cy="126" r="18" />
          <circle cx="54" cy="126" r="7" className="text-signal" opacity=".85" />
        </svg>

        {/* ----------------------------------------------------------------
            Le plateau et sa charge. Le contenu EST le véhicule transporté.
            La réserve basse place sa base exactement sur la ligne de sol.
        ---------------------------------------------------------------- */}
        <div
          className="relative min-w-0 flex-1 lg:-ml-[18px]"
          style={{ paddingBottom: SOL }}
        >
          <div className="relief relative rounded-[var(--radius-bloc)] border border-trait/70 px-6 py-7 md:px-9 md:py-9">
            {/* Sangles d'arrimage. Elles ne traversent plus la charge : ce
                sont deux passages courts sur l'arête haute et l'arête basse,
                avec leur boucle. Les versions pleine hauteur coupaient le
                texte et recouvraient le bouton d'appel. */}
            {[
              { cote: "left-[9%]", dec: "-translate-x-1/2" },
              { cote: "right-[9%]", dec: "translate-x-1/2" },
            ].map(({ cote, dec }) => (
              <span key={cote} aria-hidden="true">
                <span
                  className={`pointer-events-none absolute -top-[7px] ${cote} h-[16px] w-[4px] rounded-full bg-signal/55`}
                />
                <span
                  className={`pointer-events-none absolute -bottom-[7px] ${cote} h-[16px] w-[4px] rounded-full bg-signal/55`}
                />
                <span
                  className={`pointer-events-none absolute -top-[9px] ${cote} ${dec} h-[11px] w-[11px] rounded-[2px] border-2 border-signal/80 bg-asphalte`}
                />
              </span>
            ))}
            {children}
          </div>

          {/* Le tablier du plateau, juste sous la charge. */}
          <div
            aria-hidden="true"
            className="mt-3 h-[4px] rounded-full bg-trait-vif/55"
          />
        </div>
      </div>

      {/* Les roues arrière, posées sur la même ligne de sol que la cabine. */}
      <Roue className="right-[6%]" />
      <Roue className="right-[15%]" />
    </div>
  );
}
