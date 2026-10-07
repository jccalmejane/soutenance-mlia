import { Carte, Chiffre, Ecran, Puces, Tableau } from "./ui";
import { Barres } from "./graphiques";

export function ApportsDu() {
  return (
    <Ecran id="du" n="21" kicker="Formation" titre="Ce que le projet met en œuvre du DU MLIA">
      <Tableau compact entetes={["Module", "Mise en œuvre", "Exemple concret dans le projet"]} largeurs={["20%", "42%", "38%"]} lignes={[
        ["Big Data", "Dump Parquet interrogé avec DuckDB ; pipeline reproductible", "7,9 Go → 49 838 produits filtrés en moins d'une minute"],
        ["Apprentissage supervisé", "Multi-label, apprentissage par paires, régression, validation croisée groupée, découpage anti-fuite", "« Madeleines coquilles » jamais à la fois en apprentissage et en test"],
        ["Apprentissage non supervisé", "ACP, k-means, t-SNE ; plus proches voisins comme baseline et comme RAG", "« Madeleines au beurre aux œufs frais » : few-shot F1 0,42 → avec 5 voisins (RAG) 0,60"],
        ["Deep learning et texte", "Embeddings de phrases, MLP PyTorch ; tokenisation et modèles de langage", "Qwen2.5 : « wheat-flour 32% » = quelques tokens générés un à un"],
        ["Grands modèles (module 7)", "Zero-shot, few-shot, RAG, LoRA (PEFT), perte masquée, API privée, données synthétiques filtrées, contrefactuels, ablation, McNemar", "Brownies « sans œufs » : œufs remplacés par huile + émulsifiant"],
        ["Optimisation et explicabilité", "Programmation linéaire, programme quadratique convexe, verdicts motivés", "Halal strict : « NON, pas d'huile ni de sel certifiés »"],
        ["Environnement des données", "Données ouvertes (ODbL) et internes, règlement INCO, Nutri-Score calculé", "Le 0,5B tourne en local : les recettes de l'entreprise ne sortent pas"],
      ]} />
    </Ecran>
  );
}

export function Limites() {
  return (
    <Ecran id="limites" n="22" kicker="Recul" titre="Limites et perspectives">
      <div className="grid gap-5 md:grid-cols-2">
        <Carte titre="Limites assumées" accent="ko"><Puces items={[
          "Le nom seul limite toute prédiction : plafond naturel F1 0,58 — « Madeleines coquilles » existe en pur beurre et à l'huile.",
          "Vegan : le petit modèle passe de 0,08 à 0,39 grâce à l'augmentation, mais reprend les tics du générateur (protéine de pois presque partout) et reste sous GPT-5.5 (0,45).",
          "Les vérificateurs ont des trous : un « caramel au beurre salé » est passé pour vegan (2 cas sur 126).",
          "Le Nutri-Score visé n'est vérifié qu'après le solveur, sur la recette en MP : la liste du LLM seule ne donne pas les quantités.",
          "Cahier des charges reconstruit à partir des produits (« sans huile de palme ; Nutri-Score E » pour les madeleines coquilles), pas écrit par des formulateurs.",
          "QUID parfois faux dans les données (9 % incohérents avec l'ordre) ; référentiel de démonstration (281 MP, 50 produits).",
        ]} /></Carte>
        <Carte titre="Perspectives" accent="ok" fond="soft"><Puces items={[
          "Diversifier les substitutions générées (amidon, farine de soja, graines de lin…) et étendre l'augmentation aux autres critères.",
          "Fine-tuner le Qwen3.5-9B en QLoRA sur une L4 : taxonomie et substitutions dans un seul modèle ouvert.",
          "Combiner fine-tuning et RAG : donner au modèle fine-tuné les recettes voisines.",
          "Intégrer le démonstrateur dans Crumble-AI et y vérifier le Nutri-Score par son propre calcul.",
          "Apprendre des formulations validées par les utilisateurs de Crumble-AI ; étendre à d'autres familles et à la cosmétique.",
        ]} /></Carte>
      </div>
    </Ecran>
  );
}

