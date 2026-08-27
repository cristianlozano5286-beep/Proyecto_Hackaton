// PRELOADER
let prog=0; const pBar=document.getElementById('loaderProgress');
const pInt=setInterval(()=>{ prog+= Math.random()*18+8; if(prog>=100){prog=100; clearInterval(pInt); setTimeout(()=>document.getElementById('preloader').classList.add('hide'),400)} pBar.style.width=prog+'%';},180);

// CURSOR
const cursor=document.getElementById('cursor');
let mx=0,my=0,cx=0,cy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX; my=e.clientY});
(function animCursor(){ cx+=(mx-cx)*0.12; cy+=(my-cy)*0.12; cursor.style.left=cx+'px'; cursor.style.top=cy+'px'; requestAnimationFrame(animCursor);})();
document.querySelectorAll('button,a,.f-card,.sabor,.ley,.map-point').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
});

// NAV
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=> nav.classList.toggle('scrolled', scrollY>30));
document.getElementById('hamburger').onclick=()=> document.getElementById('navLinks').classList.toggle('open');

// THEME CYCLE
const hero=document.getElementById('hero');
const btnCiclo=document.getElementById('btnCiclo');
const themes=['atardecer','noche','amanecer'];
const themeLabels={atardecer:'🌇 Atardecer', noche:'🌌 Noche', amanecer:'🌅 Amanecer'};
const themeStats={atardecer:['31°','18:23'], noche:['24°','21:40'], amanecer:['26°','05:45']};
let ti=0;
function setTheme(t){
  hero.setAttribute('data-theme',t);
  btnCiclo.textContent=themeLabels[t];
  document.getElementById('statTemp').textContent=themeStats[t][0];
  document.getElementById('statHora').textContent=themeStats[t][1];
  // update dust density
  dustMode=t;
}
btnCiclo.onclick=()=>{ ti=(ti+1)%3; setTheme(themes[ti]); if(themes[ti]==='noche') launchFireflies(18); else launchDust(14); };
document.getElementById('btnVuelo').onclick=()=> launchFlock();
document.getElementById('corocoraHero').onclick=()=>{ launchFlock(); btnCiclo.click(); };

// DUST + FIREFLIES CANVAS (hero)
const dustCanvas=document.getElementById('dustCanvas');
const dCtx=dustCanvas.getContext('2d');
let dustMode='atardecer';
let particles=[];
function resizeDust(){ dustCanvas.width=hero.offsetWidth; dustCanvas.height=hero.offsetHeight; }
window.addEventListener('resize',resizeDust); resizeDust();
function makeParticle(){ return {x:Math.random()*dustCanvas.width, y:Math.random()*dustCanvas.height, r:Math.random()*1.3+0.5, vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.2, a:Math.random()*0.4+0.2, tw:Math.random()*0.015+0.004};}
for(let i=0;i<42;i++) particles.push(makeParticle());
function launchDust(n=10){ for(let i=0;i<n;i++) particles.push(makeParticle());}
function launchFireflies(n=12){
  for(let i=0;i<n;i++) particles.push({x:Math.random()*dustCanvas.width, y:Math.random()*dustCanvas.height*0.7, r:Math.random()*2+1.2, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.5, a:1, tw:0.04, fire:true});
}
function dustLoop(){
  dCtx.clearRect(0,0,dustCanvas.width,dustCanvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.a+= Math.sin(Date.now()*p.tw)*0.002;
    if(p.x<0||p.x>dustCanvas.width) p.vx*=-1;
    if(p.y<0||p.y>dustCanvas.height) p.vy*=-1;
    if(dustMode==='noche' && p.fire){
      dCtx.fillStyle=`rgba(255,242,120,${0.85})`;
      dCtx.shadowColor='#FFD23F'; dCtx.shadowBlur=8;
      dCtx.beginPath(); dCtx.arc(p.x,p.y,p.r,0,Math.PI*2); dCtx.fill(); dCtx.shadowBlur=0;
    } else if(dustMode!=='noche'){
      dCtx.fillStyle=`rgba(255,255,255,${p.a*0.22})`;
      dCtx.beginPath(); dCtx.arc(p.x,p.y,p.r,0,Math.PI*2); dCtx.fill();
    } else {
      dCtx.fillStyle=`rgba(180,210,255,${0.1})`;
      dCtx.beginPath(); dCtx.arc(p.x,p.y,p.r*0.6,0,Math.PI*2); dCtx.fill();
    }
  });
  requestAnimationFrame(dustLoop);
}
dustLoop();

