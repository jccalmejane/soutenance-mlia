import Presentation, { type EcranInfo } from "@/components/Presentation";
import { Accueil, Cadrage, Chaine, Contrefactuel, Donnees, Evaluation, Inco, Lora, Supervisee, TacheLlm } from "@/components/sections1";
import { Ablation, Augmentation, Demo, Erreurs, Exemples, GrandsModeles, ProblemeInverse, Resultats, SolveurCahier, Taille } from "@/components/sections2";
import { Annexes, ApportsDu, Conclusion, Limites } from "@/components/sections3";

// Un écran = une slide de la soutenance ; `note` = numéro de la slide dans slides/notes_soutenance.py (notes de l'orateur).
const ECRANS: EcranInfo[] = ([
  ["accueil", "Assistant de formulation prédictive", 1], ["cadrage", "Le cadrage en trois temps", 3], ["chaine", "La chaîne complète", 4],
  ["donnees", "Les données", 5], ["inco", "Les règles d'étiquetage", 6], ["supervisee", "La chaîne supervisée", 7],
  ["tache", "La tâche confiée au LLM", 8], ["lora", "Fine-tuning LoRA", 9], ["evaluation", "Comment évaluer", 10],
  ["contrefactuel", "Un contrefactuel pas à pas", 11], ["resultats", "Résultats", 12], ["erreurs", "Analyse d'erreurs", 13],
  ["ablation", "Ablation", 14], ["taille", "Un modèle plus gros ? ChatGPT fait mieux", 15], ["grands-modeles", "Qwen3.5-9B et GPT-5.5", 16],
  ["augmentation", "Augmentation ciblée", 17], ["exemples", "Des sorties crédibles", 18], ["probleme-inverse", "Le problème inverse", 19],
  ["solveur", "Le cahier des charges dans le solveur", 20], ["demo", "Démonstrateur en direct", 21], ["du", "Apports du DU MLIA", 22],
  ["limites", "Limites et perspectives", 23], ["conclusion", "Conclusion", 24],
] as [string, string, number][]).map(([id, titre, note], k) => ({ id, n: String(k + 1).padStart(2, "0"), titre, note })).concat(
  ([["annexes", "A", "Annexes", 25], ["a1", "A1", "Modèle 1", 26], ["a2", "A2", "Explicabilité", 27], ["a3", "A3", "Non supervisé", 28],
    ["a4", "A4", "Modèle 2", 29], ["a5", "A5", "Bilan d'eau", 30], ["a6", "A6", "Nutri-Score", 31]] as [string, string, string, number][])
    .map(([id, n, titre, note]) => ({ id, n, titre, note })));

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Presentation ecrans={ECRANS} />
      <main className="flex-1">
        <Accueil /><Cadrage /><Chaine /><Donnees /><Inco /><Supervisee /><TacheLlm /><Lora /><Evaluation /><Contrefactuel />
        <Resultats /><Erreurs /><Ablation /><Taille /><GrandsModeles /><Augmentation /><Exemples /><ProblemeInverse /><SolveurCahier /><Demo />
        <ApportsDu /><Limites /><Conclusion /><Annexes />
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
