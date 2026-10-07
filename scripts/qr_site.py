"""QR code du site en ligne, affiché dans la marge gauche de la présentation (public/img/qr-site.svg).
Usage : .venv/Scripts/python site/scripts/qr_site.py   (bibliothèque segno)
"""
from pathlib import Path

import segno

URL = "https://soutenance-mlia.vercel.app"
sortie = Path(__file__).resolve().parents[1] / "public" / "img" / "qr-site.svg"
segno.make(URL, error="m").save(str(sortie), kind="svg", scale=1, border=2, dark="#021560", light="#ffffff", xmldecl=False, svgns=True)
# viewBox pour que l'image s'agrandisse sans flou (segno n'en met pas), bords nets
svg = sortie.read_text(encoding="utf-8")
n = svg.split('width="', 1)[1].split('"', 1)[0]
svg = svg.replace(f'width="{n}" height="{n}"', f'viewBox="0 0 {n} {n}" width="{n}" height="{n}" shape-rendering="crispEdges"', 1)
sortie.write_text(svg, encoding="utf-8")
print("OK ->", sortie)
