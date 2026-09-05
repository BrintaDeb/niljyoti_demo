import { VALUE_PROPS } from '../data/faqs.js';

export function renderWhyChooseUs(container) {
  const getIconGraphic = (icon) => {
    switch (icon) {
      case 'wrench': return '🚘';
      case 'shield-check': return '🏛️';
      case 'plane': return '✈️';
      case 'sparkles': return '⭐';
      default: return '⚡';
    }
  };

  container.innerHTML = `
    <section class="why-choose-section" id="whyChooseUs">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>PIONEER CAR RENTAL IN TRIPURA SINCE 2007</span>
          </div>
          <h2 class="section-main-title">
            Why Rent a Car with <span class="gradient-text-primary">Niljyoti Travels</span>?
          </h2>
          <p class="section-subtitle">
            A trusted symbol of excellence for individual travelers, tourists, corporate delegations, and government agencies across North East India.
          </p>
        </div>

        <!-- 4 Core Pillars Grid -->
        <div class="why-pillars-grid">
          ${VALUE_PROPS.map(p => `
            <div class="pillar-card">
              <div class="pillar-icon-wrap">
                ${getIconGraphic(p.icon)}
              </div>
              <h3 class="pillar-title">${p.title}</h3>
              <span class="pillar-subtitle">${p.subtitle}</span>
              <p class="pillar-desc">${p.description}</p>
            </div>
          `).join('')}
        </div>

        <!-- 5 Core Commitments Banner -->
        <div class="niljyoti-commitments-banner">
          <h3 class="benefits-title">Our Commitments to Every Renter & Traveler</h3>
          <div class="benefits-list-row">
            <div class="benefit-bullet-item">
              <span class="benefit-check-icon">✓</span>
              <span>Fast Online Booking: Reserve Verified Cars in Under 60 Seconds</span>
            </div>
            <div class="benefit-bullet-item">
              <span class="benefit-check-icon">✓</span>
              <span>Express Airport Pickup at Maharaja Bir Bikram Airport (IXA)</span>
            </div>
            <div class="benefit-bullet-item">
              <span class="benefit-check-icon">✓</span>
              <span>Flexible Daily, Weekly, Monthly & Corporate Fleet Leases</span>
            </div>
            <div class="benefit-bullet-item">
              <span class="benefit-check-icon">✓</span>
              <span>500+ Vehicles: All Commercial Yellow-Plate AITP Compliant</span>
            </div>
            <div class="benefit-bullet-item">
              <span class="benefit-check-icon">✓</span>
              <span>Enlisted Vendor for Central & Tripura State Govt. Departments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
