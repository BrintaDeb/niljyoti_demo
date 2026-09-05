import { findBooking, cancelBooking, getStoredBookings } from '../utils/storage.js';
import { formatPrice } from '../utils/currency.js';

export function renderManageBookingModal(container, { onClose }) {
  let foundBooking = null;

  function render(searchError = '') {
    const allBookings = getStoredBookings();

    container.innerHTML = `
      <div class="modal-overlay active" id="manageModalOverlay">
        <div class="checkout-modal-container" style="max-width: 680px;">
          <div class="modal-header-bar">
            <div class="modal-title-group">
              <span class="modal-title">MANAGE RESERVATION</span>
              <span class="modal-subtitle">Lookup, Modify or Cancel Your Booking</span>
            </div>
            <button class="modal-close-btn" id="btnCloseManageModal">✕</button>
          </div>

          <div class="modal-body-scrollable">
            ${!foundBooking ? `
              <!-- Lookup Form -->
              <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
                Enter your booking confirmation reference ID and the registered email address or mobile number to view your reservation.
              </p>

              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="form-field-wrapper">
                  <label class="form-field-label">Booking Reference ID *</label>
                  <input type="text" class="form-input-styled" id="lookupRefId" placeholder="e.g. NIL-82914-TR" />
                </div>
                <div class="form-field-wrapper">
                  <label class="form-field-label">Email or Mobile Number *</label>
                  <input type="text" class="form-input-styled" id="lookupContact" placeholder="e.g. rahul@example.com or 9876543210" />
                </div>
              </div>

              ${searchError ? `
                <div style="background: rgba(255,46,99,0.15); border: 1px solid var(--ruby-500); padding: 0.75rem 1rem; border-radius: 10px; color: #FFF; font-size: 0.85rem; margin-bottom: 1rem;">
                  ${searchError}
                </div>
              ` : ''}

              <button class="btn-card-select" id="btnLookupBooking" style="width: 100%; justify-content: center; padding: 0.85rem;">
                FIND MY BOOKING ➔
              </button>

              ${allBookings.length > 0 ? `
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
                  <div style="font-size: 0.78rem; font-weight: 800; color: var(--saffron-400); text-transform: uppercase; margin-bottom: 0.75rem;">
                    Recent Bookings Saved on this Device:
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${allBookings.slice(0, 3).map(b => `
                      <div class="recent-booking-pill" data-id="${b.id}" data-contact="${b.driver.email}" style="background: rgba(5,8,20,0.7); border: 1px solid var(--border-prominent); padding: 0.65rem 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <div>
                          <strong style="color: var(--gold-400);">${b.id}</strong> — <span style="color: #FFF;">${b.vehicle.name}</span>
                          <div style="font-size: 0.75rem; color: var(--text-dim);">${b.searchCriteria.pickupStation.city} (${b.searchCriteria.pickupDate})</div>
                        </div>
                        <span style="font-size: 0.75rem; font-weight: 800; color: ${b.status === 'Cancelled' ? 'var(--ruby-500)' : 'var(--emerald-400)'};">
                          ${b.status}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            ` : `
              <!-- Found Booking Details View -->
              <div style="background: rgba(11,16,36,0.9); border: 1px solid var(--border-prominent); border-radius: 20px; padding: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
                  <div>
                    <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Reference ID</span>
                    <h3 style="font-family: var(--font-display); color: var(--gold-400); font-size: 1.5rem; font-weight: 900;">${foundBooking.id}</h3>
                  </div>
                  <span style="padding: 0.35rem 0.85rem; border-radius: 999px; font-weight: 800; font-size: 0.8rem; background: ${foundBooking.status === 'Cancelled' ? 'rgba(255,46,99,0.2)' : 'rgba(0,245,155,0.2)'}; color: ${foundBooking.status === 'Cancelled' ? 'var(--ruby-500)' : 'var(--emerald-400)'};">
                    ${foundBooking.status}
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.88rem; margin-bottom: 1.5rem;">
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Vehicle</span>
                    <strong style="color: #FFF;">${foundBooking.vehicle.name}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Pick-up Location</span>
                    <strong style="color: #FFF;">${foundBooking.searchCriteria.pickupStation.name}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Dates</span>
                    <strong style="color: #FFF;">${foundBooking.searchCriteria.pickupDate} to ${foundBooking.searchCriteria.dropoffDate}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Driver</span>
                    <strong style="color: #FFF;">${foundBooking.driver.fullName} (${foundBooking.driver.phone})</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Total Paid</span>
                    <strong style="color: var(--gold-400);">${formatPrice(foundBooking.pricing.grandTotal)}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">Protection</span>
                    <strong style="color: #FFF;">${foundBooking.protection.name}</strong>
                  </div>
                </div>

                ${foundBooking.status !== 'Cancelled' ? `
                  <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
                    <button class="btn-step-prev" id="btnCancelBooking" style="border-color: var(--ruby-500); color: var(--ruby-500);">
                      Cancel Booking (100% Refund)
                    </button>
                    <button class="btn-step-next" id="btnBackToLookup">
                      Look Up Another
                    </button>
                  </div>
                ` : `
                  <div style="font-size: 0.85rem; color: var(--ruby-500); font-weight: 700;">
                    This booking was cancelled. 100% refund has been processed back to your original payment method.
                  </div>
                `}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Listeners
    const overlay = container.querySelector('#manageModalOverlay');
    const closeBtn = container.querySelector('#btnCloseManageModal');

    function close() {
      container.innerHTML = '';
      if (onClose) onClose();
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    const lookupBtn = container.querySelector('#btnLookupBooking');
    if (lookupBtn) {
      lookupBtn.addEventListener('click', () => {
        const ref = container.querySelector('#lookupRefId').value;
        const contact = container.querySelector('#lookupContact').value;
        if (!ref || !contact) {
          render('Please enter both Booking Reference and Email/Phone.');
          return;
        }
        const b = findBooking(ref, contact);
        if (b) {
          foundBooking = b;
          render();
        } else {
          render('No booking matching this Reference ID and Contact found. Please check and try again.');
        }
      });
    }

    container.querySelectorAll('.recent-booking-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.getAttribute('data-id');
        const contact = pill.getAttribute('data-contact');
        const b = findBooking(id, contact);
        if (b) {
          foundBooking = b;
          render();
        }
      });
    });

    const cancelBtn = container.querySelector('#btnCancelBooking');
    if (cancelBtn && foundBooking) {
      cancelBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel this booking? You are eligible for a 100% full refund.')) {
          cancelBooking(foundBooking.id);
          foundBooking.status = 'Cancelled';
          render();
        }
      });
    }

    const backBtn = container.querySelector('#btnBackToLookup');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        foundBooking = null;
        render();
      });
    }
  }

  render();
}
