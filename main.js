// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '56px';
      ring.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '36px';
      ring.style.height = '36px';
    });
  });

  // Nav scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  // Duplicate marquee for seamless loop
  const track = document.getElementById('marqueeTrack');
  track.innerHTML += track.innerHTML;

  // ── QUIZ OVERLAY LOGIC ─────────────────────────
  function openQuiz() {
    const overlay = document.getElementById('quizOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    qResetQuiz();
  }

  function closeQuiz() {
    const overlay = document.getElementById('quizOverlay');
    overlay.classList.add('closing');
    overlay.addEventListener('animationend', () => {
      overlay.classList.remove('active', 'closing');
      document.body.style.overflow = '';
    }, { once: true });
  }

  // Close on ESC
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuiz(); });

  // ── QUIZ DATA ──────────────────────────────────
  const qQuestions = [
    { id:'tone', headline:"WHAT'S YOUR SKIN TONE?", sub:"We use this to dial in formula depth, SPF coverage, and finish — so everything works with your complexion.", type:'swatch', cols:'c3', options:[
      {value:'light', title:'Light', desc:'Fair to light complexion, warm undertones', swatch:'#C68642'},
      {value:'medium', title:'Medium', desc:'Medium complexion, golden undertones', swatch:'#8D5524'},
      {value:'deep', title:'Deep', desc:'Deep complexion, rich undertones', swatch:'#4A2912'},
      {value:'ebony', title:'Ebony', desc:'Very deep complexion, cool undertones', swatch:'#2C1503'},
      {value:'olive', title:'Olive', desc:'Olive complexion, green-neutral undertones', swatch:'#8B6914'},
      {value:'caramel', title:'Caramel', desc:'Warm caramel, neutral-to-warm undertones', swatch:'#B5651D'},
    ]},
    { id:'type', headline:"HOW DOES YOUR SKIN FEEL BY MIDDAY?", sub:"Not right after washing — a few hours into your day. This tells us your true skin type.", type:'standard', cols:'c2', options:[
      {value:'oily', title:'Shiny & Oily', desc:'Looks greasy, especially on the forehead and nose'},
      {value:'dry', title:'Tight & Dry', desc:'Feels tight, sometimes flaky or rough to the touch'},
      {value:'combo', title:'Mixed — Oily + Dry', desc:'Oily T-zone but dry cheeks and jaw'},
      {value:'normal', title:'Balanced', desc:'Neither oily nor dry, comfortable throughout the day'},
    ]},
    { id:'concern', headline:"WHAT'S YOUR BIGGEST SKIN CONCERN?", sub:"Pick your #1 issue. We'll build your entire box around solving this first.", type:'standard', cols:'c2', options:[
      {value:'hyperpigmentation', title:'Dark Spots & Uneven Tone', desc:'Post-acne marks, sun spots, or uneven complexion'},
      {value:'bumps', title:'Razor Bumps & Ingrown Hairs', desc:'Irritation, bumps, or ingrowns from shaving'},
      {value:'acne', title:'Breakouts & Acne', desc:'Regular pimples, blackheads, or cystic acne'},
      {value:'aging', title:'Aging & Firmness', desc:'Fine lines, loss of elasticity, or dullness'},
      {value:'dryness', title:'Dryness & Rough Texture', desc:'Rough patches, dry skin, or persistent dehydration'},
      {value:'oilcontrol', title:'Excess Oil & Enlarged Pores', desc:'Shiny skin by midday, visible pores, or congestion'},
    ]},
    { id:'beard', headline:"WHAT'S YOUR BEARD SITUATION?", sub:"We'll include the right beard and shave products based on where you're at.", type:'standard', cols:'c2', options:[
      {value:'full', title:'Full Beard', desc:'Significant length — needs conditioning oil and maintenance'},
      {value:'short', title:'Short or Trimmed', desc:'Close cut — focus on skin health beneath the beard'},
      {value:'growing', title:'Growing It Out', desc:'In the transition phase — dealing with itch and unevenness'},
      {value:'clean', title:'Clean Shaven', desc:'No beard — prioritizing smooth skin and shave recovery'},
    ]},
    { id:'routine', headline:"WHAT'S YOUR CURRENT ROUTINE?", sub:"No judgment here. This tells us where to meet you and what level to start at.", type:'standard', cols:'c1', options:[
      {value:'none', title:"Soap and Water — That's It", desc:"Starting from scratch. We'll keep it simple and build from the ground up."},
      {value:'some', title:'A Couple of Products', desc:"Moisturizer or face wash here and there. Ready to get more intentional."},
      {value:'routine', title:'A Consistent Routine', desc:"I have a process, but the products aren't dialed in for my skin."},
      {value:'advanced', title:'Full Skincare Stack', desc:"Serums, actives, the works. I just want better, more targeted products."},
    ]},
    { id:'sensitivity', headline:"HOW DOES YOUR SKIN REACT TO NEW PRODUCTS?", sub:"Some formulas are more active than others. We need to calibrate the strength of your box.", type:'standard', cols:'c2', options:[
      {value:'low', title:"No Issues — Skin Takes Anything", desc:'I can use most products without redness or irritation'},
      {value:'medium', title:'Occasional Reactions', desc:'Sometimes react to strong fragrances or potent actives'},
      {value:'high', title:'Very Reactive Skin', desc:'Redness, burning, or breakouts with most new products'},
      {value:'unknown', title:"Not Sure Yet", desc:"Haven't tested enough to know — keep it gentle"},
    ]},
    { id:'goal', headline:"WHAT'S THE MAIN GOAL?", sub:"One answer. This drives every product we select for you.", type:'standard', cols:'c2', options:[
      {value:'confidence', title:'Look & Feel My Best', desc:'Clear skin, even tone, sharp and well-groomed presentation'},
      {value:'fix', title:'Fix a Specific Problem', desc:'Target one issue — bumps, spots, dryness, or breakouts'},
      {value:'simple', title:'Simple, Effective Routine', desc:'Under 5 minutes. Products that actually work without the fuss'},
      {value:'invest', title:'Long-Term Skin Investment', desc:'Prevention, anti-aging, and building a foundation for the future'},
    ]},
  ];

  let qAnswers = {};
  let qCurrent = 0;
  const qTotal = qQuestions.length;

  function qResetQuiz() {
    qAnswers = {}; qCurrent = 0;
    document.getElementById('qProgressFill').style.width = '0%';
    document.getElementById('qNavLabel').textContent = 'Build Your Box';
    qShowScreen('qscreen-intro');
  }

  function qStartQuiz() {
    qShowScreen('qscreen-questions');
    qRenderQuestion(0);
  }

  function qRenderQuestion(index) {
    qCurrent = index;
    const q = qQuestions[index];
    document.getElementById('qNumLabel').textContent = `Question ${index+1} of ${qTotal}`;
    document.getElementById('qHeadline').textContent = q.headline;
    document.getElementById('qSub').textContent = q.sub;
    document.getElementById('qNavLabel').textContent = `${index+1} / ${qTotal}`;

    const dots = document.getElementById('qDots');
    dots.innerHTML = qQuestions.map((_,i) => `<div class="qdot ${i<index?'qdone':i===index?'qactive':''}"></div>`).join('');

    const grid = document.getElementById('optsGrid');
    grid.className = `opts-grid ${q.cols}`;

    if (q.type === 'swatch') {
      grid.innerHTML = q.options.map(opt => `
        <div class="opt-card sw-card ${qAnswers[q.id]===opt.value?'sel':''}" onclick="qSelect('${q.id}','${opt.value}',this)">
          <div class="tone-sw" style="background:${opt.swatch};"></div>
          <span class="opt-title">${opt.title}</span>
          <span class="opt-desc">${opt.desc}</span>
        </div>`).join('');
    } else {
      grid.innerHTML = q.options.map(opt => `
        <div class="opt-card ${qAnswers[q.id]===opt.value?'sel':''}" onclick="qSelect('${q.id}','${opt.value}',this)">
          <span class="opt-title">${opt.title}</span>
          <span class="opt-desc">${opt.desc}</span>
        </div>`).join('');
    }

    document.getElementById('qNextBtn').disabled = !qAnswers[q.id];
    document.getElementById('qBackBtn').disabled = index === 0;
    document.getElementById('qNextLabel').textContent = index === qTotal-1 ? 'Build My Box' : 'Next';
    document.getElementById('qProgressFill').style.width = `${(index/qTotal)*100}%`;
  }

  function qSelect(qId, value, el) {
    el.closest('.opts-grid').querySelectorAll('.opt-card').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
    qAnswers[qId] = value;
    document.getElementById('qNextBtn').disabled = false;
  }

  function qGoNext() {
    if (qCurrent < qTotal-1) { qRenderQuestion(qCurrent+1); }
    else { qShowLoading(); }
  }

  function qGoBack() { if (qCurrent > 0) qRenderQuestion(qCurrent-1); }

  function qShowLoading() {
    qShowScreen('qscreen-loading');
    document.getElementById('qProgressFill').style.width = '100%';
    document.getElementById('qNavLabel').textContent = 'Analyzing';
    const fill = document.getElementById('qLoaderFill');
    fill.style.animation = 'none'; fill.offsetHeight;
    fill.style.animation = 'qLoadBar 2.2s ease-out forwards';
    document.getElementById('qLoaderFill').style.cssText = 'height:100%;background:var(--terra);width:0%;border-radius:2px;animation:qLoadBar 2.2s ease-out forwards';

    const steps = document.querySelectorAll('.q-loading-step'); let s = 0;
    const go = () => {
      if (s > 0) { steps[s-1].classList.remove('qactive'); steps[s-1].classList.add('qdone'); steps[s-1].querySelector('.q-step-ind').textContent='✓'; }
      if (s < steps.length) { steps[s].classList.add('qactive'); s++; setTimeout(go, 580); }
      else { setTimeout(qShowResults, 400); }
    };
    setTimeout(go, 300);
  }

  function qBuildResults() {
    const a = qAnswers;
    const typeMap = {oily:'OILY SKIN',dry:'DRY SKIN',combo:'COMBINATION SKIN',normal:'BALANCED SKIN'};
    const typeSubs = {
      oily:"Your skin overproduces sebum. Your box focuses on oil control, pore-clearing actives, and lightweight hydration.",
      dry:"Your skin needs more moisture and lipid support. Your box prioritizes deep hydration and barrier repair.",
      combo:"You need targeted products — oil control in some zones, hydration in others. Your box balances both.",
      normal:"Your baseline is solid. Your box focuses on maintenance, protection, and your specific concern."
    };
    const concernMap = {hyperpigmentation:'DARK SPOTS + EVEN TONE',bumps:'RAZOR BUMPS + INGROWNS',acne:'BREAKOUTS + CLEAR SKIN',aging:'ANTI-AGING + FIRMNESS',dryness:'DEEP HYDRATION + TEXTURE',oilcontrol:'OIL CONTROL + PORES'};
    const products = [];
    if (a.type==='oily'||a.type==='combo') products.push({name:'Oil-Control Gel Cleanser',why:'Salicylic acid formula. Clears excess sebum and congestion without disrupting the skin barrier.',badge:'core'});
    else products.push({name:'Cream Hydrating Cleanser',why:'Sulfate-free and moisture-preserving. Removes buildup without leaving skin tight or dry.',badge:'core'});
    products.push({name:'SPF 30 Daily Moisturizer',why:'Mineral-chemical hybrid. Lightweight, invisible finish on all skin tones. Essential daily protection.',badge:'core'});
    if (a.concern==='hyperpigmentation') products.push({name:'Vitamin C + Niacinamide Serum',why:'Clinically proven to fade post-inflammatory marks and even skin tone. Formulated at optimal pH.',badge:'core'});
    else if (a.concern==='bumps') products.push({name:'Pre-Shave + Bump Defense Serum',why:'BHA exfoliant that works at the follicle level. Prevents ingrown hairs and razor irritation.',badge:'core'});
    else if (a.concern==='acne') products.push({name:'Targeted Spot Treatment',why:'Benzoyl peroxide formula that neutralizes acne-causing bacteria without irritating surrounding skin.',badge:'core'});
    else if (a.concern==='aging') products.push({name:'Retinol Night Serum',why:'Buffered retinol. Builds collagen and smooths texture over time. Use 2–3x weekly.',badge:'core'});
    else if (a.concern==='dryness') products.push({name:'Ceramide + Hyaluronic Barrier Cream',why:"Rebuilds the skin's moisture barrier. Addresses chronic dryness and rough texture within 1–2 weeks.",badge:'core'});
    else products.push({name:'Mattifying Pore-Refining Serum',why:'Niacinamide-based. Reduces pore size, regulates sebum production, and controls shine all day.',badge:'core'});
    if (a.beard==='full') products.push({name:'Beard Conditioning Oil',why:'Jojoba and argan base. Softens texture, eliminates beardruff, nourishes skin beneath the beard.',badge:'core'});
    else if (a.beard==='growing') products.push({name:'Beard Growth + Itch Relief Serum',why:'Biotin and caffeine formula. Calms the itch phase and encourages even, fuller growth.',badge:'core'});
    else if (a.beard==='clean') products.push({name:'Post-Shave Recovery Balm',why:'Alcohol-free. Calms irritation, closes pores, and deeply hydrates skin after every shave.',badge:'core'});
    else products.push({name:'Precision Hold + Skin Guard Gel',why:'Clean definition without clogging pores or leaving residue on the skin or hair line.',badge:'core'});
    if (a.sensitivity==='high') products.push({name:'Fragrance-Free Recovery Gel',why:'Zero irritants. Pure aloe and centella asiatica to calm reactive skin and reduce redness.',badge:'bonus'});
    else if (a.goal==='confidence') products.push({name:'Cologne Sample — Curated Pick',why:'Monthly rotating premium fragrance sample. The right finishing touch to the full ritual.',badge:'bonus'});
    else if (a.goal==='invest') products.push({name:'Eye Cream + Dark Circle Reducer',why:'Caffeine and peptide formula. Addresses puffiness and under-eye discoloration.',badge:'bonus'});
    else products.push({name:'Brightening Exfoliating Scrub',why:'Monthly treatment. Removes buildup, refines texture, and gives skin a noticeably clearer finish.',badge:'bonus'});
    const isAdv = a.routine==='advanced'||a.routine==='routine';
    return {
      type: typeMap[a.type]||'COMBINATION SKIN', typeSub: typeSubs[a.type]||typeSubs.combo,
      concern: concernMap[a.concern]||'OVERALL SKIN HEALTH',
      tier: isAdv?'PREMIUM — $49/MO':'ESSENTIAL — $39/MO', price: isAdv?'$49':'$39',
      profile:{'Skin Tone':a.tone?a.tone.charAt(0).toUpperCase()+a.tone.slice(1):'—','Skin Type':a.type?a.type.charAt(0).toUpperCase()+a.type.slice(1):'—','Main Goal':a.goal?a.goal.charAt(0).toUpperCase()+a.goal.slice(1):'—','Beard':a.beard?a.beard.charAt(0).toUpperCase()+a.beard.slice(1):'—'},
      products
    };
  }

  function qShowResults() {
    const r = qBuildResults();
    document.getElementById('qResType').textContent = r.type;
    document.getElementById('qResTypeSub').textContent = r.typeSub;
    document.getElementById('qResConcern').textContent = r.concern;
    document.getElementById('qResTier').textContent = r.tier;
    document.getElementById('qCtaPrice').textContent = r.price;
    document.getElementById('qNavLabel').textContent = 'Your Box';
    document.getElementById('qProfileGrid').innerHTML = Object.entries(r.profile).map(([k,v])=>`<div><span class="q-profile-label">${k}</span><span class="q-profile-value">${v}</span></div>`).join('');
    document.getElementById('qProductList').innerHTML = r.products.map(p=>`
      <div class="q-product-row">
        <div style="flex:1"><span class="q-product-name">${p.name}</span><span class="q-product-why">${p.why}</span></div>
        <span class="q-product-badge ${p.badge==='core'?'q-badge-core':'q-badge-bonus'}">${p.badge==='core'?'Core':'Bonus'}</span>
      </div>`).join('');
    qShowScreen('qscreen-results');
    document.getElementById('qProgressFill').style.width = '100%';
  }

  function qRetake() { qAnswers={}; qCurrent=0; document.getElementById('qProgressFill').style.width='0%'; document.getElementById('qNavLabel').textContent='Build Your Box'; qShowScreen('qscreen-intro'); }

  function qShowScreen(id) {
    document.querySelectorAll('.qscreen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelector('.quiz-overlay-body').scrollTop = 0;
  }

  // Expose to global for inline onclick
  window.openQuiz = openQuiz;
  window.closeQuiz = closeQuiz;
  window.qStartQuiz = qStartQuiz;
  window.qSelect = qSelect;
  window.qGoNext = qGoNext;
  window.qGoBack = qGoBack;
  window.qRetake = qRetake;

  // Product card video hover
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-card').forEach(function(card) {
      var video = card.querySelector('.product-card-video');
      if (!video) return;
      video.muted = true;
      card.addEventListener('mouseenter', function() {
        video.currentTime = 0;
        video.play();
      });
      card.addEventListener('mouseleave', function() {
        video.pause();
        video.currentTime = 0;
      });
    });
  });