export function Conclusion() {
  return (
    <section id="conclusion" data-ecran="23" className="ecran flex min-h-[calc(100vh-4.25rem)] items-center bg-navy-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-16">
        <p className="text-sm font-bold tracking-widest text-amber-bright uppercase">23 · Conclusion</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Ce qu&apos;il faut retenir</h2>
        <ul className="mt-8 flex max-w-4xl flex-col gap-5 text-lg text-white/85">
          {[
            "Le marché est une base d'apprentissage : 46 000 étiquettes et des règles d'étiquetage qui sont des contraintes exactes.",
            "Un petit LLM fine-tuné en LoRA, en deux heures sur un GPU gratuit, écrit des listes d'ingrédients crédibles et lit le cahier des charges — l'ablation le prouve ; un grand modèle peut lui enseigner les substitutions (vegan 0,08 → 0,39).",
            "Une évaluation sans juge : vérificateurs, contrefactuels, comparaisons appariées ; la chaîne supervisée, Qwen3.5-9B et GPT-5.5 comme repères honnêtes.",
            "Une optimisation qui traduit en matières premières et explique chaque choix, dans Crumble-AI qui recalcule et fait foi.",
          ].map((t) => (
            <li key={t} className="flex gap-3"><span aria-hidden className="mt-3 size-2 shrink-0 rounded-full bg-amber" />{t}</li>
          ))}
        </ul>
        <p className="mt-10 text-2xl font-bold text-amber-bright">Le modèle propose, le calcul vérifie, l&apos;optimisation arbitre — et le formulateur décide.</p>
        <p className="mt-10 text-3xl font-bold text-white">Merci — questions</p>
      </div>
    </section>
  );
}

