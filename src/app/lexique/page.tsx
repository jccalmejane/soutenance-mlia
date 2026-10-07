import type { Metadata } from "next";
import Lexique from "@/components/Lexique";

export const metadata: Metadata = {
  title: "Lexique — assistant de formulation prédictive",
  description: "Acronymes et définitions du projet : métier, étiquetage, données, apprentissage, métriques, optimisation, LLM.",
};

export default function Page() {
  return <Lexique />;
}
