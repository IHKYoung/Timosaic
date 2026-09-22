const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {createRequire} = require('node:module');
const requireRuntime = createRequire(path.join(process.env.CODEX_NODE_MODULES || path.join(process.env.HOME,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), '../package.json'));
const {chromium} = requireRuntime('playwright');
const sharp = requireRuntime('sharp');
const copy = require('./content.cjs');
const root = path.resolve(__dirname,'../..');
const out = path.join(root,'store');
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data = f => 'data:image/png;base64,' + fs.readFileSync(path.join(out,f)).toString('base64');
const roundedFont = fs.readFileSync(path.join(root,'Timosaic/Resources/Fonts/LXGWZhenKaiGB-Regular.ttf')).toString('base64');
const palettes = {cream:['#f8f5ed','#233f3e','#347c70','#65776e'],mint:['#e0eee5','#234940','#347c70','#59766b'],forest:['#275c54','#fff9e9','#e3caa2','#d1e2d4'],peach:['#faeee2','#4c453e','#956953','#8b7565'],lavender:['#eeeaf3','#393e52','#677694','#787886'],night:['#152e32','#f1ecdd','#a8cab9','#a8bcb6']};
function poster(lang,device,f,i){
 const [bg,ink,accent,muted]=palettes[f.theme], pad=device==='ipad';
 const w=pad?2064:1320,h=pad?2752:2868;
 const raw=`raw/${device}/${String(i+1).padStart(2,'0')}-${lang}-${f.slug}.png`;
 const dark=['forest','night'].includes(f.theme);
 return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
 @font-face{font-family:TimosaicRounded;src:url(data:font/ttf;base64,${roundedFont}) format('truetype');font-weight:100 900}
 *{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}body{background:${bg};color:${ink};font-family:'Avenir Next','TimosaicRounded',sans-serif;-webkit-font-smoothing:antialiased}
 .canvas{position:relative;width:100%;height:100%;isolation:isolate;background:${bg}}
 .brand{position:absolute;left:${pad?126:96}px;top:${pad?66:74}px;display:flex;align-items:center;gap:22px;font-size:${pad?42:34}px;font-weight:600;letter-spacing:1px}
 .brand img{width:${pad?70:64}px;height:${pad?70:64}px;border-radius:17px;box-shadow:0 8px 25px #00000009}
 .edition{position:absolute;top:${pad?88:96}px;right:${pad?130:100}px;font-size:${pad?22:19}px;letter-spacing:4px;color:${muted}}
 .copy{position:absolute;left:${pad?130:96}px;right:${pad?130:96}px;top:${pad?160:195}px;z-index:3}
 .eyebrow{font-size:${pad?25:23}px;letter-spacing:${lang==='en'?4:3}px;font-weight:600;color:${accent};margin-bottom:${pad?22:28}px}
 h1{font-family:${lang==='en'?"'Avenir Next'":"'TimosaicRounded'"},sans-serif;font-size:${pad?(lang==='en'?122:124):(lang==='en'?104:112)}px;line-height:1.18;letter-spacing:${lang==='en'?'-5px':'-4px'};font-weight:600;margin:0}
 h1 span{display:block;white-space:nowrap;width:max-content;max-width:100%}h1 span:last-child{color:${accent}}
 .sub{font-size:${pad?37:33}px;line-height:1.5;letter-spacing:0;white-space:nowrap;color:${muted};margin-top:${pad?22:30}px;width:max-content;max-width:100%}
 .chip{position:absolute;top:635px;left:99px;display:flex;gap:14px;align-items:center;color:${accent};font-size:24px;letter-spacing:1px}
 .chip::before{content:'';height:10px;width:10px;border-radius:3px;background:${accent}}
 .device{position:absolute;z-index:2;left:50%;top:${pad?640:742}px;transform:translateX(-50%);width:${pad?1500:918}px;padding:${pad?17:12}px;background:${dark?'#17292a':'#354544'};border:3px solid ${dark?'#88a297':'#62706a'};border-radius:${pad?61:115}px;box-shadow:0 48px 95px ${dark?'#07181750':'#294d3929'},0 5px 9px #1429222a}
 .screen{overflow:hidden;border-radius:${pad?42:98}px;line-height:0;position:relative}.screen img{width:100%;height:auto;display:block}
 .island{position:absolute;width:25.5%;height:2.65%;background:#090b0b;left:37.25%;top:1.42%;border-radius:50px;display:none}
 .garden{position:absolute;display:flex;justify-content:space-between;align-items:flex-end;width:${pad?600:1320}px;height:${pad?350:480}px;${pad?'right:45px;top:180px':'left:0;bottom:105px'};opacity:${dark?0.22:0.42};z-index:0}.garden img{width:30%;height:100%;object-fit:contain}.garden img:first-child{transform:rotate(-14deg)}.garden img:last-child{transform:rotate(12deg)}
 .sprig{position:absolute;width:${pad?230:230}px;height:auto;right:${pad?-18:-63}px;top:${pad?1160:1350}px;transform:rotate(-26deg);opacity:${dark?0.34:0.57};z-index:0}
 .wash{position:absolute;width:${pad?1570:1190}px;height:${pad?1600:1700}px;left:50%;top:${pad?830:1030}px;transform:translateX(-50%);border-radius:50% 50% 30% 30%;background:${dark?'#73978414':'#ffffff45'};z-index:0}
 .footer{position:absolute;bottom:${pad?37:44}px;left:${pad?130:98}px;right:${pad?130:98}px;display:flex;justify-content:space-between;align-items:center;color:${muted};font-size:${pad?25:21}px;letter-spacing:3px}
 .footer .count{font-size:20px;letter-spacing:5px}.dots{display:flex;gap:8px}.dots b{height:8px;width:8px;border-radius:2px;background:${accent};opacity:.22}.dots b.on{width:28px;opacity:.9}
 ${pad?'.chip{display:none}':''}
 </style><div class="canvas"><div class="garden">${['sprig','bloom','bud'].map(k=>`<img src="${data('assets/soft-'+k+'.png')}">`).join('')}</div><div class="wash"></div><img class="sprig" src="${data('assets/soft-'+(['sprig','sprig','bud','bloom','sprig','bud'][i])+'.png')}"><div class="brand"><img src="${data('assets/app-icon.png')}">${esc(copy[lang].brand)}</div><div class="edition">${lang==='en'?'SAMPLE JOURNAL':'示例记录'}</div><div class="copy"><div class="eyebrow">${esc(f.eyebrow)}</div><h1>${f.title.map(t=>'<span>'+esc(t)+'</span>').join('')}</h1><div class="sub">${esc(f.sub)}</div></div><div class="chip">${esc(f.chip)}</div><div class="device"><div class="screen"><img src="${data(raw)}"><div class="island"></div></div></div><div class="footer"><span>${pad?esc(f.chip):'TIMOSAIC · '+(lang==='en'?'LIFE, ONE BLOCK AT A TIME':'每一种颜色，都是生活')}</span><span class="dots">${[0,1,2,3,4,5].map(n=>`<b class="${n===i?'on':''}"></b>`).join('')}</span><span class="count">0${i+1} / 06</span></div></div></html>`;
}
function metadata(){
 const dir=path.join(out,'metadata');fs.mkdirSync(dir,{recursive:true});const counts={};
 const limits={title:30,subtitle:30,promotionalText:170,description:4000,keywords:100};
 for(const [lang,c] of Object.entries(copy)){
  const obj=Object.fromEntries(['title','subtitle','promotionalText','keywords','description','whatsNew','reviewNotes'].map(k=>[k,c[k]]));
  Object.assign(obj,{supportURL:'https://timosaic.ahaknow.com/support/',privacyPolicyURL:'https://timosaic.ahaknow.com/privacy/',marketingURL:'https://timosaic.ahaknow.com/',copyright:'',appleID:'6812809147',primaryCategorySuggestion:'Lifestyle',secondaryCategorySuggestion:'Productivity'});
  counts[lang]={};for(const [key,limit] of Object.entries(limits)){const n=[...obj[key]].length;counts[lang][key]={count:n,limit,unit:'characters'};if(n>limit)throw Error(`${lang} ${key}: ${n} > ${limit}`)}
  fs.writeFileSync(path.join(dir,lang+'.json'),JSON.stringify(obj,null,2)+'\n');
  fs.writeFileSync(path.join(dir,lang+'.txt'),Object.entries(obj).map(([k,v])=>`${k}\n${v||'[OWNER INPUT REQUIRED]'}\n`).join('\n'));
  fs.writeFileSync(path.join(dir,'review-'+lang+'.txt'),c.reviewNotes+'\n');
 }
 fs.writeFileSync(path.join(dir,'field-validation.json'),JSON.stringify(counts,null,2)+'\n');return counts;
}
async function main(){
 const counts=metadata();const browser=await chromium.launch({headless:true,channel:'chrome'});const manifest=[];const issues=[];
 try{
  for(const device of ['iphone','ipad'])for(const lang of ['zh-Hans','en']){
   const dest=path.join(out,'screenshots',device,lang);fs.mkdirSync(dest,{recursive:true});
   const pad=device==='ipad',w=pad?2064:1320,h=pad?2752:2868;
   const page=await browser.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
   for(let i=0;i<6;i++){
    const f=copy[lang].frames[i], name=`${String(i+1).padStart(2,'0')}-${f.slug}.png`;
    await page.setContent(poster(lang,device,f,i));await page.evaluate(()=>document.fonts.ready);await page.locator('.screen img').waitFor();
    const bounds=await page.evaluate(()=>{
     const bad=[];for(const e of document.querySelectorAll('h1 span,.sub,.brand,.edition,.footer')){const b=e.getBoundingClientRect();if(b.right>innerWidth-20||b.left<0||e.scrollWidth>e.clientWidth+2)bad.push({text:e.textContent,rect:b.toJSON()})}
     const c=document.querySelector('.copy').getBoundingClientRect(),d=document.querySelector('.device').getBoundingClientRect(),ft=document.querySelector('.footer').getBoundingClientRect();
     if(c.bottom>d.top-15)bad.push({collision:'copy-device',copy:c.bottom,device:d.top});if(d.bottom>ft.top-10)bad.push({collision:'device-footer',device:d.bottom,footer:ft.top});return bad;
    });
    if(bounds.length)issues.push({device,lang,name,bounds});
    const bytes=await page.screenshot({type:'png'});const target=path.join(dest,name);await sharp(bytes).flatten({background:palettes[f.theme][0]}).toColourspace('srgb').removeAlpha().png().toFile(target);
    const info=await sharp(target).metadata();if(info.width!==w||info.height!==h||info.hasAlpha)throw Error('Invalid image '+target);
    manifest.push({file:path.relative(out,target),width:info.width,height:info.height,hasAlpha:info.hasAlpha,sha256:crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex'),source:`raw/${device}/${String(i+1).padStart(2,'0')}-${lang}-${f.slug}.png`,headline:f.title.join(' ')});
   }
   await page.close();
   // Contact sheets are review aids, never upload files.
   const tw=pad?344:264,th=Math.round(tw*h/w),gap=18;
   const sheet=sharp({create:{width:tw*6+gap*7,height:th+gap*2,channels:3,background:'#dfdfd8'}});
   const items=await Promise.all(copy[lang].frames.map(async(f,i)=>({input:await sharp(path.join(dest,`${String(i+1).padStart(2,'0')}-${f.slug}.png`)).resize(tw,th).toBuffer(),left:gap+i*(tw+gap),top:gap})));
   fs.mkdirSync(path.join(out,'overview'),{recursive:true});await sheet.composite(items).png().toFile(path.join(out,'overview',`${device}-${lang}.png`));
  }
 }finally{await browser.close()}
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({generatedAt:new Date().toISOString(),locales:['zh-Hans','en'],images:manifest},null,2)+'\n');
 fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify({imageCount:manifest.length,metadata:counts,layoutIssues:issues},null,2)+'\n');
 if(issues.length)throw Error('Layout issues: '+JSON.stringify(issues));console.log(`Validated ${manifest.length} RGB screenshots and both metadata sets.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
