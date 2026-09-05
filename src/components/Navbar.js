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
          <a href="#howItWorks" class="nav-link">
            <span>How It Works</span>
          </a>
          <a href="#fleet" class="nav-link">
            <span>Our Fleet</span>
            <span class="nav-badge-pill">500+ Cars</span>
          </a>
          <a href="#packages" class="nav-link">
            <span>Tour Packages</span>
          </a>
          <a href="#mediaAwards" class="nav-link">
            <span>Awards</span>
          </a>
          <a href="#reviews" class="nav-link">
            <span>Reviews</span>
          </a>
          <a href="#stations" class="nav-link">
            <span>Stations</span>
          </a>
          <a href="#contact" class="nav-link">
            <span>Contact</span>
          </a>
        </nav>

        <!-- Right Actions: Currency, Manage Booking, Hotline -->
        <div class="nav-actions">
          <!-- Currency Dropdown -->
          <div class="currency-selector-wrap">
            <button class="currency-btn" id="currencyToggleBtn" title="Change currency">
              <span id="currentCurrCode">${currentCurr}</span>
              <span style="color: var(--brand-primary); font-weight: 700;" id="currentCurrSymbol">(${symbol})</span>
              <span style="font-size: 0.68rem; margin-left: 2px;">▼</span>
            </button>
            <div class="currency-dropdown" id="currencyDropdown">
              <button class="currency-opt ${currentCurr === 'INR' ? 'active' : ''}" data-currency="INR">
                <span>₹ Indian Rupee</span>
                <span>INR</span>
              </button>
              <button class="currency-opt ${currentCurr === 'USD' ? 'active' : ''}" data-currency="USD">
                <span>$ US Dollar</span>
                <span>USD</span>
              </button>
              <button class="currency-opt ${currentCurr === 'EUR' ? 'active' : ''}" data-currency="EUR">
                <span>€ Euro</span>
                <span>EUR</span>
              </button>
            </div>
          </div>

          <!-- Manage Booking Button -->
          <button class="btn-manage-booking" id="btnOpenManageBooking" title="View or modify an existing booking">
            <span>📋</span>
            <span>Manage Booking</span>
          </button>

          <!-- 24/7 Helpline Pill -->
          <a href="tel:+919436456088" class="helpline-pill" title="24/7 Emergency Dispatch Helpline" style="text-decoration: none;">
            <span class="live-pulse"></span>
            <span>24/7: +91 9436456088</span>
          </a>

          <!-- Mobile Menu Hamburger -->
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
            ☰
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

  // Mobile Menu Toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
}
