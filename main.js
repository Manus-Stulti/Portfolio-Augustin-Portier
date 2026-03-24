
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => revealObs.observe(el));

setTimeout(() => {
  document.querySelectorAll('#hero .fade-up, .proj-hero .fade-up').forEach(el => el.classList.add('in'));
}, 80);


const skillsPanel = document.getElementById('skillsPanel');

if (skillsPanel) {
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 90);
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  barObs.observe(skillsPanel);
}


const sections = document.querySelectorAll('section[id], footer[id]');
const links    = document.querySelectorAll('.nav-links a');

if (sections.length) {
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => activeObs.observe(s));
}


const headerEl = document.querySelector('header');

window.addEventListener('scroll', () => {
  headerEl.style.background = window.scrollY > 30
    ? 'rgba(12,12,12,0.98)'
    : 'rgba(12,12,12,0.92)';
}, { passive: true });


const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const bars     = toggle?.querySelectorAll('span');

toggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    bars[0].style.transform = 'translateY(6px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    bars?.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});
