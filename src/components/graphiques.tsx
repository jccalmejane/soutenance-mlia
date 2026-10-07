// Graphiques en SVG pur (aucune bibliothèque, tout fonctionne hors ligne).
const PALETTE = ["#b8b0a0", "#0228b5", "#f59701", "#1b8f5a"];
const fr = (v: number, d = 2) => v.toFixed(d).replace(".", ",");

/** Barres verticales groupées : une catégorie = un groupe, une série = une couleur. */
export function Barres({ titre, categories, series, max, decimales = 2, hauteur = 260 }: {
  titre: string; categories: string[]; series: { nom: string; valeurs: number[]; couleur?: string }[];
  max: number; decimales?: number; hauteur?: number;
}) {
  const incline = categories.length > 6;
  const W = 640, H = hauteur + (incline ? 40 : 0), mg = { g: 40, d: 8, h: 18, b: incline ? 86 : 42 };
  const gw = (W - mg.g - mg.d) / categories.length, bw = Math.min(26, (gw - 14) / series.length);
  const y = (v: number) => mg.h + (H - mg.h - mg.b) * (1 - v / max);
  const graduations = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  return (
    <figure className="rounded-xl border border-line bg-paper p-4">
      <figcaption className="text-sm font-semibold text-navy">{titre}</figcaption>
      <div className="mt-2 overflow-x-auto"><svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label={titre}>
        {graduations.map((g) => (
          <g key={g}>
            <line x1={mg.g} x2={W - mg.d} y1={y(g)} y2={y(g)} stroke="#eae2d2" />
            <text x={mg.g - 6} y={y(g) + 5} fontSize="13" textAnchor="end" fill="#4b566d">{fr(g, decimales > 0 ? 1 : 0)}</text>
          </g>
        ))}
        {categories.map((c, i) => {
          const x0 = mg.g + i * gw + (gw - bw * series.length) / 2;
          return (
            <g key={c}>
              {series.map((s, k) => {
                const v = s.valeurs[i];
                return (
                  <g key={s.nom}>
                    <rect x={x0 + k * bw} y={y(v)} width={bw - 3} height={y(0) - y(v)} rx="2" fill={s.couleur ?? PALETTE[k]} />
                    <text x={x0 + k * bw + (bw - 3) / 2} y={y(v) - 5} fontSize={incline ? 10.5 : 13} textAnchor="middle" fill="#0a1428">{fr(v, decimales)}</text>
                  </g>
                );
              })}
              {incline
                ? <text transform={`translate(${mg.g + i * gw + gw / 2},${H - mg.b + 14}) rotate(-35)`} fontSize="13" textAnchor="end" fill="#0a1428">{c}</text>
                : <text x={mg.g + i * gw + gw / 2} y={H - mg.b + 20} fontSize="14" textAnchor="middle" fill="#0a1428">{c}</text>}
            </g>
          );
        })}
      </svg></div>
      <div className="mt-1 flex flex-wrap gap-4 text-[13px] text-ink-soft">
        {series.map((s, k) => (
          <span key={s.nom} className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-sm" style={{ background: s.couleur ?? PALETTE[k] }} />{s.nom}
          </span>
        ))}
      </div>
    </figure>
  );
}

/** Courbes (x, y) : perte de validation selon l'époque. */
export function Courbes({ titre, series, xmax, ymin, ymax }: {
  titre: string; series: { nom: string; points: [number, number][]; couleur: string }[]; xmax: number; ymin: number; ymax: number;
}) {
  const W = 560, H = 300, mg = { g: 48, d: 10, h: 12, b: 38 };
  const x = (v: number) => mg.g + (W - mg.g - mg.d) * (v / xmax);
  const y = (v: number) => mg.h + (H - mg.h - mg.b) * (1 - (v - ymin) / (ymax - ymin));
  const gy = [ymin, (ymin + ymax) / 2, ymax];
  return (
    <figure className="rounded-xl border border-line bg-paper p-4">
      <figcaption className="text-sm font-semibold text-navy">{titre}</figcaption>
      <div className="mt-2 overflow-x-auto"><svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label={titre}>
        {gy.map((g) => (
          <g key={g}>
            <line x1={mg.g} x2={W - mg.d} y1={y(g)} y2={y(g)} stroke="#eae2d2" />
            <text x={mg.g - 6} y={y(g) + 4} fontSize="13" textAnchor="end" fill="#4b566d">{fr(g, 2)}</text>
          </g>
        ))}
        {[0, 0.5, 1, 1.5, 2].filter((v) => v <= xmax).map((v) => (
          <text key={v} x={x(v)} y={H - 14} fontSize="13" textAnchor="middle" fill="#4b566d">{fr(v, 1)}</text>
        ))}
        <text x={W - mg.d} y={H - 1} fontSize="12" textAnchor="end" fill="#4b566d">époque</text>
        {series.map((s) => (
          <g key={s.nom}>
            <polyline fill="none" stroke={s.couleur} strokeWidth="2.5" points={s.points.map(([a, b]) => `${x(a)},${y(b)}`).join(" ")} />
            {s.points.map(([a, b], k) => <circle key={k} cx={x(a)} cy={y(b)} r="3" fill={s.couleur} />)}
          </g>
        ))}
      </svg></div>
      <div className="mt-1 flex flex-wrap gap-4 text-[13px] text-ink-soft">
        {series.map((s) => (
          <span key={s.nom} className="flex items-center gap-1.5">
            <span className="inline-block h-1 w-4 rounded" style={{ background: s.couleur }} />{s.nom}
          </span>
        ))}
      </div>
    </figure>
  );
}
