/* =========================================
   Portfolio – Interactive JS
   ========================================= */

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Typing effect for hero role ----
const roles = [
  'Senior Software Engineer',
  'Site Reliability Engineer',
  'Cloud Infrastructure Engineer',
  'Automation Engineer',
  'Distributed Systems',
];

const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const TYPING_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_WORD = 1800;

function type() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, PAUSE_AFTER_WORD);
      return;
    }
    setTimeout(type, TYPING_SPEED);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, DELETE_SPEED);
  }
}

if (typedEl) {
  if (prefersReducedMotion) {
    // Show the first role statically, no animation.
    typedEl.textContent = roles[0];
  } else {
    type();
  }
}


// ---- Canvas particle / grid background ----
const canvas = document.getElementById('heroCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width  = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(0.5, 2),
      vx: randomBetween(-0.2, 0.2),
      vy: randomBetween(-0.2, 0.2),
      alpha: randomBetween(0.2, 0.7),
    });
  }
}

function drawParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connection lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(88,166,255,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Draw particles
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88,166,255,${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}

if (canvas && ctx && !prefersReducedMotion) {
  resizeCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}


// ---- Scroll-spy: active nav links ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav__link--active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close nav when a link is clicked
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// ---- Scroll-reveal animations ----
const revealEls = document.querySelectorAll(
  '.skill-category, .service-card, .timeline__item, .cert-card'
);

function applyRevealStyles() {
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 400ms ease, transform 400ms ease';
  });
}

function revealOnScroll() {
  const viewBottom = window.scrollY + window.innerHeight;
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top + window.scrollY < viewBottom - 60) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

if (!prefersReducedMotion) {
  applyRevealStyles();
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // Run once on load
}


// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
