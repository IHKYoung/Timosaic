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
shutil.copy(r/'Timosaic/Resources/Fonts/OFL-License.txt',out/'OFL-License.txt')
shutil.copy(r/'Timosaic/Resources/Fonts/LXGW-Attribution.txt',out/'LXGW-Attribution.txt')
