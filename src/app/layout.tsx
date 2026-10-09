import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assistant de formulation prédictive — soutenance",
  description:
    "Un petit LLM fine-tuné écrit la liste d'ingrédients à partir du brief et du cahier des charges ; une optimisation la traduit en matières premières dans Mon PLM. DU MLIA, Sorbonne Université.",
  robots: { index: false, follow: false }, // version en ligne : partagée par lien, pas indexée
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full">
        {/* Fond plein écran fixe, comme sur crumble-ai.com (versaia_www/src/app/[lang]/[industry]/layout.tsx) :
            les macarons restent en place pendant le défilement, derrière tout le contenu. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/LightBackground.webp" alt="" aria-hidden="true" className="pointer-events-none fixed select-none"
          style={{ top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: -1 }} />
        {children}
      </body>
    </html>
  );
}
