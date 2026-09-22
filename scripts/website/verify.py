from pathlib import Path
from html.parser import HTMLParser
import json
root=Path(__file__).resolve().parents[2]; site=root/'website'; checks=0
class Page(HTMLParser):
 def handle_starttag(self,tag,attrs):
  global checks
  a=dict(attrs)
  for key in ['src','href']:
   v=a.get(key,'')
   if v.startswith('/') and not v.startswith('//'):
    target=site/v.split('#')[0].lstrip('/')
    if v.endswith('/'): target=target/'index.html'
    assert target.exists(),(self.filename,v)
    checks+=1
for p in site.rglob('*.html'):
 parser=Page();parser.filename=str(p);parser.feed(p.read_text())
 assert '<h1>' in p.read_text(),p
for locale in ['zh-Hans','en']:
 d=json.loads((root/f'store/metadata/{locale}.json').read_text());assert len(d['keywords'])==99
 assert d['appleID']=='6812809147';checks+=2
assert (site/'assets/wenkai.woff2').stat().st_size < 200000
assert not (site/'assets/wenkai.ttf').exists()
assert len(list(site.rglob('*.html')))==5
print(f'PASS: {checks} local links and metadata checks; 5 pages; font <200KB')
