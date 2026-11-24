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
        {/* Fond crème uni (body, globals.css) : l'image des macarons a été retirée (public/img/LightBackground.webp conservée). */}
        {children}
      </body>
    </html>
  );
}
