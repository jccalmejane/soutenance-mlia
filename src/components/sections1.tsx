import { Carte, Chiffre, Ecran, Exemple, Ko, Ok, Puces, Tableau, Verdict, VOILE } from "./ui";
import { Courbes } from "./graphiques";
import courbes from "@/lib/courbes_perte.json";

type Pts = [number, number][];
const unique = (p: Pts) => p.filter(([e], k) => k === 0 || e !== p[k - 1][0]);

export function Accueil() {
  return (
    <section id="accueil" data-ecran="01" className="ecran flex min-h-[calc(100vh-4.25rem)] items-center px-4">
      <div className={`mx-auto my-3 w-full max-w-6xl ${VOILE} !py-6`}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-3xl font-bold text-amber tabular-nums">01</span>
          <p className="text-sm font-bold tracking-widest text-amber-deep uppercase">Projet de fin d&apos;études · DU Machine Learning et IA · Sorbonne Université</p>
          <p className="ml-auto text-sm text-ink-soft">Jean Calmejane · octobre 2026 · encadrement : Syrielle Montariol</p>
        </div>
        <h1 className="mt-2 max-w-4xl text-4xl font-bold text-navy sm:text-[2.6rem] sm:leading-tight [text-wrap:balance]">Assistant de formulation prédictive pour l&apos;alimentaire</h1>
        <p className="mt-2 max-w-4xl text-base text-ink-soft">
          Un LLM écrit la liste d&apos;ingrédients à partir du brief et du cahier des charges — d&apos;un petit modèle fine-tuné à un modèle
          ouvert de 9 milliards de paramètres en RAG, comparé à ChatGPT ; une optimisation la traduit en recette de matières premières dans Mon PLM.
        </p>
        <h2 className="mt-4 text-xl font-bold text-navy">Le problème métier : formuler, c&apos;est arbitrer sous contraintes</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Carte num="1" titre="Une page blanche">Un brief (« madeleine aux pépites de chocolat »), un cahier des charges (« vegan »), et des itérations longues : recette, calcul, étiquette, correction.</Carte>
          <Carte num="2" titre="Des contraintes nombreuses">Coût de recette, Nutri-Score, allergènes, allégations (vegan, bio, halal), huile de palme, additifs, doses maximales.</Carte>
          <Carte num="3" titre="Le marché, base d'apprentissage">Chaque étiquette du commerce est une formulation réelle : liste d&apos;ingrédients ordonnée, pourcentages déclarés, nutrition, allégations.</Carte>
        </div>
        {/* Ordre de grandeur (référentiel de Mon PLM : 10 MP par recette en médiane) : ~16 MP équivalentes par catégorie en moyenne
            sur les recettes → 16^10 ≈ 1,1·10^12 ; doser 10 MP au % près = compositions de 100 en 10 parts = C(99,9) ≈ 1,7·10^12 ;
            produit ≈ 2·10^24. */}
        <div className="mt-3 rounded-2xl border border-line bg-paper px-4 py-3">
          <p className="text-sm font-bold tracking-widest text-amber-deep uppercase">Ordre de grandeur : un espace de recherche faramineux</p>
          <div className="mt-1.5 grid gap-3 sm:grid-cols-3">
            <div><p className="text-2xl font-bold text-navy tabular-nums">≈ 50 attributs</p>
              <p className="text-sm leading-snug text-ink-soft">par matière première : 20 nutriments, 14 allergènes (présent, traces, absent), une quinzaine d&apos;allégations, un coût</p></div>
            <div><p className="text-2xl font-bold text-blue tabular-nums">≈ 10<sup>12</sup> combinaisons</p>
              <p className="text-sm leading-snug text-ink-soft">~10 matières premières par produit, chacune à choisir parmi ~16 équivalentes (11 farines, 7 pépites…)</p></div>
            <div><p className="text-2xl font-bold text-amber tabular-nums">≈ 10<sup>24</sup> recettes</p>
              <p className="text-sm leading-snug text-ink-soft">en dosant ces 10 matières premières au % près (10<sup>12</sup> façons) — 100 000 fois plus que les grains de sable de la Terre (~10<sup>19</sup>)</p></div>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-navy">Le formulateur l&apos;explore à la main, quelques itérations à la fois : l&apos;IA propose un point de départ crédible, le calcul vérifie, l&apos;optimisation dose.</p>
        </div>
        <div className="mt-3">
          <Exemple titre="Une étiquette réelle, telle qu'on l'apprend">
            <b>Madeleines coquilles</b> — farine de blé, beurre 23 %, œufs 20 %, sucre, sirop de sucre inverti, sirop de glucose, poudres à lever,
            carbonates de sodium, sel de Guérande, arôme naturel.<br />
            <span className="text-ink-soft">Open Food Facts : sans huile de palme · allergènes œufs, gluten, lait · traces fruits à coque et soja · Nutri-Score E</span>
          </Exemple>
        </div>
      </div>
    </section>
  );
}

