'use strict';
const grid=document.querySelector('.paint-grid');
if(grid){
 const en=document.documentElement.lang==='en';
 let selected=0,painting=false,last=-1,old=null,history=[],values=Array(96).fill(null);
 const initial={28:0,29:0,30:0,31:0,36:1,37:1,38:1,44:2,45:2,46:2,55:6,56:6,57:6,64:7,65:7};
 Object.entries(initial).forEach(([i,c])=>values[i]=c);
 const buttons=values.map((_,i)=>{const b=document.createElement('button');b.type='button';b.dataset.index=i;b.setAttribute('aria-label',`${String(Math.floor(i/4)).padStart(2,'0')}:${String(i%4*15).padStart(2,'0')}`);grid.append(b);return b});
 const render=()=>{buttons.forEach((b,i)=>{b.style.background=values[i]===null?'':`var(--c${values[i]})`;b.setAttribute('aria-pressed',String(values[i]!==null))});document.querySelector('#undo').disabled=!history.length};
 const begin=()=>{old=values.slice();painting=true;last=-1};
 const paint=i=>{if(i<0||i>=96)return;if(last>=0){for(let n=Math.min(last,i);n<=Math.max(last,i);n++)values[n]=selected}else values[i]=selected;last=i;render()};
 const finish=()=>{if(!painting)return;painting=false;if(JSON.stringify(old)!==JSON.stringify(values)){history.push(old);if(history.length>30)history.shift()}old=null;render()};
 grid.addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b)return;begin();paint(+b.dataset.index);grid.setPointerCapture(e.pointerId)});
 grid.addEventListener('pointermove',e=>{if(!painting)return;const b=document.elementFromPoint(e.clientX,e.clientY)?.closest('.paint-grid button');if(b)paint(+b.dataset.index)});
 grid.addEventListener('pointerup',finish);grid.addEventListener('pointercancel',finish);grid.addEventListener('lostpointercapture',finish);
 // Keyboard activation is separate from pointer painting.
 grid.addEventListener('click',e=>{if(e.detail!==0)return;const b=e.target.closest('button');if(b){begin();paint(+b.dataset.index);finish()}});
 document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{selected=+b.dataset.color;document.querySelectorAll('[data-color]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}));
 document.querySelector('#undo').addEventListener('click',()=>{if(history.length){values=history.pop();render()}});
 document.querySelector('#clear').addEventListener('click',()=>{if(values.every(v=>v===null))return;history.push(values.slice());values.fill(null);render()});render();
 // Touch users can tap without trapping the page scroll; mouse users can freely drag.
}
const month=document.querySelector('.mini-month');if(month)for(let i=0;i<35;i++){const cell=document.createElement('i');cell.style.background=`linear-gradient(125deg,var(--c${i%8}),var(--c${(i*3+2)%8}))`;month.append(cell)}