// FLOCK follow mouse + corocora parallax
const flock=document.getElementById('flock');
const corocoraHero=document.getElementById('corocoraHero');
hero.addEventListener('mousemove',e=>{
  const rect=hero.getBoundingClientRect();
  const x=(e.clientX-rect.left)/rect.width -0.5;
  const y=(e.clientY-rect.top)/rect.height -0.5;
  document.getElementById('sun').style.transform=`translate(${x*14}px,${y*8}px)`;
  document.getElementById('moon').style.transform=`translate(${x*14}px,${y*8}px)`;
  flock.style.transform=`translate(${x*10}px,${y*6}px)`;
  if(corocoraHero) corocoraHero.style.transform=`translate(${x*-8}px,${y*-6}px)`;
});
function launchFlock(){
  const birds=document.querySelectorAll('.f-bird');
  birds.forEach((b,i)=>{
    b.style.animation='none'; void b.offsetWidth;
    b.style.animation=`flockFly ${12+i*0.6}s linear infinite`;
    b.style.animationDelay='0s';
  });
  // burst dust
  launchDust(10);
}

// AUDIO (Web Audio simple)
let actx=null;
function tone(freq,dur,type='sine',gain=0.18){
  try{
    if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(), g=actx.createGain();
    o.type=type; o.frequency.value=freq; o.connect(g); g.connect(actx.destination);
    g.gain.value=gain; o.start(); g.gain.exponentialRampToValueAtTime(0.01, actx.currentTime+dur); o.stop(actx.currentTime+dur);
  }catch(e){}
}
let audioOn=false;
document.getElementById('btnAudio').onclick=function(){
  audioOn=!audioOn; this.textContent=audioOn?'♫ ON':'♫ OFF'; this.style.background=audioOn?'#1B6B2A':'#FF1A1A';
  if(audioOn){ tone(220,0.5); tone(330,0.5); }
};

// CAROUSEL DRAG
const track=document.getElementById('track');
const carousel=document.getElementById('carousel');
let idx=0, maxIdx=4;
let isDown=false,startX=0,curX=0,prevTranslate=0;
function updateTrack(){ track.style.transform=`translateX(${-idx*266}px)`; }
document.getElementById('carPrev').onclick=()=>{ idx=Math.max(0,idx-1); updateTrack(); };
document.getElementById('carNext').onclick=()=>{ idx=Math.min(maxIdx,idx+1); updateTrack(); };
carousel.addEventListener('pointerdown',e=>{ isDown=true; carousel.setPointerCapture(e.pointerId); startX=e.clientX; prevTranslate=-idx*266; track.style.transition='none'; });
carousel.addEventListener('pointermove',e=>{
  if(!isDown) return;
  const dx=e.clientX-startX;
  track.style.transform=`translateX(${prevTranslate+dx}px)`;
});
carousel.addEventListener('pointerup',e=>{
  if(!isDown) return; isDown=false; track.style.transition='';
  const dx=e.clientX-startX;
  if(dx<-40) idx=Math.min(maxIdx,idx+1);
  if(dx>40) idx=Math.max(0,idx-1);
  updateTrack();
});
carousel.addEventListener('pointercancel',()=>{isDown=false; updateTrack();});

// Auto slide
setInterval(()=>{ if(!isDown) { idx=(idx+1)%(maxIdx+1); updateTrack(); } },4200);

