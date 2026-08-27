const stages=[
  {kicker:'Un poco más <span>(o menos)</span>', word:['llano','llano','llano','llano'], sub:'Un poco menos de ruido', animal:'corocora'},
  {kicker:'Un poco más de', word:['sabana','viva'], sub:'Un poco más de vida en el estero', animal:'chiguiro'},
  {kicker:'Un poco menos de', word:['llano','perdido'], sub:'Un poco más de horizonte', animal:'caballo'},
  {kicker:'Un poco más de', word:['noche','llanera'], sub:'Un poco menos de luz, más misterio', animal:'babilla'},
  {kicker:'Nuestra IA favorita es', word:['LLANITO','IA'], sub:'Un poco más de llano ancho — infinito', animal:'manifiesto'}
];
const wordEl=document.getElementById('word');
const kickerEl=document.getElementById('kicker');
const subkickerEl=document.getElementById('subkicker');
const animalSvg=document.getElementById('animalSvg');
const dots=[...document.querySelectorAll('.c-dot')];
const cProgress=document.getElementById('cProgress');
const stageIndicator=document.getElementById('stageIndicator');
let current=0;
let stretch=0.18; // gap

const animals={
  corocora:`<path d="M 40 80 Q 80 40 120 58 Q 110 72 80 78 Q 60 84 40 80 Z" fill="none" stroke="white" stroke-width="1.4"/><path d="M 80 78 Q 100 32 130 48 Q 122 60 100 68 Z" fill="none" stroke="white" stroke-width="1.2"/><path d="M 100 46 Q 118 42 124 50" fill="none" stroke="white" stroke-width="1"/>`,
  chiguiro:`<ellipse cx="110" cy="84" rx="52" ry="20" fill="none" stroke="white" stroke-width="1.3"/><circle cx="72" cy="72" r="18" fill="none" stroke="white" stroke-width="1.2"/><path d="M 60 74 Q 72 68 84 74" fill="none" stroke="white" stroke-width="1"/>`,
  caballo:`<path d="M 30 78 Q 60 52 96 66 Q 112 72 126 62 Q 132 58 134 68 Q 126 78 112 80 Q 92 88 70 84 Q 40 84 30 78 Z" fill="none" stroke="white" stroke-width="1.3"/><path d="M 126 62 Q 128 42 118 32 Q 114 30 112 38" fill="none" stroke="white" stroke-width="1.1"/>`,
  babilla:`<ellipse cx="110" cy="86" rx="64" ry="18" fill="none" stroke="white" stroke-width="1.3"/><path d="M 158 82 Q 188 80 194 86 Q 182 94 158 90 Z" fill="none" stroke="white" stroke-width="1.1"/><circle cx="138" cy="78" r="3" fill="white"/>`,
  manifiesto:`<circle cx="110" cy="70" r="36" fill="none" stroke="white" stroke-width="1.3" stroke-dasharray="4 6"/><path d="M 92 70 L 110 52 L 128 70 L 110 88 Z" fill="none" stroke="white" stroke-width="1.2"/><circle cx="110" cy="70" r="4" fill="white"/>`
};

function render(i){
  const s=stages[i];
  kickerEl.innerHTML=s.kicker;
  wordEl.innerHTML=s.word.map(w=>`<span class="w">${w}</span>`).join(' ');
  subkickerEl.textContent=s.sub;
  animalSvg.innerHTML=animals[s.animal]||animals.corocora;
  dots.forEach((d,idx)=> d.classList.toggle('active', idx===i));
  cProgress.style.height=((i+1)/stages.length*100)+'%';
  stageIndicator.textContent=`— ${i+1}`;
}

function go(i){
  if(i<0) i=0; if(i>=stages.length) i=stages.length-1;
  if(i===current) return;
  current=i; render(current);
  // subtle transition
  wordEl.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out'});
}

render(0);

// DOTS
dots.forEach(d=> d.onclick=()=> go(parseInt(d.dataset.i)));

// HOLD spacebar like Les Animals
let holding=false, holdTimer=null;
const hintMain=document.getElementById('hintMain');
const hintSub=document.getElementById('hintSub');
window.addEventListener('keydown',e=>{
  if(e.code==='Space' && !holding){
    holding=true; document.body.classList.add('holding');
    hintMain.textContent='Expandiendo';
    hintSub.textContent='suelta para cambiar';
    // stretch expands
    wordEl.style.gap='0.52em';
    wordEl.style.letterSpacing='0.08em';
    holdTimer=setTimeout(()=>{ go((current+1)%stages.length); holding=false; document.body.classList.remove('holding'); wordEl.style.gap=''; wordEl.style.letterSpacing=''; hintMain.textContent='Hold the spacebar'; hintSub.textContent='to change the stage'; },620);
    e.preventDefault();
  }
  if(e.key==='ArrowRight' || e.key==='ArrowDown'){ go(current+1); }
  if(e.key==='ArrowLeft' || e.key==='ArrowUp'){ go(current-1); }
});
window.addEventListener('keyup',e=>{
  if(e.code==='Space' && holding){
    clearTimeout(holdTimer); holding=false;
    document.body.classList.remove('holding');
    wordEl.style.gap=''; wordEl.style.letterSpacing='';
    hintMain.textContent='Hold the spacebar';
    hintSub.textContent='to change the stage';
  }
});

