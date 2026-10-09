"use client";

import { useCallback, useEffect, useState } from "react";

const URL_DEMO = "http://localhost:8501";
/** Site servi depuis le PC (serveur_site.py) : le démonstrateur local est joignable. En ligne (Vercel), il ne l'est pas. */
const estLocal = () => ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

/** Le démonstrateur Streamlit (demo/app_formulation.py) intégré dans la page ; repli si le serveur n'est pas lancé. */
export default function Demonstrateur() {
  const [etat, setEtat] = useState<"verif" | "ok" | "absent" | "en-ligne">("verif");

  const verifier = useCallback(async () => {
    const ctrl = new AbortController();
    const minuterie = setTimeout(() => ctrl.abort(), 2500);
    try {
      // mode no-cors : réponse opaque si le serveur répond, erreur réseau sinon
      await fetch(`${URL_DEMO}/_stcore/health`, { mode: "no-cors", cache: "no-store", signal: ctrl.signal });
      setEtat("ok");
      return true;
    } catch {
      setEtat("absent");
      return false;
    } finally {
      clearTimeout(minuterie);
    }
  }, []);

  useEffect(() => {
    // le cadre apparaît après le saut vers l'ancre : on recale la page sur le démonstrateur
    if (etat === "ok" && ["#demo", "#demo-live"].includes(window.location.hash)) {
      document.getElementById("demo-live")?.scrollIntoView({ block: "start" });
    }
  }, [etat]);

  useEffect(() => {
    // le serveur du site lance le démonstrateur, qui met ~10 s à démarrer : on revérifie toutes les 3 s pendant 2 min
    // version en ligne : ne pas sonder le localhost du visiteur (le navigateur demanderait une autorisation d'accès au réseau local)
    if (!estLocal()) {
      setEtat("en-ligne");
      return;
    }
    let essais = 0;
    let fini = false;
    let t: ReturnType<typeof setTimeout>;
    const tenter = async () => {
      if (fini) return;
      const ok = await verifier();
      if (!ok && ++essais < 40) t = setTimeout(tenter, 3000);
    };
    t = setTimeout(tenter, 0);
    return () => { fini = true; clearTimeout(t); };
  }, [verifier]);

  if (etat === "ok") {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-paper">
        <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-2 text-sm">
          <span className="font-semibold text-navy">Démonstrateur en direct · local, hors ligne</span>
          <a href={URL_DEMO} target="_blank" rel="noreferrer" className="font-semibold text-blue hover:text-amber-deep">
            Ouvrir en plein écran ↗
          </a>
        </div>
        <iframe src={`${URL_DEMO}/?embed=true&embed_options=light_theme`} title="Démonstrateur de formulation"
          className="block h-[calc(100vh-8rem)] min-h-[600px] w-full border-0 bg-white" />
      </div>
    );
  }

  if (etat === "en-ligne") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl bg-navy-deep p-8 text-white">
        <p className="text-xs font-bold tracking-widest text-amber-bright uppercase">Démonstrateur local</p>
        <p className="max-w-2xl text-white/80">
          Le démonstrateur tourne sur le PC du présentateur, sans internet : Qwen2.5-0.5B + LoRA sur le processeur, réponses du
          Qwen3.5-9B rejouées, vérificateurs, solveur et export vers Mon PLM. Aucune recette n&apos;est envoyée en ligne ; il est
          présenté en direct lors de la soutenance.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl bg-navy-deep p-8 text-white">
      <p className="text-xs font-bold tracking-widest text-amber-bright uppercase">
        {etat === "verif" ? "Connexion au démonstrateur…" : "Le démonstrateur démarre…"}
      </p>
      {etat === "absent" && (
        <>
          <p className="max-w-2xl text-white/80">
            Il est lancé avec le site (Qwen2.5-0.5B + LoRA sur le processeur, solveur, export vers Mon PLM) et met une dizaine de
            secondes à démarrer : cette page se reconnecte toute seule. Si rien ne vient, relancer <b className="text-white">Lancer la soutenance.bat</b>, puis :
          </p>
          <button onClick={verifier} className="rounded-full bg-gradient-to-r from-amber-bright to-amber px-5 py-2 font-semibold text-navy-deep hover:brightness-105">
            Réessayer la connexion
          </button>
        </>
      )}
    </div>
  );
}
