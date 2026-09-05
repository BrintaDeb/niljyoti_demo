/**
 * Physics-based 3D Card Tilt & Holographic Specular Glare Engine
 * Brings interactive physical depth and tactile luxury to vehicle cards, packages, and review modules.
 */

export function init3DCardTilt(root = document) {
  const cards = root.querySelectorAll('[data-3d-tilt]');

  cards.forEach(card => {
    // Avoid double initialization
    if (card._tiltInitialized) return;
    card._tiltInitialized = true;

    // Create or find holographic glare element
    let glare = card.querySelector('.card-3d-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-3d-glare';
      card.appendChild(glare);
    }

    let rafId = null;
    let bounds = null;

    const onEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
      glare.style.opacity = '1';
    };

    const onMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const px = (x / bounds.width) * 2 - 1; // -1 to 1
      const py = (y / bounds.height) * 2 - 1; // -1 to 1

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const maxRot = 10; // degrees
        const rotX = -py * maxRot;
        const rotY = px * maxRot;

        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px) scale3d(1.018, 1.018, 1.018)`;
        card.style.boxShadow = `${-rotY * 2}px ${rotX * 2 + 15}px 35px rgba(24, 156, 244, 0.16), 0 10px 25px rgba(15, 23, 42, 0.08)`;

        // Holographic Glare Position
        const glareX = (x / bounds.width) * 100;
        const glareY = (y / bounds.height) * 100;
        glare.style.background = `radial-gradient(circle 260px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(24, 156, 244, 0.18) 35%, transparent 70%)`;
      });
    };

    const onLeave = () => {
      bounds = null;
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      glare.style.opacity = '0';
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
  });
}
