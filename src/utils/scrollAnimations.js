/**
 * Scroll-Driven Stagger Reveal & Counter Number Rolling Engine
 * Fluidly animates sections, headings, statistics, and cards as they enter view.
 */

export function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.section-title-wrap, .how-step-card, .package-card, .media-card, .review-card, .pillar-card, .station-accordion-card, .contact-card-box, .contact-channels-box, .hero-stat-item, .reveal-on-scroll'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // If it contains a number counter that hasn't run yet
        const counterEl = entry.target.querySelector('[data-counter-target]');
        if (counterEl && !counterEl._hasCounted) {
          counterEl._hasCounted = true;
          animateCounter(counterEl);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-prep');
    // Stagger in groups
    const staggerDelay = (index % 4) * 90;
    el.style.transitionDelay = `${staggerDelay}ms`;
    observer.observe(el);
  });
}

/**
 * Animated number counter with cubic ease-out
 */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter-target'), 10);
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const duration = 1800; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out expo curve
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = Math.floor(easeProgress * target);

    el.textContent = currentVal.toLocaleString('en-IN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('en-IN') + suffix;
    }
  }

  requestAnimationFrame(update);
}
