# Site de soutenance — Assistant de formulation prédictive

Mini-site de présentation (remplace le PowerPoint), même charte que le minisite démos Crumble-AI
(`C:\Users\jccal\crumble_demos` : Next.js 16, Tailwind 4, fond crème, bleu nuit, ambre, Segoe UI).

## Le jour J

Double-clic sur `demo/lancer_soutenance.bat` (ou « Lancer la soutenance.bat » dans Projet) : démarre le site ; son serveur (`demo/serveur_site.py`, sans cache navigateur) lance lui-même le démonstrateur (Streamlit, port 8501, affiché dans l'écran 20) et le site
(fichiers statiques de `site/out`, port 3030), puis ouvre http://localhost:3030. Aucun besoin de Node ni d'internet.

Clavier : ← → (ou Page, Espace) écran par écran · Début / Fin · **N** notes de l'orateur · **F** plein écran.
Le bouton « Démonstrateur » et l'écran 21 intègrent l'interface Streamlit ; cliquer hors du cadre pour
reprendre la navigation au clavier.

## Modifier le contenu

- Écrans : `src/components/sections1.tsx` (01-11), `sections2.tsx` (12-21), `sections3.tsx` (22-24, annexes).
- Notes de l'orateur : `src/lib/notes.json`, en puces synthétiques (une liste par écran, clé = numéro de la slide d'origine, voir `page.tsx`). Rédigées pour le site le 07/10 : ne plus les ré-exporter depuis `slides/notes_soutenance.py` ; l'ancienne version en phrases est dans `src/lib/notes_phrases_v1.json`.
- Reconstruire : `cd site` puis `node_modules\.bin\next build` (régénère `site/out`).
- Développement : `node_modules\.bin\next dev -p 3030`.

> Écran 03 (cadrage en trois temps : classique, petit LLM, grand LLM en RAG face à ChatGPT — 05/10) : le texte du site et sa note dans `src/lib/notes.json` sont plus récents que la slide 3 du PowerPoint et que `slides/notes_soutenance.py` ; ne pas ré-exporter notes.json sans reporter cette note.

## En ligne (Vercel, même méthode que le site de l'Union, `UnionRL-www/DEPLOIEMENT.md`)

Ce dossier `site/` est un dépôt git à lui seul, poussé sur le GitHub perso de JC ; Vercel l'importe (projet Next.js,
aucune variable d'environnement) et redéploie à chaque `git push` (~2 min).
- Mettre à jour : modifier, `node_modules\.bin\next build` pour vérifier, puis `git add -A`, `git commit`, `git push`.
- En ligne, l'écran du démonstrateur affiche une explication à la place du cadre : Streamlit et les modèles ne tournent
  que sur le PC (le site ne sonde `localhost:8501` que s'il est lui-même servi depuis localhost).
- Notes de l'orateur et QR code vers le site en ligne (marge gauche des écrans ≥ 1440 px, touche Q en grand) : exclus du build Vercel (`NOTES_ORATEUR`, `VERSION_LOCALE` dans `next.config.ts`), présents en local. QR régénérable : `scripts/qr_site.py`.
- Responsive : testé à 375 px (téléphone), aucun défilement horizontal ; tableaux et graphiques défilent dans leur cadre.
- Le site est masqué des moteurs de recherche (`src/app/robots.ts` + `robots` dans `layout.tsx`) : il se partage par lien.
- Le jour J, garder le site local (`Lancer la soutenance.bat`) : il marche sans internet et intègre le démonstrateur.
