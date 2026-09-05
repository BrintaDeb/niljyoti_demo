import { getCurrency, setCurrency, getCurrencySymbol } from '../utils/currency.js';

export function renderNavbar(container, { onOpenManageBooking }) {
  const currentCurr = getCurrency();
  const symbol = getCurrencySymbol();

  container.innerHTML = `
    <!-- Top Minimalist Live Ticker with Niljyoti Credentials -->
    <div class="ticker-wrap" id="liveTicker">
      <div class="ticker-content">
        <span class="ticker-item">NILJYOTI TRAVELS • PIONEER CAR RENTAL IN TRIPURA SINCE 2007</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">16+ YEARS EXPERIENCE • 20,000+ HAPPY CUSTOMERS • 500+ FLEET COUNT</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">GOVT. ENLISTED VENDOR FOR CENTRAL & STATE AGENCIES & PSUS</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">24/7 MAHARAJA BIR BIKRAM AIRPORT (IXA) AGARTALA DESK</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">SELF-DRIVE & CHAUFFEUR-DRIVEN CARS, SUVS & 16-SEATER TEMPO TRAVELLERS</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">24/7 HELPLINE: +91 9436456088 • WHATSAPP: +91 7005843107</span>
        <span class="ticker-dot"></span>
        <span class="ticker-item">NILJYOTI TRAVELS • PIONEER CAR RENTAL IN TRIPURA SINCE 2007</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="site-header" id="siteHeader">
      <div class="container nav-container">
        <!-- Client Authentic Logo (Intact) -->
        <a href="#hero" class="brand-logo" id="brandLogo" title="Niljyoti Travels - Pioneer Car Rental in Tripura">
          <img src="/images/logo.png" alt="Niljyoti Travels" class="brand-logo-img" />
          <div class="brand-text">
            <span class="brand-title">Niljyoti<span style="color: var(--brand-primary);">Travels</span></span>
            <span class="brand-subtitle">Tripura & North East India</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-center-menu" id="navCenterMenu">
          <a href="#bookingPod" class="nav-link">
            <span>Search</span>
          </a>
          <a href="#fleet" class="nav-link">
            <span>Our Fleet</span>
            <span class="nav-badge-pill">500+</span>
          </a>
          <a href="#packages" class="nav-link">
            <span>Packages</span>
          </a>
          <a href="#stations" class="nav-link">
            <span>Stations</span>
          </a>
          <a href="#mediaAwards" class="nav-link">
            <span>Awards</span>
          </a>
          <a href="#reviews" class="nav-link">
            <span>Reviews</span>
          </a>
          <a href="#contact" class="nav-link">
            <span>Contact</span>
          </a>

          <!-- Mobile Drawer Exclusive Quick Actions -->
          <div class="mobile-drawer-actions">
            <button class="btn-drawer-manage" id="btnDrawerManageBooking">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Manage Existing Booking</span>
            </button>
            <a href="tel:+919436456088" class="btn-drawer-call">
              <span class="live-pulse" style="width: 8px; height: 8px; background: #10B981; border-radius: 50%;"></span>
              <span>24/7 Helpline: +91 9436456088</span>
            </a>
          </div>
        </nav>

        <!-- Right Actions: Currency, Manage Booking, Helpline & Primary Book CTA -->
        <div class="nav-actions">
          <!-- Currency Dropdown -->
          <div class="currency-selector-wrap">
            <button class="currency-btn" id="currencyToggleBtn" title="Change currency">
              <span class="currency-globe-icon">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </span>
              <span class="currency-text">
                <span id="currentCurrCode">${currentCurr}</span>
                <span class="currency-symbol-tag" id="currentCurrSymbol">(${symbol})</span>
              </span>
              <svg class="chevron-arrow" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                <path d="M4.2 6.3a.75.75 0 0 1 1.06 0L8 9.04l2.74-2.74a.75.75 0 1 1 1.06 1.06l-3.27 3.27a.75.75 0 0 1-1.06 0L4.2 7.36a.75.75 0 0 1 0-1.06z"/>
              </svg>
            </button>
            <div class="currency-dropdown" id="currencyDropdown">
              <div class="currency-dropdown-header">Currency</div>
              <button class="currency-opt ${currentCurr === 'INR' ? 'active' : ''}" data-currency="INR">
                <span class="curr-opt-left"><strong class="curr-sym">₹</strong> Indian Rupee</span>
                <span class="curr-opt-code">INR</span>
              </button>
              <button class="currency-opt ${currentCurr === 'USD' ? 'active' : ''}" data-currency="USD">
                <span class="curr-opt-left"><strong class="curr-sym">$</strong> US Dollar</span>
                <span class="curr-opt-code">USD</span>
              </button>
              <button class="currency-opt ${currentCurr === 'EUR' ? 'active' : ''}" data-currency="EUR">
                <span class="curr-opt-left"><strong class="curr-sym">€</strong> Euro</span>
                <span class="curr-opt-code">EUR</span>
              </button>
              <button class="currency-opt ${currentCurr === 'GBP' ? 'active' : ''}" data-currency="GBP">
                <span class="curr-opt-left"><strong class="curr-sym">£</strong> British Pound</span>
                <span class="curr-opt-code">GBP</span>
              </button>
            </div>
          </div>

          <!-- Manage Booking Button -->
          <button class="btn-manage-booking" id="btnOpenManageBooking" title="View or modify an existing booking">
            <svg class="btn-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Manage</span>
          </button>

          <!-- 24/7 Helpline Pill -->
          <a href="tel:+919436456088" class="helpline-pill" title="24/7 Niljyoti Airport & Travel Helpline">
            <span class="pulse-beacon">
              <span class="pulse-ring"></span>
              <span class="pulse-dot"></span>
            </span>
            <span class="helpline-num">+91 9436456088</span>
          </a>

          <!-- Primary Book CTA Button -->
          <a href="#bookingPod" class="btn-header-cta btn-shimmer" title="Search available cars & vans">
            <span>Book Now</span>
            <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
              <path fill-rule="evenodd" d="M1 8a.75.75 0 0 1 .75-.75h10.19L8.47 3.78a.75.75 0 0 1 1.06-1.06l4.75 4.75a.75.75 0 0 1 0 1.06l-4.75 4.75a.75.75 0 0 1-1.06-1.06l3.47-3.47H1.75A.75.75 0 0 1 1 8z"/>
            </svg>
          </a>

          <!-- Mobile Menu Hamburger Button -->
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Currency Dropdown Listeners
  const toggleBtn = container.querySelector('#currencyToggleBtn');
  const dropdown = container.querySelector('#currencyDropdown');
  const currOpts = container.querySelectorAll('.currency-opt');
  const codeSpan = container.querySelector('#currentCurrCode');
  const symSpan = container.querySelector('#currentCurrSymbol');
  const mobileBtn = container.querySelector('#mobileMenuBtn');
  const navMenu = container.querySelector('#navCenterMenu');
  const manageBtn = container.querySelector('#btnOpenManageBooking');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    currOpts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const sel = opt.getAttribute('data-currency');
        setCurrency(sel);
        currOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        codeSpan.textContent = sel;
        symSpan.textContent = `(${getCurrencySymbol()})`;
        dropdown.classList.remove('show');
        window.dispatchEvent(new CustomEvent('currency-changed', { detail: { currency: sel } }));
      });
    });
  }

  // Manage Booking Modal Listener
  if (manageBtn && onOpenManageBooking) {
    manageBtn.addEventListener('click', () => {
      onOpenManageBooking();
    });
  }

  const drawerManageBtn = container.querySelector('#btnDrawerManageBooking');
  if (drawerManageBtn && onOpenManageBooking) {
    drawerManageBtn.addEventListener('click', () => {
      navMenu.classList.remove('show');
      if (mobileBtn) mobileBtn.classList.remove('is-active');
      onOpenManageBooking();
    });
  }

  // Mobile Menu Toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('show');
      mobileBtn.classList.toggle('is-active', isOpen);
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        mobileBtn.classList.remove('is-active');
      });
    });
  }
}
