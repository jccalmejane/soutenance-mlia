import type { NextConfig } from "next";

// Site de soutenance exporté en statique (dossier out/) : servi le jour J par un simple serveur de fichiers
// (python -m http.server), sans Node ni internet. Le démonstrateur Streamlit est intégré par iframe (localhost:8501).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