export function Annexes() {
  return (
    <>
      <Ecran id="annexes" n="A" kicker="Pour les questions" titre="Annexes">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[["a1", "A1", "Modèle 1 : du brief aux ingrédients"], ["a2", "A2", "Explicabilité de la madeleine"], ["a3", "A3", "Non supervisé : profils de recette"],
            ["a4", "A4", "Modèle 2 : ordre et proportions"], ["a5", "A5", "Le bilan d'eau"], ["a6", "A6", "Le Nutri-Score, calculé et vérifié"]].map(([id, n, t]) => (
            <a key={id} href={`#${id}`} className="group flex items-baseline gap-3 rounded-lg border border-line bg-paper px-4 py-3 hover:border-amber">
              <span className="text-sm font-bold text-amber-deep">{n}</span>
              <span className="font-semibold text-ink group-hover:text-navy">{t}</span>
            </a>
          ))}
        </div>
      </Ecran>

      <Ecran id="a1" n="A1" kicker="Annexe" titre="Modèle 1 : du brief aux ingrédients (multi-label)">
        <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
          <Barres titre="F1 sur le jeu de test (150 ingrédients)" max={0.8} hauteur={260}
            categories={["fréquence / famille", "kNN embeddings", "kNN TF-IDF", "log. TF-IDF", "log. embeddings", "MLP PyTorch", "log. TF-IDF + famille"]}
            series={[{ nom: "F1 micro", valeurs: [0.461, 0.481, 0.537, 0.561, 0.475, 0.539, 0.568], couleur: "#0228b5" },
                     { nom: "F1 macro", valeurs: [0.092, 0.255, 0.299, 0.352, 0.177, 0.307, 0.357], couleur: "#f59701" }]} />
          <div className="flex flex-col gap-4">
            <Puces items={["Entrée : le nom du produit. Cible : présence de 150 ingrédients.", "Découpage par nom : aucune fuite entre apprentissage et test.",
              "TF-IDF mots + caractères, embeddings multilingues, régression logistique un-contre-tous, MLP PyTorch."]} />
            <div className="grid grid-cols-2 gap-3">
              <Chiffre valeur="0,57" legende="F1 micro du meilleur modèle" couleur="blue" />
              <Chiffre valeur="0,62" legende="plafond naturel (vocabulaire de 150)" couleur="amber" />
            </div>
          </div>
        </div>
      </Ecran>

      <Ecran id="a2" n="A2" kicker="Annexe" titre="Explicabilité : pourquoi ces ingrédients pour la madeleine ?">
        <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
          <Tableau entetes={["Ingrédient prédit", "P(présent)", "Mots du brief qui ont pesé"]} lignes={[
            ["sucre", "0,95", "structurel (fréquence de base)"], ["farine de blé", "0,93", "« madeleine aux »"], ["œufs", "0,82", "« madeleine aux »"],
            ["huile de colza", "0,80", "« madeleine aux », « pépites »"], ["poudres à lever", "0,77", "« aux pépites »"], ["pépites de chocolat", "0,67", "« aux pépites », « chocolat »"],
          ]} />
          <Carte titre="Ce que le modèle sait — et ne peut pas savoir" fond="soft">
            <p>Il sait la structure et le caractérisant, portés par les mots du brief.</p>
            <p className="mt-2">Il propose l&apos;huile de colza avant le beurre : sur ce marché, l&apos;huile domine.</p>
            <p className="mt-2 font-bold text-navy">Il ne peut pas trancher beurre / huile ou sucre / glucose : le nom ne le dit pas.</p>
          </Carte>
        </div>
      </Ecran>

      <Ecran id="a3" n="A3" kicker="Annexe" titre="Non supervisé : des profils de recette dans l'espace des produits">
        <div className="grid items-center gap-5 lg:grid-cols-[3fr_2fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/nb1_fig07_cell25.png" alt="Carte t-SNE des profils de recette" className="w-full rounded-xl border border-line bg-white" />
          <div className="flex flex-col gap-3 text-[15px]">
            <p>ACP sur 150 indicateurs d&apos;ingrédients + 8 nutriments, k-means (k = 6), t-SNE pour la carte.</p>
            <p>Six profils : cakes industriels, barres avoine / protéines, biscuits pur beurre, pain d&apos;épices et meringués, viennoiseries, biscuits industriels.</p>
            <p className="text-ink-soft italic">Ces profils recoupent des familles de formulation plus que les catégories marketing.</p>
          </div>
        </div>
      </Ecran>

      <Ecran id="a4" n="A4" kicker="Annexe" titre="Modèle 2 : l'ordre et les proportions sous les règles INCO">
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/nb2_fig02_cell13.png" alt="Modèle 2 : ordre et proportions" className="w-full rounded-xl border border-line bg-white" />
          <div className="flex flex-col gap-4">
            <Tableau entetes={["Modèle 2a — ordre (τ de Kendall, tête ≤ 6)", ""]} lignes={[["Baseline : rang médian de l'ingrédient", "0,46"], ["Classifieur de paires (375 000 comparaisons)", "0,50"]]} />
            <Tableau entetes={["Modèle 2b — proportions (MAE, points de %)", ""]} lignes={[
              ["Prédictif — médiane de l'ingrédient", "8,7"], ["Prédictif — gradient boosting, rang prédit", "7,1"],
              ["Rétro-ingénierie — gradient boosting, rang réel", "4,9"], ["Rétro-ingénierie — + nutrition du produit", "4,6"],
            ]} />
          </div>
        </div>
      </Ecran>

      <Ecran id="a5" n="A5" kicker="Annexe" titre="De l'étiquette à la recette : le bilan d'eau">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Carte titre="Base étiquette — 100 g de produit fini" accent="blue">Pourcentages pour 100 g de produit fini, eau ajoutée masquée sous 5 %, eau évaporée jamais déclarée.</Carte>
          <span className="text-center text-3xl text-amber">→</span>
          <Carte titre="Base pâte — quantités mises en œuvre" accent="amber">La matière sèche est conservée : Σ pᵢ (1 − hᵢ) = 100 − h<sub>produit fini</sub>. 106 g de pâte → 100 g de madeleines.</Carte>
        </div>
        <Puces className="mt-6" items={[
          "Un QUID s'exprime sur le produit fini après perte au four : la somme des ingrédients mis en œuvre peut dépasser 100.",
          "Le solveur travaille en base pâte, avec l'eau comme matière première ; Crumble-AI recalcule l'étiquette en base produit fini.",
          "Dans le démonstrateur, l'eau ajoutée calculée par le bilan fait partie de la cible du solveur (tartes, crêpes : 20 à 40 % de la pâte).",
        ]} />
      </Ecran>

      <Ecran id="a6" n="A6" kicker="Annexe" titre="Le Nutri-Score n'est jamais prédit : il est calculé et vérifié">
        <div className="grid gap-3 sm:grid-cols-4">
          <Chiffre valeur="46 316" legende="produits Open Food Facts recalculés" />
          <Chiffre valeur="98,9 %" legende="lettres identiques à OFF" couleur="ok" />
          <Chiffre valeur="99,4 %" legende="scores à ± 1 point" couleur="ok" />
          <Chiffre valeur="98 %" legende="lettres identiques sur les 50 produits Crumble-AI" couleur="ok" />
        </div>
        <div className="mt-5">
          <Carte titre="Spécification Crumble-AI, algorithme 2023" fond="soft">
            <p>Consolidation de recette (rendement, bilan d&apos;eau), points défavorables et favorables, règle des protéines (comptées seulement si les points défavorables sont sous 11), catégories ; seuils suivants pour chaque composante.</p>
            <p className="mt-2 italic">« Le calcul est une fonction pure des lignes MP, du rendement et de la catégorie ; aucun appel LLM. » Le Nutri-Score entre dans le solveur comme contrainte, pas comme cible d&apos;apprentissage : moins de points, meilleure lettre.</p>
          </Carte>
        </div>
      </Ecran>
    </>
  );
}
