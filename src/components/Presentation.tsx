"use client";

import { useCallback, useEffect, useState } from "react";
import notesOrateur from "@/lib/notes.json";

// Notes de l'orateur : seulement dans la version locale. Sur Vercel (build en ligne), elles ne sont pas incluses
// dans le site du tout (pas seulement masquées) — voir NOTES_ORATEUR dans next.config.ts.
const AVEC_NOTES = process.env.NOTES_ORATEUR === "1";
// QR code vers le site en ligne : seulement sur la version projetée (inutile une fois l'auditoire connecté)
const AVEC_QR = process.env.VERSION_LOCALE === "1";
// version locale : le sommaire reste ouvert pendant la présentation (fermé seulement par son bouton) ; en ligne, il se referme
const SOMMAIRE_PERSISTANT = process.env.VERSION_LOCALE === "1";
/** Adresse du site en ligne, codée dans public/img/qr-site.svg (scripts/qr_site.py). */
const URL_EN_LIGNE = "soutenance-mlia.vercel.app";
const notes: Record<string, string | string[]> = AVEC_NOTES ? notesOrateur : {};

export type EcranInfo = { id: string; n: string; titre: string; note: number };

/** En-tête collant, sommaire, navigation clavier (flèches, Page, Espace, Début/Fin), notes de l'orateur (N), plein écran (F),
    version locale seulement : QR code du site en ligne dans la marge gauche des grands écrans (Q : en grand). */
