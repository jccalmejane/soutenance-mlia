import { Carte, Chiffre, Ecran, Exemple, Ko, Ok, Puces, Tableau, Verdict } from "./ui";
import { Barres } from "./graphiques";
import Demonstrateur from "./Demonstrateur";

export function Resultats() {
  return (
    <Ecran id="resultats" n="11" kicker="Résultats" titre="Résultats sur le jeu de test complet" sous="9 603 produits jamais vus, 1 350 contrefactuels — F1 = présence des ingrédients (sans ordre ni %)">
      <Tableau compact fortes={[4, 5, 6]} entetes={["Méthode", "F1 ingrédients", "τ ordre", "MAE QUID (pts)", "Hors taxonomie", "Format valide", "Respect du cahier", "Contrefactuels réussis"]} lignes={[
        ["Qwen 0,5B zero-shot", "0,09", "0,43", "13,6", "26 %", "78 %", "0,93", "0,01"],
        ["Qwen 0,5B few-shot (6 exemples)", "0,15", "0,56", "10,2", "45 %", "99 %", "0,88", "0,04"],
        ["Qwen 0,5B few-shot, 5 plus proches voisins (RAG)", "0,36", "0,73", "5,9", "16 %", "93 %", "0,88", "0,18"],
        ["Chaîne supervisée", "0,49", "0,71", "7,9", "0,1 %", "80 %", "0,87", "0,28"],
        ["Qwen 0,5B LoRA", "0,43", "0,75", "6,9", "0,7 %", "99,5 %", "0,96", "0,33"],
        ["Qwen 1,5B LoRA", "0,44", "0,75", "6,5", "0,3 %", "99,4 %", "0,97", "0,33"],
        ["Qwen 0,5B LoRA + augmentation ciblée", "0,43", "0,75", "6,7", "0,4 %", "99,0 %", "0,97", "0,37"],
      ]} />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Chiffre valeur="16 % → 0,7 %" legende="identifiants inventés : du RAG au fine-tuning" couleur="blue" />
        <Chiffre valeur="0,18 → 0,33 → 0,37" legende="contrefactuels réussis : RAG, LoRA, LoRA augmenté" couleur="ok" />
        <Chiffre valeur="− 0,06" legende="F1 du LoRA face à la chaîne supervisée" couleur="amber" />
      </div>
      <div className="mt-5">
        <Exemple titre="Un même brief, cinq méthodes (F1) — « Madeleines au beurre aux œufs frais »" mono>
          zero-shot 0,35 « chocolat 12 %, œufs 30 %… » · few-shot 0,42 · RAG 0,60 · LoRA 0,70 « farine de blé 32 %, sucre, œufs 18 %, beurre 16 %… »<br />
          chaîne supervisée 0,80 — vraie étiquette : farine de blé 31,1 %, sucre, œufs frais 24,5 %, beurre concentré 19,7 %, stabilisant…
        </Exemple>
      </div>
    </Ecran>
  );
}

