/* ==========================================================================
   saisons.js — décors saisonniers de l'agenda (easter eggs Halloween et Noël)
   À placer dans le même dossier que index.html, qui l'appelle en fin de page :
     <script src="saisons.js"></script>
   Sans ce fichier, l'agenda fonctionne normalement, simplement sans décors.

   Contenu, dans l'ordre :
     1. Styles des décors (injectés dans la page)
     2. Noël       — 1er décembre → 6 janvier
     3. Halloween  — 15 octobre → 2 novembre
     4. Pâques et Été — moteur commun + les deux saisons (15 jours avant Pâques →
                        lundi de Pâques ; 21 juin → 31 août)
     5. Saisons    — bascule manuelle (5 clics sur le logo) et choix du décor
   Les dates et la fréquence des passages se règlent au début de chaque bloc.
   ========================================================================== */

/* ---------- 1. Styles ---------- */
(function(){
  var st = document.createElement('style');
  st.id = 'saisons-css';
  st.textContent = `  /* ==========================================================================
     EASTER EGG NOËL — flocons, calendrier enneigé, sapins, traîneau du Père Noël
     Actif automatiquement du 1er décembre au 6 janvier (voir le script « Saisons »
     en fin de fichier pour la bascule manuelle).
     ========================================================================== */
  .noel-flakes{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:800;display:none;}
  body.noel .noel-flakes{display:block;}

  /* Traîneau */
  .noel-sleigh{position:fixed;left:0;top:0;z-index:801;pointer-events:none;display:none;
    width:clamp(270px,30vw,420px);will-change:transform;}
  .noel-sleigh > svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 8px 10px rgba(40,80,120,.28));}
  .noel-hoho{position:absolute;left:2%;top:-30px;opacity:0;white-space:nowrap;
    font:600 14px/1 'IBM Plex Sans',sans-serif;color:#B3261E;background:#fff;
    padding:7px 12px;border-radius:14px;border:1px solid #C3D6E6;box-shadow:0 4px 12px rgba(40,80,120,.18);}
  .noel-hoho::after{content:"";position:absolute;left:22px;bottom:-6px;width:10px;height:10px;background:#fff;
    border-right:1px solid #C3D6E6;border-bottom:1px solid #C3D6E6;transform:rotate(45deg);}

  /* Calendrier enneigé : cadre givré, congère sur le bord haut, monticule en bas */
  .noel-cal{position:relative;margin-top:18px;}
  body.noel .noel-cal .cal-grid{
    border-color:#B5CFE3;
    box-shadow:0 0 0 3px rgba(255,255,255,.96),0 0 0 4px #C3D8E8,0 12px 28px rgba(60,100,140,.16);
  }
  body.noel .noel-cal .cal-dow{background:linear-gradient(#F4FAFF,var(--card));}
  .noel-cap,.noel-mound{position:absolute;left:-7px;width:calc(100% + 14px);pointer-events:none;z-index:5;display:block;
    filter:drop-shadow(0 2px 2px rgba(70,110,150,.28));}
  .noel-cap{top:-24px;height:38px;}
  .noel-mound{bottom:-10px;height:26px;filter:drop-shadow(0 -1px 2px rgba(70,110,150,.2));}

  /* Sous-bois de sapins décorés */
  .noel-scene{position:relative;height:172px;margin-top:-96px;pointer-events:none;user-select:none;z-index:4;--ts:1;}
  .noel-ground{position:absolute;left:-7px;bottom:0;width:calc(100% + 14px);height:40px;display:block;
    filter:drop-shadow(0 -2px 3px rgba(70,110,150,.22));}
  .noel-tree{position:absolute;bottom:17px;width:calc(var(--w) * var(--ts));height:auto;display:block;overflow:visible;
    filter:drop-shadow(0 3px 3px rgba(30,70,50,.22));}
  .noel-gift{position:absolute;bottom:13px;width:calc(30px * var(--ts));height:auto;display:block;overflow:visible;}
  .noel-bulb{animation:noel-twinkle 1.7s ease-in-out infinite;}
  .noel-starglow{animation:noel-starglow 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
  @keyframes noel-twinkle{0%,100%{opacity:1;}50%{opacity:.22;}}
  @keyframes noel-starglow{0%,100%{opacity:.35;transform:scale(1);}50%{opacity:.85;transform:scale(1.3);}}
  @media (max-width:700px){
    .noel-scene{--ts:.72;height:130px;margin-top:-64px;}
    .noel-m-hide{display:none;}
    .noel-cap{top:-20px;height:32px;}
  }
  @media (prefers-reduced-motion:reduce){
    .noel-bulb,.noel-starglow{animation:none;}
  }

  .saison-toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,14px);opacity:0;z-index:1100;pointer-events:none;
    background:#1F4A40;color:#fff;font:500 13.5px/1.4 'IBM Plex Sans',sans-serif;padding:10px 16px;border-radius:999px;
    box-shadow:0 10px 26px rgba(30,43,36,.28);transition:opacity .3s ease,transform .3s ease;max-width:92vw;text-align:center;}
  .saison-toast.show{opacity:1;transform:translate(-50%,0);}

  @media print{
    .noel-flakes,.noel-sleigh,.noel-cap,.noel-mound,.noel-scene,.saison-toast{display:none !important;}
    body.noel .noel-cal .cal-grid{box-shadow:none;}
  }

  /* ==========================================================================
     EASTER EGG HALLOWEEN — feuilles d'automne, calendrier ensorcelé, citrouilles,
     sorcière sur son balai. Actif automatiquement du 15 octobre au 2 novembre
     (voir le script « Saisons » en fin de fichier pour la bascule manuelle).
     ========================================================================== */
  .hw-leaves{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:800;display:none;}
  body.halloween .hw-leaves{display:block;}

  /* Sorcière */
  .hw-witch{position:fixed;left:0;top:0;z-index:801;pointer-events:none;display:none;
    width:clamp(230px,25vw,350px);will-change:transform;}
  .hw-witch > svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 8px 10px rgba(60,25,90,.3));}
  .hw-cackle{position:absolute;left:44%;top:-46px;opacity:0;white-space:nowrap;
    font:600 14px/1 'IBM Plex Sans',sans-serif;color:#5B2C83;background:#fff;
    padding:7px 12px;border-radius:14px;border:1px solid #CDBBE3;box-shadow:0 4px 12px rgba(60,25,90,.2);}
  .hw-cackle::after{content:"";position:absolute;left:26px;bottom:-6px;width:10px;height:10px;background:#fff;
    border-right:1px solid #CDBBE3;border-bottom:1px solid #CDBBE3;transform:rotate(45deg);}

  /* Calendrier ensorcelé : cadre violet, fanions, toiles, araignées, herbe sombre */
  .hw-cal{position:relative;margin-top:18px;}
  body.halloween .hw-cal .cal-grid{
    border-color:#8F6BB3;
    box-shadow:0 0 0 3px rgba(255,255,255,.95),0 0 0 4px #9D7CC0,0 12px 28px rgba(80,40,110,.2),0 0 30px rgba(240,130,30,.16);
  }
  body.halloween .hw-cal .cal-dow{background:linear-gradient(#FFF1E2,var(--card));}
  .hw-bunting,.hw-mound{position:absolute;left:-7px;width:calc(100% + 14px);pointer-events:none;z-index:5;display:block;}
  .hw-bunting{top:-20px;height:34px;filter:drop-shadow(0 2px 2px rgba(60,25,90,.22));}
  .hw-mound{bottom:-10px;height:26px;filter:drop-shadow(0 -1px 2px rgba(60,25,90,.25));}
  .hw-web{position:absolute;top:-6px;left:-3px;width:58px;height:58px;pointer-events:none;z-index:6;}
  .hw-web-r{left:auto;right:-3px;transform:scaleX(-1);}
  .hw-spider{position:absolute;top:-6px;width:24px;pointer-events:none;z-index:6;transform-origin:50% 0;overflow:visible;
    animation:hw-swing 3.4s ease-in-out infinite alternate;}
  @keyframes hw-swing{from{transform:rotate(-7deg);}to{transform:rotate(7deg);}}

  /* Cimetière de citrouilles */
  .hw-scene{position:relative;height:172px;margin-top:-110px;pointer-events:none;user-select:none;z-index:4;--ts:1;}
  .hw-ground{position:absolute;left:-7px;bottom:0;width:calc(100% + 14px);height:40px;display:block;
    filter:drop-shadow(0 -2px 3px rgba(60,25,90,.25));}
  .hw-item{position:absolute;bottom:17px;width:calc(var(--w) * var(--ts));height:auto;display:block;overflow:visible;
    filter:drop-shadow(0 3px 3px rgba(40,20,60,.28));}
  .hw-candy{position:absolute;bottom:12px;width:calc(34px * var(--ts));height:auto;display:block;overflow:visible;}
  .hw-flicker{animation:hw-flicker 2.6s ease-in-out infinite;}
  .hw-float{animation:hw-float 3.6s ease-in-out infinite alternate;}
  @keyframes hw-flicker{0%,100%{opacity:1;}18%{opacity:.76;}32%{opacity:.96;}55%{opacity:.8;}75%{opacity:1;}}
  @keyframes hw-float{from{transform:translateY(0);}to{transform:translateY(-9px);}}
  @media (max-width:700px){
    .hw-scene{--ts:.72;height:130px;margin-top:-72px;}
    .hw-m-hide{display:none;}
    .hw-bunting{top:-17px;height:30px;}
    .hw-web{width:42px;height:42px;}
  }
  @media (prefers-reduced-motion:reduce){
    .hw-flicker,.hw-float,.hw-spider{animation:none;}
  }

  @media print{
    .hw-leaves,.hw-witch,.hw-bunting,.hw-mound,.hw-web,.hw-spider,.hw-scene{display:none !important;}
    body.halloween .hw-cal .cal-grid{box-shadow:none;}
  }

  /* ==========================================================================
     MOTEUR COMMUN (Pâques, Été) — classes génériques sx-*
     ========================================================================== */
  .sx-canvas{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:800;}
  .sx-flyer{position:fixed;left:0;top:0;z-index:801;pointer-events:none;display:none;will-change:transform;}
  .sx-flyer > svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 8px 10px rgba(40,60,90,.25));}
  .sx-bunny{width:clamp(130px,13vw,200px);}
  .sx-plane{width:clamp(300px,34vw,480px);}
  .sx-bubble{position:absolute;opacity:0;white-space:nowrap;font:600 14px/1 'IBM Plex Sans',sans-serif;
    color:var(--sx-ink,#333);background:#fff;padding:7px 12px;border-radius:14px;border:1px solid var(--sx-edge,#ccc);
    box-shadow:0 4px 12px rgba(40,60,90,.18);}
  .sx-bubble::after{content:"";position:absolute;left:24px;bottom:-6px;width:10px;height:10px;background:#fff;
    border-right:1px solid var(--sx-edge,#ccc);border-bottom:1px solid var(--sx-edge,#ccc);transform:rotate(45deg);}

  .sx-cal{position:relative;margin-top:18px;}
  .sx-top,.sx-mound{position:absolute;left:-7px;width:calc(100% + 14px);pointer-events:none;z-index:5;display:block;}
  .sx-top{top:-22px;height:38px;filter:drop-shadow(0 2px 2px rgba(40,60,90,.22));}
  .sx-mound{bottom:-10px;height:26px;filter:drop-shadow(0 -1px 2px rgba(40,60,90,.2));}
  .sx-crit{position:absolute;pointer-events:none;z-index:6;overflow:visible;}

  .sx-scene{position:relative;height:172px;margin-top:-110px;pointer-events:none;user-select:none;z-index:4;--ts:1;}
  .sx-ground{position:absolute;left:-7px;bottom:0;width:calc(100% + 14px);height:40px;display:block;
    filter:drop-shadow(0 -2px 3px rgba(40,60,90,.2));}
  .sx-item{position:absolute;bottom:17px;width:calc(var(--w) * var(--ts));height:auto;display:block;overflow:visible;
    filter:drop-shadow(0 3px 3px rgba(40,50,60,.25));}

  /* animations douces */
  .sx-wing-l,.sx-wing-r{transform-box:fill-box;animation:sx-flap .3s ease-in-out infinite alternate;}
  .sx-wing-l{transform-origin:100% 50%;}
  .sx-wing-r{transform-origin:0% 50%;}
  .sx-drift{animation:sx-drift 9s ease-in-out infinite alternate;}
  .sx-gull{transform-box:fill-box;transform-origin:50% 100%;animation:sx-gull 1.1s ease-in-out infinite alternate;}
  .sx-sway{transform-origin:50% 100%;animation:sx-sway 4.5s ease-in-out infinite alternate;}
  @keyframes sx-flap{from{transform:scaleX(1);}to{transform:scaleX(.3);}}
  @keyframes sx-drift{0%{transform:translate(0,0) rotate(-6deg);}50%{transform:translate(14px,-6px) rotate(4deg);}100%{transform:translate(-6px,8px) rotate(-3deg);}}
  @keyframes sx-gull{from{transform:scaleY(1);}to{transform:scaleY(.5);}}
  @keyframes sx-sway{from{transform:rotate(-1.6deg);}to{transform:rotate(1.6deg);}}

  /* Pâques : cadre rose pastel */
  body.paques{--sx-ink:#B0407A;--sx-edge:#F3C6DA;}
  body.paques .sx-cal .cal-grid{
    border-color:#E9B8D0;
    box-shadow:0 0 0 3px rgba(255,255,255,.96),0 0 0 4px #F3C6DA,0 12px 28px rgba(190,110,150,.16);
  }
  body.paques .sx-cal .cal-dow{background:linear-gradient(#FFF6FA,var(--card));}

  /* Été : cadre turquoise */
  body.ete{--sx-ink:#C0392B;--sx-edge:#BFE3EC;}
  body.ete .sx-cal .cal-grid{
    border-color:#7CC6D9;
    box-shadow:0 0 0 3px rgba(255,255,255,.96),0 0 0 4px #9ED8E6,0 12px 28px rgba(30,120,150,.16);
  }
  body.ete .sx-cal .cal-dow{background:linear-gradient(#F0FBFF,var(--card));}

  @media (max-width:700px){
    .sx-scene{--ts:.72;height:130px;margin-top:-72px;}
    .sx-m-hide{display:none;}
    .sx-top{top:-18px;height:32px;}
  }
  @media (prefers-reduced-motion:reduce){
    .sx-wing-l,.sx-wing-r,.sx-drift,.sx-gull,.sx-sway{animation:none;}
  }
  @media print{
    .sx-canvas,.sx-flyer,.sx-top,.sx-mound,.sx-crit,.sx-scene{display:none !important;}
    body.paques .sx-cal .cal-grid,body.ete .sx-cal .cal-grid{box-shadow:none;}
  }
`;
  document.head.appendChild(st);
})();

/* ==========================================================================
   NOËL — easter egg saisonnier (flocons, calendrier enneigé, sapins, traîneau)
   Indépendant du reste de l'appli : il observe simplement #content et habille
   le calendrier quand il s'affiche. Rien n'est écrit dans Firebase.
   - Période automatique : du 1er décembre au 6 janvier (modifiable ci-dessous)
   - Bascule manuelle   : voir le script « Saisons » en fin de fichier
   ========================================================================== */