// Fauna modal + play
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const faunaData={
  corocora:{t:'Corocora Roja — La llamarada',d:'Habita esteros y morichales. Su rojo intenso viene de su alimentación. Verla volar al amanecer es ver el llano arder.'},
  chiguire:{t:'Chigüiro — El gigante tierno',d:'Vive en grupos de hasta 30. Es el roedor más grande del mundo y el más sociable de la sabana.'},
  caballo:{t:'Caballo Llanero — Criollo',d:'Resistente, veloz, compañero inseparable del llanero. Su galope marca el ritmo del joropo.'},
  babilla:{t:'Babilla — Guardiana del caño',d:'Pequeña pero temida. Se camufla entre raíces y espera pacientemente.'},
  garza:{t:'Garza Blanca — Elegancia',d:'Su vuelo blanco es poesía sobre el espejo del agua.'},
  venado:{t:'Venado Sabanero — Espíritu del llano',d:'Tímido y veloz, aparece al atardecer como un suspiro.'},
  osa:{t:'Ocelote — Sombra dorada',d:'Nocturno y sigiloso, recorre morichales buscando su rastro.'},
  galapaga:{t:'Galápaga — Sabiduría lenta',d:'Puede vivir décadas. Conoce cada recodo del estero.'}
};
document.querySelectorAll('.f-card').forEach(card=>{
  card.querySelector('.f-play').onclick=(e)=>{
    e.stopPropagation();
    const k=card.dataset.animal;
    const info=faunaData[k];
    const col=getComputedStyle(card).getPropertyValue('--c') || '#FF1A1A';
    modalContent.innerHTML=`<h3>${info.t}</h3><p>${info.d}</p><p style="margin-top:10px"><span style="background:${col};color:#fff;padding:6px 10px;border-radius:999px;font-size:11px">● ${k.toUpperCase()}</span></p>`;
    modal.classList.add('open');
    const freqs={corocora:520,chiguire:180,caballo:240,babilla:110,garza:680,venado:300,osa:150,galapaga:90};
    tone(freqs[k]||300,0.45,'triangle',0.2); tone((freqs[k]||300)*1.5,0.35,'sine',0.12);
    // animate svg
    const svg=card.querySelector('.f-svg'); if(svg){ svg.style.transform='scale(1.12)'; setTimeout(()=>svg.style.transform='',400); }
  };
});
document.getElementById('modalClose').onclick=()=> modal.classList.remove('open');
modal.onclick=e=>{ if(e.target===modal) modal.classList.remove('open'); };

// TRAVESÍA horizontal on scroll
const travesia=document.getElementById('travesia');
const tTrack=document.getElementById('tTrack');
const tProgress=document.getElementById('tProgress');
function onScrollTravesia(){
  const rect=travesia.getBoundingClientRect();
  const h=travesia.offsetHeight - window.innerHeight;
  const prog=Math.min(Math.max(-rect.top / h,0),1);
  tTrack.style.transform=`translateX(${-prog*75}%)`;
  tProgress.style.width=(prog*100)+'%';
}
window.addEventListener('scroll',onScrollTravesia);
onScrollTravesia();

// Instruments + vinyl + verso
const versos=["Llano querido, horizonte sin fin, donde el sol se hace arrebol","Garza blanca al amanecer, espejito del caño al correr","¡Ay mi llanura! que al galope va, copla y zapateo sin parar","Corocora roja pinta el estero, como pinta mi amor sincero","Morichal al viento, palma que canta, llanero que nunca se espanta","Cielo llanero, inmensidad, donde el alma aprende a volar","Del llano vengo y al llano voy, en mi caballo me pierdo yo","Arpa que llora, cuatro que canta, sabana que nunca se espanta"];
document.getElementById('btnVerso').onclick=()=>{
  const v=versos[Math.floor(Math.random()*versos.length)];
  const el=document.getElementById('verso'); el.textContent='"'+v+'"';
  el.animate([{transform:'translateY(8px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:400});
  tone(440,0.3); tone(550,0.3);
};
const vinyl=document.getElementById('vinyl');
let vPlaying=false;
vinyl.onclick=()=>{
  vPlaying=!vPlaying; vinyl.classList.toggle('playing',vPlaying);
  document.getElementById('btnAudio').textContent=vPlaying?'♫ ON':'♫ OFF';
  if(vPlaying) tone(196,0.6,'sine',0.2);
};
document.querySelectorAll('.inst').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('.inst').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const m={arpa:196,cuatro:262,maracas:800};
    const f=m[b.dataset.inst]||300;
    if(b.dataset.inst==='maracas'){ for(let i=0;i<6;i++) setTimeout(()=>tone(900+Math.random()*400,0.09,'square',0.08),i*70); }
    else { tone(f,0.5,'triangle',0.2); tone(f*1.5,0.4,'sine',0.12); }
    setTimeout(()=>b.classList.remove('active'),800);
  };
});

