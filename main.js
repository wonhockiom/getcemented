// ── CURSOR ──
const cur = document.getElementById('cur');
const curRing = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  curRing.style.left = rx + 'px'; curRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(2.2)'; curRing.style.width = '52px'; curRing.style.height = '52px'; });
  el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; curRing.style.width = '32px'; curRing.style.height = '32px'; });
});

// ── NAV ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40);
});
document.getElementById('burger').addEventListener('click', function () {
  const isOpen = this.classList.toggle('open');
  this.setAttribute('aria-expanded', isOpen);
  document.getElementById('mobNav').classList.toggle('open');
});
function closeMob() {
  const b = document.getElementById('burger');
  b.classList.remove('open');
  b.setAttribute('aria-expanded', 'false');
  document.getElementById('mobNav').classList.remove('open');
}

// ── SCROLL REVEAL ──
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const show = el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { show(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    obs.observe(el);
    // Immediately show if already in viewport
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) show(el);
  });
})();

// ── QUIZ ──
function openQuiz() { document.getElementById('quizOv').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeQuiz() {
  const o = document.getElementById('quizOv');
  o.classList.add('closing');
  setTimeout(() => { o.classList.remove('active', 'closing'); document.body.style.overflow = ''; }, 350);
}
window.openQuiz = openQuiz;
window.closeQuiz = closeQuiz;

const questions = [
  { id: 'tone', hl: 'What is your skin tone?', sub: 'Select what best describes your natural tone', type: 'swatch', cols: 'c3', options: [
    { value: 'light', title: 'Light', desc: 'Fair to light brown', swatch: '#D4A574' },
    { value: 'caramel', title: 'Caramel', desc: 'Warm caramel brown', swatch: '#B07D4A' },
    { value: 'almond', title: 'Almond', desc: 'Medium brown', swatch: '#8B6040' },
    { value: 'mahogany', title: 'Mahogany', desc: 'Rich medium-dark brown', swatch: '#6B3F22' },
    { value: 'deep', title: 'Deep', desc: 'Deep dark brown', swatch: '#3D1F0C' },
    { value: 'ebony', title: 'Ebony', desc: 'Rich ebony', swatch: '#1A0A04' }
  ]},
  { id: 'type', hl: 'What is your skin type?', sub: 'When you wake up without washing your face', type: 'card', cols: 'c2', options: [
    { value: 'oily', title: 'Oily', desc: 'Shiny all over, large pores' },
    { value: 'dry', title: 'Dry', desc: 'Tight, flaky, dull' },
    { value: 'combo', title: 'Combination', desc: 'Oily T-zone, dry cheeks' },
    { value: 'normal', title: 'Balanced', desc: 'Generally clear, minimal issues' }
  ]},
  { id: 'concern', hl: 'What is your main concern?', sub: "We'll build your box around this", type: 'card', cols: 'c2', options: [
    { value: 'hyperpigmentation', title: 'Dark Spots', desc: 'Post-blemish marks, uneven tone' },
    { value: 'bumps', title: 'Razor Bumps', desc: 'Ingrowns, irritation after shaving' },
    { value: 'acne', title: 'Breakouts', desc: 'Active acne, congestion, texture' },
    { value: 'aging', title: 'Anti-Aging', desc: 'Lines, firmness, overall health' },
    { value: 'dryness', title: 'Dryness', desc: 'Rough texture, flaking, tightness' },
    { value: 'oilcontrol', title: 'Oil Control', desc: 'Shine, large pores, blotting' }
  ]},
  { id: 'beard', hl: 'What is your beard situation?', sub: 'This shapes the grooming products we include', type: 'card', cols: 'c2', options: [
    { value: 'full', title: 'Full Beard', desc: 'Maintained, needs conditioning' },
    { value: 'growing', title: 'Growing It Out', desc: 'In the itch phase or early growth' },
    { value: 'clean', title: 'Clean Shaven', desc: 'Shaving daily, post-shave care' },
    { value: 'fade', title: 'Fade / Trim', desc: 'Short, sharp lines maintained regularly' }
  ]},
  { id: 'sensitivity', hl: 'How sensitive is your skin?', sub: 'Helps us choose gentler actives if needed', type: 'card', cols: 'c3', options: [
    { value: 'low', title: 'Not Sensitive', desc: 'Handles most products fine' },
    { value: 'medium', title: 'Somewhat', desc: 'Occasional reactions' },
    { value: 'high', title: 'Very Sensitive', desc: 'Burns, stings, redness often' }
  ]},
  { id: 'goal', hl: 'What is your grooming goal?', sub: 'What does success look like for you?', type: 'card', cols: 'c2', options: [
    { value: 'confidence', title: 'Look & Feel Fresh', desc: 'Consistent, clean, confident daily' },
    { value: 'invest', title: 'Invest in My Skin', desc: 'Long-term skin health and aging' },
    { value: 'fix', title: 'Fix a Specific Issue', desc: 'Target one clear problem' },
    { value: 'simple', title: 'Keep It Simple', desc: 'A clean ritual that works, no fuss' }
  ]},
  { id: 'routine', hl: 'How would you describe your current routine?', sub: "Be honest — we'll calibrate accordingly", type: 'card', cols: 'c3', options: [
    { value: 'none', title: 'Basically Nothing', desc: 'Soap and maybe a moisturizer' },
    { value: 'basic', title: 'The Basics', desc: 'Cleanser, moisturizer, SPF' },
    { value: 'advanced', title: 'Full Routine', desc: 'Serums, treatments, the works' }
  ]}
];

let qCurrent = 0, qAnswers = {};
const qTotal = questions.length;

function qShowScreen(id) {
  document.querySelectorAll('.qscreen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector('.q-body').scrollTop = 0;
}

function qStart() {
  qAnswers = {}; qCurrent = 0;
  document.getElementById('qProgFill').style.width = '0%';
  document.getElementById('qNavLabel').textContent = 'Build Your Box';
  renderDots(); qRender(0); qShowScreen('qscreen-questions');
}
window.qStart = qStart;

function renderDots() {
  document.getElementById('qDots').innerHTML = questions.map((_, i) =>
    `<div class="qdot ${i < qCurrent ? 'qdone' : i === qCurrent ? 'qactive' : ''}"></div>`
  ).join('');
}

function qRender(index) {
  qCurrent = index;
  const q = questions[index];
  document.getElementById('qNumLabel').textContent = `Question ${index + 1} of ${qTotal}`;
  document.getElementById('qHeadline').textContent = q.hl;
  document.getElementById('qSub').textContent = q.sub;
  document.getElementById('qNextLabel').textContent = index === qTotal - 1 ? 'Build My Box' : 'Next';
  document.getElementById('qBackBtn').disabled = index === 0;
  document.getElementById('qNextBtn').disabled = !qAnswers[q.id];
  document.getElementById('qProgFill').style.width = `${(index / qTotal) * 100}%`;
  renderDots();
  const grid = document.getElementById('optsGrid');
  grid.className = `opts-grid ${q.cols}`;
  if (q.type === 'swatch') {
    grid.innerHTML = q.options.map(opt =>
      `<div class="opt-card sw-card ${qAnswers[q.id] === opt.value ? 'sel' : ''}" onclick="qSel('${q.id}','${opt.value}',this)"><div class="tone-sw" style="background:${opt.swatch}"></div><span class="opt-title">${opt.title}</span><span class="opt-desc">${opt.desc}</span></div>`
    ).join('');
  } else {
    grid.innerHTML = q.options.map(opt =>
      `<div class="opt-card ${qAnswers[q.id] === opt.value ? 'sel' : ''}" onclick="qSel('${q.id}','${opt.value}',this)"><span class="opt-title">${opt.title}</span><span class="opt-desc">${opt.desc}</span></div>`
    ).join('');
  }
}

function qSel(qId, value, el) {
  el.closest('.opts-grid').querySelectorAll('.opt-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  qAnswers[qId] = value;
  document.getElementById('qNextBtn').disabled = false;
}
window.qSel = qSel;

function qNext() { if (qCurrent < qTotal - 1) { qRender(qCurrent + 1); } else { qLoading(); } }
function qBack() { if (qCurrent > 0) qRender(qCurrent - 1); }
window.qNext = qNext;
window.qBack = qBack;

function qLoading() {
  qShowScreen('qscreen-loading');
  document.getElementById('qProgFill').style.width = '100%';
  document.getElementById('qNavLabel').textContent = 'Analyzing';
  const fill = document.getElementById('qBarFill');
  fill.style.cssText = 'height:100%;background:var(--terra);width:0;border-radius:1px;animation:qBar 2.2s ease-out forwards';
  const steps = document.querySelectorAll('.q-load-step');
  let s = 0;
  const go = () => {
    if (s > 0) { steps[s - 1].classList.remove('qactive'); steps[s - 1].classList.add('qdone'); steps[s - 1].querySelector('.q-step-ind').textContent = '✓'; }
    if (s < steps.length) { steps[s].classList.add('qactive'); s++; setTimeout(go, 580); }
    else { setTimeout(() => qShowScreen('qscreen-email'), 400); }
  };
  setTimeout(go, 300);
}

function qSubmitEmail() {
  const email = document.getElementById('qEmailInput').value;
  if (email) {
    const d = new FormData();
    d.append('_subject', 'New Quiz — CEMENTED');
    d.append('Email', email);
    Object.entries(qAnswers).forEach(([k, v]) => d.append(k, v));
    fetch('https://formspree.io/f/mwvnnbqo', { method: 'POST', body: d, headers: { Accept: 'application/json' } });
  }
  qShowResults();
}
window.qSubmitEmail = qSubmitEmail;

function qBuildResults() {
  const a = qAnswers;
  const typeMap = { oily: 'OILY SKIN', dry: 'DRY SKIN', combo: 'COMBINATION SKIN', normal: 'BALANCED SKIN' };
  const typeSubs = {
    oily: 'Your skin overproduces sebum. Your box focuses on oil control, pore-clearing actives, and lightweight hydration.',
    dry: 'Your skin needs more moisture. Your box prioritizes deep hydration and barrier repair.',
    combo: 'You need targeted products. Your box balances oil control and hydration by zone.',
    normal: 'Your baseline is solid. Your box focuses on maintenance, protection, and your specific concern.'
  };
  const concernMap = {
    hyperpigmentation: 'DARK SPOTS + EVEN TONE', bumps: 'RAZOR BUMPS + INGROWNS',
    acne: 'BREAKOUTS + CLEAR SKIN', aging: 'ANTI-AGING + FIRMNESS',
    dryness: 'DEEP HYDRATION + TEXTURE', oilcontrol: 'OIL CONTROL + PORES'
  };
  const products = [];
  if (a.type === 'oily' || a.type === 'combo') products.push({ name: 'Oil-Control Gel Cleanser', why: 'Salicylic acid formula. Clears sebum without disrupting the skin barrier.', badge: 'core' });
  else products.push({ name: 'Cream Hydrating Cleanser', why: 'Sulfate-free. Removes buildup without leaving skin tight or dry.', badge: 'core' });
  products.push({ name: 'SPF 30 Daily Moisturizer', why: 'Mineral-hybrid. Lightweight, invisible finish on all skin tones.', badge: 'core' });
  if (a.concern === 'hyperpigmentation') products.push({ name: 'Vitamin C + Niacinamide Serum', why: 'Clinically proven to fade post-inflammatory marks and even skin tone.', badge: 'core' });
  else if (a.concern === 'bumps') products.push({ name: 'Pre-Shave + Bump Defense Serum', why: 'BHA exfoliant that works at the follicle level. Prevents ingrown hairs.', badge: 'core' });
  else if (a.concern === 'acne') products.push({ name: 'Targeted Spot Treatment', why: 'Benzoyl peroxide formula that neutralizes acne-causing bacteria.', badge: 'core' });
  else if (a.concern === 'aging') products.push({ name: 'Retinol Night Serum', why: 'Buffered retinol. Builds collagen and smooths texture. Use 2–3x weekly.', badge: 'core' });
  else if (a.concern === 'dryness') products.push({ name: 'Ceramide + Hyaluronic Barrier Cream', why: 'Rebuilds the moisture barrier. Addresses chronic dryness within 1–2 weeks.', badge: 'core' });
  else products.push({ name: 'Mattifying Pore-Refining Serum', why: 'Niacinamide-based. Reduces pore size and controls shine all day.', badge: 'core' });
  if (a.beard === 'full') products.push({ name: 'Beard Conditioning Oil', why: 'Jojoba and argan base. Softens texture, eliminates beardruff.', badge: 'core' });
  else if (a.beard === 'growing') products.push({ name: 'Beard Growth + Itch Relief Serum', why: 'Biotin and caffeine formula. Calms the itch phase and encourages fuller growth.', badge: 'core' });
  else if (a.beard === 'clean') products.push({ name: 'Post-Shave Recovery Balm', why: 'Alcohol-free. Calms irritation and deeply hydrates after every shave.', badge: 'core' });
  else products.push({ name: 'Precision Hold + Skin Guard Gel', why: 'Clean definition without clogging pores or leaving residue.', badge: 'core' });
  if (a.sensitivity === 'high') products.push({ name: 'Fragrance-Free Recovery Gel', why: 'Zero irritants. Pure aloe and centella asiatica to calm reactive skin.', badge: 'bonus' });
  else if (a.goal === 'confidence') products.push({ name: 'Cologne Sample — Curated Pick', why: 'Monthly rotating premium fragrance sample. The finishing touch.', badge: 'bonus' });
  else products.push({ name: 'Brightening Exfoliating Scrub', why: 'Monthly treatment. Removes buildup and gives skin a noticeably clearer finish.', badge: 'bonus' });
  return {
    type: typeMap[a.type] || 'COMBINATION SKIN',
    typeSub: typeSubs[a.type] || typeSubs.combo,
    concern: concernMap[a.concern] || 'OVERALL SKIN HEALTH',
    price: '$39',
    profile: {
      'Skin Type': a.type ? a.type[0].toUpperCase() + a.type.slice(1) : '—',
      'Main Concern': a.concern ? a.concern[0].toUpperCase() + a.concern.slice(1) : '—',
      'Goal': a.goal ? a.goal[0].toUpperCase() + a.goal.slice(1) : '—',
      'Beard': a.beard ? a.beard[0].toUpperCase() + a.beard.slice(1) : '—'
    },
    products
  };
}

function qShowResults() {
  const r = qBuildResults();
  document.getElementById('qResType').textContent = r.type;
  document.getElementById('qResTypeSub').textContent = r.typeSub;
  document.getElementById('qResConcern').textContent = r.concern;
  document.getElementById('qCtaPrice').textContent = r.price;
  document.getElementById('qNavLabel').textContent = 'Your Box';
  document.getElementById('qProfileGrid').innerHTML = Object.entries(r.profile).map(([k, v]) =>
    `<div><span class="q-profile-label">${k}</span><span class="q-profile-value">${v}</span></div>`
  ).join('');
  document.getElementById('qProductList').innerHTML = r.products.map(p =>
    `<div class="q-product-row"><div style="flex:1"><span class="q-product-name">${p.name}</span><span class="q-product-why">${p.why}</span></div><span class="q-product-badge ${p.badge === 'core' ? 'q-badge-core' : 'q-badge-bonus'}">${p.badge === 'core' ? 'Core' : 'Bonus'}</span></div>`
  ).join('');
  qShowScreen('qscreen-results');
  document.getElementById('qProgFill').style.width = '100%';
}
window.qShowResults = qShowResults;

function qRetake() {
  qAnswers = {}; qCurrent = 0;
  document.getElementById('qProgFill').style.width = '0%';
  document.getElementById('qNavLabel').textContent = 'Build Your Box';
  qShowScreen('qscreen-intro');
}
window.qRetake = qRetake;

// Spots counter (cosmetic)
let spots = 40;
function tickSpots() {
  if (spots > 36 && Math.random() < .3) {
    spots--;
    document.querySelectorAll('#spotsLeft,#spotsLeft2').forEach(el => el.textContent = spots);
  }
}
setInterval(tickSpots, 18000);