(function(){
  'use strict';

  const NOEL_DEBUT = { mois: 11, jour: 1 };   // 1er décembre (mois : 0 = janvier)
  const NOEL_FIN   = { mois: 0,  jour: 6 };   // 6 janvier (inclus)
  const TRAINEAU_PREMIER_PASSAGE_MS = 3500;   // premier passage après l'activation
  const TRAINEAU_INTERVALLE_MS = [15000, 30000]; // puis un passage toutes les 15 à 30 s

  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const content = document.getElementById('content');
  if(!content) return;

  /* ---------- Période automatique ---------- */
  function inPeriod(d){
    d = d || new Date();
    const m = d.getMonth(), j = d.getDate();
    const apresDebut = m > NOEL_DEBUT.mois || (m === NOEL_DEBUT.mois && j >= NOEL_DEBUT.jour);
    const avantFin   = m < NOEL_FIN.mois   || (m === NOEL_FIN.mois   && j <= NOEL_FIN.jour);
    return NOEL_DEBUT.mois > NOEL_FIN.mois ? (apresDebut || avantFin) : (apresDebut && avantFin);
  }

  /* ---------- Utilitaires ---------- */
  function rng(seed){ let s = seed >>> 0; return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const f1 = n => Math.round(n * 10) / 10;

  /* ==========================================================================
     1. FLOCONS (canvas) + étincelles du traîneau
     ========================================================================== */
  let canvas = null, ctx = null, W = 0, H = 0, dpr = 1;
  let flakes = [], sparks = [], sprites = null, raf = 0, lastTs = 0;

  function makeCrystal(variant, px){
    const c = document.createElement('canvas'); c.width = c.height = px;
    const g = c.getContext('2d'); if(!g) return c;
    g.translate(px / 2, px / 2);
    const R = px * 0.44;
    const branches = [
      [[0.5, 0.32, 50], [0.78, 0.2, 50]],                 // fougère
      [[0.62, 0.3, 60], [0.34, 0.16, 60]],                // plaque étoilée
      [[0.4, 0.26, 40], [0.68, 0.26, 40]]                 // aiguilles
    ][variant];
    function pass(lw, col){
      g.strokeStyle = col; g.fillStyle = col; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round';
      for(let i = 0; i < 6; i++){
        g.save(); g.rotate(i * Math.PI / 3);
        g.beginPath(); g.moveTo(0, 0); g.lineTo(R, 0);
        branches.forEach(function(b){
          const px0 = b[0] * R, L = b[1] * R, a = b[2] * Math.PI / 180;
          g.moveTo(px0, 0); g.lineTo(px0 + Math.cos(a) * L, Math.sin(a) * L);
          g.moveTo(px0, 0); g.lineTo(px0 + Math.cos(a) * L, -Math.sin(a) * L);
        });
        g.stroke();
        if(variant === 2){ g.beginPath(); g.arc(R, 0, px * 0.035, 0, 6.283); g.fill(); }
        g.restore();
      }
      if(variant === 1){
        g.beginPath();
        for(let k = 0; k < 6; k++){ const a = k * Math.PI / 3 + Math.PI / 6; g.lineTo(Math.cos(a) * R * 0.3, Math.sin(a) * R * 0.3); }
        g.closePath(); g.stroke();
      }
    }
    pass(px * 0.12, 'rgba(255,255,255,.95)');      // halo blanc (lisible sur fond clair)
    pass(px * 0.055, 'rgba(84,134,184,.95)');      // trait bleu glacé
    return c;
  }
  function makeDot(px){
    const c = document.createElement('canvas'); c.width = c.height = px;
    const g = c.getContext('2d'); if(!g) return c;
    g.beginPath(); g.arc(px / 2, px / 2, px * 0.36, 0, 6.283);
    g.fillStyle = 'rgba(255,255,255,.98)'; g.fill();
    g.lineWidth = px * 0.1; g.strokeStyle = 'rgba(110,158,204,.75)'; g.stroke();
    return c;
  }
  function buildSprites(){
    sprites = { crystals: [makeCrystal(0, 72), makeCrystal(1, 72), makeCrystal(2, 72)], dot: makeDot(24) };
  }
  function buildFlakes(){
    const n = Math.max(45, Math.min(120, Math.round(W * H / 17000)));
    flakes = [];
    for(let i = 0; i < n; i++){
      const z = Math.random();                       // profondeur : 0 = loin, 1 = près
      const crystal = Math.random() < 0.38;
      flakes.push({
        x: Math.random() * W, y: Math.random() * H, z: z, crystal: crystal,
        sprite: crystal ? sprites.crystals[i % 3] : sprites.dot,
        size: crystal ? 11 + z * 22 : 3 + z * 6,
        vy: 16 + z * 42, sway: 8 + Math.random() * 22, freq: 0.4 + Math.random() * 0.9,
        ph: Math.random() * 6.283, rot: Math.random() * 6.283, vr: (Math.random() - 0.5) * 0.9,
        alpha: 0.5 + z * 0.45
      });
    }
  }
  function sizeCanvas(){
    if(!canvas) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildFlakes();
    if(reduceMotion) drawFrame(0, 0);
  }
  function drawStar(x, y, r, rot){
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    for(let k = 0; k < 8; k++){ const rr = k % 2 ? r * 0.28 : r; const a = k * Math.PI / 4; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function drawFrame(ts, dt){
    ctx.clearRect(0, 0, W, H);
    const wind = Math.sin(ts / 4500) * 14;
    for(let i = 0; i < flakes.length; i++){
      const f = flakes[i];
      if(dt){
        f.y += f.vy * dt;
        f.x += (Math.sin(ts / 1000 * f.freq + f.ph) * f.sway + wind * f.z) * dt;
        f.rot += f.vr * dt;
        if(f.y > H + 30){ f.y = -30; f.x = Math.random() * W; }
        if(f.x < -30) f.x = W + 30; else if(f.x > W + 30) f.x = -30;
      }
      ctx.globalAlpha = f.alpha;
      if(f.crystal){
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot);
        ctx.drawImage(f.sprite, -f.size / 2, -f.size / 2, f.size, f.size); ctx.restore();
      } else {
        ctx.drawImage(f.sprite, f.x - f.size / 2, f.y - f.size / 2, f.size, f.size);
      }
    }
    // Étincelles dorées derrière le traîneau
    if(sleighEl && sleighFlying && dt){
      const r = sleighEl.getBoundingClientRect();
      for(let k = 0; k < 2; k++){
        sparks.push({
          x: r.left + r.width * (0.02 + Math.random() * 0.05), y: r.top + r.height * (0.45 + Math.random() * 0.4),
          vx: -(14 + Math.random() * 40), vy: 6 + Math.random() * 26,
          life: 0, max: 0.9 + Math.random() * 0.9, size: 3 + Math.random() * 5, rot: Math.random() * 3
        });
      }
    }
    for(let i = sparks.length - 1; i >= 0; i--){
      const p = sparks[i]; p.life += dt; if(p.life >= p.max){ sparks.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 2;
      const a = 1 - p.life / p.max;
      ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#FFFFFF'; drawStar(p.x, p.y, p.size * 1.7, p.rot);
      ctx.globalAlpha = a * 0.95; ctx.fillStyle = '#F2B632'; drawStar(p.x, p.y, p.size, p.rot);
    }
    ctx.globalAlpha = 1;
  }
  function tick(ts){
    const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016); lastTs = ts;
    drawFrame(ts, dt);
    raf = requestAnimationFrame(tick);
  }
  function startFlakes(){
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.className = 'noel-flakes'; canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
      ctx = canvas.getContext && canvas.getContext('2d');
      if(!ctx){ canvas = null; return; }
      window.addEventListener('resize', sizeCanvas);
    }
    if(!sprites) buildSprites();
    sizeCanvas();
    if(!reduceMotion && !raf){ lastTs = performance.now(); raf = requestAnimationFrame(tick); }
  }
  function stopFlakes(){
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
    sparks = [];
    if(ctx) ctx.clearRect(0, 0, W, H);
  }

  /* ==========================================================================
     2. TRAÎNEAU DU PÈRE NOËL
     ========================================================================== */
  let sleighEl = null, sleighAnim = null, sleighFlying = false, sleighTimer = 0, hohoEl = null;

  function reindeer(x, y, lead, k){
    const ph = -(k * 0.17).toFixed(2);
    const leg = function(lx, a0, a1, begin, col){
      return '<g><animateTransform attributeName="transform" type="rotate" values="' + a0 + ' ' + lx + ' 33;' + a1 + ' ' + lx + ' 33;' + a0 + ' ' + lx + ' 33" dur="0.7s" begin="' + begin + 's" repeatCount="indefinite"/>' +
        '<path d="M' + lx + ' 33 L' + (lx + 2) + ' 49" stroke="' + col + '" stroke-width="3.4" stroke-linecap="round"/>' +
        '<path d="M' + (lx + 2) + ' 49 L' + (lx + 3.3) + ' 54" stroke="#33200F" stroke-width="3.8" stroke-linecap="round"/></g>';
    };
    const nose = lead
      ? '<circle cx="67" cy="11.5" r="6.8" fill="#FF5A4D" opacity=".4"><animate attributeName="opacity" values=".12;.65;.12" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="67" cy="11.5" r="2.8" fill="#E5322A"/>'
      : '<circle cx="67" cy="11.5" r="2.4" fill="#3A2416"/>';
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;0 -2.6;0 0" dur="0.7s" begin="' + ph + 's" repeatCount="indefinite"/>' +
      leg(21, 50, 6, ph - 0.2, '#5A3520') + leg(41, -50, -6, ph - 0.2, '#5A3520') +
      '<path d="M13 22 Q3 18 4 27 Q8 25 13 28 Z" fill="#F2E6D8"/>' +
      '<ellipse cx="30" cy="25" rx="20" ry="9.5" fill="#8A5A3B"/>' +
      '<path d="M13 29 Q30 39 47 29 Q30 33 13 29 Z" fill="#E8D5BE" opacity=".9"/>' +
      leg(17, 50, 6, ph, '#6B4127') + leg(37, -50, -6, ph, '#6B4127') +
      '<path d="M42 20 L51 8 L59 12 L52 27 Z" fill="#8A5A3B"/>' +
      '<path d="M51 5 Q60 2 67 10 Q69 15 63 17 Q55 18 51 13 Z" fill="#9A6842"/>' +
      '<path d="M52 6 L47 1 L55 4 Z" fill="#7A4A2E"/>' +
      '<circle cx="58" cy="9" r="1.1" fill="#2B1A10"/>' + nose +
      '<g stroke="#D9B98B" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M55 4 Q53 -4 57 -10"/><path d="M54.5 -1 L49 -4"/><path d="M55.5 -5 L61 -7.5"/><path d="M57 -10 L55 -14"/><path d="M57 -10 L61 -12"/></g>' +
      '<path d="M43 20 Q41 28 44 33" stroke="#C62828" stroke-width="2" fill="none"/><circle cx="44" cy="33.5" r="1.9" fill="#FFD54F"/>' +
      '</g>';
  }
  function sleighSvg(){
    const team = [[190, 34], [268, 24], [346, 14], [424, 4]];
    let reins = '';
    team.forEach(function(t, i){
      const tx = t[0] + 43, ty = t[1] + 22;
      reins += '<path d="M128 56 Q' + f1((128 + tx) / 2) + ' ' + f1(Math.max(56, ty) + 9) + ' ' + tx + ' ' + ty + '" stroke="#7E2A2A" stroke-width="1.1" fill="none" opacity=".85"/>';
    });
    let deer = '';
    // de la queue à la tête : le dernier dessiné (meneur) est au premier plan
    team.forEach(function(t, i){ deer += reindeer(t[0], t[1], i === team.length - 1, i); });
    return '<svg viewBox="-8 -22 528 152" xmlns="http://www.w3.org/2000/svg" role="presentation">' +
      reins + deer +
      // sac de cadeaux
      '<path d="M16 58 Q8 40 20 30 Q30 24 42 30 Q54 40 48 58 Z" fill="#8D6E63" stroke="#6D4C41" stroke-width="1"/>' +
      '<path d="M22 32 Q30 26 41 32" stroke="#F2C14E" stroke-width="2" fill="none"/>' +
      '<rect x="20" y="19" width="15" height="13" rx="1.5" fill="#2E7D32"/><rect x="26" y="19" width="3" height="13" fill="#FFD54F"/>' +
      '<rect x="37" y="23" width="11" height="10" rx="1.5" fill="#1E88E5"/><rect x="41" y="23" width="3" height="10" fill="#fff"/>' +
      // Père Noël
      '<path d="M70 62 Q68 44 80 40 Q96 36 104 46 Q110 54 108 62 Z" fill="#D32F2F"/>' +
      '<circle cx="90" cy="30" r="9.5" fill="#F6CDA8"/>' +
      '<path d="M80.5 31 Q82 48 90 50.5 Q98 48 99.5 31 Q95 40 90 40 Q85 40 80.5 31 Z" fill="#fff"/>' +
      '<circle cx="97" cy="32.5" r="2.2" fill="#EFA08A"/><circle cx="93.5" cy="28.5" r="1.2" fill="#222"/>' +
      '<path d="M80 26 Q81 10 93 10 Q101 11 101 26 Z" fill="#D32F2F"/>' +
      '<path d="M88 11 Q76 6 73 18" stroke="#D32F2F" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<rect x="78.5" y="23.5" width="24" height="6.5" rx="3.2" fill="#fff"/>' +
      '<circle cx="73" cy="20.5" r="4.6" fill="#fff"/>' +
      '<path d="M100 47 Q114 50 126 55" stroke="#D32F2F" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<circle cx="128.5" cy="56" r="4.7" fill="#2B2B2B"/>' +
      // traîneau
      '<path d="M4 112 L140 112 Q160 112 158 96" stroke="#B8860B" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M4 112 Q-5 110 0 102" stroke="#B8860B" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M38 99 L36 112 M112 99 L114 112" stroke="#B8860B" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M14 58 L122 58 Q140 58 146 46 Q152 50 150 58 Q150 72 140 86 Q130 99 110 99 L44 99 Q16 99 14 76 Z" fill="#C62828"/>' +
      '<path d="M14 58 L122 58 Q140 58 146 46" stroke="#F2C14E" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M22 84 Q80 92 140 79" stroke="#F2C14E" stroke-width="2" fill="none" opacity=".85"/>' +
      '<path d="M20 70 Q60 76 104 70" stroke="#E57373" stroke-width="1.4" fill="none" opacity=".7"/>' +
      '</svg>';
  }
  function ensureSleigh(){
    if(sleighEl) return;
    sleighEl = document.createElement('div');
    sleighEl.className = 'noel-sleigh'; sleighEl.setAttribute('aria-hidden', 'true');
    sleighEl.innerHTML = '<div class="noel-hoho">Ho ho ho&nbsp;!</div>' + sleighSvg();
    hohoEl = sleighEl.querySelector('.noel-hoho');
    document.body.appendChild(sleighEl);
  }
  function flySleigh(){
    if(!active || reduceMotion || sleighFlying) return;
    ensureSleigh();
    sleighEl.style.display = 'block';
    const vw = window.innerWidth, vh = window.innerHeight, w = sleighEl.offsetWidth;
    const dist = vw + w + 80;
    const dur = Math.max(7500, Math.min(14000, dist / 170 * 1000));
    const y0 = vh * (0.1 + Math.random() * 0.2);
    const N = 36, frames = [];
    for(let i = 0; i <= N; i++){
      const t = i / N;
      const x = -w - 40 + t * dist;
      const y = y0 + Math.sin(t * Math.PI * 2.4) * vh * 0.035 - t * vh * 0.05;
      const tilt = -2.5 - Math.cos(t * Math.PI * 2.4) * 2;
      frames.push({ transform: 'translate(' + f1(x) + 'px,' + f1(y) + 'px) rotate(' + f1(tilt) + 'deg)', offset: t });
    }
    sleighFlying = true;
    sleighAnim = sleighEl.animate(frames, { duration: dur, easing: 'linear', fill: 'forwards' });
    if(hohoEl && hohoEl.animate){
      hohoEl.animate([
        { opacity: 0, transform: 'translateY(8px) scale(.9)' },
        { opacity: 1, transform: 'translateY(0) scale(1)', offset: .12 },
        { opacity: 1, transform: 'translateY(0) scale(1)', offset: .8 },
        { opacity: 0, transform: 'translateY(-4px) scale(.96)' }
      ], { duration: 2600, delay: dur * 0.38, fill: 'both' });
    }
    sleighAnim.onfinish = function(){
      const a = sleighAnim; sleighAnim = null; sleighFlying = false;
      if(a){ a.onfinish = a.oncancel = null; a.cancel(); }
      sleighEl.style.display = 'none';
      scheduleSleigh(false);
    };
  }
  function scheduleSleigh(first){
    clearTimeout(sleighTimer);
    if(!active || reduceMotion) return;
    const d = first ? TRAINEAU_PREMIER_PASSAGE_MS
      : TRAINEAU_INTERVALLE_MS[0] + Math.random() * (TRAINEAU_INTERVALLE_MS[1] - TRAINEAU_INTERVALLE_MS[0]);
    sleighTimer = setTimeout(function(){
      if(document.hidden){ scheduleSleigh(false); return; }
      flySleigh();
    }, d);
  }
  function stopSleigh(){
    clearTimeout(sleighTimer);
    if(sleighAnim){ const a = sleighAnim; sleighAnim = null; a.onfinish = a.oncancel = null; a.cancel(); }
    sleighFlying = false;
    if(sleighEl) sleighEl.style.display = 'none';
  }

  /* ==========================================================================
     3. CALENDRIER ENNEIGÉ + SAPINS DÉCORÉS
     ========================================================================== */
  function capPath(){
    const r = rng(7); let d = 'M0 14 ', x = 0;
    while(x < 1200){
      const nx = Math.min(1200, x + 60 + r() * 80);
      d += 'Q ' + f1((x + nx) / 2) + ' ' + f1(2 + r() * 4) + ' ' + f1(nx) + ' ' + f1(9 + r() * 7) + ' ';
      x = nx;
    }
    d += 'L1200 24 ';
    x = 1200;
    while(x > 0){
      const seg = 36 + r() * 50, nx = Math.max(0, x - seg), y = 22 + r() * 4;
      if(r() < 0.42 && seg > 44){
        const xm = (x + nx) / 2, tip = 30 + r() * 7;
        d += 'Q ' + f1(x - seg * 0.15) + ' ' + f1(y + 4) + ' ' + f1(xm + 5) + ' ' + f1(y + 1) +
             ' L ' + f1(xm) + ' ' + f1(tip) + ' L ' + f1(xm - 5) + ' ' + f1(y + 1) +
             ' Q ' + f1(nx + seg * 0.15) + ' ' + f1(y + 4) + ' ' + f1(nx) + ' ' + f1(y) + ' ';
      } else {
        d += 'Q ' + f1((x + nx) / 2) + ' ' + f1(y + 7) + ' ' + f1(nx) + ' ' + f1(y) + ' ';
      }
      x = nx;
    }
    return d + 'Z';
  }
  function moundPath(){
    const r = rng(23); let d = 'M0 30 L0 16 ', x = 0;
    while(x < 1200){
      const nx = Math.min(1200, x + 70 + r() * 110);
      d += 'Q ' + f1((x + nx) / 2) + ' ' + f1(-1 + r() * 7) + ' ' + f1(nx) + ' ' + f1(12 + r() * 6) + ' ';
      x = nx;
    }
    return d + 'L1200 30 Z';
  }
  function capSvg(){
    const d = capPath();
    return '<svg class="noel-cap" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + '" transform="translate(0 2.5)" fill="#CADDEC"/>' +
      '<path d="' + d + '" fill="#fff" stroke="#B5CFE3" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function moundSvg(){
    const d = moundPath();
    return '<svg class="noel-mound" viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + '" fill="#fff" stroke="#B5CFE3" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function groundSvg(){
    const r = rng(41); let d = 'M0 40 L0 16 ', x = 0;
    while(x < 1200){
      const nx = Math.min(1200, x + 90 + r() * 120);
      d += 'Q ' + f1((x + nx) / 2) + ' ' + f1(3 + r() * 10) + ' ' + f1(nx) + ' ' + f1(14 + r() * 6) + ' ';
      x = nx;
    }
    d += 'L1200 40 Z';
    return '<svg class="noel-ground" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + '" fill="#fff" stroke="#B5CFE3" stroke-width="1.2" vector-effect="non-scaling-stroke"/>' +
      '<path d="M0 40 L0 32 Q300 26 600 33 T1200 30 L1200 40 Z" fill="#E3EEF7"/></svg>';
  }

  let treeUid = 0;
  const BULBS = ['#E53935', '#FFC83D', '#42A5F5', '#AB47BC', '#FF7043', '#26C6DA'];
  function treeSvg(seed){
    const r = rng(seed), id = 'noelg' + (++treeUid);
    const tiers = [{ ay: 16, by: 56, hw: 22 }, { ay: 38, by: 92, hw: 33 }, { ay: 62, by: 126, hw: 45 }];
    let s = '<svg class="noel-tree" viewBox="0 0 100 146" aria-hidden="true" style="--w:__W__">' +
      '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="#1A5839"/><stop offset=".55" stop-color="#2A7B4C"/><stop offset="1" stop-color="#3D9562"/></linearGradient></defs>' +
      '<ellipse cx="50" cy="143" rx="27" ry="3.4" fill="rgba(80,120,160,.22)"/>' +
      '<rect x="44" y="124" width="12" height="19" rx="2" fill="#7A4B2A"/>';
    for(let i = 2; i >= 0; i--){
      const t = tiers[i], ay = t.ay, by = t.by, hw = t.hw, H_ = by - ay;
      s += '<path d="M50 ' + ay + ' L' + (50 - hw) + ' ' + by + ' Q' + (50 - hw / 2) + ' ' + (by + 8) + ' 50 ' + by +
           ' Q' + (50 + hw / 2) + ' ' + (by + 8) + ' ' + (50 + hw) + ' ' + by + ' Z" fill="url(#' + id + ')" stroke="#14452C" stroke-width="1" stroke-linejoin="round"/>';
      // neige sur la tranche
      const tt = i === 0 ? 0.5 : 0.33, px = hw * tt, ly = ay + H_ * tt;
      s += '<path d="M50 ' + (ay - 0.5) + ' L' + f1(50 - px) + ' ' + f1(ly) + ' L' + f1(50 - px * .55) + ' ' + f1(ly - H_ * .05) +
           ' L' + f1(50 - px * .12) + ' ' + f1(ly + H_ * .045) + ' L' + f1(50 + px * .3) + ' ' + f1(ly - H_ * .04) +
           ' L' + f1(50 + px * .62) + ' ' + f1(ly + H_ * .03) + ' L' + f1(50 + px) + ' ' + f1(ly) + ' Z" fill="#fff" stroke="#BBD2E3" stroke-width=".6" stroke-linejoin="round"/>';
      s += '<path d="M' + (50 - hw) + ' ' + by + ' Q' + (50 - hw / 2) + ' ' + (by + 8) + ' 50 ' + by + ' Q' + (50 + hw / 2) + ' ' + (by + 8) + ' ' + (50 + hw) + ' ' + by +
           '" fill="none" stroke="#fff" stroke-width="2.3" stroke-dasharray="6 5" stroke-linecap="round" opacity=".92"/>';
      // guirlande + ampoules
      const tg = 0.64, ax = 50 - hw * tg, bx = 50 + hw * tg, gy = ay + H_ * tg, cy = gy + 15;
      s += '<path d="M' + f1(ax) + ' ' + f1(gy) + ' Q50 ' + f1(cy) + ' ' + f1(bx) + ' ' + f1(gy) + '" fill="none" stroke="#F3C64F" stroke-width="1.6" stroke-linecap="round" opacity=".95"/>';
      const n = i === 0 ? 3 : 5, c0 = Math.floor(r() * BULBS.length);
      for(let k = 0; k < n; k++){
        const u = (k + 1) / (n + 1);
        const bxp = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * 50 + u * u * bx;
        const byp = (1 - u) * (1 - u) * gy + 2 * (1 - u) * u * cy + u * u * gy;
        s += '<circle class="noel-bulb" cx="' + f1(bxp) + '" cy="' + f1(byp + 1.2) + '" r="2.3" fill="' + BULBS[(c0 + k) % BULBS.length] + '" style="animation-delay:-' + f1(r() * 1.7) + 's"/>';
      }
      // boules
      if(i > 0){
        [[50 - hw * .6, by - 4, 0], [50 + hw * .55, by - 3, 3]].forEach(function(b, q){
          const col = BULBS[(c0 + 2 + q * 2) % BULBS.length];
          s += '<line x1="' + f1(b[0]) + '" y1="' + f1(b[1] - 6) + '" x2="' + f1(b[0]) + '" y2="' + f1(b[1] - 3.4) + '" stroke="#F3C64F" stroke-width=".8"/>' +
               '<circle cx="' + f1(b[0]) + '" cy="' + f1(b[1]) + '" r="3.6" fill="' + col + '" stroke="rgba(0,0,0,.18)" stroke-width=".5"/>' +
               '<circle cx="' + f1(b[0] - 1.1) + '" cy="' + f1(b[1] - 1.2) + '" r="1" fill="#fff" opacity=".8"/>';
        });
      }
    }
    // étoile
    let star = '';
    for(let k = 0; k < 10; k++){
      const a = (-90 + k * 36) * Math.PI / 180, rr = k % 2 ? 3.6 : 8;
      star += f1(50 + Math.cos(a) * rr) + ',' + f1(12 + Math.sin(a) * rr) + ' ';
    }
    s += '<circle class="noel-starglow" cx="50" cy="12" r="11" fill="rgba(255,214,90,.5)"/>' +
         '<polygon points="' + star + '" fill="#FFD54A" stroke="#D99A14" stroke-width=".8" stroke-linejoin="round"/></svg>';
    return s;
  }
  function giftSvg(box, rib){
    return '<svg class="noel-gift" viewBox="0 0 30 28" aria-hidden="true">' +
      '<rect x="2" y="10" width="26" height="17" rx="2" fill="' + box + '" stroke="rgba(0,0,0,.15)" stroke-width=".6"/>' +
      '<rect x="2" y="10" width="26" height="5" rx="2" fill="rgba(255,255,255,.22)"/>' +
      '<rect x="13" y="10" width="4" height="17" fill="' + rib + '"/>' +
      '<path d="M15 10 Q9 1 6 6 Q5 10 15 10 Z M15 10 Q21 1 24 6 Q25 10 15 10 Z" fill="' + rib + '" stroke="rgba(0,0,0,.15)" stroke-width=".5"/></svg>';
  }
  const TREES = [
    { l: 1.5, w: 80, s: 11 }, { l: 10.5, w: 56, s: 23, hide: 1 }, { l: 22, w: 104, s: 37 }, { l: 37, w: 66, s: 49, hide: 1 },
    { l: 50, w: 98, s: 61 }, { l: 65, w: 58, s: 73, hide: 1 }, { l: 77, w: 90, s: 88 }, { l: 91, w: 62, s: 97, hide: 1 }
  ];
  const GIFTS = [
    { l: 8.2, a: '#D32F2F', b: '#FFD54F' }, { l: 31.5, a: '#1E88E5', b: '#fff', hide: 1 },
    { l: 58.6, a: '#7B1FA2', b: '#FFD54F' }, { l: 85.4, a: '#2E7D32', b: '#FFCDD2', hide: 1 }
  ];
  function sceneHtml(){
    let h = '<div class="noel-scene" aria-hidden="true">' + groundSvg();
    TREES.forEach(function(t){
      const svg = treeSvg(t.s).replace('class="noel-tree"', 'class="noel-tree' + (t.hide ? ' noel-m-hide' : '') + '"')
        .replace('style="--w:__W__"', 'style="--w:' + t.w + 'px;left:' + t.l + '%"');
      h += svg;
    });
    GIFTS.forEach(function(g){
      h += giftSvg(g.a, g.b).replace('class="noel-gift"', 'class="noel-gift' + (g.hide ? ' noel-m-hide' : '') + '" style="left:' + g.l + '%"');
    });
    return h + '</div>';
  }

  function decorate(){
    if(!active) return;
    const grid = content.querySelector(':scope > .cal-grid');
    if(!grid) return;
    const wrap = document.createElement('div');
    wrap.className = 'noel-cal';
    content.insertBefore(wrap, grid);
    wrap.appendChild(grid);
    wrap.insertAdjacentHTML('afterbegin', capSvg());
    wrap.insertAdjacentHTML('beforeend', moundSvg());
    wrap.insertAdjacentHTML('afterend', sceneHtml());
  }
  function undecorate(){
    content.querySelectorAll('.noel-cal').forEach(function(wrap){
      const grid = wrap.querySelector('.cal-grid');
      if(grid) wrap.parentNode.insertBefore(grid, wrap);
      wrap.remove();
    });
    content.querySelectorAll('.noel-scene').forEach(function(n){ n.remove(); });
  }
  new MutationObserver(function(){ if(active) decorate(); }).observe(content, { childList: true });

  /* ==========================================================================
     4. ACTIVATION (pilotée par le script « Saisons »)
     ========================================================================== */
  let active = false;
  function setActive(on){
    if(on === active) return;
    active = on;
    document.body.classList.toggle('noel', on);
    if(on){
      startFlakes();
      decorate();
      scheduleSleigh(true);
    } else {
      stopFlakes();
      stopSleigh();
      undecorate();
    }
  }

  (window.AGENDA_SAISONS = window.AGENDA_SAISONS || {}).noel = {
    inPeriod: inPeriod,
    setActive: setActive,
    accueil: function(){ setTimeout(flySleigh, 700); },
    message: '🎄 Joyeux Noël !'
  };
})();

/* ==========================================================================
   HALLOWEEN — easter egg saisonnier (feuilles, calendrier ensorcelé, citrouilles,
   sorcière sur son balai). Indépendant du reste de l'appli, comme le décor de Noël.
   - Période automatique : du 15 octobre au 2 novembre (modifiable ci-dessous)
   - Bascule manuelle    : voir le script « Saisons » en fin de fichier
   ========================================================================== */
(function(){
  'use strict';

  const DEBUT = { mois: 9,  jour: 15 };   // 15 octobre (mois : 0 = janvier)
  const FIN   = { mois: 10, jour: 2 };    // 2 novembre (inclus)
  const SORCIERE_PREMIER_PASSAGE_MS = 3500;
  const SORCIERE_INTERVALLE_MS = [18000, 35000];   // puis un passage toutes les 18 à 35 s

  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const content = document.getElementById('content');
  if(!content) return;

  function inPeriod(d){
    d = d || new Date();
    const m = d.getMonth(), j = d.getDate();
    const apres = m > DEBUT.mois || (m === DEBUT.mois && j >= DEBUT.jour);
    const avant = m < FIN.mois   || (m === FIN.mois   && j <= FIN.jour);
    return apres && avant;
  }
  function rng(seed){ let s = seed >>> 0; return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const f1 = n => Math.round(n * 10) / 10;

  /* ==========================================================================
     1. FEUILLES D'AUTOMNE (canvas) + chauves-souris + étincelles magiques
     ========================================================================== */
  let canvas = null, ctx = null, W = 0, H = 0, dpr = 1;
  let leaves = [], sparks = [], sprites = null, raf = 0, lastTs = 0;
  const LEAF_COLORS = ['#D9601A', '#E8A317', '#B8401E', '#C98A12', '#8E4B1C', '#E0781F'];

  function leafSprite(shape, color, px){
    const c = document.createElement('canvas'); c.width = c.height = px;
    const g = c.getContext('2d'); if(!g) return c;
    g.translate(px / 2, px / 2);
    const R = px * 0.42, rad = Math.PI / 180;
    g.fillStyle = color; g.strokeStyle = 'rgba(70,30,10,.55)'; g.lineWidth = px * 0.03;
    g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath();
    if(shape === 0){                                   // érable
      for(let k = 0; k < 5; k++){
        const a = (-90 + k * 72) * rad, Rk = k === 0 ? R : R * 0.92;
        [[a - 16 * rad, 0.6], [a, 1], [a + 16 * rad, 0.6], [a + 36 * rad, 0.36]].forEach(function(p){
          g.lineTo(Math.cos(p[0]) * Rk * p[1], Math.sin(p[0]) * Rk * p[1]);
        });
      }
      g.closePath();
    } else if(shape === 1){                            // feuille simple
      g.moveTo(0, -R); g.quadraticCurveTo(R * 0.85, -R * 0.2, 0, R * 0.8);
      g.quadraticCurveTo(-R * 0.85, -R * 0.2, 0, -R); g.closePath();
    } else {                                           // feuille ronde
      g.moveTo(0, -R * 0.9); g.bezierCurveTo(R * 1.1, -R * 0.9, R * 1.1, R * 0.5, 0, R * 0.8);
      g.bezierCurveTo(-R * 1.1, R * 0.5, -R * 1.1, -R * 0.9, 0, -R * 0.9); g.closePath();
    }
    g.fill(); g.stroke();
    g.beginPath(); g.strokeStyle = 'rgba(70,30,10,.5)';
    if(shape === 0){
      for(let k = 0; k < 5; k++){ const a = (-90 + k * 72) * rad; g.moveTo(0, 0); g.lineTo(Math.cos(a) * R * 0.85, Math.sin(a) * R * 0.85); }
      g.moveTo(0, 0); g.lineTo(0, R * 1.05);
    } else {
      g.moveTo(0, -R * 0.85); g.lineTo(0, R * 1.05);
      [-0.4, 0, 0.35].forEach(function(t){
        g.moveTo(0, t * R); g.lineTo(R * 0.45, t * R - R * 0.3);
        g.moveTo(0, t * R); g.lineTo(-R * 0.45, t * R - R * 0.3);
      });
    }
    g.stroke();
    return c;
  }
  function buildSprites(){
    sprites = [];
    for(let s = 0; s < 3; s++){ sprites.push(LEAF_COLORS.map(function(col){ return leafSprite(s, col, 56); })); }
  }
  function buildLeaves(){
    const n = Math.max(26, Math.min(70, Math.round(W * H / 26000)));
    leaves = [];
    for(let i = 0; i < n; i++){
      const z = Math.random();
      leaves.push({
        x: Math.random() * W, y: Math.random() * H, z: z,
        sprite: sprites[i % 3][Math.floor(Math.random() * LEAF_COLORS.length)],
        size: 14 + z * 20, vy: 16 + z * 34, sway: 16 + Math.random() * 34,
        freq: 0.5 + Math.random() * 0.9, ph: Math.random() * 6.283,
        rot0: Math.random() * 6.283, flip: Math.random() * 6.283, fq: 1 + Math.random() * 1.6,
        alpha: 0.72 + z * 0.26
      });
    }
  }
  function sizeCanvas(){
    if(!canvas) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildLeaves();
    if(reduceMotion) drawFrame(0, 0);
  }
  function drawStar(x, y, r, rot){
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    for(let k = 0; k < 8; k++){ const rr = k % 2 ? r * 0.28 : r; const a = k * Math.PI / 4; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function drawBat(x, y, size, flap){
    ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#2A1B3A';
    [-1, 1].forEach(function(s){
      const ty = -size * 0.55 * flap;
      ctx.beginPath(); ctx.moveTo(0, -size * 0.1);
      ctx.quadraticCurveTo(s * size * 0.5, -size * 0.45 - size * 0.45 * flap, s * size, ty);
      ctx.quadraticCurveTo(s * size * 0.88, ty + size * 0.3, s * size * 0.72, ty * 0.55 + size * 0.36);
      ctx.quadraticCurveTo(s * size * 0.6, size * 0.22, s * size * 0.46, size * 0.3);
      ctx.quadraticCurveTo(s * size * 0.3, size * 0.18, s * size * 0.14, size * 0.32);
      ctx.lineTo(0, size * 0.3); ctx.closePath(); ctx.fill();
    });
    ctx.beginPath(); ctx.ellipse(0, size * 0.12, size * 0.14, size * 0.26, 0, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -size * 0.16, size * 0.13, 0, 6.283); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-size * 0.11, -size * 0.22); ctx.lineTo(-size * 0.13, -size * 0.42); ctx.lineTo(-size * 0.02, -size * 0.27);
    ctx.moveTo(size * 0.11, -size * 0.22); ctx.lineTo(size * 0.13, -size * 0.42); ctx.lineTo(size * 0.02, -size * 0.27);
    ctx.fill();
    ctx.restore();
  }
  const BATS = [
    { dx: -70, dy: -10, s: 18, ph: 0 }, { dx: -125, dy: 24, s: 14, ph: 1.3 }, { dx: -175, dy: -20, s: 20, ph: 2.1 },
    { dx: -225, dy: 14, s: 13, ph: 0.7 }, { dx: -275, dy: -4, s: 16, ph: 1.9 }
  ];
  const SPARK_COLORS = ['#9B59B6', '#7ED957', '#F39C12'];

  function drawFrame(ts, dt){
    ctx.clearRect(0, 0, W, H);
    const wind = Math.sin(ts / 5000) * 16;
    for(let i = 0; i < leaves.length; i++){
      const l = leaves[i];
      if(dt){
        l.y += l.vy * dt;
        l.x += (Math.sin(ts / 1000 * l.freq + l.ph) * l.sway + wind * (0.4 + l.z)) * dt;
        if(l.y > H + 30){ l.y = -30; l.x = Math.random() * W; }
        if(l.x < -30) l.x = W + 30; else if(l.x > W + 30) l.x = -30;
      }
      const ang = l.rot0 + Math.sin(ts / 1000 * l.freq + l.ph) * 0.8;
      const sx = 0.4 + 0.6 * Math.abs(Math.cos(ts / 1000 * l.fq + l.flip));
      ctx.globalAlpha = l.alpha;
      ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(ang); ctx.scale(sx, 1);
      ctx.drawImage(l.sprite, -l.size / 2, -l.size / 2, l.size, l.size); ctx.restore();
    }
    ctx.globalAlpha = 1;
    if(witchEl && witchFlying){
      const r = witchEl.getBoundingClientRect(), k = r.width / 300;
      if(dt){
        for(let n = 0; n < 2; n++){
          sparks.push({
            x: r.left + r.width * (0.02 + Math.random() * 0.05), y: r.top + r.height * (0.5 + Math.random() * 0.4),
            vx: -(14 + Math.random() * 40), vy: 6 + Math.random() * 26, life: 0, max: 0.9 + Math.random() * 0.9,
            size: 3 + Math.random() * 4.5, rot: Math.random() * 3, col: SPARK_COLORS[Math.floor(Math.random() * 3)]
          });
        }
      }
      for(let i = 0; i < BATS.length; i++){
        const b = BATS[i];
        drawBat(r.left + r.width * 0.02 + b.dx * k + Math.sin(ts / 420 + b.ph) * 10,
                r.top + r.height * 0.42 + b.dy * k + Math.sin(ts / 330 + b.ph * 2) * 16,
                b.s * Math.max(0.8, k), Math.sin(ts / 90 + b.ph * 3));
      }
    }
    for(let i = sparks.length - 1; i >= 0; i--){
      const p = sparks[i]; p.life += dt; if(p.life >= p.max){ sparks.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 2;
      const a = 1 - p.life / p.max;
      ctx.globalAlpha = a * 0.5; ctx.fillStyle = '#FFFFFF'; drawStar(p.x, p.y, p.size * 1.7, p.rot);
      ctx.globalAlpha = a * 0.95; ctx.fillStyle = p.col; drawStar(p.x, p.y, p.size, p.rot);
    }
    ctx.globalAlpha = 1;
  }
  function tick(ts){
    const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016); lastTs = ts;
    drawFrame(ts, dt);
    raf = requestAnimationFrame(tick);
  }
  function startLeaves(){
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.className = 'hw-leaves'; canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
      ctx = canvas.getContext && canvas.getContext('2d');
      if(!ctx){ canvas = null; return; }
      window.addEventListener('resize', sizeCanvas);
    }
    if(!sprites) buildSprites();
    sizeCanvas();
    if(!reduceMotion && !raf){ lastTs = performance.now(); raf = requestAnimationFrame(tick); }
  }
  function stopLeaves(){
    if(raf){ cancelAnimationFrame(raf); raf = 0; }
    sparks = [];
    if(ctx) ctx.clearRect(0, 0, W, H);
  }

  /* ==========================================================================
     2. SORCIÈRE SUR SON BALAI (avec son chat noir)
     ========================================================================== */
  let witchEl = null, witchAnim = null, witchFlying = false, witchTimer = 0, cackleEl = null;

  function witchSvg(){
    return '<svg viewBox="-20 -32 290 142" xmlns="http://www.w3.org/2000/svg" role="presentation">' +
      // balai
      '<path d="M28 70 L-8 56 L-14 68 L-10 78 L-14 88 L-6 96 L28 82 Z" fill="#D8B45E" stroke="#9A7A2E" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="M26 72 L-8 62 M26 76 L-12 74 M26 80 L-10 86 M26 83 L-6 94" stroke="#A88436" stroke-width="1.2" stroke-linecap="round" fill="none"/>' +
      '<path d="M30 76 L250 62" stroke="#6B4A2A" stroke-width="6.5" stroke-linecap="round"/>' +
      '<path d="M30 74 L250 60" stroke="#8B6238" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M26 68 L26 84" stroke="#7B4B24" stroke-width="6" stroke-linecap="round"/>' +
      // cheveux et jupe (derrière)
      '<path d="M160 26 Q138 26 118 42 Q132 40 140 46 Q128 52 122 62 Q144 54 158 44 Z" fill="#D9541E"/>' +
      '<path d="M150 60 L120 68 L112 78 L124 80 L118 90 L134 86 L132 96 L150 88 L162 80 Z" fill="#47206B"/>' +
      // chat noir
      '<path d="M90 68 Q68 62 74 42" stroke="#1B1024" stroke-width="4.2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="98" cy="56" rx="10.5" ry="15" fill="#1B1024"/>' +
      '<circle cx="99" cy="38" r="8.5" fill="#1B1024"/>' +
      '<path d="M92 34 L90.5 23 L98 30 Z M106 34 L108 23 L100 30 Z" fill="#1B1024"/>' +
      '<ellipse cx="95.8" cy="38" rx="1.9" ry="2.4" fill="#FFD23F"/><ellipse cx="102.4" cy="38" rx="1.9" ry="2.4" fill="#FFD23F"/>' +
      // sorcière : jambes, buste, bras
      '<path d="M158 70 L160 92" stroke="#2A1B3D" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M156 91 Q168 89 172 95 Q170 99 157 98 Z" fill="#1B1024"/>' +
      '<path d="M166 70 L172 90" stroke="#3A2A4F" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M168 89 Q181 86 187 93 Q185 98 170 97 Z" fill="#1B1024"/>' +
      '<path d="M156 42 Q172 40 180 54 L176 70 L150 70 Q146 52 156 42 Z" fill="#6A36A0"/>' +
      '<path d="M150 62 L178 62" stroke="#F2B632" stroke-width="3"/>' +
      '<path d="M174 48 L190 62" stroke="#6A36A0" stroke-width="8" stroke-linecap="round"/>' +
      '<circle cx="191" cy="63" r="4.3" fill="#8BC34A"/>' +
      // tête
      '<circle cx="168" cy="30" r="11" fill="#9CCC65"/>' +
      '<path d="M177 29 Q191 33 189 38 Q182 38 177 36 Z" fill="#7CB342"/>' +
      '<circle cx="172" cy="26" r="2.6" fill="#fff"/><circle cx="173" cy="26.4" r="1.2" fill="#2B1B3D"/>' +
      '<path d="M168 21.5 L176 23" stroke="#2B1B3D" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M170 38 Q175 41.5 179 38" stroke="#3B2A1A" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="165" cy="34" r="2.4" fill="#F48FB1" opacity=".55"/>' +
      // chapeau
      '<ellipse cx="168" cy="19" rx="21" ry="5.2" fill="#1B1024"/>' +
      '<path d="M151 18 Q155 2 158 -10 Q161 -20 149 -26 Q167 -25 171 -9 Q175 4 186 18 Z" fill="#1B1024"/>' +
      '<path d="M152.5 12 Q168 18 184 12" stroke="#7E3FB8" stroke-width="5" fill="none"/>' +
      '<rect x="164.5" y="11.5" width="7" height="6.5" rx="1" fill="none" stroke="#F2B632" stroke-width="1.6"/>' +
      '</svg>';
  }
  function ensureWitch(){
    if(witchEl) return;
    witchEl = document.createElement('div');
    witchEl.className = 'hw-witch'; witchEl.setAttribute('aria-hidden', 'true');
    witchEl.innerHTML = '<div class="hw-cackle">Hi hi hi&nbsp;!</div>' + witchSvg();
    cackleEl = witchEl.querySelector('.hw-cackle');
    document.body.appendChild(witchEl);
  }
  function flyWitch(){
    if(!active || reduceMotion || witchFlying) return;
    ensureWitch();
    witchEl.style.display = 'block';
    const vw = window.innerWidth, vh = window.innerHeight, w = witchEl.offsetWidth;
    const dist = vw + w + 80 + 340;                        // + la volée de chauves-souris derrière
    const dur = Math.max(7000, Math.min(13000, dist / 185 * 1000));
    const y0 = vh * (0.12 + Math.random() * 0.2);
    const N = 40, frames = [];
    for(let i = 0; i <= N; i++){
      const t = i / N;
      const x = -w - 40 + t * dist;
      const y = y0 + Math.sin(t * Math.PI * 3.2) * vh * 0.06 - t * vh * 0.04;
      const tilt = -4 + Math.cos(t * Math.PI * 3.2) * 6;
      frames.push({ transform: 'translate(' + f1(x) + 'px,' + f1(y) + 'px) rotate(' + f1(tilt) + 'deg)', offset: t });
    }
    witchFlying = true;
    witchAnim = witchEl.animate(frames, { duration: dur, easing: 'linear', fill: 'forwards' });
    if(cackleEl && cackleEl.animate){
      cackleEl.animate([
        { opacity: 0, transform: 'translateY(8px) scale(.9)' },
        { opacity: 1, transform: 'translateY(0) scale(1)', offset: .12 },
        { opacity: 1, transform: 'translateY(0) scale(1)', offset: .8 },
        { opacity: 0, transform: 'translateY(-4px) scale(.96)' }
      ], { duration: 2400, delay: dur * 0.3, fill: 'both' });
    }
    witchAnim.onfinish = function(){
      const a = witchAnim; witchAnim = null; witchFlying = false;
      if(a){ a.onfinish = a.oncancel = null; a.cancel(); }
      witchEl.style.display = 'none';
      scheduleWitch(false);
    };
  }
  function scheduleWitch(first){
    clearTimeout(witchTimer);
    if(!active || reduceMotion) return;
    const d = first ? SORCIERE_PREMIER_PASSAGE_MS
      : SORCIERE_INTERVALLE_MS[0] + Math.random() * (SORCIERE_INTERVALLE_MS[1] - SORCIERE_INTERVALLE_MS[0]);
    witchTimer = setTimeout(function(){
      if(document.hidden){ scheduleWitch(false); return; }
      flyWitch();
    }, d);
  }
  function stopWitch(){
    clearTimeout(witchTimer);
    if(witchAnim){ const a = witchAnim; witchAnim = null; a.onfinish = a.oncancel = null; a.cancel(); }
    witchFlying = false;
    if(witchEl) witchEl.style.display = 'none';
  }

  /* ==========================================================================
     3. CALENDRIER ENSORCELÉ + CIMETIÈRE DE CITROUILLES
     ========================================================================== */
  function grassPath(w, h, yMin, yMax, seed, step){
    const r = rng(seed); let d = 'M0 ' + h + ' L0 ' + f1(yMax) + ' ', x = 0;
    while(x < w){
      const sw = step * (0.6 + r() * 0.9), peak = yMin + r() * (yMax - yMin) * 0.55;
      d += 'L ' + f1(x + sw / 2) + ' ' + f1(peak) + ' L ' + f1(Math.min(w, x + sw)) + ' ' + f1(yMax - r() * 3) + ' ';
      x += sw;
    }
    return d + 'L' + f1(w) + ' ' + h + ' Z';
  }
  function buntingSvg(w){
    const n = Math.max(2, Math.round(w / 190)), seg = w / n;
    const cols = ['#F28C1E', '#7A3FA0', '#26182F', '#6FBF3B'];
    let str = 'M0 7 ', flags = '', ci = 0;
    for(let i = 0; i < n; i++){
      const x0 = i * seg, x1 = x0 + seg, cx = (x0 + x1) / 2;
      str += 'Q ' + f1(cx) + ' 29 ' + f1(x1) + ' 7 ';
      const m = Math.max(4, Math.round(seg / 26));
      for(let k = 1; k <= m; k++){
        const u = k / (m + 1);
        const bx = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * x1;
        const by = (1 - u) * (1 - u) * 7 + 2 * (1 - u) * u * 29 + u * u * 7;
        flags += '<path d="M' + f1(bx - 9) + ' ' + f1(by - 0.5) + ' L' + f1(bx + 9) + ' ' + f1(by - 0.5) + ' L' + f1(bx) + ' ' + f1(by + 17) +
                 ' Z" fill="' + cols[ci++ % cols.length] + '" stroke="rgba(30,15,45,.35)" stroke-width=".8" stroke-linejoin="round"/>';
      }
    }
    return '<svg class="hw-bunting hw-band" data-kind="bunting" viewBox="0 0 ' + f1(w) + ' 40" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + str + '" fill="none" stroke="#3A2A4D" stroke-width="1.6"/>' + flags + '</svg>';
  }
  function moundSvg(w){
    return '<svg class="hw-mound hw-band" data-kind="mound" viewBox="0 0 ' + f1(w) + ' 26" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + grassPath(w, 26, 3, 15, 23, 9) + '" fill="#34234A" stroke="#5A4378" stroke-width="1"/></svg>';
  }
  function groundSvg(w){
    return '<svg class="hw-ground hw-band" data-kind="ground" viewBox="0 0 ' + f1(w) + ' 40" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + grassPath(w, 40, 4, 19, 41, 11) + '" fill="#34234A" stroke="#5A4378" stroke-width="1"/>' +
      '<rect x="0" y="30" width="' + f1(w) + '" height="10" fill="#261838"/></svg>';
  }
  function webSvg(flip){
    const R = 58, n = 6, pts = [];
    let s = '<svg class="hw-web' + (flip ? ' hw-web-r' : '') + '" viewBox="0 0 60 60" aria-hidden="true">' +
            '<g fill="none" stroke="rgba(85,65,110,.62)" stroke-width=".9" stroke-linecap="round">';
    for(let k = 0; k < n; k++){
      const a = k * (90 / (n - 1)) * Math.PI / 180; pts.push([Math.cos(a), Math.sin(a)]);
      s += '<path d="M0 0 L' + f1(Math.cos(a) * R) + ' ' + f1(Math.sin(a) * R) + '"/>';
    }
    [0.22, 0.4, 0.6, 0.8, 1].forEach(function(rr){
      for(let k = 0; k < n - 1; k++){
        const a = pts[k], b = pts[k + 1];
        const x1 = a[0] * R * rr, y1 = a[1] * R * rr, x2 = b[0] * R * rr, y2 = b[1] * R * rr;
        s += '<path d="M' + f1(x1) + ' ' + f1(y1) + ' Q' + f1((x1 + x2) / 2 * 0.86) + ' ' + f1((y1 + y2) / 2 * 0.86) + ' ' + f1(x2) + ' ' + f1(y2) + '"/>';
      }
    });
    return s + '</g></svg>';
  }
  function spiderSvg(len, leftPct, dur, delay){
    const by = len + 12, body = '#2B1B3D';
    let legs = '';
    for(let i = 0; i < 4; i++){
      const y0 = len + 8 + i * 2.4, yq = y0 - 4 + i * 1.5, ye = y0 + 5 + i * 1.5;
      legs += '<path d="M7 ' + f1(y0) + ' Q2 ' + f1(yq) + ' 0.8 ' + f1(ye) + ' M17 ' + f1(y0) + ' Q22 ' + f1(yq) + ' 23.2 ' + f1(ye) + '"/>';
    }
    return '<svg class="hw-spider" style="left:' + leftPct + '%;animation-duration:' + dur + 's;animation-delay:-' + delay + 's" viewBox="0 0 24 ' + (len + 26) + '" aria-hidden="true">' +
      '<path d="M12 0 L12 ' + len + '" stroke="rgba(58,42,77,.75)" stroke-width="1"/>' +
      '<g fill="none" stroke="' + body + '" stroke-width="1.3" stroke-linecap="round">' + legs + '</g>' +
      '<ellipse cx="12" cy="' + by + '" rx="6" ry="7" fill="' + body + '"/>' +
      '<circle cx="12" cy="' + f1(len + 4.6) + '" r="3.6" fill="' + body + '"/>' +
      '<circle cx="10.6" cy="' + f1(len + 4) + '" r=".9" fill="#FF7A2B"/><circle cx="13.4" cy="' + f1(len + 4) + '" r=".9" fill="#FF7A2B"/>' +
      '<circle cx="12" cy="' + f1(len + 14) + '" r="1.7" fill="#E8731A"/></svg>';
  }

  /* ---- décor du cimetière ---- */
  let uid = 0;
  function svgItem(vb, inner, cls, style){
    return '<svg class="hw-item ' + (cls || '') + '" viewBox="' + vb + '" style="' + style + '" aria-hidden="true">' + inner + '</svg>';
  }
  const FACES = {
    1: '<path d="M27 47 L41 47 L34 33 Z M59 47 L73 47 L66 33 Z M50 51 L46 58 L54 58 Z"/>' +
       '<path d="M25 62 Q50 84 75 62 L69 61 L65 69 L58 62 L50 71 L42 62 L35 69 L31 61 Z"/>',
    2: '<path d="M26 36 L41 46 L27 52 Z M74 36 L59 46 L73 52 Z M50 52 L47 58 L53 58 Z"/>' +
       '<path d="M27 64 L34 60 L40 68 L46 61 L50 69 L54 61 L60 68 L66 60 L73 64 Q62 80 50 80 Q38 80 27 64 Z"/>',
    3: '<circle cx="36" cy="44" r="6"/><circle cx="64" cy="44" r="6"/><path d="M28 60 Q50 84 72 60 Q50 70 28 60 Z"/>'
  };
  function pumpkinInner(face){
    const id = 'hwp' + (++uid);
    let s = '<defs>' +
      '<radialGradient id="' + id + 'b" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#FFA93B"/><stop offset="1" stop-color="#E0650E"/></radialGradient>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#FFF3B0"/><stop offset=".6" stop-color="#FFC93C"/><stop offset="1" stop-color="#F08A1C"/></radialGradient></defs>';
    if(face) s += '<ellipse class="hw-flicker" cx="50" cy="52" rx="52" ry="42" fill="#FFC23D" opacity=".2" style="animation-delay:-' + f1(Math.random() * 2.4) + 's"/>';
    s += '<ellipse cx="30" cy="54" rx="28" ry="33" fill="#DD660F" stroke="#A9480A" stroke-width="1"/>' +
         '<ellipse cx="70" cy="54" rx="28" ry="33" fill="#DD660F" stroke="#A9480A" stroke-width="1"/>' +
         '<ellipse cx="50" cy="54" rx="26" ry="36" fill="url(#' + id + 'b)" stroke="#B9510E" stroke-width="1"/>' +
         '<path d="M38 19 Q30 54 38 88 M62 19 Q70 54 62 88" stroke="#C45A10" stroke-width="1.2" fill="none" opacity=".7"/>' +
         '<path d="M46 19 Q44 6 53 2 L58 7 Q52 9 54 19 Z" fill="#5E7A2B" stroke="#3F5419" stroke-width="1" stroke-linejoin="round"/>';
    if(face) s += '<g class="hw-flicker" fill="url(#' + id + 'g)" stroke="#7A3206" stroke-width="1" stroke-linejoin="round" style="animation-delay:-' + f1(Math.random() * 2.4) + 's">' + FACES[face] + '</g>';
    return s;
  }
  function ghostInner(){
    return '<path d="M10 52 Q-1 54 3 62 Q9 60 12 57 Z M50 52 Q61 54 57 62 Q51 60 48 57 Z" fill="#fff" stroke="#A99CC4" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="M8 78 L8 34 Q8 6 30 6 Q52 6 52 34 L52 78 L44 70 L37 78 L30 70 L23 78 L16 70 Z" fill="#fff" stroke="#A99CC4" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<ellipse cx="22" cy="33" rx="3.6" ry="5.6" fill="#2B1B3D"/><ellipse cx="38" cy="33" rx="3.6" ry="5.6" fill="#2B1B3D"/>' +
      '<ellipse cx="30" cy="48" rx="4" ry="6" fill="#2B1B3D"/>' +
      '<circle cx="15" cy="42" r="3" fill="#F8BBD0" opacity=".6"/><circle cx="45" cy="42" r="3" fill="#F8BBD0" opacity=".6"/>';
  }
  function tombInner(){
    return '<path d="M6 80 L6 30 Q6 6 30 6 Q54 6 54 30 L54 80 Z" fill="#8C8AA3" stroke="#5D5A75" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M12 78 L12 31 Q12 13 26 11" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="30" y="38" text-anchor="middle" font-family="\'IBM Plex Mono\',monospace" font-weight="700" font-size="12" fill="#4A4862">R.I.P</text>' +
      '<path d="M41 6 L37 18 L43 27 L39 36" fill="none" stroke="#5D5A75" stroke-width="1.1"/>' +
      '<path d="M-2 80 L2 70 L6 80 L11 68 L15 80 L45 80 L49 69 L53 80 L58 71 L62 80 Z" fill="#34234A"/>';
  }
  function treeInner(){
    return '<g fill="none" stroke="#2B1B38" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M50 146 L48 96 Q44 72 40 54" stroke-width="9"/>' +
      '<path d="M48 82 Q34 66 22 40" stroke-width="5"/><path d="M48 82 Q62 66 80 34" stroke-width="5"/>' +
      '<path d="M48 100 Q30 92 14 96" stroke-width="4"/><path d="M49 94 Q68 88 86 90" stroke-width="4"/>' +
      '<path d="M22 40 L12 26 M22 40 L29 22 M80 34 L91 22 M80 34 L72 18 M40 54 L28 50" stroke-width="2.6"/></g>' +
      '<path d="M38 146 Q50 134 62 146 Z" fill="#2B1B38"/>' +
      '<path d="M14 96 L14 104 M86 90 L86 98" stroke="#2B1B38" stroke-width="1.2"/>' +
      '<g class="hw-flicker"><circle cx="14" cy="108" r="6" fill="#F58A24" stroke="#A9480A" stroke-width="1"/><path d="M11.5 107 L13.5 107 L12.5 104.5 Z M14.5 107 L16.5 107 L15.5 104.5 Z M11.5 110.5 Q14 113 16.5 110.5" fill="#FFE27A"/></g>' +
      '<g class="hw-flicker" style="animation-delay:-1.2s"><circle cx="86" cy="102" r="6" fill="#F58A24" stroke="#A9480A" stroke-width="1"/><path d="M83.5 101 L85.5 101 L84.5 98.5 Z M86.5 101 L88.5 101 L87.5 98.5 Z M83.5 104.5 Q86 107 88.5 104.5" fill="#FFE27A"/></g>' +
      '<g transform="translate(22 41)"><path d="M0 0 Q-5 6 -4 13 Q0 17 4 13 Q5 6 0 0 Z" fill="#1D1228"/><path d="M-3 12 L-5 16 M3 12 L5 16" stroke="#1D1228" stroke-width="1.6" stroke-linecap="round"/></g>';
  }
  function candySvg(col, col2, left, hide){
    return '<svg class="hw-candy' + (hide ? ' hw-m-hide' : '') + '" viewBox="0 0 34 20" style="left:' + left + '%" aria-hidden="true">' +
      '<path d="M9 10 L1 3 L2 17 Z M25 10 L33 3 L32 17 Z" fill="' + col2 + '" stroke="rgba(0,0,0,.18)" stroke-width=".6" stroke-linejoin="round"/>' +
      '<ellipse cx="17" cy="10" rx="9" ry="7" fill="' + col + '" stroke="rgba(0,0,0,.2)" stroke-width=".7"/>' +
      '<path d="M12 4.5 Q10 10 12 15.5 M17 3.2 L17 16.8 M22 4.5 Q24 10 22 15.5" stroke="rgba(255,255,255,.55)" stroke-width="1.4" fill="none"/></svg>';
  }
  const ITEMS = [
    { t: 'pumpkin', face: 1, l: 1,  w: 86 },
    { t: 'tomb',    l: 11.5, w: 52, hide: 1 },
    { t: 'tree',    l: 18,   w: 112 },
    { t: 'pumpkin', face: 0, l: 33, w: 58, hide: 1 },
    { t: 'ghost',   l: 41,   w: 58, float: 1 },
    { t: 'pumpkin', face: 2, l: 51, w: 104 },
    { t: 'tomb',    l: 65,   w: 56, hide: 1 },
    { t: 'pumpkin', face: 3, l: 73, w: 78 },
    { t: 'tree',    l: 85.5, w: 96, hide: 1 },
    { t: 'pumpkin', face: 1, l: 94.5, w: 52, hide: 1 }
  ];
  function itemHtml(it){
    const cls = (it.hide ? 'hw-m-hide ' : '') + (it.float ? 'hw-float' : '');
    let style = '--w:' + it.w + 'px;left:' + it.l + '%;';
    if(it.t === 'pumpkin') return svgItem('0 0 100 92', pumpkinInner(it.face), cls, style);
    if(it.t === 'ghost')   return svgItem('0 0 60 80', ghostInner(), cls, style + 'bottom:38px;');
    if(it.t === 'tomb')    return svgItem('0 0 60 80', tombInner(), cls, style);
    return svgItem('0 0 100 150', treeInner(), cls, style);
  }
  function sceneHtml(w){
    let h = '<div class="hw-scene" aria-hidden="true">' + groundSvg(w);
    ITEMS.forEach(function(it){ h += itemHtml(it); });
    h += candySvg('#7B1FA2', '#CE93D8', 9, 0) + candySvg('#F58A24', '#FFD180', 30, 1) +
         candySvg('#2E7D32', '#A5D6A7', 59, 0) + candySvg('#C62828', '#EF9A9A', 83, 1);
    return h + '</div>';
  }

  function decorate(){
    if(!active) return;
    const grid = content.querySelector(':scope > .cal-grid');
    if(!grid) return;
    const wrap = document.createElement('div');
    wrap.className = 'hw-cal';
    content.insertBefore(wrap, grid);
    wrap.appendChild(grid);
    const w = Math.max(300, Math.round(wrap.clientWidth || content.clientWidth || 1200)) + 14;
    wrap.insertAdjacentHTML('afterbegin', buntingSvg(w) + webSvg(false) + webSvg(true) +
      spiderSvg(34, 11, 3.4, 0.6) + spiderSvg(52, 63, 4.1, 2));
    wrap.insertAdjacentHTML('beforeend', moundSvg(w));
    wrap.insertAdjacentHTML('afterend', sceneHtml(w));
  }
  function undecorate(){
    content.querySelectorAll('.hw-cal').forEach(function(wrap){
      const grid = wrap.querySelector('.cal-grid');
      if(grid) wrap.parentNode.insertBefore(grid, wrap);
      wrap.remove();
    });
    content.querySelectorAll('.hw-scene').forEach(function(n){ n.remove(); });
  }
  new MutationObserver(function(){ if(active) decorate(); }).observe(content, { childList: true });

  // Les bandes (fanions, herbe) sont calculées à la largeur réelle : on les refait si la fenêtre change.
  let resizeTimer = 0;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      if(!active) return;
      const wrap = content.querySelector('.hw-cal'); if(!wrap) return;
      const w = Math.max(300, Math.round(wrap.clientWidth)) + 14;
      content.querySelectorAll('.hw-band').forEach(function(el){
        const k = el.getAttribute('data-kind');
        el.outerHTML = k === 'bunting' ? buntingSvg(w) : (k === 'mound' ? moundSvg(w) : groundSvg(w));
      });
    }, 200);
  });

  /* ==========================================================================
     4. ACTIVATION (pilotée par le script « Saisons »)
     ========================================================================== */
  let active = false;
  function setActive(on){
    if(on === active) return;
    active = on;
    document.body.classList.toggle('halloween', on);
    if(on){
      startLeaves();
      decorate();
      scheduleWitch(true);
    } else {
      stopLeaves();
      stopWitch();
      undecorate();
    }
  }

  (window.AGENDA_SAISONS = window.AGENDA_SAISONS || {}).halloween = {
    inPeriod: inPeriod,
    setActive: setActive,
    accueil: function(){ setTimeout(flyWitch, 700); },
    message: '🎃 Joyeux Halloween !'
  };
})();

