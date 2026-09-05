import { formatPrice } from '../utils/currency.js';

export function renderBookingConfirmationModal(container, { booking, onClose }) {
  if (!booking) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="modal-overlay active" id="confirmationModalOverlay">
      <div class="checkout-modal-container" style="max-width: 780px;">
        <div class="modal-header-bar">
          <div class="modal-title-group">
            <span class="modal-title" style="color: var(--brand-primary);">RESERVATION CONFIRMED</span>
            <span class="modal-subtitle">E-Voucher & Express Counter Pass</span>
          </div>
          <button class="modal-close-btn" id="btnCloseConfirmation">✕</button>
        </div>

        <div class="modal-body-scrollable">
          <div class="voucher-content-box">
            <div class="voucher-success-badge">✓</div>
            <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: var(--text-primary); text-transform: uppercase;">
              Booking Guaranteed!
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">
              A confirmation email and WhatsApp pass have been dispatched to <strong>${booking.driver.email}</strong>.
            </p>

            <div class="voucher-ref-code">
              ${booking.id}
            </div>

            <!-- QR Code Graphic for Airport Desk Handover -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1rem 0;">
              <div style="background: var(--bg-canvas); padding: 8px; border-radius: 12px; border: 1px solid var(--border-default); width: 100px; height: 100px; display: grid; place-content: center;">
                <svg viewBox="0 0 100 100" fill="var(--text-primary)" style="width: 84px; height: 84px;">
                  <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                  <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                  <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                  <rect x="50" y="50" width="10" height="10" />
                  <rect x="65" y="65" width="25" height="10" />
                  <rect x="75" y="50" width="15" height="10" />
                  <rect x="50" y="75" width="10" height="15" />
                </svg>
              </div>
              <div style="text-align: left; font-size: 0.82rem; color: var(--text-muted);">
                <div style="font-weight: 800; color: var(--brand-primary); margin-bottom: 0.2rem;">EXPRESS COUNTER PASS</div>
                Show this digital voucher QR code at the <strong>${booking.searchCriteria.pickupStation.terminal}</strong> desk for priority vehicle key collection.
              </div>
            </div>

            <!-- Summary Details Matrix -->
            <div class="voucher-details-grid">
              <div class="voucher-detail-cell">
                <span class="vd-label">Vehicle Reserved</span>
                <span class="vd-val">${booking.vehicle.name}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Service Type</span>
                <span class="vd-val">${booking.searchCriteria.serviceType === 'chauffeur' ? '👨‍✈️ Chauffeur-Driven' : '🚘 Self-Drive'}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Pick-up Station</span>
                <span class="vd-val">${booking.searchCriteria.pickupStation.name}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Pick-up Date & Time</span>
                <span class="vd-val">${booking.searchCriteria.pickupDate} at ${booking.searchCriteria.pickupTime}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Drop-off Date</span>
                <span class="vd-val">${booking.searchCriteria.dropoffDate} at ${booking.searchCriteria.dropoffTime}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Protection Plan</span>
                <span class="vd-val">${booking.protection.name}</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Primary Driver</span>
                <span class="vd-val">${booking.driver.fullName} (${booking.driver.phone})</span>
              </div>
              <div class="voucher-detail-cell">
                <span class="vd-label">Total Amount</span>
                <span class="vd-val" style="color: var(--brand-primary); font-size: 1.15rem; font-weight: 800;">${formatPrice(booking.pricing.grandTotal)}</span>
              </div>
            </div>

            <!-- Counter Meeting Point Instructions -->
            <div style="background: var(--bg-canvas); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.25rem; text-align: left; font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
              <strong style="color: var(--brand-primary); display: block; margin-bottom: 0.25rem;">📍 Station Directions:</strong>
              ${booking.searchCriteria.pickupStation.address} • Desk Phone: <strong>${booking.searchCriteria.pickupStation.phone}</strong> (Operating: ${booking.searchCriteria.pickupStation.hours})
            </div>
          </div>
        </div>

        <div class="modal-footer-bar">
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Status: <span style="color: var(--brand-primary); font-weight: 800;">CONFIRMED</span>
          </div>
          <div class="modal-nav-btns">
            <button class="btn-step-prev" id="btnPrintVoucher">
              <span>🖨️ Print Voucher</span>
            </button>
            <button class="btn-step-next" id="btnDoneConfirmation">
              <span>DONE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const overlay = container.querySelector('#confirmationModalOverlay');
  const closeBtn = container.querySelector('#btnCloseConfirmation');
  const doneBtn = container.querySelector('#btnDoneConfirmation');
  const printBtn = container.querySelector('#btnPrintVoucher');

  function close() {
    container.innerHTML = '';
    if (onClose) onClose();
  }

  closeBtn.addEventListener('click', close);
  doneBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });
}