export default function Presentation({ ecrans }: { ecrans: EcranInfo[] }) {
  const [courant, setCourant] = useState(0);
  const [notesVisibles, setNotesVisibles] = useState(false);
  const [sommaire, setSommaire] = useState(false);
  const [qrGrand, setQrGrand] = useState(false);

  useEffect(() => {
    // lien direct vers un écran (#resultats…) : saut immédiat, sans le long défilement doux du chargement
    const ancre = window.location.hash.slice(1);
    if (ancre) document.getElementById(ancre)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entrees) => {
        // l'écran courant est celui qui traverse la ligne du milieu de la fenêtre (robuste aux écrans plus hauts que la fenêtre)
        const vis = entrees.find((e) => e.isIntersecting);
        if (vis) {
          const k = ecrans.findIndex((e) => e.id === vis.target.id);
          if (k >= 0) setCourant(k);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    ecrans.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ecrans]);

  const aller = useCallback(
    (k: number) => {
      const i = Math.max(0, Math.min(ecrans.length - 1, k));
      document.getElementById(ecrans[i].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setCourant(i);
    },
    [ecrans],
  );

  useEffect(() => {
    const surTouche = (ev: KeyboardEvent) => {
      const cible = ev.target as HTMLElement;
      if (cible && ["INPUT", "TEXTAREA", "SELECT"].includes(cible.tagName)) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(ev.key)) { ev.preventDefault(); aller(courant + 1); }
      else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(ev.key)) { ev.preventDefault(); aller(courant - 1); }
      else if (ev.key === "Home") { ev.preventDefault(); aller(0); }
      else if (ev.key === "End") { ev.preventDefault(); aller(ecrans.length - 1); }
      else if (AVEC_NOTES && (ev.key === "n" || ev.key === "N")) setNotesVisibles((v) => !v);
      else if (AVEC_QR && (ev.key === "q" || ev.key === "Q")) setQrGrand((v) => !v);
      else if (ev.key === "Escape") setQrGrand(false);
      else if (ev.key === "f" || ev.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, [aller, courant, ecrans.length]);

  const e = ecrans[courant];
  const note = notes[String(e?.note)];

  return (
    <>
      <header className="sticky top-0 z-30 border-b" style={{ borderColor: "rgba(30,58,120,0.12)", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5">
          <a href="#accueil" className="flex shrink-0 items-center gap-3">
            {/* Soutenance : logo officiel de Sorbonne Université (en-tête de sorbonne-universite.fr).
                Le logo Crumble-AI reste disponible pour plus tard : <img src="/logo-crumble-ai.svg" alt="Crumble-AI" width={140} height={36} />
                (variante « Sciences » : /img/logo-sciences-sorbonne-universite.png) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-sorbonne-universite.svg" alt="Sorbonne Université" width={114} height={46} className="h-9 w-auto sm:h-[46px]" />
            <span className="hidden border-l border-line pl-3 text-sm font-semibold whitespace-nowrap text-ink-soft lg:inline">DU MLIA · Projet de fin d&apos;études</span>
            <span className="hidden border-l border-line pl-3 text-sm whitespace-nowrap text-ink-soft lg:inline">Jean-Christophe Calmejane</span>
          </a>
          <nav className="flex items-center gap-1.5 sm:gap-2">
            {/* page Lexique : le lien « Présentation » de la page ramène à l'écran courant */}
            <a href={`/lexique?depuis=${e?.id ?? "accueil"}`} title="Acronymes et définitions du projet"
              onClick={(ev) => {
                // écran sous la ligne médiane au moment du clic (indépendant de l'observateur de défilement)
                const milieu = window.innerHeight / 2;
                const ici = ecrans.find((x) => {
                  const r = document.getElementById(x.id)?.getBoundingClientRect();
                  return r && r.top <= milieu && r.bottom >= milieu;
                });
                if (ici) ev.currentTarget.href = `/lexique?depuis=${ici.id}`;
              }}
              className="rounded-full border border-line bg-paper px-2.5 py-1.5 text-[13px] font-semibold text-navy hover:border-amber sm:px-3 sm:text-sm">
              Lexique
            </a>
            <button onClick={() => setSommaire((v) => !v)} className="rounded-full border border-line bg-paper px-2.5 py-1.5 text-[13px] font-semibold text-navy hover:border-amber sm:px-3 sm:text-sm">
              Sommaire
            </button>
            {AVEC_NOTES && <button onClick={() => setNotesVisibles((v) => !v)} title="Notes de l'orateur (touche N)"
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${notesVisibles ? "border-amber bg-amber-soft text-amber-deep" : "border-line bg-paper text-ink-soft hover:border-amber"}`}>
              Notes
            </button>}
            <a href="#demo" className="hidden rounded-full bg-gradient-to-r from-amber-bright to-amber px-4 py-1.5 text-sm font-semibold text-navy-deep hover:brightness-105 sm:inline-block">
              Démonstrateur
            </a>
          </nav>
        </div>
        <div className="h-1 bg-line">
          <div className="h-1 bg-gradient-to-r from-amber-bright to-amber transition-all" style={{ width: `${((courant + 1) / ecrans.length) * 100}%` }} />
        </div>
      </header>

      {/* QR code dans la marge gauche, là où il y a la place (écran large ou vidéoprojecteur en plein écran) */}
      {AVEC_QR && (
        <button onClick={() => setQrGrand(true)} title="Agrandir le QR code (touche Q)"
          className="fixed top-24 left-4 z-20 hidden flex-col items-center gap-1.5 rounded-2xl bg-white/90 p-2.5 shadow-[0_8px_30px_rgba(30,58,120,0.10)] ring-1 ring-line backdrop-blur min-[1440px]:flex"
          style={{ width: "clamp(110px, calc((100vw - 72rem) / 2 - 2.5rem), 190px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/qr-site.svg" alt={`QR code vers ${URL_EN_LIGNE}`} className="aspect-square w-full" />
          <span className="text-center text-[11px] leading-tight font-semibold text-navy">Le site sur votre téléphone</span>
        </button>
      )}

      {AVEC_QR && qrGrand && (
        <div onClick={() => setQrGrand(false)} className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-navy-deep/70 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/qr-site.svg" alt={`QR code vers ${URL_EN_LIGNE}`} className="aspect-square w-[min(60vh,80vw)]" />
            <p className="text-2xl font-bold text-navy">Parcourez la présentation sur votre téléphone</p>
            <p className="text-lg font-semibold text-amber-deep">{URL_EN_LIGNE}</p>
          </div>
        </div>
      )}

      {sommaire && (
        <div className="fixed top-[4.6rem] right-3 z-40 max-h-[75vh] w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto sm:right-5 rounded-xl border border-line bg-paper p-2 shadow-lg">
          {ecrans.map((x, k) => (
            <button key={x.id} onClick={() => { aller(k); if (!SOMMAIRE_PERSISTANT) setSommaire(false); }}
              className={`flex w-full items-baseline gap-3 rounded-lg px-3 py-1.5 text-left text-sm hover:bg-amber-soft ${k === courant ? "bg-amber-soft" : ""}`}>
              <span className="w-7 shrink-0 font-bold text-amber-deep tabular-nums">{x.n}</span>
              <span className="text-ink">{x.titre}</span>
            </button>
          ))}
        </div>
      )}

      {notesVisibles && note && (
        <aside className="fixed bottom-4 left-4 z-40 max-h-[42vh] w-[min(46rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-amber bg-paper/95 p-4 shadow-lg backdrop-blur">
          <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">Notes de l&apos;orateur · {e.n} · {e.titre}</p>
          {Array.isArray(note) ? (
            <ul className="mt-2 flex flex-col gap-1.5">
              {note.map((l, k) => (
                <li key={k} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" />{l}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{note}</p>
          )}
        </aside>
      )}

      <div className="fixed right-4 bottom-4 z-30 hidden items-center gap-1 sm:flex rounded-full border border-line bg-paper/90 px-2 py-1 text-sm shadow-sm backdrop-blur">
        <button onClick={() => aller(courant - 1)} aria-label="Écran précédent" className="px-2 text-navy hover:text-amber-deep">←</button>
        <span className="tabular-nums text-ink-soft">{e?.n} · {courant + 1}/{ecrans.length}</span>
        <button onClick={() => aller(courant + 1)} aria-label="Écran suivant" className="px-2 text-navy hover:text-amber-deep">→</button>
      </div>
    </>
  );
}