export function Cadrage() {
  return (
    <Ecran id="cadrage" n="02" kicker="Démarche" titre="Le cadrage a évolué en trois temps" sous="Chaque version garde la précédente comme point de comparaison">
      <Tableau compact largeurs={["14%", "28%", "26%", "32%"]}
        entetes={["", "1. Apprentissage classique", "2. Petit LLM fine-tuné", "3. Grand LLM en RAG, face à ChatGPT"]} lignes={[
        ["Méthode", "Plus proches voisins, puis trois modèles supervisés : quels ingrédients, dans quel ordre, en quelles proportions",
          "Qwen2.5-0.5B fine-tuné en LoRA, puis augmentation ciblée", "Qwen3.5-9B ouvert, sans entraînement, avec les 5 plus proches voisins dans le prompt (RAG) ; comparé à GPT-5.5, le modèle de ChatGPT, via l'API"],
        ["Ce qui est appris", "Trois modèles séparés", "Un seul modèle : liste ordonnée + QUID", "Rien : la taxonomie vient des voisins, les substitutions de la taille du modèle"],
        ["Cahier des charges", "Après coup (optimisation)", "Lu dans le prompt et respecté à la génération", "Lu dans le prompt ; substitutions mieux maîtrisées"],
        ["Où il tourne", "PC", "PC, processeur, ≈ 5 s", "GPU de 24 Go (9B) · serveurs d'OpenAI (ChatGPT)"],
        ["Rôle aujourd'hui", "Baselines : voisins (RAG) et chaîne supervisée", "Cœur du projet : léger, local, entraîné", "Repère haut : 0,46 de contrefactuels réussis, contre 0,51 pour ChatGPT et 0,33 pour le petit LoRA"],
      ]} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Chiffre valeur="45 733" legende="produits de boulangerie-pâtisserie (sur 3,9 M dans Open Food Facts)" />
        <Chiffre valeur="~90 000" legende="pourcentages déclarés (QUID) : la vérité terrain" couleur="amber" />
        <Chiffre valeur="0,5 → 9 Md" legende="paramètres : Qwen2.5 fine-tuné → Qwen3.5-9B en RAG" couleur="blue" />
        <Chiffre valeur="0,46 vs 0,51" legende="contrefactuels réussis : 9B en RAG, local, vs ChatGPT" couleur="ok" />
      </div>
      <div className="mt-5">
        <Carte titre="Pourquoi ces passages ? (propositions de ma référente)">
          <Puces items={[
            "Temps 2 : une seule génération remplace trois modèles, produit directement une étiquette lisible, et le cahier des charges devient une entrée du modèle : on peut mesurer s'il le respecte.",
            "Temps 3 : ChatGPT me battait largement sur les contraintes ; situer le petit modèle face à un modèle ouvert 18 fois plus gros — ce que la taille apporte (les substitutions), ce que l'entraînement apporte (la taxonomie).",
            "Méthodes du module 7 : zero-shot, few-shot, RAG, fine-tuning LoRA, données synthétiques, évaluation par vérification.",
          ]} />
        </Carte>
      </div>
    </Ecran>
  );
}