export function Erreurs() {
  return (
    <Ecran id="erreurs" n="12" kicker="Analyse d'erreurs" titre="Pourquoi le F1 reste autour de 0,4 ?" sous="Qwen 0,5B LoRA, 9 603 produits de test — vrais positifs, faux positifs, faux négatifs">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Chiffre valeur="5,2" legende="justes par produit" couleur="ok" />
            <Chiffre valeur="7,1" legende="en trop" couleur="amber" />
            <Chiffre valeur="7,2" legende="manqués" couleur="ko" />
          </div>
          <p className="text-sm text-ink-soft italic">12,3 ingrédients écrits pour 12,4 attendus : précision 0,42 ≈ rappel 0,42 — pas de biais de longueur.</p>
          <Barres titre="Rappel selon la position dans la vraie liste" max={0.8} hauteur={230}
            categories={["ingrédients 1 à 3", "4 à 6", "7 à 10", "11 et plus"]}
            series={[{ nom: "Qwen 0,5B LoRA", valeurs: [0.59, 0.41, 0.38, 0.31], couleur: "#0228b5" },
                     { nom: "Chaîne supervisée", valeurs: [0.62, 0.45, 0.43, 0.33], couleur: "#b8b0a0" }]} />
        </div>
        <div className="flex flex-col gap-4">
          <Exemple titre="Exemple réel — « Madeleines au beurre aux œufs frais »" mono>
            <Ok /> justes (7) : farine de blé, sucre, beurre concentré, stabilisant, poudres à lever, carbonates de sodium, sel<br />
            ≈ même ingrédient, autre forme (2) : œufs ↔ œufs entiers frais ; sirop de glucose ↔ sirop de glucose-fructose<br />
            <Ko /> en trop (1) : arôme    <Ko /> manqué (1) : amidon de blé<br />
            → F1 strict 0,70 · F1 à l&apos;ingrédient près 0,90
          </Exemple>
          <Tableau compact entetes={["Où sont les erreurs ?", "Part des erreurs", "Précision", "Rappel"]} lignes={[
            ["Additifs (émulsifiants, levants…)", "30 %", "0,25", "0,37"], ["Fruits, noix et divers", "14 %", "0,46", "0,26"],
            ["Matières grasses", "11 %", "0,34", "0,30"], ["Farines et amidons", "11 %", "0,58", "0,47"], ["Sucres · sel", "9 % · 2 %", "0,61 · 0,72", "0,59 · 0,91"],
          ]} />
        </div>
      </div>
      <div className="mt-5">
        <Carte titre="Lecture et pistes" fond="soft">
          15 % des « erreurs » n&apos;en sont pas : bon ingrédient, autre forme ou autre nom (beurre concentré / beurre) — F1 0,42 → 0,51 en les reconnaissant.
          Les autres touchent la queue de liste, les additifs et la matière grasse : des choix de marque. Pistes : regrouper les formes d&apos;un même ingrédient ·
          <a href="#augmentation" className="font-semibold text-blue hover:text-amber-deep"> augmentation ciblée (faite, écran 16)</a> · critère « matière grasse » dans le cahier des charges.
        </Carte>
      </div>
    </Ecran>
  );
}

export function Ablation() {
  return (
    <Ecran id="ablation" n="13" kicker="Ablation" titre="Le modèle lit-il vraiment le cahier des charges ? L'ablation répond oui">
      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-3">
          <Barres titre="Contrefactuels réussis (Qwen 0,5B LoRA)" max={0.6} hauteur={270}
            categories={["sans œufs", "sans lait", "sans additifs", "sans palme", "sans soja", "fruits à coque", "arachides", "sésame", "vegan", "tous"]}
            series={[{ nom: "Entraîné sans cahier des charges", valeurs: [0.19, 0.17, 0.17, 0.37, 0.37, 0.21, 0.28, 0.23, 0.07, 0.23], couleur: "#b8b0a0" },
                     { nom: "Entraîné avec cahier des charges", valeurs: [0.45, 0.34, 0.37, 0.51, 0.46, 0.22, 0.27, 0.23, 0.08, 0.33], couleur: "#0228b5" }]} />
          <p className="text-[15px]">Même qualité de liste (F1 0,42 contre 0,43), mais contrefactuels réussis <b>0,23 → 0,33</b> (McNemar p ≈ 10⁻¹⁵). Les gains portent sur les critères
            qui demandent une vraie substitution ; les allergènes rares sont déjà absents de la plupart des recettes.</p>
        </div>
        <Exemple titre="Mini brownies noix de pécan" mono>
          Recette réelle : œufs, chocolat 26 %, sucre, beurre concentré, farine…<br /><br />
          Sans cahier des charges : sucre, blanc d&apos;œuf, farine 16 %, beurre concentré 14 %, noix de pécan 8 %… <Ko /> œufs<br /><br />
          Avec « sans œufs » : sucre, huile de colza, chocolat 12 %, farine, noix de pécan 8 %, émulsifiant… <Ok />
        </Exemple>
      </div>
    </Ecran>
  );
}