/* ==========================================================================
   PÂQUES et ÉTÉ — easter eggs saisonniers, bâtis sur un petit moteur commun
   - Pâques : des 15 jours avant Pâques jusqu'au lundi de Pâques (date calculée)
   - Été    : du 21 juin au 31 août
   Le moteur gère : particules (canvas), passage en vol, habillage du calendrier,
   décor sous le calendrier, activation. Chaque saison ne décrit que ses dessins.
   ========================================================================== */
(function(){
  'use strict';

  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const content = document.getElementById('content');
  if(!content) return;

  let uid = 0;
  function rng(seed){ let s = seed >>> 0; return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const f1 = n => Math.round(n * 10) / 10;

  /* ---------- outils de dessin communs ---------- */
  function grassPath(w, h, yMin, yMax, seed, step){
    const r = rng(seed); let d = 'M0 ' + h + ' L0 ' + f1(yMax) + ' ', x = 0;
    while(x < w){
      const sw = step * (0.6 + r() * 0.9), peak = yMin + r() * (yMax - yMin) * 0.55;
      d += 'L ' + f1(x + sw / 2) + ' ' + f1(peak) + ' L ' + f1(Math.min(w, x + sw)) + ' ' + f1(yMax - r() * 3) + ' ';
      x += sw;
    }
    return d + 'L' + f1(w) + ' ' + h + ' Z';
  }
  function wavePath(w, h, yMin, yMax, seed, segMin, segMax){
    const r = rng(seed); let d = 'M0 ' + h + ' L0 ' + f1((yMin + yMax) / 2) + ' ', x = 0;
    while(x < w){
      const nx = Math.min(w, x + segMin + r() * (segMax - segMin));
      d += 'Q ' + f1((x + nx) / 2) + ' ' + f1(yMin + r() * (yMax - yMin)) + ' ' + f1(nx) + ' ' + f1(yMin + r() * (yMax - yMin)) + ' ';
      x = nx;
    }
    return d + 'L' + f1(w) + ' ' + h + ' Z';
  }
  function band(cls, w, h, inner){
    return '<svg class="' + cls + '" viewBox="0 0 ' + f1(w) + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' + inner + '</svg>';
  }
  function item(vb, inner, o){
    const cls = 'sx-item' + (o.hide ? ' sx-m-hide' : '') + (o.cls ? ' ' + o.cls : '');
    return '<svg class="' + cls + '" viewBox="' + vb + '" style="--w:' + o.w + 'px;left:' + o.l + '%;' + (o.style || '') + '" aria-hidden="true">' + inner + '</svg>';
  }
  function crit(vb, inner, o){
    return '<svg class="sx-crit ' + (o.cls || '') + '" viewBox="' + vb + '" style="left:' + o.l + '%;top:' + o.t + 'px;width:' + o.w +
           'px;animation-delay:-' + (o.d || 0) + 's" aria-hidden="true">' + inner + '</svg>';
  }
  function drawStar(ctx, x, y, r, rot){
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    for(let k = 0; k < 8; k++){ const rr = k % 2 ? r * 0.28 : r; const a = k * Math.PI / 4; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function newCanvas(px){ const c = document.createElement('canvas'); c.width = c.height = px; return c; }

  /* mouvements de particules réutilisables */
  function fall(p, ts, dt, W, H, wind){
    p.y += p.vy * dt;
    p.x += (Math.sin(ts / 1000 * p.freq + p.ph) * p.sway + wind * (0.4 + p.z)) * dt;
    if(p.y > H + 30){ p.y = -30; p.x = Math.random() * W; }
    if(p.x < -30) p.x = W + 30; else if(p.x > W + 30) p.x = -30;
  }
  function drawFlutter(ctx, p, ts){
    const ang = p.rot0 + Math.sin(ts / 1000 * p.freq + p.ph) * 0.8;
    const sx = 0.4 + 0.6 * Math.abs(Math.cos(ts / 1000 * p.fq + p.flip));
    ctx.globalAlpha = p.alpha;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang); ctx.scale(sx, 1);
    ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
  }
  function basePart(z, W, H){
    return { x: Math.random() * W, y: Math.random() * H, z: z, ph: Math.random() * 6.283, freq: 0.5 + Math.random() * 0.9,
             rot0: Math.random() * 6.283, flip: Math.random() * 6.283, fq: 1 + Math.random() * 1.6 };
  }

  /* ==========================================================================
     MOTEUR
     ========================================================================== */
  function creerDecor(cfg){
    let active = false, canvas = null, ctx = null, W = 0, H = 0, dpr = 1;
    let parts = [], sprites = null, st = {}, raf = 0, lastTs = 0;
    let flyEl = null, flyAnim = null, flying = false, flyTimer = 0, resizeTimer = 0;

    /* ---- canvas ---- */
    function sizeCanvas(){
      if(!canvas) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = [];
      const n = cfg.particles.count(W, H);
      for(let i = 0; i < n; i++) parts.push(cfg.particles.make(i, W, H, sprites));
      if(reduceMotion) drawFrame(0, 0);
    }
    function drawFrame(ts, dt){
      ctx.clearRect(0, 0, W, H);
      const wind = Math.sin(ts / 5000) * 14;
      for(let i = 0; i < parts.length; i++){
        if(dt) cfg.particles.step(parts[i], ts, dt, W, H, wind);
        cfg.particles.draw(ctx, parts[i], ts);
      }
      ctx.globalAlpha = 1;
      if(cfg.extras) cfg.extras(ctx, flying && flyEl ? flyEl.getBoundingClientRect() : null, ts, dt, st, W, H, sprites);
      ctx.globalAlpha = 1;
    }
    function tick(ts){
      const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016); lastTs = ts;
      drawFrame(ts, dt);
      raf = requestAnimationFrame(tick);
    }
    function startCanvas(){
      if(!canvas){
        canvas = document.createElement('canvas');
        canvas.className = 'sx-canvas'; canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
        ctx = canvas.getContext && canvas.getContext('2d');
        if(!ctx){ canvas = null; return; }
        window.addEventListener('resize', function(){ if(active) sizeCanvas(); });
      }
      canvas.style.display = 'block';
      if(!sprites) sprites = cfg.buildSprites();
      st = {};
      sizeCanvas();
      if(!reduceMotion && !raf){ lastTs = performance.now(); raf = requestAnimationFrame(tick); }
    }
    function stopCanvas(){
      if(raf){ cancelAnimationFrame(raf); raf = 0; }
      st = {};
      if(ctx) ctx.clearRect(0, 0, W, H);
      if(canvas) canvas.style.display = 'none';
    }

    /* ---- passage en vol ---- */
    function ensureFlyer(){
      if(flyEl) return;
      flyEl = document.createElement('div');
      flyEl.className = 'sx-flyer ' + cfg.flyer.cls; flyEl.setAttribute('aria-hidden', 'true');
      flyEl.innerHTML = (cfg.flyer.bubble ? '<div class="sx-bubble" style="left:' + cfg.flyer.bubble.left + ';top:' + cfg.flyer.bubble.top + '">' + cfg.flyer.bubble.text + '</div>' : '') + cfg.flyer.html();
      document.body.appendChild(flyEl);
    }
    function fly(){
      if(!active || reduceMotion || flying) return;
      ensureFlyer();
      flyEl.style.display = 'block';
      const vw = window.innerWidth, vh = window.innerHeight, w = flyEl.offsetWidth;
      const path = cfg.flyer.path(vw, vh, w, flyEl.offsetHeight);
      flying = true;
      flyAnim = flyEl.animate(path.frames, { duration: path.dur, easing: 'linear', fill: 'forwards' });
      const bub = flyEl.querySelector('.sx-bubble');
      if(bub && bub.animate){
        bub.animate([
          { opacity: 0, transform: 'translateY(8px) scale(.9)' },
          { opacity: 1, transform: 'translateY(0) scale(1)', offset: .12 },
          { opacity: 1, transform: 'translateY(0) scale(1)', offset: .8 },
          { opacity: 0, transform: 'translateY(-4px) scale(.96)' }
        ], { duration: 2400, delay: path.dur * cfg.flyer.bubble.at, fill: 'both' });
      }
      flyAnim.onfinish = function(){
        const a = flyAnim; flyAnim = null; flying = false;
        if(a){ a.onfinish = a.oncancel = null; a.cancel(); }
        flyEl.style.display = 'none';
        schedule(false);
      };
    }
    function schedule(first){
      clearTimeout(flyTimer);
      if(!active || reduceMotion) return;
      const d = first ? cfg.first : cfg.between[0] + Math.random() * (cfg.between[1] - cfg.between[0]);
      flyTimer = setTimeout(function(){ if(document.hidden){ schedule(false); return; } fly(); }, d);
    }
    function stopFly(){
      clearTimeout(flyTimer);
      if(flyAnim){ const a = flyAnim; flyAnim = null; a.onfinish = a.oncancel = null; a.cancel(); }
      flying = false;
      if(flyEl) flyEl.style.display = 'none';
    }

    /* ---- calendrier + scène ---- */
    function decorate(){
      if(!active) return;
      const grid = content.querySelector(':scope > .cal-grid');
      if(!grid) return;
      const wrap = document.createElement('div');
      wrap.className = 'sx-cal';
      content.insertBefore(wrap, grid);
      wrap.appendChild(grid);
      const w = Math.max(300, Math.round(wrap.clientWidth || content.clientWidth || 1200)) + 14;
      const d = cfg.deco(w);
      wrap.insertAdjacentHTML('afterbegin', d.top);
      wrap.insertAdjacentHTML('beforeend', d.bottom);
      wrap.insertAdjacentHTML('afterend', '<div class="sx-scene" aria-hidden="true">' + d.scene + '</div>');
    }
    function undecorate(){
      content.querySelectorAll('.sx-cal').forEach(function(wrap){
        const grid = wrap.querySelector('.cal-grid');
        if(grid) wrap.parentNode.insertBefore(grid, wrap);
        wrap.remove();
      });
      content.querySelectorAll('.sx-scene').forEach(function(n){ n.remove(); });
    }
    new MutationObserver(function(){ if(active) decorate(); }).observe(content, { childList: true });
    window.addEventListener('resize', function(){      // les bandes sont calculées à la largeur réelle
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){ if(active && content.querySelector('.sx-cal')){ undecorate(); decorate(); } }, 200);
    });

    function setActive(on){
      if(on === active) return;
      active = on;
      document.body.classList.toggle(cfg.id, on);
      if(on){ startCanvas(); decorate(); schedule(true); }
      else { stopCanvas(); stopFly(); undecorate(); }
    }

    (window.AGENDA_SAISONS = window.AGENDA_SAISONS || {})[cfg.id] = {
      inPeriod: cfg.inPeriod,
      setActive: setActive,
      accueil: function(){ setTimeout(fly, 700); },
      message: cfg.message
    };
  }

  /* ==========================================================================
     PÂQUES — pétales, lapin et son panier d'œufs, guirlande d'œufs, prairie
     ========================================================================== */
  function paquesDate(an){                         // algorithme de Meeus/Jones/Butcher
    const a = an % 19, b = Math.floor(an / 100), c = an % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(an, mois - 1, jour);
  }
  const EGG = 'M0 -13 C8 -13 10 3 10 6 C10 12 6 15 0 15 C-6 15 -10 12 -10 6 C-10 3 -8 -13 0 -13 Z';
  const EGG_COLORS = ['#F8BBD0', '#B3E5FC', '#FFF59D', '#C8E6C9', '#E1BEE7', '#FFCCBC'];
  const EGG_PATTERNS = [
    '<rect x="-11" y="-2" width="22" height="4.2" fill="#fff" opacity=".85"/><rect x="-11" y="7" width="22" height="2.4" fill="#fff" opacity=".6"/>',
    '<path d="M-11 0 L-7 -3.5 L-3 0 L1 -3.5 L5 0 L9 -3.5 L12 0" stroke="#fff" stroke-width="2" fill="none" opacity=".9"/><path d="M-11 8 L-7 4.5 L-3 8 L1 4.5 L5 8 L9 4.5 L12 8" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>',
    '<g fill="#fff" opacity=".85"><circle cx="-4" cy="-4" r="1.7"/><circle cx="4" cy="-6" r="1.7"/><circle cx="0" cy="2" r="1.9"/><circle cx="-5" cy="8" r="1.7"/><circle cx="5" cy="6" r="1.7"/><circle cx="0" cy="-9" r="1.4"/></g>',
    '<circle cx="0" cy="3" r="4.2" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="0" cy="3" r="1.4" fill="#fff"/><path d="M-11 -5 L11 -5 M-11 11 L11 11" stroke="#fff" stroke-width="1.4" opacity=".8"/>'
  ];
  function eggG(color, kind, tf){
    const id = 'sxe' + (++uid);
    return '<g transform="' + tf + '"><clipPath id="' + id + '"><path d="' + EGG + '"/></clipPath>' +
      '<path d="' + EGG + '" fill="' + color + '" stroke="rgba(120,70,90,.4)" stroke-width="1"/>' +
      '<g clip-path="url(#' + id + ')">' + EGG_PATTERNS[kind % 4] + '</g>' +
      '<ellipse cx="-4" cy="-4" rx="2" ry="4" fill="#fff" opacity=".4" transform="rotate(15 -4 -4)"/></g>';
  }
  function eggSprite(color, kind){
    const px = 44, c = newCanvas(px), g = c.getContext('2d'); if(!g) return c;
    g.translate(px / 2, px / 2 + 1); g.scale(1.3, 1.3);
    const p = new Path2D(EGG);
    g.fillStyle = color; g.fill(p); g.lineWidth = 1; g.strokeStyle = 'rgba(120,70,90,.45)'; g.stroke(p);
    g.save(); g.clip(p); g.fillStyle = '#fff'; g.globalAlpha = 0.85;
    if(kind % 2 === 0){ g.fillRect(-11, -2, 22, 4.2); g.fillRect(-11, 7, 22, 2.4); }
    else { [[-4, -4], [4, -6], [0, 2], [-5, 8], [5, 6]].forEach(function(q){ g.beginPath(); g.arc(q[0], q[1], 1.8, 0, 6.283); g.fill(); }); }
    g.restore();
    return c;
  }
  function petalSprite(shape, color){
    const px = 44, c = newCanvas(px), g = c.getContext('2d'); if(!g) return c;
    g.translate(px / 2, px / 2);
    const R = px * 0.4;
    g.fillStyle = color; g.strokeStyle = 'rgba(170,90,130,.55)'; g.lineWidth = 1.2; g.lineJoin = 'round';
    if(shape === 0){
      g.beginPath(); g.moveTo(0, -R * 0.6);
      g.bezierCurveTo(R * 0.9, -R * 1.15, R * 1.1, R * 0.4, 0, R);
      g.bezierCurveTo(-R * 1.1, R * 0.4, -R * 0.9, -R * 1.15, 0, -R * 0.6);
      g.closePath(); g.fill(); g.stroke();
    } else {
      for(let k = 0; k < 5; k++){
        g.save(); g.rotate(k * 1.2566);
        g.beginPath(); g.ellipse(0, -R * 0.5, R * 0.3, R * 0.5, 0, 0, 6.283); g.fill(); g.stroke(); g.restore();
      }
      g.fillStyle = '#FFC93C'; g.beginPath(); g.arc(0, 0, R * 0.2, 0, 6.283); g.fill();
    }
    return c;
  }
  const PETAL_COLORS = ['#F8BBD0', '#FFFFFF', '#F48FB1', '#FFF59D', '#E1BEE7', '#B3E5FC'];

  function rabbitSvg(){
    const S = '#D6CFE6';
    return '<svg viewBox="0 0 160 135" xmlns="http://www.w3.org/2000/svg" role="presentation">' +
      '<circle cx="17" cy="84" r="9.5" fill="#fff" stroke="' + S + '" stroke-width="1.5"/>' +
      '<ellipse cx="38" cy="104" rx="19" ry="11" fill="#fff" stroke="' + S + '" stroke-width="1.5" transform="rotate(-12 38 104)"/>' +
      '<ellipse cx="22" cy="117" rx="15" ry="5.5" fill="#fff" stroke="' + S + '" stroke-width="1.5" transform="rotate(-6 22 117)"/>' +
      '<ellipse cx="58" cy="84" rx="37" ry="24" fill="#fff" stroke="' + S + '" stroke-width="1.5"/>' +
      '<ellipse cx="62" cy="95" rx="24" ry="11" fill="#F6EEF8"/>' +
      '<g transform="rotate(-14 88 30)"><ellipse cx="88" cy="26" rx="7" ry="23" fill="#fff" stroke="' + S + '" stroke-width="1.5"/><ellipse cx="88" cy="28" rx="3.4" ry="16" fill="#F8BBD0"/></g>' +
      '<g transform="rotate(16 104 30)"><ellipse cx="104" cy="25" rx="7" ry="22" fill="#fff" stroke="' + S + '" stroke-width="1.5"/><ellipse cx="104" cy="27" rx="3.4" ry="15" fill="#F8BBD0"/></g>' +
      '<ellipse cx="113" cy="64" rx="9" ry="7" fill="#fff" stroke="' + S + '" stroke-width="1.2"/>' +
      '<ellipse cx="97" cy="58" rx="21" ry="18" fill="#fff" stroke="' + S + '" stroke-width="1.5"/>' +
      '<ellipse cx="111" cy="63" rx="8" ry="6" fill="#fff"/>' +
      '<circle cx="120" cy="61" r="2.8" fill="#F48FB1"/>' +
      '<circle cx="101" cy="53" r="2.8" fill="#3A2A4A"/><circle cx="102" cy="52" r="1" fill="#fff"/>' +
      '<circle cx="107" cy="66" r="4.2" fill="#F8BBD0" opacity=".55"/>' +
      '<path d="M112 68 Q116 70 120 67" stroke="#B88AA6" fill="none" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M116 63 L132 59 M116 65 L133 66" stroke="#B9A8C9" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="M104 100 Q122 62 142 100" fill="none" stroke="#8D6E3C" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M103 100 L145 100 L139 124 Q124 129 109 124 Z" fill="#C99A55" stroke="#8D6E3C" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M105 108 L143 108 M107 116 L141 116 M116 100 L114 125 M124 100 L124 127 M133 100 L135 125" stroke="#A97B3A" stroke-width="1"/>' +
      '<ellipse cx="112" cy="96" rx="6.5" ry="8.5" fill="#F48FB1" transform="rotate(-14 112 96)"/><path d="M106 95 L118 92" stroke="#fff" stroke-width="2" opacity=".8"/>' +
      '<ellipse cx="124" cy="93" rx="6.5" ry="8.5" fill="#81D4FA"/><path d="M118 92 L130 92 M118 97 L130 97" stroke="#fff" stroke-width="1.6" opacity=".8"/>' +
      '<ellipse cx="136" cy="96" rx="6.5" ry="8.5" fill="#FFE082" transform="rotate(14 136 96)"/><circle cx="136" cy="93" r="1.6" fill="#fff"/><circle cx="133" cy="98" r="1.6" fill="#fff"/><circle cx="139" cy="98" r="1.6" fill="#fff"/>' +
      '<path d="M82 88 Q102 84 124 82" stroke="' + S + '" stroke-width="11" stroke-linecap="round" fill="none"/>' +
      '<path d="M82 88 Q102 84 124 82" stroke="#fff" stroke-width="8.5" stroke-linecap="round" fill="none"/>' +
      '<circle cx="124" cy="82" r="5.2" fill="#fff" stroke="' + S + '" stroke-width="1.2"/>' +
      '</svg>';
  }
  function eggGarland(w){
    const n = Math.max(2, Math.round(w / 190)), seg = w / n;
    let str = 'M0 7 ', eggs = '', ci = 0;
    for(let i = 0; i < n; i++){
      const x0 = i * seg, x1 = x0 + seg, cx = (x0 + x1) / 2;
      str += 'Q ' + f1(cx) + ' 29 ' + f1(x1) + ' 7 ';
      const m = Math.max(4, Math.round(seg / 28));
      for(let k = 1; k <= m; k++){
        const u = k / (m + 1);
        const bx = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * x1;
        const by = (1 - u) * (1 - u) * 7 + 2 * (1 - u) * u * 29 + u * u * 7;
        eggs += '<path d="M' + f1(bx) + ' ' + f1(by) + ' L' + f1(bx) + ' ' + f1(by + 3) + '" stroke="#8A6D8F" stroke-width="1"/>' +
                eggG(EGG_COLORS[ci % 6], ci, 'translate(' + f1(bx) + ' ' + f1(by + 11) + ') scale(.64)');
        ci++;
      }
    }
    return band('sx-top', w, 44, '<path d="' + str + '" fill="none" stroke="#8A6D8F" stroke-width="1.5"/>' + eggs);
  }
  function butterfly(c1, c2, dots){
    return '<g class="sx-wing-l"><ellipse cx="9" cy="8" rx="8" ry="7" fill="' + c1 + '" stroke="rgba(80,40,70,.45)" stroke-width=".8"/><ellipse cx="10" cy="16" rx="6" ry="5" fill="' + c2 + '" stroke="rgba(80,40,70,.45)" stroke-width=".8"/><circle cx="8" cy="8" r="2" fill="' + dots + '"/></g>' +
      '<g class="sx-wing-r"><ellipse cx="21" cy="8" rx="8" ry="7" fill="' + c1 + '" stroke="rgba(80,40,70,.45)" stroke-width=".8"/><ellipse cx="20" cy="16" rx="6" ry="5" fill="' + c2 + '" stroke="rgba(80,40,70,.45)" stroke-width=".8"/><circle cx="22" cy="8" r="2" fill="' + dots + '"/></g>' +
      '<ellipse cx="15" cy="11" rx="1.5" ry="8" fill="#3A2A4A"/><path d="M14.5 3.5 Q12 -1 9 0 M15.5 3.5 Q18 -1 21 0" stroke="#3A2A4A" stroke-width=".9" fill="none" stroke-linecap="round"/>';
  }
  function blossomTree(seed){
    const r = rng(seed), cols = ['#F8BBD0', '#F48FB1', '#FCE4EC', '#F6A5C0', '#FFFFFF', '#F9C6D8'];
    let s = '<g fill="none" stroke="#6B4A3A" stroke-linecap="round"><path d="M50 148 Q47 112 52 84" stroke-width="9"/><path d="M51 98 Q36 86 26 66" stroke-width="5"/><path d="M52 90 Q66 78 76 60" stroke-width="5"/><path d="M52 84 Q50 66 48 50" stroke-width="4.5"/></g>' +
            '<path d="M42 148 Q50 138 58 148 Z" fill="#6B4A3A"/>';
    for(let i = 0; i < 44; i++){
      const a = r() * 6.283, d = Math.sqrt(r()) * 38;
      const x = 50 + Math.cos(a) * d * 1.05, y = 52 + Math.sin(a) * d * 0.82;
      s += '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="' + f1(7 + r() * 8) + '" fill="' + cols[Math.floor(r() * 6)] + '" opacity=".95"/>';
    }
    for(let i = 0; i < 9; i++) s += '<ellipse cx="' + f1(18 + r() * 64) + '" cy="' + f1(96 + r() * 44) + '" rx="2.6" ry="1.6" fill="#F8BBD0" stroke="rgba(170,90,130,.4)" stroke-width=".5" transform="rotate(' + Math.floor(r() * 180) + ' 50 118)"/>';
    return s;
  }
  function tulips(){
    const tul = function(x, y, col){
      return '<path d="M' + x + ' ' + (y + 2) + ' Q' + (x + 2) + ' ' + (y + 22) + ' ' + x + ' 76" stroke="#4E9A32" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M' + x + ' 76 Q' + (x - 12) + ' 56 ' + (x - 15) + ' 50 Q' + (x - 4) + ' 58 ' + x + ' 76 Z" fill="#6DBB45"/>' +
        '<path d="M' + (x - 8) + ' ' + (y - 2) + ' L' + (x - 8) + ' ' + (y - 14) + ' L' + (x - 3) + ' ' + (y - 9) + ' L' + x + ' ' + (y - 15) + ' L' + (x + 3) + ' ' + (y - 9) + ' L' + (x + 8) + ' ' + (y - 14) + ' L' + (x + 8) + ' ' + (y - 2) + ' Q' + x + ' ' + (y + 6) + ' ' + (x - 8) + ' ' + (y - 2) + ' Z" fill="' + col + '" stroke="rgba(90,30,40,.35)" stroke-width=".8" stroke-linejoin="round"/>';
    };
    return tul(15, 50, '#E53935') + tul(30, 40, '#FFC107') + tul(46, 52, '#EC407A');
  }
  function daisies(){
    const d = function(x, y){
      let s = '<path d="M' + x + ' ' + (y + 4) + ' L' + x + ' 48" stroke="#4E9A32" stroke-width="2" stroke-linecap="round"/>';
      for(let k = 0; k < 8; k++) s += '<ellipse cx="' + x + '" cy="' + (y - 6) + '" rx="2.6" ry="5.4" fill="#fff" stroke="#D7CCE0" stroke-width=".6" transform="rotate(' + (k * 45) + ' ' + x + ' ' + y + ')"/>';
      return s + '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="#FFC107"/>';
    };
    return d(12, 22) + d(26, 14) + d(39, 24);
  }
  function sittingBunny(){
    const S = '#D6CFE6';
    return '<ellipse cx="29" cy="86" rx="11" ry="5" fill="#fff" stroke="' + S + '" stroke-width="1.3"/><ellipse cx="51" cy="86" rx="11" ry="5" fill="#fff" stroke="' + S + '" stroke-width="1.3"/>' +
      '<ellipse cx="40" cy="64" rx="24" ry="24" fill="#fff" stroke="' + S + '" stroke-width="1.5"/><ellipse cx="40" cy="70" rx="14" ry="15" fill="#F6EEF8"/>' +
      '<g transform="rotate(-8 31 12)"><ellipse cx="31" cy="12" rx="6.5" ry="18" fill="#fff" stroke="' + S + '" stroke-width="1.4"/><ellipse cx="31" cy="14" rx="3" ry="12" fill="#F8BBD0"/></g>' +
      '<g transform="rotate(8 49 12)"><ellipse cx="49" cy="12" rx="6.5" ry="18" fill="#fff" stroke="' + S + '" stroke-width="1.4"/><ellipse cx="49" cy="14" rx="3" ry="12" fill="#F8BBD0"/></g>' +
      '<circle cx="40" cy="36" r="15.5" fill="#fff" stroke="' + S + '" stroke-width="1.5"/>' +
      '<circle cx="34" cy="33" r="2.3" fill="#3A2A4A"/><circle cx="46" cy="33" r="2.3" fill="#3A2A4A"/><circle cx="34.7" cy="32.3" r=".8" fill="#fff"/><circle cx="46.7" cy="32.3" r=".8" fill="#fff"/>' +
      '<path d="M37.5 39 L42.5 39 L40 42 Z" fill="#F48FB1"/><path d="M40 42 Q37 45 34.5 43.5 M40 42 Q43 45 45.5 43.5" stroke="#B88AA6" stroke-width="1" fill="none" stroke-linecap="round"/>' +
      '<circle cx="30" cy="41" r="3.2" fill="#F8BBD0" opacity=".55"/><circle cx="50" cy="41" r="3.2" fill="#F8BBD0" opacity=".55"/>' +
      '<path d="M26 40 L14 38 M26 43 L14 46 M54 40 L66 38 M54 43 L66 46" stroke="#B9A8C9" stroke-width=".9" stroke-linecap="round"/>' +
      '<path d="M58 70 L72 62 L66 76 Z" fill="#F28C28" stroke="#C86A12" stroke-width=".8" stroke-linejoin="round"/><path d="M72 62 L76 56 M72 62 L78 62 M72 62 L74 57" stroke="#4E9A32" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="70" rx="5" ry="4.2" fill="#fff" stroke="' + S + '" stroke-width="1"/>';
  }
  function chick(){
    return '<path d="M20 42 L20 48 M30 42 L30 48 M16 49 L24 49 M26 49 L34 49" stroke="#F28C28" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="25" cy="29" r="16" fill="#FFD93B" stroke="#E0B21C" stroke-width="1.2"/>' +
      '<path d="M20 14 Q22 8 25 12 Q26 6 30 12" stroke="#E0B21C" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="14" cy="32" rx="5" ry="8" fill="#FFC81E" transform="rotate(14 14 32)"/>' +
      '<circle cx="31" cy="24" r="2.4" fill="#3A2A4A"/><circle cx="31.8" cy="23.2" r=".8" fill="#fff"/>' +
      '<path d="M37 27 L46 30 L37 33 Z" fill="#F28C28" stroke="#C86A12" stroke-width=".7" stroke-linejoin="round"/>' +
      '<circle cx="33" cy="32" r="3" fill="#FFA38A" opacity=".5"/>';
  }
  function basket(){
    return '<path d="M12 8 L10 4 M26 6 L26 1 M40 8 L42 3 M54 8 L58 4" stroke="#6DBB45" stroke-width="2" stroke-linecap="round" fill="none"/>' +
      '<path d="M14 30 Q40 -8 66 30" fill="none" stroke="#8D6E3C" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M8 28 L72 28 L65 56 Q40 62 15 56 Z" fill="#C99A55" stroke="#8D6E3C" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M10 36 L70 36 M12 45 L68 45 M24 28 L22 58 M40 28 L40 60 M56 28 L58 58" stroke="#A97B3A" stroke-width="1.1"/>' +
      eggG('#F8BBD0', 0, 'translate(22 22) scale(.95) rotate(-14)') + eggG('#B3E5FC', 1, 'translate(40 19) scale(1)') +
      eggG('#FFF59D', 2, 'translate(58 22) scale(.95) rotate(14)') + '<path d="M8 28 L72 28" stroke="#8D6E3C" stroke-width="1.6"/>';
  }

  creerDecor({
    id: 'paques', message: '🐣 Joyeuses Pâques !', first: 3500, between: [18000, 35000],
    inPeriod: function(d){
      d = d || new Date();
      const p = paquesDate(d.getFullYear());
      const debut = new Date(p.getFullYear(), p.getMonth(), p.getDate() - 15);
      const fin = new Date(p.getFullYear(), p.getMonth(), p.getDate() + 1);
      const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return t >= debut && t <= fin;
    },
    buildSprites: function(){
      const petals = [], eggs = [];
      for(let s = 0; s < 2; s++) PETAL_COLORS.forEach(function(c){ petals.push(petalSprite(s, c)); });
      EGG_COLORS.forEach(function(c, i){ eggs.push(eggSprite(c, i)); });
      return { petals: petals, eggs: eggs };
    },
    particles: {
      count: function(W, H){ return Math.max(30, Math.min(80, Math.round(W * H / 24000))); },
      make: function(i, W, H, S){
        const z = Math.random(), p = basePart(z, W, H);
        p.sprite = S.petals[Math.floor(Math.random() * S.petals.length)];
        p.size = 12 + z * 20; p.vy = 16 + z * 34; p.sway = 16 + Math.random() * 34; p.alpha = 0.75 + z * 0.25;
        return p;
      },
      step: fall, draw: drawFlutter
    },
    extras: function(ctx, r, ts, dt, st, W, H, S){
      st.items = st.items || [];
      if(r && dt){
        if(Math.random() < dt * 2.4){
          st.items.push({ k: 'egg', x: r.left + r.width * 0.74, y: r.top + r.height * 0.55, vx: -(10 + Math.random() * 50), vy: -(40 + Math.random() * 90),
            life: 0, max: 1.9, size: 16 + Math.random() * 8, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 6, sprite: S.eggs[Math.floor(Math.random() * S.eggs.length)] });
        }
        if(Math.random() < 0.6){
          st.items.push({ k: 'star', x: r.left + r.width * (0.05 + Math.random() * 0.06), y: r.top + r.height * (0.55 + Math.random() * 0.3),
            vx: -(10 + Math.random() * 30), vy: 6 + Math.random() * 20, life: 0, max: 0.9 + Math.random() * 0.8,
            size: 3 + Math.random() * 4, rot: Math.random() * 3, col: ['#F48FB1', '#81D4FA', '#FFD54F', '#A5D6A7'][Math.floor(Math.random() * 4)] });
        }
      }
      for(let i = st.items.length - 1; i >= 0; i--){
        const p = st.items[i]; p.life += dt;
        if(p.life >= p.max || p.y > H + 40){ st.items.splice(i, 1); continue; }
        p.x += p.vx * dt; p.rot += (p.vr || 2) * dt;
        if(p.k === 'egg'){
          p.vy += 480 * dt; p.y += p.vy * dt;
          ctx.globalAlpha = Math.min(1, (p.max - p.life) / 0.5);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
        } else {
          p.y += p.vy * dt; const a = 1 - p.life / p.max;
          ctx.globalAlpha = a * 0.5; ctx.fillStyle = '#fff'; drawStar(ctx, p.x, p.y, p.size * 1.7, p.rot);
          ctx.globalAlpha = a * 0.95; ctx.fillStyle = p.col; drawStar(ctx, p.x, p.y, p.size, p.rot);
        }
      }
    },
    flyer: {
      cls: 'sx-bunny', html: rabbitSvg,
      bubble: { text: 'Joyeuses Pâques&nbsp;!', left: '30%', top: '-40px', at: 0.3 },
      path: function(vw, vh, w, h){
        const dist = vw + w + 160, hops = Math.max(5, Math.round(dist / 230)), hopH = Math.min(110, vh * 0.14);
        const dur = Math.max(8000, Math.min(15000, dist / 150 * 1000));
        const base = Math.max(h + 20, vh * (0.64 + Math.random() * 0.1) - h * 0.2);
        const N = hops * 14, frames = [];
        for(let i = 0; i <= N; i++){
          const t = i / N, ph = (t * hops) % 1 || (i === N ? 1 : 0);
          const x = -w - 60 + t * dist, y = base - Math.sin(Math.PI * ph) * hopH;
          frames.push({ transform: 'translate(' + f1(x) + 'px,' + f1(y) + 'px) rotate(' + f1(-Math.cos(Math.PI * ph) * 11) + 'deg)', offset: t });
        }
        return { frames: frames, dur: dur };
      }
    },
    deco: function(w){
      const r = rng(77);
      let flowers = '';
      for(let i = 0; i < w / 34; i++){
        const x = r() * w, y = 6 + r() * 5, col = ['#fff', '#FFD54F', '#F48FB1', '#CE93D8'][Math.floor(r() * 4)];
        flowers += '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="2.8" fill="' + col + '" stroke="rgba(80,60,60,.25)" stroke-width=".6"/><circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="1" fill="#FFB300"/>';
      }
      const mound = band('sx-mound', w, 26, '<path d="' + grassPath(w, 26, 4, 15, 23, 9) + '" fill="#6CB43F" stroke="#3F7F27" stroke-width="1"/>' + flowers);
      let gf = '';
      for(let i = 0; i < w / 26; i++){
        gf += '<circle cx="' + f1(r() * w) + '" cy="' + f1(16 + r() * 12) + '" r="1.7" fill="' + ['#fff', '#FFD54F', '#F48FB1'][Math.floor(r() * 3)] + '"/>';
      }
      const ground = band('sx-ground', w, 40, '<path d="' + wavePath(w, 40, 8, 16, 41, 80, 160) + '" fill="#A5D26B" stroke="#6CA23A" stroke-width="1"/><rect x="0" y="31" width="' + f1(w) + '" height="9" fill="#7DB647"/>' + gf);
      let scene = ground;
      scene += item('0 0 100 150', blossomTree(5), { w: 106, l: 0.5, cls: 'sx-sway' });
      scene += item('0 0 60 80', tulips(), { w: 52, l: 14, hide: 1 });
      scene += item('0 0 60 80', eggG('#F48FB1', 1, 'translate(30 42) scale(2.15)'), { w: 50, l: 21 });
      scene += item('0 0 80 90', sittingBunny(), { w: 70, l: 29 });
      scene += item('0 0 50 50', daisies(), { w: 46, l: 40.5, hide: 1 });
      scene += item('0 0 80 60', basket(), { w: 78, l: 47 });
      scene += item('0 0 50 50', chick(), { w: 40, l: 60.5 });
      scene += item('0 0 60 80', tulips(), { w: 56, l: 67, hide: 1 });
      scene += item('0 0 100 150', blossomTree(19), { w: 96, l: 77.5, cls: 'sx-sway', hide: 1 });
      scene += item('0 0 60 80', eggG('#81D4FA', 3, 'translate(30 42) scale(1.7)'), { w: 40, l: 92, hide: 1 });
      return {
        top: eggGarland(w) +
          crit('0 0 30 22', butterfly('#F48FB1', '#F06292', '#fff'), { l: 8, t: -12, w: 28, cls: 'sx-drift', d: 1 }) +
          crit('0 0 30 22', butterfly('#FFD54F', '#FFB300', '#fff'), { l: 83, t: -8, w: 24, cls: 'sx-drift', d: 4 }),
        bottom: mound, scene: scene
      };
    }
  });

  /* ==========================================================================
     ÉTÉ — bulles de savon, avion à banderole, auvent rayé, plage
     ========================================================================== */
  function bubbleSprite(tint){
    const px = 64, c = newCanvas(px), g = c.getContext('2d'); if(!g) return c;
    const R = px * 0.42, cx = px / 2, cy = px / 2;
    g.beginPath(); g.arc(cx, cy, R, 0, 6.283); g.fillStyle = 'rgba(200,235,255,.16)'; g.fill();
    const grad = g.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    const pal = [['#7FDBF0', '#F8BBD0', '#FFF08A'], ['#B39DDB', '#80DEEA', '#F8BBD0'], ['#A5D6A7', '#81D4FA', '#FFE082']][tint % 3];
    grad.addColorStop(0, pal[0]); grad.addColorStop(0.5, pal[1]); grad.addColorStop(1, pal[2]);
    g.lineWidth = px * 0.06; g.strokeStyle = grad; g.stroke();
    g.beginPath(); g.arc(cx, cy, R + px * 0.035, 0, 6.283); g.lineWidth = px * 0.02; g.strokeStyle = 'rgba(70,130,170,.5)'; g.stroke();
    g.beginPath(); g.arc(cx, cy, R * 0.7, -2.5, -1.5); g.lineWidth = px * 0.07; g.lineCap = 'round'; g.strokeStyle = 'rgba(255,255,255,.95)'; g.stroke();
    g.beginPath(); g.arc(cx + R * 0.5, cy + R * 0.45, px * 0.035, 0, 6.283); g.fillStyle = 'rgba(255,255,255,.9)'; g.fill();
    return c;
  }
  function planeSvg(){
    return '<svg viewBox="0 0 440 110" xmlns="http://www.w3.org/2000/svg" role="presentation">' +
      '<g transform="translate(270 56)"><g><animateTransform attributeName="transform" type="skewY" values="-3;3;-3" dur="1.6s" repeatCount="indefinite"/>' +
      '<g transform="translate(-270 -56)">' +
      '<path d="M0 30 Q31 22 62 30 T124 30 T186 30 T246 30 L246 80 Q215 88 184 80 T122 80 T60 80 T0 80 Z" fill="#fff" stroke="#E53935" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<text x="123" y="62" text-anchor="middle" font-family="\'IBM Plex Sans\',Arial,sans-serif" font-weight="700" font-size="23" textLength="206" lengthAdjust="spacingAndGlyphs" fill="#E53935">Bonnes vacances !</text>' +
      '</g></g></g>' +
      '<path d="M246 33 L272 56 M246 78 L272 56 M272 56 L292 56" stroke="#6D4C41" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M296 50 L284 28 L308 44 Z" fill="#E53935"/><path d="M298 58 L282 68 L308 63 Z" fill="#E53935"/>' +
      '<path d="M292 56 Q300 40 340 40 L398 44 Q420 48 424 56 Q420 66 396 68 L340 70 Q300 70 292 56 Z" fill="#fff" stroke="#C9D3DC" stroke-width="1.4"/>' +
      '<path d="M304 58 L416 58" stroke="#E53935" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="368" cy="39" r="7" fill="#FFCC99"/><rect x="367" y="35.5" width="10" height="3.6" rx="1.4" fill="#222"/><path d="M360 44 L372 44 L370 49 L362 49 Z" fill="#E53935"/>' +
      '<path d="M350 43 Q362 28 382 41 Z" fill="rgba(129,212,250,.55)" stroke="#5A8FA8" stroke-width="1.2"/>' +
      '<path d="M334 60 Q352 66 376 60 L372 71 Q352 77 330 71 Z" fill="#E53935" stroke="#B71C1C" stroke-width="1"/>' +
      '<path d="M352 71 L350 88 M372 70 L372 88" stroke="#37474F" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="350" cy="92" r="6.2" fill="#37474F"/><circle cx="350" cy="92" r="2.2" fill="#CFD8DC"/><circle cx="372" cy="92" r="6.2" fill="#37474F"/><circle cx="372" cy="92" r="2.2" fill="#CFD8DC"/>' +
      '<ellipse cx="421" cy="56" rx="8" ry="11" fill="#E53935" stroke="#B71C1C" stroke-width="1"/>' +
      '<ellipse cx="430" cy="56" rx="3" ry="20" fill="rgba(60,60,60,.35)"><animate attributeName="ry" values="20;6;20" dur="0.14s" repeatCount="indefinite"/></ellipse>' +
      '</svg>';
  }
  function frond(L, col){
    return '<path d="M0 0 C' + f1(L * 0.3) + ' ' + f1(-L * 0.42) + ' ' + f1(L * 0.7) + ' ' + f1(-L * 0.36) + ' ' + f1(L * 0.97) + ' ' + f1(L * 0.14) +
      ' C' + f1(L * 0.7) + ' ' + f1(-L * 0.17) + ' ' + f1(L * 0.3) + ' ' + f1(-L * 0.1) + ' 0 0 Z" fill="' + col + '" stroke="#1F6B2E" stroke-width=".8" stroke-linejoin="round"/>' +
      '<path d="M0 0 C' + f1(L * 0.3) + ' ' + f1(-L * 0.28) + ' ' + f1(L * 0.7) + ' ' + f1(-L * 0.22) + ' ' + f1(L * 0.95) + ' ' + f1(L * 0.13) + '" stroke="#1F6B2E" stroke-width=".9" fill="none"/>';
  }
  function palm(seed){
    const r = rng(seed), cols = ['#2E8B3E', '#43A047', '#388E3C'], ang = [-82, -50, -18, 14];
    let s = '<path d="M52 148 Q43 104 56 60" stroke="#9A6B3E" stroke-width="9" fill="none" stroke-linecap="round"/>';
    for(let y = 140; y > 70; y -= 11) s += '<path d="M' + f1(46 + (148 - y) * 0.05) + ' ' + y + ' q5 3 10 0" stroke="#7B5230" stroke-width="1.3" fill="none"/>';
    for(let side = 0; side < 2; side++){
      ang.forEach(function(a, i){
        s += '<g transform="translate(56 60) ' + (side ? 'scale(-1 1) ' : '') + 'rotate(' + f1(a + (r() - 0.5) * 12) + ')">' + frond(46 + r() * 12, cols[(i + side) % 3]) + '</g>';
      });
    }
    return s + '<circle cx="52" cy="64" r="4.2" fill="#6D4C41"/><circle cx="60" cy="65" r="4.2" fill="#5D4037"/>';
  }
  function parasol(){
    const apex = '55 8', pts = [[6, 52], [30, 40], [55, 36], [80, 40], [104, 52]];
    return '<defs><clipPath id="sxpar"><path d="M6 52 Q55 -16 104 52 Q92 44 80 52 Q68 44 55 52 Q42 44 30 52 Q18 44 6 52 Z"/></clipPath></defs>' +
      '<path d="M58 128 L53 30" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M6 52 Q55 -16 104 52 Q92 44 80 52 Q68 44 55 52 Q42 44 30 52 Q18 44 6 52 Z" fill="#fff" stroke="#C0392B" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<g clip-path="url(#sxpar)" fill="#E8503A"><path d="M' + apex + ' L6 60 L26 60 Z"/><path d="M' + apex + ' L45 60 L62 60 Z"/><path d="M' + apex + ' L80 60 L98 60 Z"/></g>' +
      '<circle cx="55" cy="7" r="3" fill="#8D6E63"/>' +
      '<path d="M24 126 L84 126 L98 118 L38 118 Z" fill="#26A6C9" stroke="#1B7F9C" stroke-width="1"/><path d="M34 126 L48 118 M48 126 L62 118 M62 126 L76 118" stroke="#fff" stroke-width="3" opacity=".85"/>';
  }
  function sandcastle(){
    return '<path d="M4 66 Q10 60 20 62 L70 62 Q80 60 86 66 Z" fill="#E8C57F"/>' +
      '<path d="M18 62 L18 38 L24 38 L24 42 L30 42 L30 38 L36 38 L36 42 L42 42 L42 38 L48 38 L48 42 L54 42 L54 38 L60 38 L60 62 Z" fill="#EBCB8B" stroke="#C9A25A" stroke-width="1" stroke-linejoin="round"/>' +
      '<path d="M2 62 L2 30 L20 30 L20 62 Z M60 62 L60 30 L78 30 L78 62 Z" fill="#E8C57F" stroke="#C9A25A" stroke-width="1" stroke-linejoin="round"/>' +
      '<path d="M0 30 L0 24 L5 24 L5 28 L10 28 L10 24 L15 24 L15 28 L20 28 L20 24 L22 24 L22 30 Z M58 30 L58 24 L63 24 L63 28 L68 28 L68 24 L73 24 L73 28 L78 28 L78 24 L80 24 L80 30 Z" fill="#EBCB8B" stroke="#C9A25A" stroke-width="1" stroke-linejoin="round"/>' +
      '<path d="M32 62 L32 50 Q39 42 46 50 L46 62 Z" fill="#9C7A3C"/>' +
      '<path d="M40 38 L40 14" stroke="#8D6E63" stroke-width="1.6" stroke-linecap="round"/><path d="M40 14 L56 19 L40 24 Z" fill="#E53935"/>' +
      '<path d="M8 40 L14 40 M8 48 L14 48 M64 40 L72 40 M64 48 L72 48" stroke="#C9A25A" stroke-width="1"/>';
  }
  function beachBall(){
    const wedge = function(a0, a1, col){
      const x0 = 20 + 18 * Math.cos(a0), y0 = 22 + 18 * Math.sin(a0), x1 = 20 + 18 * Math.cos(a1), y1 = 22 + 18 * Math.sin(a1);
      return '<path d="M20 22 L' + f1(x0) + ' ' + f1(y0) + ' A18 18 0 0 1 ' + f1(x1) + ' ' + f1(y1) + ' Z" fill="' + col + '"/>';
    };
    const cols = ['#E53935', '#fff', '#FFC107', '#fff', '#26A6C9', '#fff'];
    let s = '<ellipse cx="20" cy="38" rx="13" ry="2.4" fill="rgba(80,60,20,.2)"/><clipPath id="sxball"><circle cx="20" cy="22" r="18"/></clipPath><g clip-path="url(#sxball)">';
    for(let k = 0; k < 6; k++) s += wedge(k * 1.0472 - 0.4, (k + 1) * 1.0472 - 0.4, cols[k]);
    return s + '</g><circle cx="20" cy="22" r="18" fill="none" stroke="rgba(60,60,80,.35)" stroke-width="1"/><circle cx="20" cy="22" r="2.6" fill="#fff" stroke="rgba(60,60,80,.3)" stroke-width=".6"/><ellipse cx="13" cy="13" rx="3.4" ry="5.4" fill="#fff" opacity=".45" transform="rotate(35 13 13)"/>';
  }
  function surfboard(){
    return '<ellipse cx="20" cy="116" rx="15" ry="3.4" fill="#E2C07E"/>' +
      '<g transform="rotate(7 20 110)"><path d="M20 2 Q36 30 34 100 Q32 116 20 116 Q8 116 6 100 Q4 30 20 2 Z" fill="#26C6DA" stroke="#16899A" stroke-width="1.2"/>' +
      '<path d="M20 6 L20 112" stroke="#fff" stroke-width="2" opacity=".8"/><path d="M7 44 Q20 50 33 44 L33.6 54 Q20 60 6.4 54 Z" fill="#FFCA28"/><path d="M6.6 72 Q20 78 33.4 72 L33.8 78 Q20 84 6.2 78 Z" fill="#FF7A59"/></g>';
  }
  function bucket(){
    return '<ellipse cx="22" cy="46" rx="18" ry="3" fill="rgba(80,60,20,.2)"/>' +
      '<path d="M44 44 L50 6" stroke="#26A6C9" stroke-width="3" stroke-linecap="round"/><path d="M46 8 Q54 2 56 12 Q52 12 46 8 Z" fill="#26A6C9"/>' +
      '<path d="M7 20 Q22 -2 37 20" fill="none" stroke="#8D6E63" stroke-width="2"/>' +
      '<path d="M6 20 L38 20 L34 46 L10 46 Z" fill="#E8503A" stroke="#B83A28" stroke-width="1.2" stroke-linejoin="round"/><path d="M6.8 26 L37.2 26 M8 36 L36 36" stroke="#FFC107" stroke-width="3"/>';
  }
  function crab(){
    return '<g stroke="#B83A28" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M18 28 L8 34 M20 31 L11 39 M42 28 L52 34 M40 31 L49 39"/></g>' +
      '<path d="M16 22 Q8 14 12 8 Q18 8 20 14 Z M44 22 Q52 14 48 8 Q42 8 40 14 Z" fill="#E8503A" stroke="#B83A28" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<ellipse cx="30" cy="27" rx="15" ry="10.5" fill="#E8503A" stroke="#B83A28" stroke-width="1.2"/>' +
      '<path d="M25 18 L25 12 M35 18 L35 12" stroke="#B83A28" stroke-width="1.6"/><circle cx="25" cy="11" r="3.2" fill="#fff" stroke="#B83A28" stroke-width=".8"/><circle cx="35" cy="11" r="3.2" fill="#fff" stroke="#B83A28" stroke-width=".8"/><circle cx="25.6" cy="11" r="1.4" fill="#222"/><circle cx="35.6" cy="11" r="1.4" fill="#222"/>' +
      '<path d="M26 29 Q30 33 34 29" stroke="#7A2418" stroke-width="1.3" fill="none" stroke-linecap="round"/>';
  }
  function starfish(){
    let pts = '';
    for(let k = 0; k < 10; k++){ const a = (-90 + k * 36) * Math.PI / 180, rr = k % 2 ? 7 : 17; pts += f1(20 + Math.cos(a) * rr) + ',' + f1(22 + Math.sin(a) * rr) + ' '; }
    return '<polygon points="' + pts + '" fill="#FF8A5B" stroke="#D9622F" stroke-width="1.2" stroke-linejoin="round"/><g fill="#FFD1B8"><circle cx="20" cy="12" r="1.3"/><circle cx="29" cy="20" r="1.3"/><circle cx="26" cy="31" r="1.3"/><circle cx="14" cy="31" r="1.3"/><circle cx="11" cy="20" r="1.3"/></g>';
  }
  function flipflops(){
    return '<g><ellipse cx="14" cy="13" rx="9" ry="6.5" fill="#F48FB1" stroke="#C2607F" stroke-width="1" transform="rotate(-10 14 13)"/><path d="M14 8 L8 14 M14 8 L20 14" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>' +
      '<g><ellipse cx="40" cy="12" rx="9" ry="6.5" fill="#4FC3F7" stroke="#2A8AB5" stroke-width="1" transform="rotate(8 40 12)"/><path d="M40 7 L34 13 M40 7 L46 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>';
  }
  function seagull(){ return '<g class="sx-gull"><path d="M2 12 Q9 1 15 11 Q21 1 28 12" stroke="#5F7585" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'; }

  creerDecor({
    id: 'ete', message: '☀️ Bon été !', first: 3500, between: [18000, 35000],
    inPeriod: function(d){
      d = d || new Date();
      const m = d.getMonth(), j = d.getDate();
      return (m === 5 && j >= 21) || m === 6 || m === 7;
    },
    buildSprites: function(){ return { bubbles: [bubbleSprite(0), bubbleSprite(1), bubbleSprite(2)] }; },
    particles: {
      count: function(W, H){ return Math.max(18, Math.min(46, Math.round(W * H / 38000))); },
      make: function(i, W, H, S){
        const z = Math.random(), p = basePart(z, W, H);
        p.sprite = S.bubbles[i % 3]; p.size = 14 + z * 34; p.vy = 14 + z * 30; p.sway = 10 + Math.random() * 22; p.alpha = 0.6 + z * 0.35;
        return p;
      },
      step: function(p, ts, dt, W, H, wind){
        p.y -= p.vy * dt;
        p.x += (Math.sin(ts / 1000 * p.freq + p.ph) * p.sway + wind * 0.4) * dt;
        if(p.y < -50){ p.y = H + 50; p.x = Math.random() * W; }
        if(p.x < -50) p.x = W + 50; else if(p.x > W + 50) p.x = -50;
      },
      draw: function(ctx, p, ts){
        const k = 1 + 0.04 * Math.sin(ts / 700 + p.ph);
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(p.sprite, p.x - p.size * k / 2, p.y - p.size / k / 2, p.size * k, p.size / k);
      }
    },
    extras: function(ctx, r, ts, dt, st){
      st.items = st.items || [];
      if(r && dt){
        for(let n = 0; n < 2; n++){
          st.items.push({ x: r.left + r.width * (0.01 + Math.random() * 0.04), y: r.top + r.height * (0.3 + Math.random() * 0.4),
            vx: -(14 + Math.random() * 40), vy: 6 + Math.random() * 24, life: 0, max: 0.9 + Math.random() * 0.9,
            size: 3 + Math.random() * 4.5, rot: Math.random() * 3, col: Math.random() < 0.5 ? '#FFC107' : '#26C6DA' });
        }
      }
      for(let i = st.items.length - 1; i >= 0; i--){
        const p = st.items[i]; p.life += dt; if(p.life >= p.max){ st.items.splice(i, 1); continue; }
        p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 2;
        const a = 1 - p.life / p.max;
        ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#fff'; drawStar(ctx, p.x, p.y, p.size * 1.7, p.rot);
        ctx.globalAlpha = a * 0.95; ctx.fillStyle = p.col; drawStar(ctx, p.x, p.y, p.size, p.rot);
      }
    },
    flyer: {
      cls: 'sx-plane', html: planeSvg,
      path: function(vw, vh, w){
        const dist = vw + w + 100 + 40, dur = Math.max(9000, Math.min(16000, dist / 140 * 1000));
        const y0 = vh * (0.1 + Math.random() * 0.2), N = 40, frames = [];
        for(let i = 0; i <= N; i++){
          const t = i / N;
          frames.push({ transform: 'translate(' + f1(-w - 60 + t * dist) + 'px,' + f1(y0 + Math.sin(t * Math.PI * 1.6) * vh * 0.025 - t * vh * 0.02) + 'px) rotate(' + f1(-1.5 + Math.cos(t * Math.PI * 1.6) * 2) + 'deg)', offset: t });
        }
        return { frames: frames, dur: dur };
      }
    },
    deco: function(w){
      const r = rng(91);
      // auvent rayé
      const n = Math.max(6, Math.round(w / 26)), sw = w / n;
      let awn = '', i;
      for(i = 0; i < n; i++){
        const x = i * sw, col = i % 2 ? '#FFFFFF' : '#1FA5C8';
        awn += '<path d="M' + f1(x) + ' 6 L' + f1(x + sw) + ' 6 L' + f1(x + sw) + ' 22 a' + f1(sw / 2) + ' 11 0 0 1 ' + f1(-sw) + ' 0 Z" fill="' + col + '" stroke="#0F7F9E" stroke-width=".9" stroke-linejoin="round"/>';
      }
      awn = '<rect x="0" y="2" width="' + f1(w) + '" height="6" rx="3" fill="#0F7F9E"/>' + awn;
      // dune + coquillages
      let shells = '';
      for(i = 0; i < w / 60; i++){
        const x = r() * w, y = 8 + r() * 4;
        shells += r() < 0.5
          ? '<path d="M' + f1(x) + ' ' + f1(y + 4) + ' Q' + f1(x - 5) + ' ' + f1(y - 2) + ' ' + f1(x) + ' ' + f1(y - 4) + ' Q' + f1(x + 5) + ' ' + f1(y - 2) + ' ' + f1(x) + ' ' + f1(y + 4) + ' Z" fill="#FFB6A8" stroke="#D98B7E" stroke-width=".7"/>'
          : '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="2.6" fill="#fff" stroke="#D9B877" stroke-width=".8"/>';
      }
      const mound = band('sx-mound', w, 26, '<path d="' + wavePath(w, 26, 3, 12, 23, 70, 150) + '" fill="#F3D9A0" stroke="#D9B877" stroke-width="1"/>' + shells);
      let sp = '';
      for(i = 0; i < w / 18; i++) sp += '<circle cx="' + f1(r() * w) + '" cy="' + f1(16 + r() * 22) + '" r=".9" fill="#D9B877"/>';
      const ground = band('sx-ground', w, 40, '<path d="' + wavePath(w, 40, 9, 15, 57, 90, 170) + '" fill="#F5DEA8" stroke="#DDBE7C" stroke-width="1"/><rect x="0" y="31" width="' + f1(w) + '" height="9" fill="#E8C98A"/>' + sp);
      let scene = ground;
      scene += item('0 0 100 150', palm(3), { w: 104, l: 0.5, cls: 'sx-sway' });
      scene += item('0 0 40 40', starfish(), { w: 30, l: 13, hide: 1 });
      scene += item('0 0 80 70', sandcastle(), { w: 84, l: 18.5 });
      scene += item('0 0 110 130', parasol(), { w: 112, l: 32 });
      scene += item('0 0 40 40', beachBall(), { w: 38, l: 46 });
      scene += item('0 0 40 120', surfboard(), { w: 34, l: 52, hide: 1 });
      scene += item('0 0 60 50', bucket(), { w: 46, l: 59.5, hide: 1 });
      scene += item('0 0 60 40', crab(), { w: 46, l: 68 });
      scene += item('0 0 100 150', palm(11), { w: 96, l: 79, cls: 'sx-sway', hide: 1 });
      scene += item('0 0 56 24', flipflops(), { w: 42, l: 92.5, hide: 1 });
      return {
        top: band('sx-top', w, 44, awn) +
          crit('0 0 30 16', seagull(), { l: 6, t: -34, w: 30, cls: 'sx-drift', d: 1 }) +
          crit('0 0 30 16', seagull(), { l: 74, t: -30, w: 24, cls: 'sx-drift', d: 5 }),
        bottom: mound, scene: scene
      };
    }
  });
})();