// DRAG like Les Animals - stretch space
let isDown=false, startX=0, curStretch=0.18;
const scene=document.getElementById('scene');
scene.addEventListener('pointerdown',e=>{ isDown=true; startX=e.clientX; curStretch=0.18; scene.setPointerCapture(e.pointerId); document.body.classList.add('dragging'); });
scene.addEventListener('pointermove',e=>{
  if(!isDown) return;
  const dx=e.clientX - startX;
  const gap=0.18 + Math.abs(dx)*0.0025;
  stretch=Math.min(0.75, gap);
  wordEl.style.gap=stretch+'em';
  wordEl.style.letterSpacing=(stretch*0.18)+'em';
  document.getElementById('animal').style.transform=`translate(-50%,-50%) scale(${1+Math.min(0.18,Math.abs(dx)*0.0006)})`;
});
function endDrag(e){
  if(!isDown) return;
  isDown=false; document.body.classList.remove('dragging');
  const dx=e.clientX - startX;
  wordEl.style.gap=''; wordEl.style.letterSpacing='';
  document.getElementById('animal').style.transform='';
  if(dx < -60) go(current+1);
  else if(dx > 60) go(current-1);
}
scene.addEventListener('pointerup',endDrag);
scene.addEventListener('pointercancel',()=>{ isDown=false; document.body.classList.remove('dragging'); wordEl.style.gap=''; });

// Wheel
let wLock=false;
scene.addEventListener('wheel',e=>{
  if(wLock) return;
  if(Math.abs(e.deltaY)<10 && Math.abs(e.deltaX)<10) return;
  if(e.deltaY>0 || e.deltaX<0) go(current+1); else go(current-1);
  wLock=true; setTimeout(()=>wLock=false,650);
  e.preventDefault();
},{passive:false});

// Touch
let tX=0;
scene.addEventListener('touchstart',e=>{ tX=e.touches[0].clientX; },{passive:true});
scene.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX - tX;
  if(dx<-50) go(current+1);
  if(dx>50) go(current-1);
});

// DASHBOARD
const dashboard=document.getElementById('dashboard');
const btnDashboard=document.getElementById('btnDashboard');
const dashClose=document.getElementById('dashClose');
const footDashboard=document.getElementById('footDashboard');
function openDash(){ dashboard.classList.add('open'); dashboard.scrollTop=0; }
function closeDash(){ dashboard.classList.remove('open'); }
if(btnDashboard) btnDashboard.onclick=openDash;
if(dashClose) dashClose.onclick=closeDash;
if(footDashboard) footDashboard.onclick=(e)=>{ e.preventDefault(); openDash(); };
if(dashboard) dashboard.onclick=e=>{ if(e.target===dashboard) closeDash(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape') { closeDash(); document.getElementById('loginModal').classList.remove('open'); }});
// redirecciones dentro del dashboard
if(dashboard){
  dashboard.querySelectorAll('.dash-card[data-go]').forEach(card=>{
    card.addEventListener('click',e=>{
      e.preventDefault();
      const idx=parseInt(card.dataset.go);
      closeDash();
      go(idx);
    });
  });
  const dashLoginCard=document.getElementById('dashLoginCard');
  if(dashLoginCard) dashLoginCard.onclick=()=>{ closeDash(); document.getElementById('loginModal').classList.add('open'); };
  // actualizar texto login en dashboard
  const dashLoginText=document.getElementById('dashLoginText');
  const dashLoginCta=document.getElementById('dashLoginCta');
  const savedDash=localStorage.getItem('llanito_user');
  if(savedDash && dashLoginText){ dashLoginText.textContent=`Bienvenido, ${savedDash} — tu llanero te espera`; dashLoginCta.textContent='Cambiar →'; }
}

// LOGIN
const loginFab=document.getElementById('loginFab');
const loginModal=document.getElementById('loginModal');
if(loginFab) loginFab.onclick=()=> loginModal.classList.add('open');
const lc=document.getElementById('loginClose');
if(lc) lc.onclick=()=> loginModal.classList.remove('open');
if(loginModal) loginModal.onclick=e=>{ if(e.target===loginModal) loginModal.classList.remove('open'); };
const loginGo=document.getElementById('loginGo');
if(loginGo) loginGo.onclick=()=>{
  const n=document.getElementById('loginName').value.trim()||'Llanero';
  loginFab.textContent='👤 '+n;
  loginFab.style.background='#FF1A1A';
  localStorage.setItem('llanito_user',n);
  loginModal.classList.remove('open');
  const dashLoginText2=document.getElementById('dashLoginText');
  if(dashLoginText2) dashLoginText2.textContent=`Bienvenido, ${n} — tu llanero te espera`;
};
const saved2=localStorage.getItem('llanito_user');
if(saved2 && loginFab){ loginFab.textContent='👤 '+saved2; loginFab.style.background='#FF1A1A'; }

console.log('LLANITO IA 1:1 clon + dashboard redirección listo');
