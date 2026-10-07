import type { NextConfig } from "next";

// Site de soutenance exporté en statique (dossier out/) : servi le jour J par un simple serveur de fichiers
// (python -m http.server), sans Node ni internet. Le démonstrateur Streamlit est intégré par iframe (localhost:8501).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // notes de l'orateur incluses en local, exclues du build Vercel (VERCEL=1 pendant le build en ligne)
  env: { NOTES_ORATEUR: process.env.VERCEL ? "0" : "1" },
};

export default nextConfig;