// Sabores modal
document.querySelectorAll('.sabor').forEach(s=>{
  s.querySelector('.btn-sabor').onclick=(e)=>{
    e.stopPropagation();
    const dish=s.dataset.dish;
    const data={
      mamona:{t:'Mamona — Ritual de brasa',d:'Se asa en chuzos alrededor de la hoguera por 4 horas. Se sirve con yuca, plátano maduro, ají de leche y farinha. El humo es parte del sabor.'},
      hayaca:{t:'Hayaca Llanera',d:'Masa de arroz y maíz, guiso de carne llanera, encurtidos y aceituna. Se envuelve en hoja de plátano y se hierve. Sabor a diciembre llanero.'},
      tungo:{t:'Tungo de arroz',d:'Dulce ancestral: arroz, leche, panela y canela envuelto en hoja de plátano y cocido al vapor. Aroma a morichal.'},
      casabe:{t:'Casabe + Pisillo',d:'Casabe crocante de yuca + pisillo (carne seca desmechada con cebolla y ají). Crujiente, salado y potente.'}
    };
    modalContent.innerHTML=`<h3>${data[dish].t}</h3><p>${data[dish].d}</p>`;
    modal.classList.add('open');
  };
});

// Leyendas interaccion
document.querySelectorAll('.ley').forEach(l=>{
  l.onclick=()=>{
    l.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:400});
    const t=l.querySelector('h3').textContent;
    if(t.includes('Silbón')){ for(let i=0;i<4;i++) setTimeout(()=>tone(300+i*80,0.25,'sine',0.12),i*300); }
    if(t.includes('Bola')){ document.getElementById('fogCanvas').style.opacity='1'; setTimeout(()=>document.getElementById('fogCanvas').style.opacity='.55',900); tone(150,0.8,'triangle',0.18); }
    if(t.includes('Jinete')){ tone(80,0.6,'square',0.2); setTimeout(()=>tone(120,0.4,'square',0.15),250); }
  };
});

// FOG CANVAS (leyendas)
const fogC=document.getElementById('fogCanvas');
const fCtx=fogC.getContext('2d');
function resizeFog(){ fogC.width=fogC.offsetWidth; fogC.height=fogC.offsetHeight; }
window.addEventListener('resize',resizeFog); resizeFog();
let fogT=0;
function fogLoop(){
  fCtx.clearRect(0,0,fogC.width,fogC.height);
  fogT+=0.008;
  for(let i=0;i<5;i++){
    const x=(Math.sin(fogT+i)*0.5+0.5)*fogC.width;
    const y= 40 + Math.sin(fogT*0.7+i*1.2)*20 + i*45;
    const r= 120 + Math.sin(fogT+i)*40;
    const g=fCtx.createRadialGradient(x,y,r*0.2, x,y,r);
    g.addColorStop(0,'rgba(220,230,255,0.18)'); g.addColorStop(1,'transparent');
    fCtx.fillStyle=g; fCtx.beginPath(); fCtx.arc(x,y,r,0,Math.PI*2); fCtx.fill();
  }
  requestAnimationFrame(fogLoop);
}
fogLoop();

// MAPA
const mapData={
  Meta:{t:'Meta — Puerta del Llano',d:'Villavicencio, ríos Guatiquía y Ariari. Amaneceres rosados sobre palma real. Ideal para avistamiento de corocoras.',c:'#FF1A1A'},
  Casanare:{t:'Casanare — Corazón del estero',d:'Yopal, Paz de Ariporo. Esteros gigantes, chigüiros y morichales infinitos. La sabana más pura.',c:'#FF8C2A'},
  Arauca:{t:'Arauca — Frontera brava',d:'Río Arauca, sabana de viento fuerte. Cuna del joropo recio y del coleo.',c:'#2A6B2A'},
  Vichada:{t:'Vichada — Llano virgen',d:'Puerto Carreño, Tuparro. Orinoco imponente, selva y sabana en uno. Magia pura.',c:'#2E86AB'}
};
document.querySelectorAll('.map-point').forEach(p=>{
  p.onclick=()=>{
    const k=p.dataset.depto; const d=mapData[k];
    const info=document.getElementById('mapInfo');
    info.innerHTML=`<h3 style="color:${d.c}">${d.t}</h3><p>${d.d}</p><ul><li>Estero principal</li><li>Morichal protegido</li><li>Avistamiento garantizado</li></ul>`;
    tone(300,0.2); tone(400,0.2);
  };
});

