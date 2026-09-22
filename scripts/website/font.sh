#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
mkdir -p build/website-font
python3 - <<'PY'
from pathlib import Path
Path('build/website-font/text.txt').write_text(''.join(p.read_text() for p in Path('website').rglob('*.html'))+Path('website/app.js').read_text()+''.join(chr(i) for i in range(32,127)))
PY
hb-subset Timosaic/Resources/Fonts/LXGWWenKaiScreen.ttf --text-file=build/website-font/text.txt --name-IDs='*' --output-file=build/website-font/wenkai.ttf
woff2_compress build/website-font/wenkai.ttf
cp build/website-font/wenkai.woff2 website/assets/wenkai.woff2
