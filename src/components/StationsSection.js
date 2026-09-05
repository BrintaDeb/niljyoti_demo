import { STATIONS, LETTER_GROUPS } from '../data/stations.js';

export function renderStationsSection(container, { onSelectStation }) {
  container.innerHTML = `
    <section class="stations-section" id="stations">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>📍 TRIPURA & NORTH EAST INDIA NETWORK</span>
          </div>
          <h2 class="section-main-title">
            Our Car Rental <span class="gradient-text-primary">Locations</span>
          </h2>
          <p class="section-subtitle">
            Pioneer car rental service across Tripura and North East India. Providing 24/7 service at Maharaja Bir Bikram Airport (IXA), Agartala Railway Station, and key heritage centers.
          </p>
        </div>

        <!-- Alphabetical Group Accordions (A-C, C-D, H-K, M-U) -->
        <div class="stations-accordion-wrap">
          ${LETTER_GROUPS.map((group, idx) => {
            const groupStations = STATIONS.filter(s => s.letterGroup === group);
            const isOpen = idx === 0 || idx === 1; // Open first two by default

            return `
              <div class="station-accordion-card ${isOpen ? 'open' : ''}" data-group="${group}">
                <div class="accordion-trigger-header">
                  <div class="group-letter-title">
                    <span>${group}</span>
                    <span class="group-count-tag">${groupStations.length} Stations</span>
                  </div>
                  <span class="accordion-toggle-icon">▼</span>
                </div>

                <div class="accordion-expanded-content">
                  <div class="stations-cards-grid">
                    ${groupStations.map(st => `
                      <div class="station-item-card">
                        <div class="station-card-top-row">
                          <span class="station-city-badge">${st.city}</span>
                          <span class="station-terminal-tag">${st.terminal}</span>
                        </div>
                        <h4 class="station-full-name">${st.name}</h4>
                        <p class="station-address-text">${st.address}</p>
                        
                        <div class="station-meta-row">
                          <span>🕒 ${st.hours}</span>
                          <button class="btn-select-station-quick" data-station-id="${st.id}">
                            Book Here ➔
                          </button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  // Accordion Toggle Listeners
  container.querySelectorAll('.station-accordion-card').forEach(card => {
    const trigger = card.querySelector('.accordion-trigger-header');
    trigger.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });

  // Quick Book Here Button
  container.querySelectorAll('.btn-select-station-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-station-id');
      const st = STATIONS.find(s => s.id === id);
      if (st && onSelectStation) {
        onSelectStation(st);
      }
    });
  });
}
