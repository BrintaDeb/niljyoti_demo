import { VEHICLES, CATEGORIES, SUB_CATEGORIES } from '../data/vehicles.js';
import { formatPrice } from '../utils/currency.js';
import { getVehicleSVG } from '../utils/vehicleRenders.js';
import { init3DCardTilt } from '../utils/card3dTilt.js';

export function renderFleetCatalog(container, { onSelectVehicle, onOpenSpecs, searchCriteria }) {
  let activeCategory = searchCriteria?.mode || 'all'; // 'all', 'car', 'van'
  let activeSubCategory = 'all';
  let activeTransmission = 'all'; // 'all', 'Automatic', 'Manual'
  let activeFuel = 'all'; // 'all', 'Petrol', 'Diesel', 'Electric', 'Hybrid'
  let activeSort = 'popular'; // 'popular', 'price-low', 'price-high', 'seats'

  function getFilteredVehicles() {
    return VEHICLES.filter(v => {
      // Category filter
      if (activeCategory !== 'all' && v.category !== activeCategory) return false;
      // Subcategory filter
      if (activeSubCategory !== 'all' && v.subCategory !== activeSubCategory) return false;
      // Transmission filter
      if (activeTransmission !== 'all' && v.transmission !== activeTransmission) return false;
      // Fuel filter
      if (activeFuel !== 'all' && !v.fuel.toUpperCase().includes(activeFuel.toUpperCase())) return false;
      // Chauffeur drive filter
      if (searchCriteria?.serviceType === 'chauffeur' && !v.chauffeurAvailable) return false;
      return true;
    }).sort((a, b) => {
      if (activeSort === 'price-low') return a.dailyRate - b.dailyRate;
      if (activeSort === 'price-high') return b.dailyRate - a.dailyRate;
      if (activeSort === 'seats') return b.seats - a.seats;
      return 0; // default order
    });
  }

  function renderGrid() {
    const vehicles = getFilteredVehicles();
    const durationDays = searchCriteria?.durationDays || 1;

    const gridContainer = container.querySelector('#fleetGridContainer');
    const countIndicator = container.querySelector('#fleetCountIndicator');

    if (countIndicator) {
      countIndicator.textContent = `Showing ${vehicles.length} of ${VEHICLES.length} vehicles`;
    }

    if (!gridContainer) return;

    if (vehicles.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-default); box-shadow: var(--shadow-sm);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No Vehicles Found Matching Your Criteria</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">Try resetting your filters or selecting a different vehicle category.</p>
          <button class="btn-card-select" id="btnResetFilters" style="margin: 0 auto; display: inline-flex; width: auto; padding: 0.75rem 1.5rem;">Reset All Filters</button>
        </div>
      `;

      const resetBtn = gridContainer.querySelector('#btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          activeSubCategory = 'all';
          activeTransmission = 'all';
          activeFuel = 'all';
          activeSort = 'popular';
          renderToolbar();
          renderGrid();
        });
      }
      return;
    }

    gridContainer.innerHTML = vehicles.map(v => {
      const totalOnline = v.dailyRate * durationDays;
      const totalCounter = v.counterRate * durationDays;

      return `
        <article class="vehicle-card" data-id="${v.id}" data-3d-tilt>
          <!-- Header Visual with Real Studio Photography -->
          <div class="card-header-visual">
            <span class="card-badge-ribbon">${v.badge}</span>
            <span class="card-service-tag">${v.chauffeurAvailable ? '👨‍✈️ Chauffeur Ready' : '🚘 Self-Drive'}</span>
            
            <div class="vehicle-photo-container">
              <img src="${v.image}" class="vehicle-photo-img" alt="${v.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80';" />
            </div>
            
            <div class="vehicle-tagline">"${v.tagline}"</div>
          </div>

          <!-- Card Body -->
          <div class="card-body-content">
            <div class="card-title-row">
              <div>
                <h3 class="vehicle-model-name">${v.name}</h3>
                <span style="font-size: 0.76rem; color: var(--text-tertiary); font-weight: 500;">or similar in category</span>
              </div>
              <span class="vehicle-subcat-badge">${v.subCategory}</span>
            </div>

            <!-- Specs Matrix -->
            <div class="card-specs-matrix">
              <div class="spec-matrix-cell" title="${v.seats} Passengers">
                <span class="spec-cell-icon">👤</span>
                <span>${v.seats} Seats</span>
              </div>
              <div class="spec-matrix-cell" title="${v.largeBags} Large Luggage + ${v.smallBags} Small Bags">
                <span class="spec-cell-icon">🧳</span>
                <span>${v.largeBags + v.smallBags} Bags</span>
              </div>
              <div class="spec-matrix-cell" title="${v.doors} Doors">
                <span class="spec-cell-icon">🚪</span>
                <span>${v.doors} Doors</span>
              </div>
              <div class="spec-matrix-cell" title="${v.transmission} Transmission">
                <span class="spec-cell-icon">⚙️</span>
                <span>${v.transmission}</span>
              </div>
              <div class="spec-matrix-cell" title="${v.fuel} Fuel Type">
                <span class="spec-cell-icon">⛽</span>
                <span>${v.fuel}</span>
              </div>
              <div class="spec-matrix-cell" title="Air Conditioning Included">
                <span class="spec-cell-icon">❄️</span>
                <span>A/C Full</span>
              </div>
            </div>

            <!-- Highlights Strip -->
            <div class="card-highlights-strip">
              <div class="highlight-item">
                <span>⚡</span>
                <span>${v.fuelEconomy}</span>
              </div>
              <div class="highlight-item safety">
                <span>🛡️</span>
                <span>${v.safetyRating}</span>
              </div>
              <div class="highlight-item">
                <span>🛣️</span>
                <span>${v.mileage}</span>
              </div>
            </div>

            <!-- Pricing Block -->
            <div class="card-pricing-block">
              <div class="rate-breakdown">
                <div class="strikethrough-rate">${formatPrice(v.counterRate)}/day</div>
                <div class="price-unit-row">
                  <span class="main-price-figure">${formatPrice(v.dailyRate)}</span>
                  <span class="price-per-day-label">/ day</span>
                </div>
                <span class="online-saving-chip">✓ PAY ONLINE & SAVE 15%</span>
              </div>

              <div class="deposit-pill">
                <div style="font-weight: 600; color: var(--text-secondary); font-size: 0.78rem;">Deposit: ${formatPrice(v.deposit)}</div>
                <div style="font-size: 0.68rem; color: var(--text-tertiary);">100% Refundable</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions-row">
              <button class="btn-card-specs" data-id="${v.id}" title="View full specifications and terms">
                <span>Full Specs</span>
              </button>
              <button class="btn-card-select" data-id="${v.id}">
                <span>Select</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card listeners
    gridContainer.querySelectorAll('.btn-card-select').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const vehicle = VEHICLES.find(v => v.id === id);
        if (vehicle && onSelectVehicle) {
          onSelectVehicle(vehicle);
        }
      });
    });

    gridContainer.querySelectorAll('.btn-card-specs').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const vehicle = VEHICLES.find(v => v.id === id);
        if (vehicle && onOpenSpecs) {
          onOpenSpecs(vehicle);
        }
      });
    });

    // Initialize physics 3D tilt & holographic glare on cards
    init3DCardTilt(gridContainer);
  }

  function renderToolbar() {
    const toolbar = container.querySelector('#fleetToolbar');
    if (!toolbar) return;

    toolbar.innerHTML = `
      <!-- Primary Category Tabs Matching niljyotitripura.com/car_filter.php -->
      <div class="filter-row-primary">
        <div class="fleet-category-tabs">
          <button class="category-pill-btn ${activeSubCategory === 'all' ? 'active' : ''}" data-subcat="all">
            <span>⚡</span>
            <span>All Cars & Fleet</span>
          </button>
          <button class="category-pill-btn ${activeSubCategory === 'Sedan' ? 'active' : ''}" data-subcat="Sedan">
            <span>🚘</span>
            <span>Sedan</span>
          </button>
          <button class="category-pill-btn ${activeSubCategory === 'SUV' ? 'active' : ''}" data-subcat="SUV">
            <span>🚙</span>
            <span>SUV</span>
          </button>
          <button class="category-pill-btn ${activeSubCategory === 'Hatchback' ? 'active' : ''}" data-subcat="Hatchback">
            <span>🚗</span>
            <span>Hatchback</span>
          </button>
          <button class="category-pill-btn ${activeSubCategory === 'Bus' ? 'active' : ''}" data-subcat="Bus">
            <span>🚐</span>
            <span>Bus & Traveler</span>
          </button>
          <button class="category-pill-btn ${activeSubCategory === 'Luxury Car' ? 'active' : ''}" data-subcat="Luxury Car">
            <span>✨</span>
            <span>Luxury Car</span>
          </button>
        </div>

        <div class="toolbar-controls-right">
          <div class="sort-select-box">
            <span class="sort-label">Sort:</span>
            <select class="sort-select" id="fleetSortSelect">
              <option value="popular" ${activeSort === 'popular' ? 'selected' : ''}>Featured by Niljyoti</option>
              <option value="price-low" ${activeSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${activeSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="seats" ${activeSort === 'seats' ? 'selected' : ''}>Seating Capacity</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Secondary Quick Filter Pills -->
      <div class="filter-row-secondary">
        <span style="font-size: 0.72rem; font-weight: 800; color: var(--brand-primary); text-transform: uppercase;">Fuel Option:</span>
        
        <button class="quick-filter-chip ${activeFuel === 'all' ? 'active' : ''}" data-type="fuel" data-val="all">All Fuels</button>
        <button class="quick-filter-chip ${activeFuel === 'CNG' ? 'active' : ''}" data-type="fuel" data-val="CNG">CNG / Petrol</button>
        <button class="quick-filter-chip ${activeFuel === 'DIESEL' ? 'active' : ''}" data-type="fuel" data-val="DIESEL">Diesel</button>
        <button class="quick-filter-chip ${activeFuel === 'Petrol' ? 'active' : ''}" data-type="fuel" data-val="Petrol">Petrol</button>
        <button class="quick-filter-chip ${activeFuel === 'Hybrid' ? 'active' : ''}" data-type="fuel" data-val="Hybrid">Hybrid</button>

        <span class="fleet-count-indicator" id="fleetCountIndicator">Showing ${VEHICLES.length} vehicles</span>
      </div>
    `;

    // Category button listeners
    toolbar.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubCategory = btn.getAttribute('data-subcat');
        activeCategory = 'all';
        renderToolbar();
        renderGrid();
      });
    });

    // Quick filter chips
    toolbar.querySelectorAll('.quick-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.getAttribute('data-type');
        const val = chip.getAttribute('data-val');
        if (type === 'trans') activeTransmission = val;
        if (type === 'fuel') activeFuel = val;
        renderToolbar();
        renderGrid();
      });
    });

    // Sort listener
    const sortSelect = toolbar.querySelector('#fleetSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        renderGrid();
      });
    }
  }

  // Initial Container Render
  container.innerHTML = `
    <section class="fleet-section" id="fleet">
      <div class="container">
        <!-- Section Title Header -->
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>OUR CARS • NILJYOTI TRAVELS</span>
          </div>
          <h2 class="section-main-title">
            Explore Our <span class="gradient-text-primary">Cars & Vehicle Fleet</span>
          </h2>
          <p class="section-subtitle">
            Over 500+ commercial yellow-plate cars, sedans, SUVs, and coaches across Tripura and North East India backed by 24/7 Niljyoti Roadside Assistance.
          </p>
        </div>

        <!-- Filter & Sort Toolbar -->
        <div class="fleet-toolbar" id="fleetToolbar"></div>

        <!-- Vehicle Grid -->
        <div class="fleet-grid" id="fleetGridContainer"></div>
      </div>
    </section>
  `;

  renderToolbar();
  renderGrid();

  // Listen for currency changes to re-render prices
  window.addEventListener('currency-changed', () => {
    renderGrid();
  });
}