// QUIZ
let answers={};
document.querySelectorAll('.quiz-q button').forEach(b=>{
  b.onclick=()=>{
    const q=b.closest('.quiz-q');
    q.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    answers[q.dataset.q]=b.dataset.v;
    if(q.dataset.q==='2'){ document.querySelector('.quiz-q[data-q="3"]').classList.remove('hidden'); }
  };
});
document.getElementById('quizBtn').onclick=()=>{
  const vals=Object.values(answers);
  if(vals.length<3){ document.getElementById('quizResult').textContent='Responde las 3 preguntas primero.'; return; }
  const count={}; vals.forEach(v=>count[v]=(count[v]||0)+1);
  const top=Object.entries(count).sort((a,b)=>b[1]-a[1])[0][0];
  const res={
    corocora:{t:'🦩 ¡Eres Corocora Roja!',d:'Llamativo, libre, te gusta brillar y volar alto. El atardecer te pertenece.'},
    chiguire:{t:'🐹 ¡Eres Chigüiro!',d:'Sociable, tranquilo, familiar. Te gusta el agua, la calma y la buena compañía.'},
    caballo:{t:'🐎 ¡Eres Caballo Llanero!',d:'Libre, fuerte, indomable. Galopas sin miedo hacia el horizonte.'}
  };
  document.getElementById('quizResult').innerHTML=`<b>${res[top].t}</b><br>${res[top].d}`;
  tone(440,0.4); tone(550,0.3);
};

// SONORA buttons
document.querySelectorAll('.s-btn').forEach(b=>{
  b.onclick=()=>{
    b.classList.toggle('active');
    if(b.classList.contains('active')) tone(200+Math.random()*300,0.6,'sine',0.15);
  };
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const el=document.querySelector(a.getAttribute('href'));
    if(el) window.scrollTo({top:el.offsetTop-62,behavior:'smooth'});
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Reveal
const obs=new IntersectionObserver(es=>{ es.forEach(ent=>{ if(ent.isIntersecting) ent.target.classList.add('visible'); });},{threshold:0.14});
document.querySelectorAll('.f-card,.sabor,.ley,.mapa-wrap,.gq-grid,.joropo-grid').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });

// Horses extra
document.getElementById('horses').onclick=()=>{ tone(180,0.4,'square',0.15); launchDust(8); };

// LOGIN / PERSONAJE placeholder
const btnLogin=document.getElementById('btnLogin');
const loginSection=document.getElementById('login');
if(btnLogin){
  btnLogin.onclick=()=>{
    loginSection.scrollIntoView({behavior:'smooth',block:'start'});
    loginSection.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:400});
    tone(440,0.3); tone(550,0.2);
  };
}
document.getElementById('btnLoginDemo')?.addEventListener('click',()=>{
  const ph=document.getElementById('personajePlaceholder');
  const btn=document.getElementById('btnLogin');
  // simula login
  const name=prompt('Ingresa tu nombre llanero:','Llanero');
  if(!name) return;
  btn.textContent='👤 '+name;
  btn.style.background='#1B6B2A'; btn.style.color='#fff';
  btnLogin.insertAdjacentHTML('afterend',`<div class="nav-logged">🤠</div>`);
  modalContent.innerHTML=`<h3>¡Bienvenido, ${name}!</h3><p>Tu personaje te acompañará en toda la sabana. Cuando me envíes tu PNG, lo verás aquí y en el nav.</p><div style="margin-top:12px;height:120px;border-radius:12px;background:linear-gradient(180deg,#E0F0FF,#FFE8B0);display:grid;place-items:center;font-size:40px">🤠</div>`;
  modal.classList.add('open');
  localStorage.setItem('llano_user',name);
  tone(330,0.4); setTimeout(()=>tone(440,0.4),250);
});
document.getElementById('btnCambiarPersonaje')?.addEventListener('click',()=>{
  alert('Cuando tengas tu personaje, guárdalo como personaje.png en la misma carpeta que index.html. Se cargará automáticamente en el login.\n\nTip: fondo transparente, 600x800px.');
});
const savedUser=localStorage.getItem('llano_user');
if(savedUser && btnLogin){ btnLogin.textContent='👤 '+savedUser; btnLogin.style.background='#1B6B2A'; btnLogin.style.color='#fff'; }

// personaje.png check - si existe, ocultar placeholder
const personajeImg=document.getElementById('personajeImg');
if(personajeImg){
  personajeImg.addEventListener('load',()=>{ document.getElementById('personajePlaceholder').style.display='none'; personajeImg.style.display='block'; });
  personajeImg.addEventListener('error',()=>{ personajeImg.style.display='none'; });
}

console.log('Llano Eterno premium v2 cargado - fauna SVG + login personaje');