export function Chaine() {
  const etapes = [
    ["1", "Générer", "LLM LoRA : brief + cahier des charges → liste ordonnée + QUID", "« Madeleine aux pépites de chocolat » + cahier des charges « vegan » → farine de blé 27 %, huile de colza, sucre, pépites de chocolat 13 %, protéines de pois 12 %…"],
    ["2", "Contrôler", "Règles INCO : ordre, somme, QUID ; vérification du cahier des charges", "% décroissants ✓ · somme ≤ 105 ✓ · vegan ✓ : ni beurre, ni œufs, ni lait"],
    ["3", "Bilan d'eau", "Étiquette (100 g fini) → pâte : la matière sèche est conservée", "eau ajoutée 10 % de la pâte · rendement de cuisson 90 %"],
    ["4", "Matières premières", "Solveur du projet : programme quadratique, MP vegan seulement", "Farine T55 23,1 % · colza 15,1 % · sucre 15,1 % · pépites 50 % 11,2 % · isolat de pois 10,3 %…"],
    ["5", "Calculer", "Moteur de Mon PLM : nutrition, coût, Nutri-Score, étiquette — son calcul fait foi", "2,48 €/kg · Nutri-Score E (23) · allergènes : gluten, soja"],
  ];
  return (
    <Ecran id="chaine" n="03" kicker="Architecture" titre="La chaîne complète : générer, contrôler, formuler, calculer">
      <div className="grid gap-3 md:grid-cols-5">
        {etapes.map(([n, t, d, ex]) => (
          <div key={n} className="flex flex-col rounded-2xl border border-line bg-paper p-4">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-bright to-amber text-sm font-bold text-navy-deep">{n}</span>
            <h3 className="mt-2 font-bold text-navy">{t}</h3>
            <p className="mt-1 text-sm leading-snug">{d}</p>
            <p className="mt-auto pt-3 text-[13px] leading-snug text-amber-deep italic">{ex}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-8 text-lg font-bold text-navy">Ce qui est appris, ce qui est calculé, ce qui est arbitré</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <Carte titre="Appris (incertain)" accent="blue">Quels ingrédients, dans quel ordre, avec quels pourcentages — sur 31 642 étiquettes d&apos;apprentissage.</Carte>
        <Carte titre="Calculé (exact)">Nutrition, coût, Nutri-Score, étiquette INCO — jamais prédits, toujours recalculés.</Carte>
        <Carte titre="Arbitré (contraintes)" accent="amber">Allégations, allergènes, cibles nutritionnelles, coût : dans le prompt du LLM, puis dans le solveur.</Carte>
      </div>
    </Ecran>
  );
}

export function Donnees() {
  return (
    <Ecran id="donnees" n="04" kicker="Données" titre="Open Food Facts pour apprendre, Mon PLM pour formuler">
      <div className="grid gap-4 md:grid-cols-3">
        <Carte titre="Open Food Facts" accent="blue"><Puces items={[
          "Dump Parquet 7,9 Go filtré avec DuckDB.",
          "49 838 produits, 1,16 M lignes d'ingrédients, ~90 000 QUID.",
          "Découpage par nom : 31 642 / 4 488 / 9 603 (apprentissage / validation / test), aucun nom du test vu à l'apprentissage.",
        ]} /></Carte>
        <Carte titre="Mon PLM (référentiel)" accent="amber"><Puces items={[
          "281 MP génériques dont 48 composites, 191 ingrédients alignés sur OFF.",
          "Composition, nutrition, humidité, coût, allergènes, certifications.",
          "50 produits finis avec recette, étiquette, Nutri-Score ; chargé dans Mon PLM.",
        ]} /></Carte>
        <Carte titre="CIQUAL 2020 (ANSES)" accent="ok"><Puces items={[
          "Nutrition et teneur en eau de 3 186 aliments.",
          "Profils nutritionnels des ingrédients et humidité des produits finis (madeleine 14 %, biscuit 4 %).",
        ]} /></Carte>
      </div>
      <div className="mt-5 grid items-center gap-5 lg:grid-cols-[1fr_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/nb1_fig03_cell12.png" alt="Répartition du Nutri-Score dans la catégorie" className="w-full rounded-xl border border-line bg-white" />
        <Puces items={[
          <><b>85 %</b> des produits de la catégorie sont en Nutri-Score D ou E : viser mieux est une vraie contrainte.</>,
          "Listes saisies par des contributeurs : nettoyage, canonisation des identifiants (« œufs frais », « œuf entier » → egg), 9 % de QUID incohérents avec l'ordre.",
          <span key="m" className="text-ink-soft italic">Même nom, deux produits : « Madeleines coquilles » existe en pur beurre et à l&apos;huile de colza — d&apos;où le découpage par nom.</span>,
        ]} />
      </div>
    </Ecran>
  );
}

export function Inco() {
  return (
    <Ecran id="inco" n="05" kicker="Règles d'étiquetage" titre="Les règles INCO : des vérifications gratuites">
      <Tableau entetes={["Règle INCO (règlement 1169/2011)", "Ce qu'elle apporte", "Où elle sert"]} lignes={[
        ["Ordre pondéral décroissant", "Supervision de l'ordre sur 100 % des lignes ; contrainte p₁ ≥ p₂ ≥ … (tolérance 2 pts)", "LLM (format vérifié), chaîne supervisée, solveur"],
        ["QUID obligatoire sur l'ingrédient nommé", "La cible la plus fiable : l'ingrédient mis en avant et son pourcentage", "sortie du LLM, évaluation (MAE)"],
        ["Somme ≈ 100 % ; eau ajoutée masquée sous 5 %", "Somme des QUID ≤ 105 ; base étiquette ≠ base pâte", "vérification du format, bilan d'eau"],
        ["Allergènes, allégations, huile de palme", "Carte ingrédient → allergène apprise ; drapeaux vegan / palme d'Open Food Facts", "vérificateurs du cahier des charges, solveur"],
      ]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Exemple titre="Exemple réel — Madeleines coquilles pur beurre" mono>
          farine de blé, beurre 23 %, œufs 20 %, sucre, sirop de sucre inverti, sirop de glucose, poudres à lever…<br /><br />
          → farine ≥ 23 %   (elle est citée avant le beurre)<br />
          → sucre ≤ 20 %    (il est cité après les œufs)<br />
          → farine ≤ 57 %   (100 − beurre 23 − œufs 20)<br />
          → « pur beurre » oblige à déclarer le beurre : QUID 23 %
        </Exemple>
        <div className="flex flex-col justify-center gap-4 text-[15px]">
          <p>Sans aucun apprentissage, ordre + somme + QUID voisins bornent chaque ingrédient (programmation linéaire) : la vraie valeur est dans l&apos;intervalle dans <b>96,6 %</b> des cas.</p>
          <p className="font-bold text-navy">Ces mêmes règles rendent l&apos;évaluation du LLM déterministe : « vérifier plutôt que juger ». Aucun LLM-juge n&apos;est nécessaire.</p>
        </div>
      </div>
    </Ecran>
  );
}

export function Supervisee() {
  return (
    <Ecran id="supervisee" n="06" kicker="Baseline" titre="La chaîne supervisée : trois modèles" sous="Trois modèles d'apprentissage supervisé classiques, un par question — détails en annexe A1 à A4">
      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-4">
          <Tableau largeurs={["56%", "24%", "20%"]} entetes={["Modèle : la question qu'il traite", "Point de comparaison simple", "Résultat"]} lignes={[
            [<><b>1 — Quels ingrédients ?</b><br /><span className="font-normal text-ink">Pour chacun des 150 ingrédients courants, il estime s'il est présent, d'après les mots du nom du produit.</span><br /><span className="text-xs font-normal text-ink-soft">technique : TF-IDF + régression logistique (classification multi-label)</span></>,
              "copier les produits voisins : F1 0,54", "F1 0,57 (plafond 0,62)"],
            [<><b>2a — Dans quel ordre ?</b><br /><span className="font-normal text-ink">Il compare les ingrédients deux à deux : lequel vient avant l'autre sur l'étiquette.</span><br /><span className="text-xs font-normal text-ink-soft">technique : classifieur de paires</span></>,
              "rang habituel de l'ingrédient : τ 0,46", "τ 0,50"],
            [<><b>2b — Quelles proportions ?</b><br /><span className="font-normal text-ink">Il prédit le pourcentage de chaque ingrédient, appris sur les pourcentages déclarés (QUID).</span><br /><span className="text-xs font-normal text-ink-soft">technique : gradient boosting (ensemble d'arbres de décision)</span></>,
              "pourcentage habituel : erreur 8,7 pts", "erreur 7,1 pts"],
          ]} />
          <p className="-mt-2 text-xs text-ink-soft">F1 : part d&apos;ingrédients justes, de 0 à 1 · τ : accord sur l&apos;ordre, de −1 à 1 · erreur : écart moyen en points de pourcentage.</p>
          <Exemple titre="Modèle 1 sur « Madeleine aux pépites de chocolat » (probabilités)" mono>
            sucre 0,95 · farine de blé 0,93 · œufs 0,82 · huile de colza 0,80 · poudres à lever 0,77 · pépites de chocolat 0,67
          </Exemple>
          <div className="grid gap-4 sm:grid-cols-2">
            <Carte titre="Ce qu'elle apporte" accent="ok"><Puces items={[
              "Solide sur la liste d'ingrédients : sur la même mesure que le LLM, F1 0,49 et τ 0,71.",
              "Explicable : « pépites » fait monter les pépites de chocolat, « madeleine » la farine et les œufs.",
            ]} /></Carte>
            <Carte titre="Ce qu'elle ne fait pas" accent="ko">Elle ne lit pas le cahier des charges : les contraintes n&apos;arrivent qu&apos;à l&apos;optimisation.</Carte>
          </div>
        </div>
        <Carte titre="Le plafond naturel" fond="soft" accent="amber">
          <p>Deux produits qui portent exactement le même nom n&apos;ont leurs ingrédients en commun qu&apos;à</p>
          <p className="my-2 text-center text-5xl font-bold text-amber">F1 0,58</p>
          <p className="text-center text-sm text-ink-soft">présence seule, sans ordre ni % ; ordre des ingrédients communs : τ 0,83 (2 867 paires)</p>
          <p className="mt-4 font-bold text-navy">Exemple réel : « Madeleines coquilles »</p>
          <p className="mt-1 text-sm">A : farine de blé, beurre 23 %, œufs 20 %, sucre, sirop de sucre inverti, sirop de glucose…</p>
          <p className="mt-1 text-sm">B : farine de blé, sucre, huile de colza, œufs 14 %, stabilisant, émulsifiant, dextrose…</p>
          <p className="mt-2 text-sm font-bold">→ F1 0,48 : l&apos;un est pur beurre, l&apos;autre à l&apos;huile. Le nom ne le dit pas ; aucun modèle ne peut le deviner.</p>
        </Carte>
      </div>
    </Ecran>
  );
}

export function TacheLlm() {
  return (
    <Ecran id="tache" n="07" kicker="Le LLM" titre="La tâche confiée au LLM : du brief à l'étiquette">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Exemple titre="Entrée (prompt)" mono>Produit : Madeleines pur beurre<br />Catégorie : madeleines<br />Cahier des charges : sans huile de palme ; Nutri-Score E</Exemple>
          <p className="text-center text-2xl text-amber">↓</p>
          <Exemple titre="Sortie générée (modèle 0,5B fine-tuné)" mono>wheat-flour 32% | sugar | butterfat 18% | egg 16% | stabiliser | glucose-fructose-syrup | raising-agent | e500 | salt | flavouring</Exemple>
          <p className="text-sm text-ink-soft italic">Étiquette réelle : farine de blé, beurre concentré, sucre, œufs, sirop de glucose, stabilisant, poudres à lever, sirop de sucre inverti, sel, arôme.</p>
          <p className="text-[15px]">Format : identifiants de la taxonomie Open Food Facts, ordre décroissant, QUID quand il est déclaré.</p>
        </div>
        <Carte titre="Construire le cahier des charges">
          <p>Les produits du marché n&apos;ont pas de cahier des charges : je le reconstruis à partir de leurs propres attributs — vegan ou végétarien,
            sans huile de palme, sans lait / œufs / soja / fruits à coque / gluten, sans additifs, Nutri-Score. 0 à 3 critères tirés au hasard.</p>
          <p className="mt-3 font-bold text-navy">Exemple réel — « Madeleines coquilles »</p>
          <p className="mt-1 text-sm">Open Food Facts : sans huile de palme <Ok /> · allergènes œufs, gluten, lait · traces fruits à coque, soja · non vegan · Nutri-Score E</p>
          <p className="mt-1 text-sm">Critères possibles : « sans huile de palme », « Nutri-Score E » → tirage : <b>« sans huile de palme ; Nutri-Score E »</b></p>
          <p className="mt-4 font-bold text-navy">Piège : la vraie recette respecte toujours déjà son cahier des charges. Il faut donc un test où ce n&apos;est pas le cas : les contrefactuels.</p>
        </Carte>
      </div>
    </Ecran>
  );
}

export function Lora() {
  const c = courbes as unknown as Record<string, { eval: Pts }>;
  return (
    <Ecran id="lora" n="08" kicker="Fine-tuning" titre="Fine-tuning LoRA d'un petit décodeur, sur un seul GPU">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Carte titre="La recette (cours module 7)" accent="blue"><Puces items={[
            "Qwen2.5-0.5B puis 1,5B-Instruct, format chat.",
            "LoRA r = 16 sur l'attention et le MLP : 8,8 M paramètres entraînés (1,7 %) pour le 0,5B.",
            "Perte calculée sur la réponse seulement (le prompt est masqué).",
            "2 époques, lr 2·10⁻⁴, sélection sur la perte de validation.",
            "Google Colab : 1 h 54 sur T4 (0,5B), 1 h 51 sur L4 (1,5B).",
          ]} /></Carte>
          <Exemple titre="Un des 31 642 exemples d'apprentissage (prompt → réponse)" mono>
            Produit : Fruity flapjack cookies gluten free<br />Catégorie : biscuits secs<br />Cahier des charges : sans soja ; sans gluten<br />
            → oat-flakes 16% | raisin 11% | golden-syrup | dried-apricots | tapioca | corn-flour | salt | …
          </Exemple>
        </div>
        <div className="flex flex-col gap-3">
          <Courbes titre="Perte de validation selon l'époque" xmax={2.05} ymin={0.78} ymax={1.16} series={[
            { nom: "Qwen 0,5B", points: unique(c["0.5B"].eval), couleur: "#0228b5" },
            { nom: "Qwen 1,5B", points: unique(c["1.5B"].eval), couleur: "#f59701" },
            { nom: "0,5B sans cahier (ablation)", points: unique(c["sans"].eval), couleur: "#b8b0a0" },
          ]} />
          <p className="text-sm text-ink-soft italic">La perte baisse régulièrement, sans surapprentissage ; le 1,5B apprend un peu mieux (0,82 contre 0,86).</p>
          <p className="text-sm font-bold text-navy">Échelle du cours : zero-shot → few-shot → RAG → LoRA, ne monter d&apos;un cran que si l&apos;évaluation le justifie.</p>
        </div>
      </div>
    </Ecran>
  );
}

export function Evaluation() {
  return (
    <Ecran id="evaluation" n="09" kicker="Évaluation" titre="Mesurer la liste, vérifier le cahier des charges">
      <div className="grid gap-4 md:grid-cols-3">
        <Carte num="1" titre="La liste d'ingrédients" accent="blue"><Puces items={["Précision, rappel, F1 sur l'ensemble des ingrédients.", "τ de Kendall sur l'ordre.", "Erreur absolue sur les QUID déclarés.", "Format valide, identifiants hors taxonomie."]} /></Carte>
        <Carte num="2" titre="Vérificateurs déterministes" accent="ok"><Puces items={["Allergènes : carte ingrédient → allergène apprise sur l'apprentissage.", "Vegan, huile de palme : drapeaux Open Food Facts ; additifs : E-numéros.", "Taux de critères respectés."]} /></Carte>
        <Carte num="3" titre="Contrefactuels" accent="amber"><Puces items={["1 350 cas : un produit du test + un critère que sa vraie recette viole.", "Succès = critère respecté ET liste encore proche du produit (F1 ≥ 0,4)."]} /></Carte>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[3fr_2fr]">
        <Exemple titre="Exemple réel de vérification automatique" mono>
          Pain d&apos;épices pur miel — cahier des charges : sans lait<br />
          Réponse (Qwen 0,5B) : miel 50 %, farine de seigle, farine de blé, œufs, <b>beurre</b>, épices, poudres à lever…<br /><br />
          beurre → contient du lait (carte apprise : 100 % des produits avec du beurre déclarent l&apos;allergène lait)<br />
          → critère « sans lait » : NON respecté <Ko />
        </Exemple>
        <Carte titre="Ablation et statistiques" fond="soft">
          <p>Même modèle entraîné sans la ligne « cahier des charges » : ce qui change mesure ce qu&apos;il apporte.</p>
          <p className="mt-2">Intervalles bootstrap à 95 %, comparaisons appariées, test de McNemar (TP du module 7).</p>
        </Carte>
      </div>
    </Ecran>
  );
}

export function Contrefactuel() {
  return (
    <Ecran id="contrefactuel" n="10" kicker="Évaluation" titre="Un contrefactuel pas à pas : des brownies « sans œufs »">
      <Exemple titre="1. Un produit réel du jeu de test et une contrainte qu'il ne respecte pas">
        <b>Mini Brownies Noix de Pécan</b> (brownies &amp; muffins) — vraie recette : <b>ŒUFS</b>, chocolat 26 %, sucre, beurre concentré, farine de blé,
        noix de pécan 8 %, stabilisant, arôme naturel, poudres à lever, carbonates de sodium, sel → on impose « sans œufs », que la recette viole.
      </Exemple>
      <h3 className="mt-5 font-bold text-navy">2. Chaque méthode génère sa recette ; on vérifie deux conditions</h3>
      <div className="mt-3">
        <Tableau entetes={["Méthode", "Liste générée (extrait)", "Sans œufs ?", "F1 vs vraie recette", "Verdict"]} fortes={[0]} lignes={[
          ["Qwen 0,5B LoRA", "sucre, huile de colza, chocolat 12 %, farine de blé, noix de pécan 8 %, stabilisant, cacao, émulsifiant…", <><Ok /> oui</>, "0,70 ≥ 0,4 ✓", <Verdict key="v" v="RÉUSSI" />],
          ["LoRA sans cahier (ablation)", "sucre, blanc d'œuf, farine de blé 16 %, beurre concentré 14 %, noix de pécan 8 %…", <><Ko /> blanc d&apos;œuf</>, "0,70", <Verdict key="v" v="échec" />],
          ["Chaîne supervisée", "sucre 28,8 %, sucre roux 16 %, œufs 15,8 %, farine 13,8 %, noix de coco 11,7 %…", <><Ko /> œufs</>, "0,50", <Verdict key="v" v="échec" />],
          ["Qwen 0,5B zero-shot", "beurre, sucre, farine, cacao, vanille, muscade, jus de citron, miel, œufs, lait…", <><Ko /> œufs</>, "0,36", <Verdict key="v" v="échec" />],
        ]} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Carte titre="3. Le LoRA a vraiment reformulé" accent="ok">Il retire les œufs ET remplace le beurre par de l&apos;huile de colza et un émulsifiant (qui remplace le liant de l&apos;œuf), en gardant le brownie : chocolat, noix de pécan, farine.</Carte>
        <Carte titre="Pourquoi exiger aussi F1 ≥ 0,4 ?" accent="amber" fond="soft">« Apple Pie Flavored Cookies », sans huile de palme : le zero-shot répond « apple-pie-flavored-cookies-0-5-chocolate-chips ». Pas d&apos;huile de palme <Ok />… mais F1 0,00 : échec.</Carte>
      </div>
    </Ecran>
  );
}
