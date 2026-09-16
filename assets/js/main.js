/* Solent Marine Consultants — vanilla JavaScript enhancements */
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const dropdowns = [...document.querySelectorAll('.nav-drop')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    dropdowns.forEach((drop) => {
      drop.classList.remove('open');
      const trigger = drop.querySelector(':scope > a');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('open');
      nav.classList.toggle('open', willOpen);
      menuButton.setAttribute('aria-expanded', String(willOpen));
      document.body.classList.toggle('menu-open', willOpen);
    });

    document.addEventListener('click', (event) => {
      if (window.innerWidth > 1040) return;
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  dropdowns.forEach((drop) => {
    const trigger = drop.querySelector(':scope > a');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
      if (window.innerWidth > 1040) return;
      event.preventDefault();
      const willOpen = !drop.classList.contains('open');
      dropdowns.forEach((other) => {
        if (other !== drop) {
          other.classList.remove('open');
          other.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
        }
      });
      drop.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  nav?.querySelectorAll('a').forEach((link) => {
    if (!link.closest('.nav-drop') || link.closest('.drop-menu')) {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1040) closeMenu();
      });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) closeMenu();
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Add reveal motion automatically so the HTML stays clean.
  const revealGroups = [
    '.section .eyebrow',
    '.section .section-title',
    '.section .section-copy',
    '.section .card',
    '.section .step',
    '.section .logo-card',
    '.section .blog-card',
    '.section .split-media',
    '.section .value-item',
    '.section-sm .cta',
    '.contact-grid > *',
    '.article > *'
  ];

  const revealElements = [...document.querySelectorAll(revealGroups.join(','))];
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 55}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealElements.forEach((el) => observer.observe(el));
  }

  // Scroll-to-top control.
  const scrollTop = document.createElement('button');
  scrollTop.className = 'scroll-top';
  scrollTop.type = 'button';
  scrollTop.setAttribute('aria-label', 'Back to top');
  scrollTop.textContent = '↑';
  document.body.appendChild(scrollTop);

  const updateScrollTop = () => {
    scrollTop.classList.toggle('is-visible', window.scrollY > 650);
  };
  updateScrollTop();
  window.addEventListener('scroll', updateScrollTop, { passive: true });
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // Contact form: static-site friendly email fallback.
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const status = contactForm.querySelector('.form-status');
      if (!contactForm.checkValidity()) return;
      event.preventDefault();

      const data = new FormData(contactForm);
      const name = data.get('form_fields[name]') || '';
      const email = data.get('form_fields[email]') || '';
      const phone = data.get('form_fields[field_6b84ccb]') || '';
      const message = data.get('form_fields[message]') || '';
      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

      if (status) status.textContent = 'Opening your email application to send this enquiry…';
      window.location.href = `mailto:enquiry@solentconsult.com?subject=${subject}&body=${body}`;
    });
  }
})();
