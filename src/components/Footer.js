// Footer Component for Niljyoti Travels
// Strictly grounded in https://niljyotitripura.com/ (index.php, about.php, contact.php)

const CLIENT_SECTORS = [
  { name: 'Central Government Agencies', category: 'Official Enlistment', perk: 'Enlisted Vehicle Vendor' },
  { name: 'Tripura State Govt. Departments', category: 'State Administration', perk: 'Official Travel Partner' },
  { name: 'Public Sector Undertakings (PSUs)', category: 'Public Sector', perk: 'Institutional Cab Vendor' },
  { name: 'Renowned Private Corporations', category: 'Corporate B2B', perk: 'Corporate Fleet Solutions' },
  { name: 'Individual Tourists & Families', category: 'B2C Services', perk: '20,000+ Happy Customers' },
  { name: 'Directorate of Tourism, Tripura', category: 'Accreditation', perk: 'Registered Operator' }
];

export function renderFooter(container, { onOpenBookingPod }) {
  container.innerHTML = `
    <!-- Reputed Enlistments & Institutional Client Sectors -->
    <section class="alliances-section" id="alliances">
      <div class="container">
        <div style="text-align: center;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--brand-primary); text-transform: uppercase; letter-spacing: 0.08em;">
            ENLISTMENTS & TRUSTED SECTORS
          </span>
          <h3 style="font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-top: 0.35rem; letter-spacing: -0.01em;">
            Enlisted Vendor for Government Agencies, PSUs & Private Corporations
          </h3>
        </div>

        <div class="alliances-grid">
          ${CLIENT_SECTORS.map(p => `
            <div class="alliance-card-item">
              <div class="alliance-partner-type">${p.category}</div>
              <h4 class="alliance-partner-name">${p.name}</h4>
              <span class="alliance-partner-perk">★ ${p.perk}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Main Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-grid">
          <!-- Col 1: Brand & Credentials -->
          <div class="footer-brand-col">
            <a href="#hero" style="display: inline-flex; align-items: center; gap: 0.85rem; text-decoration: none; margin-bottom: 0.85rem;">
              <img src="/images/logo.png" alt="Niljyoti Travels" class="footer-logo-img" />
              <div class="footer-brand-title">Niljyoti<span style="color: var(--brand-primary);">Travels</span></div>
            </a>
            <p class="footer-tagline">
              Niljyoti Travel Agency is a pioneer travel agency and best car rental service provider (Rent a cab Services) in the state of Tripura and also in North East India. Its journey starts from the year 2007. We are continuously trying to give our best services to our customers / clients. We have lots of enlisted vendor of like Central & State Govt. Agencies, renowned Private & Public Companies etc.
            </p>
            <div class="footer-awards-box">
              <span style="font-size: 1.25rem;">🏆</span>
              <div>
                <strong>Best Award Winning Travel Agency in Tripura</strong>
                <div style="font-size: 0.72rem; color: var(--text-secondary);">16+ Years Experience • 20,000+ Customers • 500+ Cars</div>
              </div>
            </div>
          </div>

          <!-- Col 2: Fleet Types -->
          <div class="footer-links-col">
            <div class="footer-col-heading">Our Cars (Fleet)</div>
            <a href="#fleet" class="footer-link-item">Sedans (TATA TIGOR, DZIRE, DZIRE AURA)</a>
            <a href="#fleet" class="footer-link-item">SUVs (Ertiga, Rumion, Scorpio N, Bolero, Thar)</a>
            <a href="#fleet" class="footer-link-item">Hatchbacks (Swift, WAGONR, EECO)</a>
            <a href="#fleet" class="footer-link-item">Executive & 4x4 (Fortuner, Hycross, Innova Crysta)</a>
            <a href="#fleet" class="footer-link-item">Bus & Traveler (TRAVELER, BUS 45 SEATER, BIG BUS)</a>
            <a href="#fleet" class="footer-link-item">Luxury Cars (BMW, AUDI)</a>
          </div>

          <!-- Col 3: Tour Packages & Stations -->
          <div class="footer-links-col">
            <div class="footer-col-heading">Packages & Stations</div>
            <a href="#packages" class="footer-link-item">Darjeeling Tour (Tiger Hill & Ghoom)</a>
            <a href="#stations" class="footer-link-item">Agartala MBB Airport (IXA) 24/7 Desk</a>
            <a href="#stations" class="footer-link-item">Niljyoti Head Office (Central Road)</a>
            <a href="#stations" class="footer-link-item">Agartala Railway Station Hub</a>
            <a href="#stations" class="footer-link-item">Udaipur (Matabari & Neermahal)</a>
            <a href="#stations" class="footer-link-item">Kailashahar & Unakoti Hub</a>
            <a href="#stations" class="footer-link-item">Dharmanagar Junction Hub</a>
          </div>

          <!-- Col 4: 24/7 Helpline & Contact -->
          <div class="footer-links-col">
            <div class="footer-col-heading">Contact Us</div>
            <div class="footer-contact-info">
              <div>Emergency Call:</div>
              <a href="tel:+919436456088" class="contact-highlight-phone" style="text-decoration: none;">+91 9436456088</a>
              <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.35rem;">
                Mobile: <a href="tel:+917005683554" style="color: inherit; text-decoration: none;">+91 7005683554</a><br/>
                WhatsApp: <a href="https://api.whatsapp.com/send/?phone=917005843107" target="_blank" style="color: var(--color-success); font-weight: 600; text-decoration: none;">+91 7005843107</a><br/>
                General Communication: <a href="mailto:a_sanjib@yahoo.co.in" style="color: inherit; text-decoration: none;">a_sanjib@yahoo.co.in</a><br/>
                Address: Central Road, Agartala, Tripura 799001
              </div>
              <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--color-success); font-weight: 600;">
                ● Car rental service || Tripura || North East India
              </div>
            </div>
          </div>
        </div>

        <!-- Social Channels & Copyright -->
        <div class="footer-bottom-bar">
          <div>
            © Niljyoti Travels, 2024–2026. All rights reserved.
          </div>
          <div class="footer-legal-links">
            <a href="#hero">Home</a>
            <a href="#whyChooseUs">About us</a>
            <a href="#fleet">Our Cars</a>
            <a href="#mediaAwards">Media & Rewards</a>
            <a href="#reviews">All Reviews</a>
            <a href="#packages">Our Packages</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
