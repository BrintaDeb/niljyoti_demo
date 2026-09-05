import { PROTECTION_PACKAGES } from '../data/protection.js';
import { EXTRAS } from '../data/extras.js';
import { formatPrice, getCurrencySymbol } from '../utils/currency.js';
import { saveBooking } from '../utils/storage.js';

export function renderCheckoutModal(container, { vehicle, searchCriteria, onClose, onBookingComplete }) {
  if (!vehicle) {
    container.innerHTML = '';
    return;
  }

  let currentStep = 1;
  const days = searchCriteria?.durationDays || 1;

  // Checkout State
  let checkoutState = {
    vehicle,
    rateType: 'online', // 'online' (15% off) or 'counter'
    selectedProtection: PROTECTION_PACKAGES[0], // Basic default
    selectedExtras: {}, // { 'extra-id': quantity }
    driver: {
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+91',
      licenseNumber: '',
      idType: 'Aadhaar Card',
      idNumber: '',
      flightNumber: searchCriteria?.flightNumber || '',
      specialRequests: ''
    },
    paymentMethod: 'upi', // 'upi', 'card', 'desk'
    promo: searchCriteria?.appliedPromo || null
  };

  // Pricing Calculation Function
  function getPricingBreakdown() {
    const baseDaily = checkoutState.rateType === 'online' ? vehicle.dailyRate : vehicle.counterRate;
    const baseTotal = baseDaily * days;

    // Protection
    const protectionDaily = checkoutState.selectedProtection.pricePerDay;
    const protectionTotal = protectionDaily * days;

    // Extras
    let extrasTotal = 0;
    Object.keys(checkoutState.selectedExtras).forEach(extraId => {
      const qty = checkoutState.selectedExtras[extraId];
      const extraObj = EXTRAS.find(e => e.id === extraId);
      if (extraObj && qty > 0) {
        if (extraObj.isOneTime) {
          extrasTotal += extraObj.pricePerDay * qty;
        } else {
          extrasTotal += extraObj.pricePerDay * days * qty;
        }
      }
    });

    // Subtotal before tax
    const subtotal = baseTotal + protectionTotal + extrasTotal;

    // Discount if promo applied
    let discount = 0;
    if (checkoutState.promo) {
      discount = Math.round(subtotal * (checkoutState.promo.discountPercent / 100));
    }

    // GST @ 18% as per Indian Goods and Services Tax Law for Rent-a-cab
    const taxableAmount = Math.max(0, subtotal - discount);
    const gst18 = Math.round(taxableAmount * 0.18);

    const grandTotal = taxableAmount + gst18;

    return {
      days,
      baseDaily,
      baseTotal,
      protectionTotal,
      extrasTotal,
      subtotal,
      discount,
      gst18,
      grandTotal,
      deposit: vehicle.deposit
    };
  }

  function render() {
    const pricing = getPricingBreakdown();

    container.innerHTML = `
      <div class="modal-overlay active" id="checkoutModalOverlay">
        <div class="checkout-modal-container">
          <!-- Header Bar -->
          <div class="modal-header-bar">
            <div class="modal-title-group">
              <span class="modal-title">RESERVATION CHECKOUT</span>
              <span class="modal-subtitle">${vehicle.name} • ${searchCriteria?.pickupStation?.city}</span>
            </div>
            <button class="modal-close-btn" id="btnCloseCheckoutModal">✕</button>
          </div>

          <!-- 5-Step Stepper -->
          <div class="checkout-stepper">
            <div class="step-indicator-item ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}">
              <span class="step-num-badge">${currentStep > 1 ? '✓' : '1'}</span>
              <span class="step-title-text">1. Rate</span>
            </div>
            <div class="step-indicator-item ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}">
              <span class="step-num-badge">${currentStep > 2 ? '✓' : '2'}</span>
              <span class="step-title-text">2. Protection</span>
            </div>
            <div class="step-indicator-item ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}">
              <span class="step-num-badge">${currentStep > 3 ? '✓' : '3'}</span>
              <span class="step-title-text">3. Extras</span>
            </div>
            <div class="step-indicator-item ${currentStep === 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}">
              <span class="step-num-badge">${currentStep > 4 ? '✓' : '4'}</span>
              <span class="step-title-text">4. Driver</span>
            </div>
            <div class="step-indicator-item ${currentStep === 5 ? 'active' : ''}">
              <span class="step-num-badge">5</span>
              <span class="step-title-text">5. Payment</span>
            </div>
          </div>

          <!-- Step Content Body -->
          <div class="modal-body-scrollable" id="checkoutStepContent">
            ${renderStepBody(currentStep, pricing)}
          </div>

          <!-- Bottom Footer Navigation Bar -->
          <div class="modal-footer-bar">
            <div class="modal-footer-price-peek">
              <span class="footer-total-label">Estimated Total (${days} Day${days > 1 ? 's' : ''}, GST incl.)</span>
              <span class="footer-total-amount">${formatPrice(pricing.grandTotal)}</span>
            </div>
            <div class="modal-nav-btns">
              ${currentStep > 1 ? `<button class="btn-step-prev" id="btnPrevStep">Back</button>` : ''}
              <button class="btn-step-next" id="btnNextStep">
                <span>${currentStep === 5 ? 'CONFIRM & RESERVE NOW ⚡' : 'CONTINUE'}</span>
                <span>${currentStep === 5 ? '✓' : '➔'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    attachStepListeners(pricing);
  }

  function renderStepBody(step, pricing) {
    if (step === 1) {
      // STEP 1: RATE SELECTION
      return `
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFF; text-transform: uppercase; margin-bottom: 0.5rem;">
            Choose Your Rate Option
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
            Select between our best-price prepaid online rate or flexible pay at the airport counter.
          </p>

          <div class="rates-comparison-grid">
            <!-- Rate Option 1: Pay Online Now -->
            <div class="rate-choice-card ${checkoutState.rateType === 'online' ? 'selected' : ''}" id="rateOptOnline">
              <span class="rate-choice-badge">15% SAVING</span>
              <div class="rate-card-title">Pay Online Now</div>
              <div class="rate-price-large">${formatPrice(vehicle.dailyRate * days)} <small style="font-size: 0.85rem; color: var(--text-dim); font-weight: 500;">(${formatPrice(vehicle.dailyRate)}/day)</small></div>
              <ul class="rate-features-list">
                <li class="rate-feature-item highlight"><span>✓</span> <strong>Guaranteed lowest price guarantee</strong></li>
                <li class="rate-feature-item"><span>✓</span> Free cancellation up to 48 hours prior</li>
                <li class="rate-feature-item"><span>✓</span> Express key hand-over at terminal desk</li>
                <li class="rate-feature-item"><span>✓</span> Instant digital rental contract confirmation</li>
              </ul>
            </div>

            <!-- Rate Option 2: Pay at Counter -->
            <div class="rate-choice-card ${checkoutState.rateType === 'counter' ? 'selected' : ''}" id="rateOptCounter">
              <div class="rate-card-title">Pay at Counter</div>
              <div class="rate-price-large">${formatPrice(vehicle.counterRate * days)} <small style="font-size: 0.85rem; color: var(--text-dim); font-weight: 500;">(${formatPrice(vehicle.counterRate)}/day)</small></div>
              <ul class="rate-features-list">
                <li class="rate-feature-item"><span>✓</span> Pay upon vehicle collection</li>
                <li class="rate-feature-item"><span>✓</span> Free modification at any time</li>
                <li class="rate-feature-item"><span>✓</span> No immediate payment required today</li>
                <li class="rate-feature-item" style="color: var(--text-dim);"><span>✕</span> Standard rate without online promotional discount</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    if (step === 2) {
      // STEP 2: PROTECTION PACKAGES
      return `
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFF; text-transform: uppercase; margin-bottom: 0.5rem;">
            Select Protection Package
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
            Drive with complete confidence across Tripura and North East India with comprehensive Niljyoti coverage.
          </p>

          <div class="protection-cards-grid">
            ${PROTECTION_PACKAGES.map(pkg => `
              <div class="protection-card ${checkoutState.selectedProtection.id === pkg.id ? 'selected' : ''}" data-pkg-id="${pkg.id}">
                <span class="protection-pill-badge">${pkg.badge}</span>
                <div class="prot-card-title">${pkg.name}</div>
                <div class="prot-price-rate">
                  ${pkg.pricePerDay === 0 ? 'FREE' : `${formatPrice(pkg.pricePerDay)} <small style="font-size: 0.75rem; color: var(--text-dim);">/ day</small>`}
                </div>
                <div class="prot-excess-notice">
                  ${pkg.excessAmount === 0 ? '₹0 ZERO FINANCIAL EXCESS' : `Max Excess: ${formatPrice(pkg.excessAmount)}`}
                </div>
                <ul class="protection-items-list">
                  ${pkg.features.map(f => `
                    <li class="protection-item-row ${!f.included ? 'excluded' : ''}">
                      <span>${f.included ? '✓' : '✕'}</span>
                      <span>${f.text}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (step === 3) {
      // STEP 3: EXTRAS & ADD-ONS
      return `
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFF; text-transform: uppercase; margin-bottom: 0.5rem;">
            Add Optional Extras & Equipment
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
            Enhance your rental with child safety seats, additional driver, or interstate permit assistance.
          </p>

          <div class="extras-cards-list">
            ${EXTRAS.map(extra => {
              const qty = checkoutState.selectedExtras[extra.id] || 0;
              const isAdded = qty > 0;
              const priceDisplay = extra.isOneTime 
                ? `${formatPrice(extra.pricePerDay)} total` 
                : `${formatPrice(extra.pricePerDay)} / day`;

              return `
                <div class="extra-option-row" data-extra-id="${extra.id}">
                  <div class="extra-left-info">
                    <div class="extra-icon-bubble">${extra.icon}</div>
                    <div class="extra-details-text">
                      <div class="extra-title-badge-row">
                        <span class="extra-name">${extra.name}</span>
                        <span class="extra-badge">${extra.badge}</span>
                      </div>
                      <div class="extra-desc">${extra.description}</div>
                    </div>
                  </div>

                  <div class="extra-price-toggle-box">
                    <div class="extra-price-tag">
                      ${priceDisplay}
                    </div>
                    <button class="btn-toggle-extra ${isAdded ? 'added' : ''}" data-extra-id="${extra.id}">
                      ${isAdded ? '✓ ADDED' : '+ ADD'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (step === 4) {
      // STEP 4: DRIVER DETAILS & CREDENTIALS
      return `
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFF; text-transform: uppercase; margin-bottom: 0.5rem;">
            Primary Driver Information
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
            Please ensure driver details match your official government identity documents.
          </p>

          <div class="driver-form-grid">
            <div class="form-field-wrapper">
              <label class="form-field-label">Full Name (as on Driving License) *</label>
              <input type="text" class="form-input-styled" id="driverFullName" 
                     value="${checkoutState.driver.fullName}" placeholder="e.g. Rahul Sharma" required />
            </div>

            <div class="form-field-wrapper">
              <label class="form-field-label">Email Address (for Booking Voucher) *</label>
              <input type="email" class="form-input-styled" id="driverEmail" 
                     value="${checkoutState.driver.email}" placeholder="e.g. rahul.sharma@example.com" required />
            </div>

            <div class="form-field-wrapper">
              <label class="form-field-label">Mobile Number (SMS & WhatsApp updates) *</label>
              <div style="display: flex; gap: 0.5rem;">
                <select class="form-select-styled" id="driverCountryCode" style="width: 100px;">
                  <option value="+91" ${checkoutState.driver.countryCode === '+91' ? 'selected' : ''}>🇮🇳 +91</option>
                  <option value="+1" ${checkoutState.driver.countryCode === '+1' ? 'selected' : ''}>🇺🇸 +1</option>
                  <option value="+44" ${checkoutState.driver.countryCode === '+44' ? 'selected' : ''}>🇬🇧 +44</option>
                  <option value="+971" ${checkoutState.driver.countryCode === '+971' ? 'selected' : ''}>🇦🇪 +971</option>
                </select>
                <input type="tel" class="form-input-styled" id="driverPhone" 
                       value="${checkoutState.driver.phone}" placeholder="98765 43210" style="flex: 1;" required />
              </div>
            </div>

            <div class="form-field-wrapper">
              <label class="form-field-label">Driving License Number *</label>
              <input type="text" class="form-input-styled" id="driverLicenseNumber" 
                     value="${checkoutState.driver.licenseNumber}" placeholder="e.g. DL-1420110012345" required />
              <span class="form-hint">Must be held for a minimum of 1 year</span>
            </div>

            <div class="form-field-wrapper">
              <label class="form-field-label">Identity Document Type *</label>
              <select class="form-select-styled" id="driverIdType">
                <option value="Aadhaar Card" ${checkoutState.driver.idType === 'Aadhaar Card' ? 'selected' : ''}>Aadhaar Card (Indian Residents)</option>
                <option value="Passport" ${checkoutState.driver.idType === 'Passport' ? 'selected' : ''}>Passport (International & NRI)</option>
                <option value="Indian DL" ${checkoutState.driver.idType === 'Indian DL' ? 'selected' : ''}>Driving License as Photo ID</option>
              </select>
            </div>

            <div class="form-field-wrapper">
              <label class="form-field-label">Identity Document Number *</label>
              <input type="text" class="form-input-styled" id="driverIdNumber" 
                     value="${checkoutState.driver.idNumber}" placeholder="e.g. 12-digit Aadhaar or Passport No" required />
            </div>

            <div class="form-field-wrapper form-group-full">
              <label class="form-field-label">Flight Number (Optional for Airport Desks)</label>
              <input type="text" class="form-input-styled" id="driverFlightNumber" 
                     value="${checkoutState.driver.flightNumber}" placeholder="e.g. AI-102 or 6E-205 (helps us hold your vehicle if flight is delayed)" />
            </div>
          </div>
        </div>
      `;
    }

    if (step === 5) {
      // STEP 5: ITEMIZED INVOICE & PAYMENT SIMULATION
      return `
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFF; text-transform: uppercase; margin-bottom: 0.5rem;">
            Order Summary & Payment
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-mid); margin-bottom: 1.5rem;">
            Review your transparent quote. 100% compliant with Indian Goods & Services Tax (GST).
          </p>

          <div class="invoice-payment-layout">
            <!-- Left: Transparent Itemized Invoice -->
            <div class="invoice-summary-box">
              <div class="invoice-title">Reservation Bill Details</div>

              <div class="invoice-line-item">
                <span style="color: var(--text-mid);">${vehicle.name} (${days} Days @ ${formatPrice(pricing.baseDaily)}/day)</span>
                <span style="font-weight: 700; color: #FFF;">${formatPrice(pricing.baseTotal)}</span>
              </div>

              ${pricing.protectionTotal > 0 ? `
                <div class="invoice-line-item">
                  <span style="color: var(--text-mid);">${checkoutState.selectedProtection.name}</span>
                  <span style="font-weight: 700; color: #FFF;">+${formatPrice(pricing.protectionTotal)}</span>
                </div>
              ` : `
                <div class="invoice-line-item">
                  <span style="color: var(--text-mid);">Basic Protection (Standard)</span>
                  <span style="font-weight: 700; color: var(--emerald-400);">INCLUDED FREE</span>
                </div>
              `}

              ${pricing.extrasTotal > 0 ? `
                <div class="invoice-line-item">
                  <span style="color: var(--text-mid);">Selected Extras & Add-ons</span>
                  <span style="font-weight: 700; color: #FFF;">+${formatPrice(pricing.extrasTotal)}</span>
                </div>
              ` : ''}

              ${pricing.discount > 0 ? `
                <div class="invoice-line-item discount">
                  <span>Promo Discount (${checkoutState.promo.label})</span>
                  <span>-${formatPrice(pricing.discount)}</span>
                </div>
              ` : ''}

              <div class="invoice-line-item">
                <span style="color: var(--text-mid);">Rent-a-Cab GST (18%)</span>
                <span style="font-weight: 700; color: #FFF;">+${formatPrice(pricing.gst18)}</span>
              </div>

              <div class="invoice-line-item total-row">
                <span>TOTAL PAYABLE</span>
                <span>${formatPrice(pricing.grandTotal)}</span>
              </div>

              <div class="refundable-deposit-alert">
                🛡️ <strong>Refundable Security Deposit:</strong> ${formatPrice(pricing.deposit)} will be held as an authorization block on your payment card / UPI at vehicle collection and released immediately after return.
              </div>
            </div>

            <!-- Right: Payment Gateway Simulation -->
            <div class="payment-methods-box">
              <span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--saffron-400);">
                Select Payment Mode
              </span>

              <div class="payment-method-tabs">
                <button class="pay-tab-btn ${checkoutState.paymentMethod === 'upi' ? 'active' : ''}" data-method="upi">
                  <span>📱 UPI QR</span>
                </button>
                <button class="pay-tab-btn ${checkoutState.paymentMethod === 'card' ? 'active' : ''}" data-method="card">
                  <span>💳 Card</span>
                </button>
                <button class="pay-tab-btn ${checkoutState.paymentMethod === 'desk' ? 'active' : ''}" data-method="desk">
                  <span>🏢 Pay at Desk</span>
                </button>
              </div>

              ${checkoutState.paymentMethod === 'upi' ? `
                <div class="upi-qr-box">
                  <div style="font-size: 0.85rem; font-weight: 800; color: #050814;">Scan & Pay via Any UPI App</div>
                  <div class="qr-code-graphic">
                    <svg viewBox="0 0 100 100" fill="#FFF">
                      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                      <rect x="50" y="50" width="10" height="10" fill="#000" />
                      <rect x="65" y="65" width="25" height="10" fill="#000" />
                      <rect x="75" y="50" width="15" height="10" fill="#000" />
                      <rect x="50" y="75" width="10" height="15" fill="#000" />
                    </svg>
                  </div>
                  <div style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 900; color: #050814;">
                    ${formatPrice(pricing.grandTotal)}
                  </div>
                  <div class="upi-brands-row">
                    <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
                  </div>
                </div>
              ` : ''}

              ${checkoutState.paymentMethod === 'card' ? `
                <div style="background: rgba(5,8,20,0.7); border: 1px solid var(--border-prominent); border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;">
                  <div class="form-field-wrapper">
                    <label class="form-field-label">Card Number</label>
                    <input type="text" class="form-input-styled" placeholder="4111 2222 3333 4444" value="4111 •••• •••• 8829" />
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <div class="form-field-wrapper">
                      <label class="form-field-label">Expiry (MM/YY)</label>
                      <input type="text" class="form-input-styled" placeholder="12/28" value="08/29" />
                    </div>
                    <div class="form-field-wrapper">
                      <label class="form-field-label">CVV</label>
                      <input type="password" class="form-input-styled" placeholder="•••" value="888" />
                    </div>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--emerald-400); font-weight: 600;">
                    🔒 256-Bit Bank Grade SSL Encrypted (Visa, MasterCard, RuPay, Amex)
                  </div>
                </div>
              ` : ''}

              ${checkoutState.paymentMethod === 'desk' ? `
                <div style="background: rgba(0,245,155,0.08); border: 1px solid var(--border-emerald); border-radius: 16px; padding: 1.25rem;">
                  <div style="font-weight: 800; color: var(--emerald-400); font-size: 0.95rem; margin-bottom: 0.35rem;">
                    🏢 Pay at Station Counter
                  </div>
                  <p style="font-size: 0.82rem; color: var(--text-mid); line-height: 1.5;">
                    No payment is charged now. Your vehicle is reserved at <strong>${searchCriteria?.pickupStation?.name}</strong>. Bring your credit/debit card to the desk at pickup time.
                  </p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }
  }

  function attachStepListeners(pricing) {
    const overlay = container.querySelector('#checkoutModalOverlay');
    const closeBtn = container.querySelector('#btnCloseCheckoutModal');
    const prevBtn = container.querySelector('#btnPrevStep');
    const nextBtn = container.querySelector('#btnNextStep');

    function close() {
      container.innerHTML = '';
      if (onClose) onClose();
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          saveCurrentStepData();
          currentStep--;
          render();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
          saveCurrentStepData();
          if (currentStep < 5) {
            currentStep++;
            render();
          } else {
            // STEP 5 COMPLETE: SUBMIT BOOKING
            finalizeBooking(pricing);
          }
        }
      });
    }

    // Step 1 Rate listeners
    if (currentStep === 1) {
      const rateOptOnline = container.querySelector('#rateOptOnline');
      const rateOptCounter = container.querySelector('#rateOptCounter');
      if (rateOptOnline) {
        rateOptOnline.addEventListener('click', () => {
          checkoutState.rateType = 'online';
          render();
        });
      }
      if (rateOptCounter) {
        rateOptCounter.addEventListener('click', () => {
          checkoutState.rateType = 'counter';
          render();
        });
      }
    }

    // Step 2 Protection listeners
    if (currentStep === 2) {
      container.querySelectorAll('.protection-card').forEach(card => {
        card.addEventListener('click', () => {
          const pkgId = card.getAttribute('data-pkg-id');
          const pkg = PROTECTION_PACKAGES.find(p => p.id === pkgId);
          if (pkg) {
            checkoutState.selectedProtection = pkg;
            render();
          }
        });
      });
    }

    // Step 3 Extras listeners
    if (currentStep === 3) {
      container.querySelectorAll('.btn-toggle-extra').forEach(btn => {
        btn.addEventListener('click', () => {
          const extraId = btn.getAttribute('data-extra-id');
          if (checkoutState.selectedExtras[extraId]) {
            delete checkoutState.selectedExtras[extraId];
          } else {
            checkoutState.selectedExtras[extraId] = 1;
          }
          render();
        });
      });
    }

    // Step 5 Payment Tab listeners
    if (currentStep === 5) {
      container.querySelectorAll('.pay-tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
          checkoutState.paymentMethod = tab.getAttribute('data-method');
          render();
        });
      });
    }
  }

  function validateCurrentStep() {
    if (currentStep === 4) {
      const fullName = container.querySelector('#driverFullName')?.value.trim();
      const email = container.querySelector('#driverEmail')?.value.trim();
      const phone = container.querySelector('#driverPhone')?.value.trim();
      const license = container.querySelector('#driverLicenseNumber')?.value.trim();
      const idNum = container.querySelector('#driverIdNumber')?.value.trim();

      if (!fullName || !email || !phone || !license || !idNum) {
        alert('Please fill in all mandatory fields marked with an asterisk (*).');
        return false;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return false;
      }

      if (phone.length < 8) {
        alert('Please enter a valid mobile number.');
        return false;
      }
    }
    return true;
  }

  function saveCurrentStepData() {
    if (currentStep === 4) {
      checkoutState.driver.fullName = container.querySelector('#driverFullName')?.value.trim() || '';
      checkoutState.driver.email = container.querySelector('#driverEmail')?.value.trim() || '';
      checkoutState.driver.phone = container.querySelector('#driverPhone')?.value.trim() || '';
      checkoutState.driver.countryCode = container.querySelector('#driverCountryCode')?.value || '+91';
      checkoutState.driver.licenseNumber = container.querySelector('#driverLicenseNumber')?.value.trim() || '';
      checkoutState.driver.idType = container.querySelector('#driverIdType')?.value || 'Aadhaar Card';
      checkoutState.driver.idNumber = container.querySelector('#driverIdNumber')?.value.trim() || '';
      checkoutState.driver.flightNumber = container.querySelector('#driverFlightNumber')?.value.trim() || '';
    }
  }

  function finalizeBooking(pricing) {
    const refCode = `NIL-${Math.floor(10000 + Math.random() * 90000)}-TR`;
    const bookingRecord = {
      id: refCode,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
        category: vehicle.category,
        subCategory: vehicle.subCategory,
        seats: vehicle.seats,
        transmission: vehicle.transmission,
        fuel: vehicle.fuel
      },
      searchCriteria: {
        pickupStation: searchCriteria.pickupStation,
        dropoffStation: searchCriteria.dropoffStation,
        pickupDate: searchCriteria.pickupDate,
        pickupTime: searchCriteria.pickupTime,
        dropoffDate: searchCriteria.dropoffDate,
        dropoffTime: searchCriteria.dropoffTime,
        durationDays: searchCriteria.durationDays,
        serviceType: searchCriteria.serviceType
      },
      protection: checkoutState.selectedProtection,
      extras: Object.keys(checkoutState.selectedExtras).map(id => {
        const extraObj = EXTRAS.find(e => e.id === id);
        return { id, name: extraObj?.name, qty: checkoutState.selectedExtras[id] };
      }),
      driver: checkoutState.driver,
      pricing: {
        ...pricing,
        rateType: checkoutState.rateType,
        paymentMethod: checkoutState.paymentMethod
      }
    };

    // Save into LocalStorage
    saveBooking(bookingRecord);

    // Close checkout and trigger Confirmation Voucher Modal
    container.innerHTML = '';
    if (onBookingComplete) {
      onBookingComplete(bookingRecord);
    }
  }

  render();
}
