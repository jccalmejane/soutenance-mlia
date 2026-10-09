"use client";

import { useEffect, useMemo, useState } from "react";
import lexique from "@/lib/lexique.json";
import { VOILE } from "@/components/ui";

type Entree = { terme: string; definition: string; projet: string };
type Section = { titre: string; entrees: Entree[] };

/** Recherche insensible à la casse et aux accents (« modele » trouve « Modèle »). */
const simple = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const ancre = (t: string) => simple(t).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Page Lexique : même source que docs/Lexique.md et le PDF (docs/build_lexique.py → src/lib/lexique.json). */
export default function Lexique() {
  const [q, setQ] = useState("");
  const [retour, setRetour] = useState("/");

  useEffect(() => {
    // ouvert depuis la présentation : le lien « Retour » ramène à l'écran d'où l'on vient
    const depuis = new URLSearchParams(window.location.search).get("depuis");
    if (depuis && /^[a-z0-9-]+$/.test(depuis)) setRetour(`/#${depuis}`);
  }, []);

  const sections = useMemo(() => {
    const m = simple(q.trim());
    // début de mot seulement : « rag » trouve RAG, pas « tirages »
    const motif = new RegExp(`(^|[^a-z0-9])${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
    return (lexique as Section[])
      .map((s) => ({ ...s, entrees: m ? s.entrees.filter((e) => motif.test(simple(`${e.terme} ${e.definition} ${e.projet}`))) : s.entrees }))
      .filter((s) => s.entrees.length);
  }, [q]);
  const total = sections.reduce((n, s) => n + s.entrees.length, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b" style={{ borderColor: "rgba(30,58,120,0.12)", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5">
          <a href={retour} className="flex shrink-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-sorbonne-universite.svg" alt="Sorbonne Université" width={114} height={46} className="h-9 w-auto sm:h-[46px]" />
            <span className="hidden border-l border-line pl-3 text-sm font-semibold whitespace-nowrap text-ink-soft md:inline">DU MLIA · Lexique du projet</span>
          </a>
          <div className="flex min-w-0 items-center gap-2">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un terme…" aria-label="Rechercher un terme"
              className="w-full min-w-0 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink outline-none focus:border-amber sm:w-64" />
            <a href={retour} className="rounded-full bg-gradient-to-r from-amber-bright to-amber px-4 py-1.5 text-sm font-semibold whitespace-nowrap text-navy-deep hover:brightness-105" aria-label="Retour à la présentation">
              ←<span className="hidden sm:inline"> Présentation</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-2 py-4 sm:px-4 sm:py-8">
        <div className={VOILE}>
          <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">Lexique</p>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Acronymes et définitions</h1>
          <p className="mt-1 text-base text-ink-soft italic">
            {q ? `${total} terme${total > 1 ? "s" : ""} pour « ${q} »` : `${total} termes, de l'étiquette au LLM`} — chacun avec une définition en langage courant et son rôle dans le projet
          </p>
          {!q && (
            <nav className="mt-5 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a key={s.titre} href={`#${ancre(s.titre)}`}
                  className="rounded-full border border-line bg-paper px-3 py-1 text-sm font-semibold text-navy hover:border-amber hover:bg-amber-soft">
                  {s.titre} <span className="font-normal text-ink-soft">· {s.entrees.length}</span>
                </a>
              ))}
            </nav>
          )}
        </div>

        {sections.map((s) => (
          <section key={s.titre} id={ancre(s.titre)} className={`mt-6 scroll-mt-24 ${VOILE}`}>
            <h2 className="text-2xl font-bold text-navy">{s.titre}</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 lg:grid-cols-2">
              {s.entrees.map((e) => (
                <div key={e.terme} className="border-l-4 border-amber pl-4">
                  <dt className="text-lg font-bold text-navy">{e.terme}</dt>
                  <dd className="mt-0.5 text-[15px] leading-relaxed text-ink">{e.definition}</dd>
                  <dd className="mt-1 text-sm leading-snug text-amber-deep"><span className="font-semibold">Dans le projet : </span>{e.projet}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        {!total && <p className={`mt-6 ${VOILE} text-ink-soft`}>Aucun terme ne correspond à « {q} ».</p>}
      </main>

      <footer className="border-t border-line bg-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-ink-soft">
          <span>Jean-Christophe Calmejane — DU MLIA, Sorbonne Université · octobre 2026</span>
          <span>Données : Open Food Facts (ODbL), CIQUAL 2020, référentiel de Mon PLM</span>
        </div>
      </footer>
    </div>
  );
}
