const stages=[...document.querySelectorAll('.stage')];
const dots=[...document.querySelectorAll('.dot')];
const progressBar=document.getElementById('progressBar');
const dotProgress=document.getElementById('dotProgress');
const hintAction=document.getElementById('hintAction');
const hintSub=document.getElementById('hintSub');
let current=0;
const total=stages.length;
const hints=[
  ['Mantén la barra espaciadora','para expandir el amanecer'],
  ['Arrastra para flotar','con el chigüiro'],
  ['Mantén espacio','para galopar'],
  ['Suelta para escuchar','la noche llanera'],
  ['Arrastra al infinito','LLANITO IA te espera']
];

function goTo(i){
  if(i<0) i=0; if(i>=total) i=total-1;
  if(i===current && stages[i].classList.contains('active')) return;
  stages[current].classList.remove('active');
  dots[current].classList.remove('active');
  current=i;
  stages[current].classList.add('active');
  dots[current].classList.add('active');
  const pct=((current+1)/total)*100;
  progressBar.style.width=pct+'%';
  dotProgress.style.height=pct+'%';
  document.body.style.background=getComputedStyle(stages[current]).getPropertyValue('--bg');
  hintAction.textContent=hints[current][0];
  hintSub.textContent=hints[current][1];
  // announce
  stages[current].animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'ease-out'});
}

// DOTS
dots.forEach(d=> d.onclick=()=> goTo(parseInt(d.dataset.i)));

// KEYBOARD + SPACE HOLD (lesanimals mechanic)
let spaceHolding=false, holdTimer=null, holdStart=0;
window.addEventListener('keydown',e=>{
  if(e.code==='Space'){
    if(!spaceHolding){
      spaceHolding=true; holdStart=Date.now();
      document.getElementById('hintBottom').style.transform='translateX(-50%) scale(1.06)';
      document.getElementById('hintBottom').style.background='#FF1A1A';
      hintAction.textContent='Expandiendo la sabana…';
      holdTimer=setTimeout(()=>{ goTo((current+1)%total); spaceHolding=false; document.getElementById('hintBottom').style.background='#0A1A2F'; },650);
    }
    e.preventDefault();
  }
  if(e.key==='ArrowRight' || e.key==='ArrowDown'){ goTo(current+1); }
  if(e.key==='ArrowLeft' || e.key==='ArrowUp'){ goTo(current-1); }
});
window.addEventListener('keyup',e=>{
  if(e.code==='Space'){
    clearTimeout(holdTimer);
    spaceHolding=false;
    document.getElementById('hintBottom').style.transform='translateX(-50%) scale(1)';
    document.getElementById('hintBottom').style.background='#0A1A2F';
    hintAction.textContent=hints[current][0];
  }
});

// DRAG (Click & drag - lesanimals)
const wrap=document.getElementById('stageWrap');
let isDown=false, startX=0, delta=0, startY=0;
wrap.addEventListener('pointerdown',e=>{ isDown=true; startX=e.clientX; startY=e.clientY; delta=0; wrap.setPointerCapture(e.pointerId); wrap.style.cursor='grabbing'; });
wrap.addEventListener('pointermove',e=>{
  if(!isDown) return;
  delta=e.clientX - startX;
  // visual feedback
  const active=stages[current];
  active.style.transform=`translateX(${delta*0.18}px) scale(${1 - Math.abs(delta)*0.00015})`;
});
wrap.addEventListener('pointerup',e=>{
  if(!isDown) return;
  isDown=false; wrap.style.cursor='grab';
  stages[current].style.transform='';
  if(delta < -70) goTo(current+1);
  else if(delta > 70) goTo(current-1);
  delta=0;
});
wrap.addEventListener('pointercancel',()=>{ isDown=false; stages[current].style.transform=''; });

// WHEEL (easy)
let wheelLock=false;
wrap.addEventListener('wheel',e=>{
  if(wheelLock) return;
  if(Math.abs(e.deltaY) < 18 && Math.abs(e.deltaX) < 18) return;
  if(e.deltaY>0 || e.deltaX<0) goTo(current+1); else goTo(current-1);
  wheelLock=true; setTimeout(()=>wheelLock=false,700);
  e.preventDefault();
},{passive:false});

// TOUCH SWIPE
let touchStartX=0;
wrap.addEventListener('touchstart',e=>{ touchStartX=e.touches[0].clientX; },{passive:true});
wrap.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX - touchStartX;
  if(dx < -50) goTo(current+1);
  if(dx > 50) goTo(current-1);
});

// AUTO hint cycle demo (lesanimals space space space effect)
let hintCycle=0;
setInterval(()=>{
  if(spaceHolding || isDown) return;
  hintCycle=(hintCycle+1)%2;
  document.getElementById('hintTop').style.opacity= hintCycle? '0.6':'1';
},2200);

// CTAs
document.getElementById('btnComenzar').onclick=()=> goTo(0);
document.getElementById('btnVerModulos').onclick=()=>{
  alert('Módulos LLANITO IA (próximamente):\n\n• Fauna Viva (8 guardianes animados)\n• Mapa Esteros\n• Joropo IA (arpa que responde)\n• Sabores (mamona, hayaca)\n• Leyendas (noche + Silbón)\n• Login con tu personaje principal\n\nDime qué módulo quieres que desarrolle primero y lo integro en esta misma estructura de 5 etapas.');
};

// LOGIN modal (personaje reservado)
const loginModal=document.getElementById('loginModal');
const btnLoginTop=document.getElementById('btnLoginTop');
btnLoginTop.onclick=()=> loginModal.classList.add('open');
document.getElementById('loginClose').onclick=()=> loginModal.classList.remove('open');
loginModal.onclick=e=>{ if(e.target===loginModal) loginModal.classList.remove('open'); };
document.getElementById('loginGo').onclick=()=>{
  const name=document.getElementById('loginName').value.trim() || 'Llanero';
  btnLoginTop.textContent='👤 '+name;
  btnLoginTop.style.background='#1B6B2A';
  btnLoginTop.style.color='#fff';
  localStorage.setItem('llanito_user',name);
  loginModal.classList.remove('open');
  // pequeño feedback en etapa 5
  hintAction.textContent=`¡Bienvenido, ${name}!`;
  hintSub.textContent='tu personaje te espera en la sabana';
  setTimeout(()=>{ hintAction.textContent=hints[current][0]; hintSub.textContent=hints[current][1]; },2200);
};
const saved=localStorage.getItem('llanito_user');
if(saved){ btnLoginTop.textContent='👤 '+saved; btnLoginTop.style.background='#1B6B2A'; btnLoginTop.style.color='#fff'; }

// Init
goTo(0);
// para preloader si existiera
setTimeout(()=>{ document.body.style.opacity='1'; },80);

console.log('LLANITO IA - lesanimals tribute cargado. Mantén espacio o arrastra.');

// Soporte para tu personaje.png
const pImg=document.querySelector('.personaje-slot img');
if(pImg){
  pImg.addEventListener('load',()=>{ pImg.style.display='block'; const ph=pImg.nextElementSibling; if(ph) ph.style.display='none'; });
  pImg.addEventListener('error',()=>{ pImg.style.display='none'; });
}
