import { formatPrice } from '../utils/currency.js';

export function renderVehicleSpecsModal(container, { vehicle, onClose, onSelect }) {
  if (!vehicle) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="modal-overlay active" id="specsModalOverlay">
      <div class="checkout-modal-container" style="max-width: 720px;">
        <!-- Header -->
        <div class="modal-header-bar">
          <div class="modal-title-group">
            <span class="modal-title">${vehicle.name}</span>
            <span class="modal-subtitle">${vehicle.subCategory} • ${vehicle.category === 'van' ? 'Van / Multi-Seater' : 'Passenger Car'}</span>
          </div>
          <button class="modal-close-btn" id="btnCloseSpecsModal" aria-label="Close modal">✕</button>
        </div>

        <!-- Body -->
        <div class="modal-body-scrollable">
          <!-- Studio Photo Showcase -->
          <div style="background: linear-gradient(180deg, #F8FAFC 0%, #EDF2F7 100%); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center; border: 1px solid var(--border-default); margin-bottom: 1.75rem;">
            <div style="max-width: 480px; margin: 0 auto; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm);">
              <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 100%; height: 240px; object-fit: cover; display: block;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80';" />
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); font-style: italic; margin-top: 1rem; font-weight: 500;">
              "${vehicle.tagline}"
            </p>
          </div>

          <!-- Comprehensive Specs Grid -->
          <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.85rem;">
            Vehicle Engineering & Capacity
          </h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.75rem;">
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Passenger Seating</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${vehicle.seats} Full-Size Seats</span>
            </div>
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Luggage Boot Space</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${vehicle.largeBags} Large + ${vehicle.smallBags} Small Bags</span>
            </div>
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Transmission Gearbox</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${vehicle.transmission}</span>
            </div>
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Fuel & Powertrain</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${vehicle.fuel} (${vehicle.fuelEconomy})</span>
            </div>
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Crash Safety Rating</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--color-success);">${vehicle.safetyRating}</span>
            </div>
            <div style="background: var(--bg-body); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-default);">
              <span style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; display: block; letter-spacing: 0.04em;">Included Mileage</span>
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${vehicle.mileage}</span>
            </div>
          </div>

          <!-- Included Features List -->
          <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.85rem;">
            Standard Equipment & Amenities
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem;">
            ${vehicle.features.map(f => `
              <li style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.88rem; color: var(--text-secondary);">
                <span style="color: var(--color-success); font-weight: 700;">✓</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>

          <!-- Security & Refundable Deposit Info -->
          <div style="background: #F8FAFC; border: 1px solid var(--border-default); padding: 1.15rem 1.25rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem; margin-bottom: 0.35rem;">
              Refundable Security Deposit: ${formatPrice(vehicle.deposit)}
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              Pre-authorized digitally at vehicle pickup via Credit Card or UPI mandate. Released automatically upon return after routine vehicle check-in.
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer-bar">
          <div class="modal-footer-price-peek">
            <span class="footer-total-label">Daily Rental Rate</span>
            <span class="footer-total-amount">${formatPrice(vehicle.dailyRate)} <small style="font-size: 0.8rem; color: var(--text-tertiary); font-weight: 500;">/ day</small></span>
          </div>
          <div class="modal-nav-btns">
            <button class="btn-step-prev" id="btnCloseSpecsModal2">Back to Fleet</button>
            <button class="btn-step-next" id="btnSelectFromSpecs">
              <span>Select Vehicle</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const overlay = container.querySelector('#specsModalOverlay');
  const closeBtn1 = container.querySelector('#btnCloseSpecsModal');
  const closeBtn2 = container.querySelector('#btnCloseSpecsModal2');
  const selectBtn = container.querySelector('#btnSelectFromSpecs');

  function close() {
    container.innerHTML = '';
    if (onClose) onClose();
  }

  closeBtn1.addEventListener('click', close);
  closeBtn2.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  selectBtn.addEventListener('click', () => {
    close();
    if (onSelect) onSelect(vehicle);
  });
}
