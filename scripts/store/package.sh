#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/../../store"
# A fresh archive avoids retaining renamed files from an older edition.
python3 - <<'PY'
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path.cwd()
files=[root/n for n in ['index.html','README.md','SOURCES.md','manifest.json','validation.json']]
for directory in ['screenshots','metadata','overview','assets','raw','evidence']:
    files += sorted(p for p in (root/directory).rglob('*') if p.is_file() and not p.name.startswith('.'))
with ZipFile(root/'timosaic-store-assets.zip','w',ZIP_DEFLATED) as archive:
    for p in files:
        target=Path('Timosaic-store')/p.relative_to(root)
        if p.name == 'index.html' and p.parent == root:
            html=p.read_text().replace('href="timosaic-store-assets.zip" download', 'href="README.md"').replace('下载素材包 ↗', '使用说明 ↗')
            archive.writestr(str(target),html)
        else:
            archive.write(p,target)
print(f'Packaged {len(files)} files.')
PY
