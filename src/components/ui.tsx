import type { ReactNode } from "react";

/** Voile blanc semi-transparent entre les macarons du fond et le contenu : lisibilité sans masquer l'arrière-plan. */
export const VOILE = "rounded-3xl bg-white/75 px-6 py-8 shadow-[0_8px_40px_rgba(30,58,120,0.06)] ring-1 ring-white/70 backdrop-blur-[3px] sm:px-9";

/** Un écran de présentation : numéro ambre, surtitre, titre bleu nuit, sous-titre (même grammaire que le minisite Crumble). */
export function Ecran({ id, n, kicker, titre, sous, children, sombre = false }: {
  id: string; n: string; kicker?: string; titre: ReactNode; sous?: ReactNode; children?: ReactNode; sombre?: boolean;
}) {
  return (
    <section id={id} data-ecran={n} className={`ecran flex min-h-[calc(100vh-4.25rem)] items-center ${sombre ? "bg-navy-deep" : "px-4"}`}>
      <div className={`mx-auto w-full max-w-6xl ${sombre ? "px-5 py-12" : `my-8 ${VOILE}`}`}>
        <div className="flex items-baseline gap-4">
          <span className={`text-3xl font-bold tabular-nums ${sombre ? "text-amber-bright" : "text-amber"}`}>{n}</span>
          <div>
            {kicker && <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{kicker}</p>}
            <h2 className={`text-2xl font-bold sm:text-3xl [text-wrap:balance] ${sombre ? "text-white" : "text-navy"}`}>{titre}</h2>
            {sous && <p className={`mt-1 text-base italic ${sombre ? "text-white/70" : "text-ink-soft"}`}>{sous}</p>}
          </div>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

export function Carte({ titre, children, num, accent = "navy", fond = "paper", className = "" }: {
  titre?: ReactNode; children: ReactNode; num?: string; accent?: "navy" | "amber" | "ok" | "ko" | "blue";
  fond?: "paper" | "soft"; className?: string;
}) {
  const couleur = { navy: "text-navy", amber: "text-amber-deep", ok: "text-ok", ko: "text-ko", blue: "text-blue" }[accent];
  return (
    <div className={`rounded-2xl border border-line p-5 ${fond === "soft" ? "bg-amber-soft/60" : "bg-paper"} ${className}`}>
      {titre && (
        <h3 className={`flex items-baseline gap-2 text-lg font-bold ${couleur}`}>
          {num && <span className="text-sm font-bold text-amber-deep tabular-nums">{num}</span>}
          {titre}
        </h3>
      )}
      <div className={`${titre ? "mt-2" : ""} text-[15px] leading-snug text-ink`}>{children}</div>
    </div>
  );
}

export function Puces({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((b, k) => (
        <li key={k} className="flex gap-3 text-[15px] leading-snug">
          <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Chiffre({ valeur, legende, couleur = "navy" }: { valeur: ReactNode; legende: ReactNode; couleur?: "navy" | "amber" | "ok" | "blue" | "ko" }) {
  const c = { navy: "text-navy", amber: "text-amber", ok: "text-ok", blue: "text-blue", ko: "text-ko" }[couleur];
  return (
    <div className="rounded-xl border border-line bg-paper px-4 py-4 text-center">
      <div className={`text-3xl font-bold tabular-nums ${c}`}>{valeur}</div>
      <div className="mt-1 text-sm leading-snug text-ink-soft">{legende}</div>
    </div>
  );
}

/** Encadré « exemple réel » : bordure ambre, comme les citations du minisite. */
export function Exemple({ titre, children, mono = false }: { titre?: ReactNode; children: ReactNode; mono?: boolean }) {
  return (
    <div className="border-l-4 border-amber bg-amber-soft/60 px-5 py-4">
      {titre && <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{titre}</p>}
      <div className={`${titre ? "mt-2" : ""} ${mono ? "font-mono text-[13px] leading-relaxed" : "text-[15px] leading-snug"} text-ink`}>
        {children}
      </div>
    </div>
  );
}

export function Tableau({ entetes, lignes, fortes = [], compact = false, largeurs }: {
  entetes: ReactNode[]; lignes: ReactNode[][]; fortes?: number[]; compact?: boolean; largeurs?: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper">
      <table className={`w-full border-collapse text-left ${compact ? "text-[13px]" : "text-sm"}`}>
        {largeurs && <colgroup>{largeurs.map((w, k) => <col key={k} style={{ width: w }} />)}</colgroup>}
        <thead>
          <tr className="bg-navy text-white">
            {entetes.map((e, k) => <th key={k} className="px-3 py-2 font-semibold">{e}</th>)}
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => (
            <tr key={i} className={`border-t border-line ${fortes.includes(i) ? "bg-amber-soft font-semibold" : i % 2 ? "bg-cream/50" : ""}`}>
              {l.map((c, k) => <td key={k} className={`px-3 ${compact ? "py-1.5" : "py-2"} align-top ${k === 0 ? "font-semibold text-navy" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Verdict({ v }: { v: "oui" | "partiel" | "NON" | "RÉUSSI" | "échec" }) {
  const c = v === "oui" || v === "RÉUSSI" ? "bg-ok/10 text-ok" : v === "partiel" ? "bg-amber-soft text-amber-deep" : "bg-ko/10 text-ko";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${c}`}>{v}</span>;
}

export const Ok = () => <span className="font-bold text-ok">✓</span>;
export const Ko = () => <span className="font-bold text-ko">✗</span>;
