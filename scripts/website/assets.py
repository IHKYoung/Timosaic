from pathlib import Path
from PIL import Image
import shutil
r=Path.cwd(); out=r/'website/assets'; src=r/'Timosaic/Resources/Assets.xcassets'
for source,name,width in [(src/'AppIcon.appiconset/AppIcon.png','icon',192),(src/'JournalBranch.imageset/branch.png','branch',700),(src/'JournalChamomile.imageset/art.png','chamomile',500),(src/'JournalSweetPea.imageset/art.png','sweetpea',500)]:
 im=Image.open(source); im.thumbnail((width,width)); im.save(out/(name+'.webp'),'WEBP',quality=88)
for slug in ['today','calendar','memo','composition']:
 for lang in ['zh-Hans','en']:
  n={'today':'01','calendar':'03','memo':'04','composition':'05'}[slug]
  im=Image.open(r/f'store/raw/iphone/{n}-{lang}-{slug}.png'); im.thumbnail((660,1434)); im.save(out/f'{slug}-{lang}.webp','WEBP',quality=86)
license_text=(r/'Timosaic/Resources/Fonts/OFL-License.txt').read_text()
license_text=license_text[license_text.index('SIL OPEN FONT LICENSE Version'):]
(out/'OFL-License.txt').write_text('Copyright 2021-2024 LXGW (https://github.com/lxgw/LxgwWenKai-Screen)\nCopyright 2020 The Klee Project Authors (https://github.com/fontworks-fonts/Klee)\n\n'+license_text.strip()+'\n')
shutil.copy(r/'Timosaic/Resources/Fonts/LXGW-Attribution.txt',out/'LXGW-Attribution.txt')
