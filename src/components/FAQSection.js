import { FAQS } from '../data/faqs.js';

export function renderFAQSection(container) {
  // Convert markdown bold and lists in answer to HTML
  function formatAnswer(raw) {
    let formatted = raw
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');
    return `<p>${formatted}</p>`;
  }

  container.innerHTML = `
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>❓ HELPFUL RENTAL INFORMATION</span>
          </div>
          <h2 class="section-main-title">
            Frequently Asked <span class="gradient-text-saffron">Questions</span>
          </h2>
          <p class="section-subtitle">
            Essential guidelines regarding documentation, fuel scenarios, insurance, payment cards, and pet travel policies.
          </p>
        </div>

        <div class="faq-accordion-container">
          ${FAQS.map((faq, index) => {
            const isOpen = index === 0; // Open first by default
            return `
              <div class="faq-item-card ${isOpen ? 'open' : ''}" data-faq-id="${faq.id}">
                <button class="faq-question-btn" aria-expanded="${isOpen}">
                  <span class="faq-question-text">${faq.question}</span>
                  <span class="faq-icon-arrow">▼</span>
                </button>
                <div class="faq-answer-content">
                  ${formatAnswer(faq.answer)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  // Bind accordion click listeners
  container.querySelectorAll('.faq-item-card').forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}
