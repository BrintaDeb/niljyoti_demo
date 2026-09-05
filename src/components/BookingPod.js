import { STATIONS } from '../data/stations.js';
import { PROMO_CODES } from '../data/extras.js';

export function renderBookingPod(container, { onSearch, initialCriteria }) {
  // Compute default dates: tomorrow and +3 days
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const dropDate = new Date(tomorrow);
  dropDate.setDate(tomorrow.getDate() + 3);

  const formatDateForInput = (d) => d.toISOString().split('T')[0];

  let state = {
    mode: initialCriteria?.mode || 'car', // 'car' or 'van'
    serviceType: initialCriteria?.serviceType || 'self', // 'self' or 'chauffeur'
    pickupStation: initialCriteria?.pickupStation || STATIONS[0],
    dropoffStation: initialCriteria?.dropoffStation || STATIONS[0],
    differentDropoff: false,
    pickupDate: formatDateForInput(tomorrow),
    pickupTime: '10:00',
    dropoffDate: formatDateForInput(dropDate),
    dropoffTime: '10:00',
    driverAge: '26-69',
    promoCode: '',
    appliedPromo: null,
    flightNumber: ''
  };

  function calculateDuration() {
    const start = new Date(`${state.pickupDate}T${state.pickupTime}`);
    const end = new Date(`${state.dropoffDate}T${state.dropoffTime}`);
    const diffMs = end - start;
    if (diffMs <= 0) return { days: 1, hours: 0, text: '1 Day (Minimum)' };

    const hours = Math.round(diffMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;

    const totalDays = Math.ceil(hours / 24);
    let text = `${days} Day${days !== 1 ? 's' : ''}`;
    if (remHours > 0) text += `, ${remHours} Hr${remHours !== 1 ? 's' : ''}`;
    return { days: Math.max(1, totalDays), hours, text };
  }

  function getStationOptionsHTML(searchTerm = '') {
    const term = searchTerm.toLowerCase();
    const filtered = STATIONS.filter(s => 
      s.city.toLowerCase().includes(term) || 
      s.name.toLowerCase().includes(term) || 
      s.code.toLowerCase().includes(term)
    );

    return filtered.map(s => `
      <div class="station-option-item" data-id="${s.id}">
        <div>
          <div class="opt-city-name">
            <span>${s.type === 'airport' ? '✈️' : '🏙️'}</span>
            <span>${s.city}</span>
            <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-dim);">${s.terminal}</span>
          </div>
          <div class="opt-desc">${s.name}</div>
        </div>
        <span class="opt-code-badge">${s.code}</span>
      </div>
    `).join('');
  }

  container.innerHTML = `
    <div class="booking-pod-wrapper" id="bookingPodWrapper">
      <!-- Top Controls: Vehicle Mode & Service Type -->
      <div class="pod-top-controls">
        <!-- Cars vs Vans Mode Tabs -->
        <div class="pod-mode-tabs" role="tablist">
          <button class="mode-tab-btn ${state.mode === 'car' ? 'active' : ''}" id="modeTabCar" role="tab" aria-selected="${state.mode === 'car'}">
            <span class="tab-icon">🚗</span>
            <span>CARS & SUVS</span>
          </button>
          <button class="mode-tab-btn ${state.mode === 'van' ? 'active' : ''}" id="modeTabVan" role="tab" aria-selected="${state.mode === 'van'}">
            <span class="tab-icon">🚐</span>
            <span>VANS & MINIBUSES</span>
          </button>
        </div>

        <!-- Service Mode: Self Drive vs Chauffeur -->
        <div class="service-toggle-group">
          <button class="service-toggle-btn ${state.serviceType === 'self' ? 'active' : ''}" id="btnServiceSelf">
            <span>🚘</span>
            <span>Self-Drive</span>
          </button>
          <button class="service-toggle-btn ${state.serviceType === 'chauffeur' ? 'active' : ''}" id="btnServiceChauffeur">
            <span>👨‍✈️</span>
            <span>Chauffeur <span class="service-tag-extra">(With Driver)</span></span>
          </button>
        </div>
      </div>

      <!-- Main Search Fields Grid -->
      <div class="pod-search-grid">
        <!-- Pick-up Location -->
        <div class="pod-field-box" id="pickupBox">
          <div class="field-label">
            <span>Pick-Up Station</span>
            <span class="label-badge">Tripura & North East</span>
          </div>
          <div class="field-input-row">
            <span class="field-icon">📍</span>
            <input type="text" class="field-input" id="pickupInput" 
                   value="${state.pickupStation.city} (${state.pickupStation.terminal})" 
                   placeholder="Search Agartala, Udaipur, or Northeast hub" autocomplete="off" />
          </div>
          <div class="station-autocomplete-list" id="pickupList">
            ${getStationOptionsHTML()}
          </div>
        </div>

        <!-- Drop-off Location (Conditional or Same) -->
        <div class="pod-field-box dropoff-station-box ${state.differentDropoff ? 'show' : ''}" id="dropoffBox">
          <div class="field-label">
            <span>Drop-Off Station</span>
            <span class="label-badge" style="color: var(--emerald-400);">Return Station</span>
          </div>
          <div class="field-input-row">
            <span class="field-icon">🏁</span>
            <input type="text" class="field-input" id="dropoffInput" 
                   value="${state.dropoffStation.city} (${state.dropoffStation.terminal})" 
                   placeholder="Search return hub (e.g. Agartala Airport)" autocomplete="off" />
          </div>
          <div class="station-autocomplete-list" id="dropoffList">
            ${getStationOptionsHTML()}
          </div>
        </div>

        <!-- Pick-up Date & Time -->
        <div class="pod-field-box" id="pickupDateBox">
          <div class="field-label">
            <span>Pick-Up Date & Time</span>
            <span class="label-badge">IST</span>
          </div>
          <div class="datetime-split">
            <input type="date" class="date-native-input" id="pickupDateInput" value="${state.pickupDate}" min="${formatDateForInput(now)}" />
            <select class="time-select-input" id="pickupTimeSelect">
              ${generateTimeOptions(state.pickupTime)}
            </select>
          </div>
        </div>

        <!-- Drop-off Date & Time -->
        <div class="pod-field-box" id="dropoffDateBox">
          <div class="field-label">
            <span>Drop-Off Date & Time</span>
            <span class="label-badge" id="durationBadge">${calculateDuration().text}</span>
          </div>
          <div class="datetime-split">
            <input type="date" class="date-native-input" id="dropoffDateInput" value="${state.dropoffDate}" min="${state.pickupDate}" />
            <select class="time-select-input" id="dropoffTimeSelect">
              ${generateTimeOptions(state.dropoffTime)}
            </select>
          </div>
        </div>
      </div>

      <!-- Secondary Controls Row (Different Dropoff, Age, Promo, Flight) -->
      <div class="pod-secondary-row">
        <div class="secondary-left-options">
          <!-- Drop off at different location checkbox -->
          <label class="custom-checkbox-wrap" id="differentDropoffLabel">
            <input type="checkbox" id="chkDifferentDropoff" ${state.differentDropoff ? 'checked' : ''} />
            <span>Drop off at a different location?</span>
          </label>

          <!-- Driver Age Selector -->
          <div class="driver-age-selector">
            <span style="color: var(--text-dim); font-size: 0.78rem; font-weight: 700;">DRIVER AGE:</span>
            <select class="driver-age-select" id="driverAgeSelect">
              <option value="26-69" selected>26 to 69 years (Standard)</option>
              <option value="18-21">18 to 21 years (Young Driver)</option>
              <option value="22-25">22 to 25 years (Young Driver)</option>
              <option value="70+">70+ years (Senior Driver)</option>
            </select>
          </div>

          <!-- Promo Code Input Toggle -->
          <div class="promo-code-box">
            <span class="promo-toggle-link" id="promoToggleLink">
              <span>🏷️</span>
              <span id="promoToggleLabel">Promo / Corporate Code</span>
            </span>
            <div class="promo-input-group" id="promoInputGroup">
              <input type="text" class="promo-input-field" id="promoCodeInput" placeholder="CORP2026" maxlength="15" />
              <button class="promo-apply-btn" id="promoApplyBtn">APPLY</button>
            </div>
            <span id="promoStatusMessage" style="font-size: 0.75rem; font-weight: 700; color: var(--emerald-400); display: none;"></span>
          </div>
        </div>

        <!-- Search Fleet CTA Button -->
        <button class="btn-pod-search" id="btnPodSearch">
          <span>SEARCH AVAILABLE FLEET</span>
          <span>→</span>
        </button>
      </div>

      <!-- Age Advisory Notice if young or senior selected -->
      <div id="ageAdvisoryNotice" style="display: none; margin-top: 0.85rem; font-size: 0.78rem; color: var(--gold-400); background: rgba(255, 183, 3, 0.1); padding: 0.5rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-gold);">
      </div>
    </div>
  `;

  function generateTimeOptions(selectedTime) {
    const times = [];
    for (let h = 0; h < 24; h++) {
      const hh = h.toString().padStart(2, '0');
      times.push(`${hh}:00`);
      times.push(`${hh}:30`);
    }
    return times.map(t => `<option value="${t}" ${t === selectedTime ? 'selected' : ''}>${t}</option>`).join('');
  }

  // Bind Listeners
  const modeTabCar = container.querySelector('#modeTabCar');
  const modeTabVan = container.querySelector('#modeTabVan');
  const btnServiceSelf = container.querySelector('#btnServiceSelf');
  const btnServiceChauffeur = container.querySelector('#btnServiceChauffeur');
  const chkDifferentDropoff = container.querySelector('#chkDifferentDropoff');
  const dropoffBox = container.querySelector('#dropoffBox');
  const pickupInput = container.querySelector('#pickupInput');
  const pickupList = container.querySelector('#pickupList');
  const dropoffInput = container.querySelector('#dropoffInput');
  const dropoffList = container.querySelector('#dropoffList');
  const pickupDateInput = container.querySelector('#pickupDateInput');
  const pickupTimeSelect = container.querySelector('#pickupTimeSelect');
  const dropoffDateInput = container.querySelector('#dropoffDateInput');
  const dropoffTimeSelect = container.querySelector('#dropoffTimeSelect');
  const durationBadge = container.querySelector('#durationBadge');
  const driverAgeSelect = container.querySelector('#driverAgeSelect');
  const ageAdvisoryNotice = container.querySelector('#ageAdvisoryNotice');
  const promoToggleLink = container.querySelector('#promoToggleLink');
  const promoInputGroup = container.querySelector('#promoInputGroup');
  const promoCodeInput = container.querySelector('#promoCodeInput');
  const promoApplyBtn = container.querySelector('#promoApplyBtn');
  const promoStatusMessage = container.querySelector('#promoStatusMessage');
  const btnPodSearch = container.querySelector('#btnPodSearch');

  // Mode Tabs
  modeTabCar.addEventListener('click', () => {
    state.mode = 'car';
    modeTabCar.classList.add('active');
    modeTabVan.classList.remove('active');
  });

  modeTabVan.addEventListener('click', () => {
    state.mode = 'van';
    modeTabVan.classList.add('active');
    modeTabCar.classList.remove('active');
  });

  // Service Type
  btnServiceSelf.addEventListener('click', () => {
    state.serviceType = 'self';
    btnServiceSelf.classList.add('active');
    btnServiceChauffeur.classList.remove('active');
  });

  btnServiceChauffeur.addEventListener('click', () => {
    state.serviceType = 'chauffeur';
    btnServiceChauffeur.classList.add('active');
    btnServiceSelf.classList.remove('active');
  });

  // Different Dropoff
  chkDifferentDropoff.addEventListener('change', () => {
    state.differentDropoff = chkDifferentDropoff.checked;
    if (state.differentDropoff) {
      dropoffBox.classList.add('show');
    } else {
      dropoffBox.classList.remove('show');
      state.dropoffStation = state.pickupStation;
    }
  });

  // Station Autocomplete for Pickup
  pickupInput.addEventListener('focus', () => {
    pickupList.classList.add('show');
  });
  pickupInput.addEventListener('input', (e) => {
    pickupList.innerHTML = getStationOptionsHTML(e.target.value);
    pickupList.classList.add('show');
    attachPickupOptionListeners();
  });
  function attachPickupOptionListeners() {
    pickupList.querySelectorAll('.station-option-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const st = STATIONS.find(s => s.id === id);
        if (st) {
          state.pickupStation = st;
          pickupInput.value = `${st.city} (${st.terminal})`;
          if (!state.differentDropoff) {
            state.dropoffStation = st;
            dropoffInput.value = `${st.city} (${st.terminal})`;
          }
        }
        pickupList.classList.remove('show');
      });
    });
  }
  attachPickupOptionListeners();

  // Station Autocomplete for Dropoff
  dropoffInput.addEventListener('focus', () => {
    dropoffList.classList.add('show');
  });
  dropoffInput.addEventListener('input', (e) => {
    dropoffList.innerHTML = getStationOptionsHTML(e.target.value);
    dropoffList.classList.add('show');
    attachDropoffOptionListeners();
  });
  function attachDropoffOptionListeners() {
    dropoffList.querySelectorAll('.station-option-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const st = STATIONS.find(s => s.id === id);
        if (st) {
          state.dropoffStation = st;
          dropoffInput.value = `${st.city} (${st.terminal})`;
        }
        dropoffList.classList.remove('show');
      });
    });
  }
  attachDropoffOptionListeners();

  // Close lists on click outside
  document.addEventListener('click', (e) => {
    if (!container.querySelector('#pickupBox').contains(e.target)) {
      pickupList.classList.remove('show');
    }
    if (!container.querySelector('#dropoffBox').contains(e.target)) {
      dropoffList.classList.remove('show');
    }
  });

  // Dates & Times
  function updateDates() {
    state.pickupDate = pickupDateInput.value;
    state.pickupTime = pickupTimeSelect.value;
    state.dropoffDate = dropoffDateInput.value;
    state.dropoffTime = dropoffTimeSelect.value;

    // Minimum dropoff date constraint
    dropoffDateInput.min = state.pickupDate;
    if (state.dropoffDate < state.pickupDate) {
      state.dropoffDate = state.pickupDate;
      dropoffDateInput.value = state.pickupDate;
    }

    const duration = calculateDuration();
    durationBadge.textContent = duration.text;
  }

  pickupDateInput.addEventListener('change', updateDates);
  pickupTimeSelect.addEventListener('change', updateDates);
  dropoffDateInput.addEventListener('change', updateDates);
  dropoffTimeSelect.addEventListener('change', updateDates);

  // Driver Requirements Advisory
  driverAgeSelect.addEventListener('change', () => {
    state.driverAge = driverAgeSelect.value;
    if (state.driverAge === '18-21' || state.driverAge === '22-25') {
      ageAdvisoryNotice.style.display = 'block';
      ageAdvisoryNotice.textContent = `ℹ️ Drivers aged ${state.driverAge} must present a valid Government-issued Driving License held for at least 1 year. Chauffeur-driven option is also available.`;
    } else if (state.driverAge === '70+') {
      ageAdvisoryNotice.style.display = 'block';
      ageAdvisoryNotice.textContent = `ℹ️ Senior drivers aged 70+ are fully welcomed. Chauffeur services with verified drivers are available for comfortable travel.`;
    } else {
      ageAdvisoryNotice.style.display = 'none';
    }
  });

  // Promo Code Toggle & Apply
  promoToggleLink.addEventListener('click', () => {
    promoInputGroup.classList.toggle('show');
    if (promoInputGroup.classList.contains('show')) {
      promoCodeInput.focus();
    }
  });

  promoApplyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const code = promoCodeInput.value.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      state.appliedPromo = PROMO_CODES[code];
      promoStatusMessage.style.display = 'inline';
      promoStatusMessage.textContent = `✓ ${PROMO_CODES[code].label}`;
      promoStatusMessage.style.color = 'var(--emerald-400)';
    } else if (code) {
      promoStatusMessage.style.display = 'inline';
      promoStatusMessage.textContent = '✕ Invalid promo code. Try NILJYOTI10 or CORP2026';
      promoStatusMessage.style.color = 'var(--ruby-500)';
    }
  });

  // Search Click
  btnPodSearch.addEventListener('click', () => {
    const duration = calculateDuration();
    const searchPayload = {
      ...state,
      durationDays: duration.days,
      durationHours: duration.hours,
      durationText: duration.text
    };

    if (onSearch) {
      onSearch(searchPayload);
    }

    // Smooth scroll to fleet section
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
