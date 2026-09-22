const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {createRequire}=require('node:module');
const deps=createRequire(path.join(process.env.CODEX_NODE_MODULES||path.join(process.env.HOME,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'),'../package.json'));
const {chromium}=deps('playwright'),sharp=deps('sharp');
const out=path.resolve(__dirname,'../../store');
const report={checkedAt:new Date().toISOString(),checks:[],failures:[]};
function check(name,ok){assert.ok(ok,name);report.checks.push(name)}
async function main(){
 const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'))),validation=JSON.parse(fs.readFileSync(path.join(out,'validation.json')));
 check('24 final screenshots',manifest.images.length===24);
 check('No poster layout collisions or text overflow',validation.layoutIssues.length===0);
 for(const item of manifest.images){const full=path.join(out,item.file),m=await sharp(full).metadata(),raw=await sharp(path.join(out,item.source)).metadata();
  check(item.file+' dimensions, RGB, no alpha',m.width===item.width&&m.height===item.height&&m.space==='srgb'&&!m.hasAlpha);
  check(item.file+' authentic raw source dimensions',raw.width===m.width&&raw.height===m.height);
  check(item.file+' SHA-256 unchanged',crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')===item.sha256);
 }
 for(const d of ['iphone','ipad']){const s=JSON.parse(fs.readFileSync(path.join(out,'raw',d,'test-summary.json')));check(d+' capture run: at least 2 passed, no failures or skipped tests',s.passedTests>=2&&s.failedTests===0&&s.skippedTests===0&&s.totalTestCount===s.passedTests)}
 for(const [locale,fields] of Object.entries(validation.metadata))for(const [k,c] of Object.entries(fields))check(locale+' '+k+' fits App Store limit',c.count<=c.limit);
 const server=http.createServer((req,res)=>{let p=path.resolve(out,'.'+decodeURIComponent((req.url||'/').split('?')[0]));if(p===out)p=path.join(out,'index.html');if(!p.startsWith(out+path.sep)){res.writeHead(403).end();return}try{const types={'.html':'text/html; charset=utf-8','.png':'image/png','.json':'application/json','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.zip':'application/zip'};const body=fs.readFileSync(p);res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(body)}catch{res.writeHead(404).end()}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:1100},permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
  fs.mkdirSync(path.join(out,'evidence'),{recursive:true});
  await page.screenshot({path:path.join(out,'evidence/gallery-desktop.png'),fullPage:false});
  for(const locale of ['zh-Hans','en'])for(const device of ['iphone','ipad']){
   await page.locator(`[data-lang="${locale}"]`).click();await page.locator(`[data-device="${device}"]`).click();
   await page.waitForFunction(()=>[...document.querySelectorAll('.shot img')].every(i=>i.complete&&i.naturalWidth>0));
   check(`Gallery ${locale}/${device}: six real images`,await page.locator('.shot img').count()===6);
   check(`Gallery ${locale}/${device}: correct file`,(await page.locator('.shot img').first().getAttribute('src')).includes(`/${device}/${locale}/`));
   await page.locator('[data-image="0"]').click();check('Image lightbox opened',await page.locator('#viewer').evaluate(e=>e.open));await page.keyboard.press('ArrowRight');check('Keyboard next image works',(await page.locator('#full').getAttribute('src')).includes('/02-'));await page.keyboard.press('Escape');
  }
  await page.locator('[data-copy="title"]').click();const copied=await page.evaluate(()=>navigator.clipboard.readText());const en=JSON.parse(fs.readFileSync(path.join(out,'metadata/en.json')));check('Copy button copies exact English title',copied===en.title);
  await page.locator('[data-lang="zh-Hans"]').click();await page.locator('[data-copy="description"]').click();const zh=JSON.parse(fs.readFileSync(path.join(out,'metadata/zh-Hans.json')));check('Copy button preserves Chinese paragraphs',(await page.evaluate(()=>navigator.clipboard.readText()))===zh.description);
  const hrefs=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(e=>e.getAttribute('href')).filter(s=>!s.startsWith('#')));
  for(const href of hrefs){check('Local gallery link resolves: '+href,fs.existsSync(path.join(out,href)))}
  await page.locator('[data-device="iphone"]').click();await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));
  check('Mobile gallery has no horizontal overflow',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));await page.screenshot({path:path.join(out,'evidence/gallery-mobile.png'),fullPage:false});
  check('No browser JavaScript errors',errors.length===0);
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r))}
 fs.writeFileSync(path.join(out,'evidence/verification.json'),JSON.stringify(report,null,2)+'\n');console.log(`${report.checks.length} checks passed.`);
}
main().catch(e=>{report.failures.push(e.stack);fs.mkdirSync(path.join(out,'evidence'),{recursive:true});fs.writeFileSync(path.join(out,'evidence/verification.json'),JSON.stringify(report,null,2)+'\n');console.error(e);process.exitCode=1});