/* ==========================================================================
   SAISONS — pilote les décors saisonniers (Pâques, Été, Halloween, Noël)
   - Automatique : le décor de la période en cours s'affiche tout seul
     (Pâques : 15 jours avant → lundi de Pâques ; Été : 21 juin → 31 août ;
      Halloween : 15 oct → 2 nov ; Noël : 1er déc → 6 janv).
   - 5 clics rapides sur le logo de l'en-tête : passe au décor suivant
     (aucun → Pâques → Été → Halloween → Noël → aucun). Le choix est mémorisé
     sur ce navigateur.
   - Adresse de la page : ?paques, ?ete, ?halloween, ?noel, ou ?saison=0 pour tout couper.
   ========================================================================== */
(function(){
  'use strict';
  const themes = window.AGENDA_SAISONS || {};
  const names = ['paques', 'ete', 'halloween', 'noel'].filter(function(n){ return themes[n]; });
  if(!names.length) return;
  const PREF_KEY = 'agenda-saison';

  function readPref(){ try{ return localStorage.getItem(PREF_KEY); }catch(e){ return null; } }
  function writePref(v){ try{ localStorage.setItem(PREF_KEY, v); }catch(e){} }
  function urlForce(){
    try{
      const p = new URLSearchParams(location.search);
      if(p.has('saison') && ['0', 'off'].indexOf(p.get('saison')) >= 0) return 'off';
      for(let i = 0; i < names.length; i++){
        if(p.has(names[i])) return (['0', 'off'].indexOf(p.get(names[i])) >= 0) ? 'off' : names[i];
      }
    }catch(e){}
    return null;
  }
  function auto(){
    for(let i = 0; i < names.length; i++){ if(themes[names[i]].inPeriod()) return names[i]; }
    return null;
  }
  function wanted(){
    const f = urlForce() || readPref();
    if(f === 'off') return null;
    if(f && names.indexOf(f) >= 0) return f;
    return auto();
  }
  let current = null;
  function apply(name){
    names.forEach(function(n){ if(n !== name) themes[n].setActive(false); });
    if(name) themes[name].setActive(true);
    current = name;
  }

  let toastEl = null, toastTimer = 0;
  function toast(msg){
    if(!toastEl){
      toastEl = document.createElement('div'); toastEl.className = 'saison-toast'; toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function(){ toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 3800);
  }

  let clicks = 0, clickTimer = 0;
  document.addEventListener('click', function(e){
    if(!(e.target.closest && e.target.closest('header.top .brand > svg'))) return;
    clicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function(){ clicks = 0; }, 2500);
    if(clicks < 5) return;
    clicks = 0;
    const cycle = [null].concat(names);
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    writePref(next || 'off');
    apply(next);
    if(next){
      toast(themes[next].message + ' (5 clics sur le logo pour changer de décor)');
      if(themes[next].accueil) themes[next].accueil();
    } else {
      toast('Décor saisonnier désactivé');
    }
  });

  apply(wanted());
})();