export function Taille() {
  return (
    <Ecran id="taille" n="14" kicker="Taille du modèle" titre="Un modèle trois fois plus gros ? Peu de gain — mais ChatGPT fait bien mieux">
      <div className="grid gap-5 lg:grid-cols-[8fr_5fr]">
        <div className="flex flex-col gap-3">
          <Tableau compact fortes={[4]} largeurs={["27%", "15%", "15%", "25%", "18%"]}
            entetes={["Mesure", "Qwen 0,5B", "Qwen 1,5B", "Écart 1,5B − 0,5B", "ChatGPT*"]} lignes={[
            ["F1 ingrédients", "0,432", "0,439", "+0,007 [+0,005 ; +0,010]", "0,46"],
            ["τ ordre", "0,749", "0,754", "+0,007 [+0,002 ; +0,012]", "0,76"],
            ["MAE QUID (points)", "6,9", "6,5", "−0,4", "5,2"],
            ["Respect du cahier", "0,961", "0,970", "+0,009 [+0,003 ; +0,014]", "0,99"],
            ["Contrefactuels réussis", "0,326", "0,330", "≈ 0", <span key="g" className="text-lg font-bold text-amber-deep">0,51</span>],
            ["Perte de validation finale", "0,862", "0,818", "", "—"],
          ]} />
          <p className="text-xs text-ink-soft">Qwen : LoRA, jeu de test complet ; écart avec IC 95 %. * ChatGPT = GPT-5.5 + 5 voisins, sur 1 000 produits et 300 contrefactuels tirés au hasard (coût par requête). Sur ce même échantillon, le 0,5B fait F1 0,43 et 0,33 de contrefactuels réussis : l&apos;écart tient, +0,18 [+0,12 ; +0,24], McNemar p ≈ 2·10⁻⁸.</p>
          <Exemple titre="Exemple réel — Pain d'épices pur miel, « sans lait »" mono>
            0,5B : miel 50 %, farine de seigle, farine de blé, œufs, beurre, épices… <Ko /> beurre (lait)<br />
            1,5B : farine de seigle 40 %, miel 25 %, sucre, jaunes d&apos;œufs en poudre, épices, poudres à lever, sel <Ok />
          </Exemple>
        </div>
        <div className="flex flex-col gap-4">
          <Carte titre="Pourquoi si peu entre 0,5B et 1,5B ?" fond="soft">
            <p>Sur la liste, la limite est l&apos;information du brief : plafond naturel F1 0,58 (deux produits de même nom). LoRA 1,5B : 0,44 · chaîne supervisée : 0,49.</p>
            <p className="mt-2 font-bold text-navy">Grossir un peu le modèle n&apos;apporte pas l&apos;information qui manque.</p>
          </Carte>
          <Carte titre="Mais ChatGPT me bat largement sur les contraintes" accent="amber">
            <p><b>0,51</b> de contrefactuels réussis contre <b>0,33</b> : il connaît les substitutions (vegan 0,45 contre 0,08 pour mon modèle).</p>
            <p className="mt-2">Tripler la taille ne suffit pas : il faut changer d&apos;échelle.</p>
            <p className="mt-2 font-bold text-navy">→ Un modèle ouvert de 9 milliards de paramètres, 18 fois plus gros, en RAG : écran suivant.</p>
          </Carte>
          <Carte titre="Le coût de passer à 1,5B">GPU L4 (24 Go), 18,5 M paramètres entraînés, 111 min. Pour la production, le 0,5B reste le meilleur compromis parmi les petits modèles.</Carte>
        </div>
      </div>
    </Ecran>
  );
}

export function GrandsModeles() {
  return (
    <Ecran id="grands-modeles" n="15" kicker="Comparaison" titre="Et un modèle plus grand ? Qwen3.5-9B ouvert et GPT-5.5 via l'API" sous="1 000 produits et 300 contrefactuels tirés au hasard, toutes les méthodes recalculées sur ces mêmes exemples">
      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-4">
          <Tableau compact fortes={[3, 4]} entetes={["Méthode", "F1", "τ ordre", "Respect du cahier", "Critère imposé respecté", "Contrefactuels réussis"]} lignes={[
            ["Chaîne supervisée", "0,49", "0,71", "0,89", "0,50", "0,27"],
            ["Qwen 0,5B LoRA (local)", "0,43", "0,73", "0,98", "0,71", "0,33"],
            ["Qwen3.5-9B zero-shot (local, L4)", "0,34", "0,63", "0,97", "0,91", "0,20"],
            ["Qwen3.5-9B + 5 voisins (local, L4)", "0,45", "0,74", "0,97", "0,91", "0,46"],
            ["GPT-5.5 + 5 voisins (API)", "0,46", "0,76", "0,99", "0,97", "0,51"],
          ]} />
          <Puces items={[
            "Sans voisins, le 9B ne connaît pas la taxonomie (F1 0,34) ; avec les 5 voisins, il rejoint le haut du tableau (0,45).",
            "Le 9B ouvert approche GPT-5.5 sur les contraintes (0,46 contre 0,51, écart non significatif) et bat le petit LoRA (+0,13, p ≈ 3·10⁻⁵).",
            "Les substitutions viennent de la taille du modèle ; la taxonomie vient du fine-tuning ou des voisins.",
            "Le 9B tient sur une GPU de 24 Go : pas de coût par requête, pas de recette envoyée à un tiers.",
            <b key="s" className="text-navy">Et si le grand modèle enseignait les substitutions au petit ? → écran suivant</b>,
          ]} />
        </div>
        <Exemple titre="Tarte normande — contrainte : vegan" mono>
          Recette réelle : pommes 44 %, farine, sucre, beurre, eau, œufs, lait écrémé en poudre…<br /><br />
          Qwen 0,5B LoRA : farine 26 %, eau, margarine végétale, sucre, œufs… <Ko /> œufs<br /><br />
          Qwen3.5-9B + 5 voisins : pommes 55 %, farine, sucre, huile végétale, eau, sel, émulsifiant… <Ok /><br /><br />
          GPT-5.5 + 5 voisins : pommes 45 %, farine, sucre, eau, margarine végétale, crème de soja, huile de colza… <Ok />
        </Exemple>
      </div>
    </Ecran>
  );
}

