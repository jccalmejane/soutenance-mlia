import type { NextConfig } from "next";

// Site de soutenance exporté en statique (dossier out/) : servi le jour J par un simple serveur de fichiers
// (python -m http.server), sans Node ni internet. Le démonstrateur Streamlit est intégré par iframe (localhost:8501).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // version locale (vidéoprojecteur) : notes de l'orateur et QR code vers le site en ligne ; exclus du build Vercel
  // (VERCEL=1 pendant le build en ligne)
  env: { NOTES_ORATEUR: process.env.VERCEL ? "0" : "1", VERSION_LOCALE: process.env.VERCEL ? "0" : "1" },
};

export default nextConfig;
