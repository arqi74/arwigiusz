/* =========================================
   CUSTOM CURSOR
   ========================================= */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .btn, .tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* =========================================
   HERO REVEAL ON LOAD
   ========================================= */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-item').forEach(el => {
    el.classList.add('is-visible');
  });
});

/* =========================================
   TYPEWRITER
   ========================================= */
const phrases = [
  'Projektuję i tworzę nowoczesne strony\noraz aplikacje webowe.',
  'Szybkie. Estetyczne. Funkcjonalne.',
  'Każdy projekt traktuję jako produkt.',
];

const tw = document.getElementById('typewriter');
let phraseIdx = 0, charIdx = 0, deleting = false, pauseTimer = null;

function typeStep() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    charIdx++;
    tw.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      pauseTimer = setTimeout(typeStep, 2200);
      return;
    }
    setTimeout(typeStep, 38);
  } else {
    charIdx--;
    tw.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeStep, 400);
      return;
    }
    setTimeout(typeStep, 18);
  }
}

setTimeout(typeStep, 900);

/* =========================================
   TERMINAL TYPING
   ========================================= */
const terminalLines = [
  { text: '// web developer', cls: 't-comment' },
  { text: '' },
  { text: 'const dev = {', cls: '' },
  { text: '  name: <span class="t-str">"Arwigiusz"</span>,', cls: 't-key' },
  { text: '  role: <span class="t-str">"Frontend Dev"</span>,', cls: 't-key' },
  { text: '  exp:  <span class="t-num">3</span>,', cls: 't-key' },
  { text: '  open: <span class="t-fn">true</span>', cls: 't-key' },
  { text: '};', cls: '' },
  { text: '' },
  { text: 'dev.<span class="t-fn">build</span>(<span class="t-str">"something cool"</span>);', cls: '' },
];

const termBody = document.getElementById('terminal-code');
let lineIdx = 0;

function printNextLine() {
  if (lineIdx >= terminalLines.length) return;
  const { text, cls } = terminalLines[lineIdx];
  const div = document.createElement('div');
  div.innerHTML = cls ? `<span class="${cls}">${text}</span>` : text || '&nbsp;';
  termBody.appendChild(div);
  lineIdx++;
  setTimeout(printNextLine, lineIdx < 3 ? 60 : 90);
}

setTimeout(printNextLine, 1400);

/* =========================================
   INTERSECTION — SECTION REVEALS
   ========================================= */
const sectionObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      sectionObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal-section').forEach(el => sectionObserver.observe(el));

/* =========================================
   COUNT-UP STATS
   ========================================= */
function countUp(el) {
  const target  = parseInt(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const dur     = 1200;
  const step    = 16;
  const steps   = dur / step;
  let current   = 0;
  const inc     = target / steps;

  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, step);
}

const statObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(countUp);
      statObserver.disconnect();
    }
  }),
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.about__stats');
if (statsSection) statObserver.observe(statsSection);

/* =========================================
   CARD MOUSE-GLOW
   ========================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* =========================================
   ACTIVE NAV ON SCROLL
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  }),
  { threshold: 0.5 }
);

sections.forEach(s => navObserver.observe(s));