export function Augmentation() {
  const etapes = [
    ["Candidats", "800 produits d'apprentissage par critère (vegan, sans lait, sans œufs) dont la recette viole le critère. Jamais de test."],
    ["GPT-5.5 réécrit", "Substitution minimale : beurre → margarine végétale, lait → boisson végétale. 2 400 requêtes, ≈ 34 $."],
    ["Vérificateurs filtrent", "Critère respecté, liste proche de l'origine (F1 ≥ 0,4), format, taxonomie : 1 900 gardés (79 %)."],
    ["Réentraînement", "LoRA 0,5B, mêmes réglages ; exemples ajoutés deux fois (+12 % de données)."],
  ];
  return (
    <Ecran id="augmentation" n="16" kicker="Remède" titre="Augmentation ciblée : le grand modèle enseigne au petit" sous="Exemples de substitution écrits par GPT-5.5, filtrés par mes vérificateurs, ajoutés à l'entraînement du Qwen 0,5B">
      <div className="grid gap-3 md:grid-cols-4">
        {etapes.map(([t, d], k) => (
          <div key={t} className="rounded-2xl border border-line bg-paper p-4">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-bright to-amber text-sm font-bold text-navy-deep">{k + 1}</span>
            <h3 className="mt-2 font-bold text-navy">{t}</h3>
            <p className="mt-1 text-sm leading-snug">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Barres titre="Contrefactuels réussis (1 350) — vegan p < 10⁻⁴, tous critères p = 0,001" max={0.6} hauteur={250}
          categories={["vegan", "sans lait", "sans œufs", "6 autres critères", "tous"]}
          series={[{ nom: "Qwen 0,5B LoRA", valeurs: [0.08, 0.34, 0.45, 0.34, 0.33], couleur: "#b8b0a0" },
                   { nom: "+ augmentation ciblée", valeurs: [0.39, 0.41, 0.47, 0.34, 0.37], couleur: "#1b8f5a" }]} />
        <div className="flex flex-col gap-4">
          <Exemple titre="Exemples réels" mono>
            Apprentissage — Crêpes bretonnes, « vegan » :<br />
            réel    : farine 38 %, lait 30 %, sucre, œufs, huile…<br />
            GPT-5.5 : farine 38 %, boisson à l&apos;avoine 30 %, sucre, protéines de pois, huile… <Ok /> gardé<br /><br />
            Test — « 8 crêpes sucrées », « vegan » :<br />
            avant : lait, farine, sucre, œufs, beurre… <Ko /><br />
            après : farine, sucre, protéines de pois, margarine végétale, eau… <Ok />
          </Exemple>
          <Carte titre="Sans régression, mais un tic importé" accent="amber">F1 test inchangé (0,43). GPT-5.5 met de la protéine de pois dans 69 % des exemples : le petit modèle l&apos;écrit ensuite dans 184 produits de test, dont 1 seul en contient.</Carte>
        </div>
      </div>
    </Ecran>
  );
}

export function Exemples() {
  return (
    <Ecran id="exemples" n="17" kicker="Qualitatif" titre="Des sorties crédibles, lisibles comme une étiquette">
      <Tableau compact entetes={["Brief et cahier des charges", "Qwen 0,5B zero-shot", "Qwen 0,5B LoRA", "Étiquette réelle"]} largeurs={["20%", "22%", "30%", "28%"]} lignes={[
        [<>Sablés géants au beurre<br /><span className="font-normal text-ink-soft">végétarien ; sans soja</span></>, "beef-flour, sel, beurre, sucre, paprika, poudre d'amande, beurre-de-savon…",
          "farine de blé 50 %, sucre, beurre concentré 23 %, œufs, sel, poudres à lever, diphosphates, lait écrémé en poudre", "farine de blé, sucre, beurre concentré 22 %, œufs, sel, caramel, poudres à lever"],
        [<>Madeleines au beurre aux œufs frais<br /><span className="font-normal text-ink-soft">Nutri-Score E</span></>, "chocolat 12 %, œufs 30 %, farine 50 %, sucre 10 %, beurre 10 %…",
          "farine de blé 32 %, sucre, œufs 18 %, beurre concentré 16 %, sirop de glucose, stabilisant, poudres à lever, carbonates de sodium, sel, arôme",
          "farine de blé 31,1 %, sucre, œufs frais 24,5 %, beurre concentré 19,7 %, stabilisant, sirop de glucose-fructose, poudres à lever, carbonates de sodium, sel"],
        [<>Cookies minis<br /><span className="font-normal text-ink-soft">sans œufs ; Nutri-Score E</span></>, "chocolat 0,5 %",
          "farine de blé 38 %, pépites de chocolat 25 %, huile de palme, sucre, diphosphate disodique, carbonates de sodium, sel, arôme",
          "farine de blé, huile de palme, sucre, pépites de chocolat 16 %, lactosérum en poudre, sirop de sucre inverti, poudres à lever, sel, arôme"],
      ]} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Carte titre="Ce que le modèle sait" accent="ok">La structure (farine, sucre, matière grasse, œufs, levants), l&apos;ingrédient mis en avant avec un QUID plausible, les additifs typiques de la famille.</Carte>
        <Carte titre="Ce qu'il ne peut pas savoir" accent="amber">Les choix propres à une marque (caramel, sirop inverti) — c&apos;est ce que le formulateur ajuste, et ce que mesure le plafond naturel.</Carte>
      </div>
    </Ecran>
  );
}

export function ProblemeInverse() {
  return (
    <Ecran id="probleme-inverse" n="18" kicker="Matières premières" titre="Des ingrédients aux matières premières : un problème inverse">
      <div className="grid gap-4 md:grid-cols-2">
        <Carte titre="Un problème sous-déterminé : exemple réel" fond="soft">
          <p>« farine de blé » → 11 références : T45 0,60 €/kg · T55 0,55 · T65 0,58 · T55 bio 0,95 · T55 halal 0,60 · gruau 0,72…</p>
          <p className="mt-2">« pépites de chocolat » → 7 références : lécithine de soja 6,20 · de tournesol 6,40 · bio 9,50 · halal 6,50…</p>
          <p className="mt-2">Le coût et le cahier des charges tranchent (sans soja → tournesol, halal → T55 halal) ; les ambiguïtés restantes sont rendues comme alternatives.</p>
        </Carte>
        <Carte titre="Programme quadratique convexe (cvxpy)" accent="blue"><Puces items={[
          "Variables : quantités de MP en % de pâte ; somme = 100 ; l'eau est une MP.",
          "Objectif : fidélité à la composition visée + coût − préférence pour les composites.",
          "Contraintes : allégations, allergènes, bio 95 %, ordre INCO, plafonds, cibles nutritionnelles, Nutri-Score.",
        ]} /></Carte>
      </div>
      <div className="mt-5">
        <Tableau entetes={["Validation sur les 50 produits Crumble-AI", "Précision MP", "Rappel MP", "Masse mal placée", "Lettre Nutri-Score identique"]} lignes={[
          ["1. Recette visée exacte, solveur aveugle", "0,83", "0,87", "7,6 %", "96 %"],
          ["2. + composites lus sur l'étiquette", "0,95", "0,95", "0,5 %", "98 %"],
          ["3. Bout en bout depuis le seul nom (chaîne supervisée)", "0,45", "0,54", "25 %", "70 %"],
        ]} />
      </div>
      <p className="mt-4 text-[15px]">Le solveur retrouve les recettes réelles et leur coût ; l&apos;écart entre les niveaux 2 et 3 est l&apos;erreur de la prédiction amont — celle que le cahier des charges et le LLM doivent réduire.</p>
    </Ecran>
  );
}

export function SolveurCahier() {
  return (
    <Ecran id="solveur" n="19" kicker="Solveur" titre="Le cahier des charges agit aussi dans le solveur, par contraintes explicables">
      <Tableau entetes={["Scénario (madeleine aux pépites)", "Verdict", "Coût €/kg", "Nutri-Score", "Ce que le solveur explique"]} largeurs={["26%", "10%", "10%", "12%", "42%"]} lignes={[
        ["Référence (sans huile de palme)", <Verdict key="v" v="oui" />, "2,04", "E (27)", "12 MP, pépites soja, huile de colza"],
        ["Sel ≤ 0,8 g / 100 g", <Verdict key="v" v="oui" />, "2,06", "E (22)", "sel 1,85 → 0,81 : 5 points gagnés"],
        ["Bio (règle des 95 %)", <Verdict key="v" v="partiel" />, "3,10", "E (29)", "pas d'huile de colza bio : 5 % tolérés, ingrédient signalé"],
        ["Sans soja, traces tolérées", <Verdict key="v" v="partiel" />, "2,02", "E (27)", "pépites lécithine de soja → pépites lécithine de tournesol"],
        ["Sans soja strict", <Verdict key="v" v="NON" />, "—", "—", "traces de soja sur toutes les farines : infaisable, motivé"],
        ["Halal certifié", <Verdict key="v" v="NON" />, "—", "—", "pas d'huile, de sel ni de poudre à lever certifiés"],
        ["Nutri-Score D visé", <Verdict key="v" v="partiel" />, "1,95", "E (21)", "sel, sucres, AGS réduits jusqu'au garde-fou"],
      ]} />
      <p className="mt-5 text-lg font-semibold text-navy">Trois verdicts — oui, partiel, non — toujours motivés. Le solveur ne remplace jamais un ingrédient en silence : il rend la décision au formulateur.</p>
    </Ecran>
  );
}

export function Demo() {
  return (
    <section id="demo" data-ecran="20" className="ecran min-h-[calc(100vh-4.25rem)] bg-navy-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold text-amber-bright tabular-nums">20</span>
          <div>
            <p className="text-xs font-bold tracking-widest text-amber-bright uppercase">Démonstration en direct</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Du brief à Crumble-AI, par le LLM</h2>
            <p className="mt-1 text-white/70 italic">Brief et cahier des charges saisis en direct → liste du LLM vérifiée → % complétés (modèle 2b, INCO) → solveur → export Crumble-AI</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4 text-sm text-white/85 ring-1 ring-white/10">
            <p className="font-bold text-amber-bright">Tarte aux abricots — vegan</p>
            <p className="mt-2">LoRA de base : abricots 30 %, farine, sucre, <b className="text-white">beurre 12 %, œufs</b>… <span className="font-bold text-red-300">✗ vegan → solveur NON</span></p>
            <p className="mt-2">LoRA augmenté : abricots 32 %, farine, sucre, <b className="text-white">protéines de pois, margarine végétale</b>… <span className="font-bold text-emerald-300">✓ vegan → oui, 2,84 €/kg</span></p>
            <p className="mt-2">Qwen3.5-9B + 5 voisins : abricots 45 %, farine, sucre, huile de colza, margarine… <span className="font-bold text-emerald-300">✓ → oui, 2,55 €/kg</span></p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-sm text-white/85 ring-1 ring-white/10">
            <p className="font-bold text-amber-bright">Trois modèles au choix</p>
            <Puces className="mt-2 text-white/85" items={[
              "LoRA 0,5B de base et LoRA augmenté : en direct sur le processeur, ≈ 5 s, n'importe quel brief.",
              "Qwen3.5-9B + 5 voisins : 34 demandes préparées sur GPU L4 et rejouées ; vérification et solveur en direct.",
            ]} />
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-sm text-white/85 ring-1 ring-white/10">
            <p className="font-bold text-amber-bright">Enchaînement conseillé</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Madeleine aux pépites — sans huile de palme</li>
              <li>Tarte aux abricots vegan : base, augmenté, 9B</li>
              <li>Biscuit protéiné — sans lait, Nutri-Score C</li>
              <li>Bonus : halal, bio, sans soja strict</li>
            </ol>
          </div>
        </div>
        <div id="demo-live" className="ecran mt-6"><Demonstrateur /></div>
      </div>
    </section>
  );
}
