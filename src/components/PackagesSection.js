import { PACKAGES } from '../data/packages.js';
import { formatPrice } from '../utils/currency.js';
import { init3DCardTilt } from '../utils/card3dTilt.js';

export function renderPackagesSection(container, { onSelectPackage }) {
  container.innerHTML = `
    <section class="packages-section" id="packages" style="position: relative; overflow: hidden;">
      <!-- Ambient Glow Orb -->
      <div class="ambient-orb amber" style="width: 400px; height: 400px; top: 10%; right: -100px;"></div>

      <div class="container" style="position: relative; z-index: 2;">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>OUR PACKAGES • NILJYOTI TRAVELS</span>
          </div>
          <h2 class="section-main-title">
            Our Featured <span class="gradient-text-primary">Tour Packages</span>
          </h2>
          <p class="section-subtitle">
            Experience breathtaking holiday journeys with Niljyoti Travels — featuring our official Darjeeling Tour with sunrise at Tiger Hill, Ghoom Monastery, and private vehicle sightseeing.
          </p>
        </div>

        <div class="packages-grid" id="packagesGrid">
          ${PACKAGES.map(pkg => `
            <article class="package-card" data-id="${pkg.id}" data-3d-tilt style="max-width: 760px; margin: 0 auto; background: #FFFFFF; border-radius: var(--radius-2xl); border: 1px solid var(--border-default); box-shadow: var(--shadow-lg); overflow: hidden; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;">
              <div class="package-image-wrap" style="position: relative; overflow: hidden; height: 320px;">
                <img src="${pkg.image}" alt="${pkg.name}" class="package-img" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);" />
                <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%);"></div>
                <span class="package-badge-tag" style="position: absolute; top: 1.25rem; left: 1.25rem; background: rgba(24, 156, 244, 0.95); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.35rem 0.85rem; border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 4px 12px rgba(24, 156, 244, 0.35); text-transform: uppercase; letter-spacing: 0.05em;">${pkg.badge}</span>
                <span class="package-duration-tag" style="position: absolute; top: 1.25rem; right: 1.25rem; background: rgba(15, 23, 42, 0.85); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.85rem; border-radius: 999px; backdrop-filter: blur(8px);">⏱️ ${pkg.duration}</span>
                <div style="position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem; color: #fff;">
                  <span style="display: inline-block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #FBBF24; margin-bottom: 0.25rem;">${pkg.category}</span>
                  <h3 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 800; color: #FFFFFF; text-shadow: 0 2px 8px rgba(0,0,0,0.4); margin: 0;">${pkg.name}</h3>
                </div>
              </div>

              <div class="package-body" style="padding: 1.75rem;">
                <div class="package-category-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <span class="package-rating" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; font-weight: 700; color: #D97706; background: #FEF3C7; padding: 0.25rem 0.65rem; border-radius: 6px;">★ ${pkg.rating} (${pkg.reviewsCount} verified traveler reviews)</span>
                  <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">Tripura & Northeast Circuit</span>
                </div>

                <p class="package-desc" style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.25rem;">${pkg.shortDesc}</p>

                <div style="margin: 1.25rem 0; padding: 1.25rem; background: #F8FAFC; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
                  <strong style="font-size: 0.82rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 0.45rem;">
                    <span>📍</span> Curated Itinerary Highlights
                  </strong>
                  <ul class="package-highlights-list" style="margin-top: 0.75rem; list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.5rem;">
                    ${pkg.highlights.map(h => `
                      <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
                        <span style="color: var(--brand-primary); font-weight: 800;">✓</span>
                        <span>${h}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.25rem 0; padding: 1rem; background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-default); font-size: 0.82rem;">
                  <div>
                    <strong style="color: var(--color-success); display: block; margin-bottom: 0.4rem;">Inclusions:</strong>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
                      ${pkg.inclusions.map(inc => `<li style="display: flex; gap: 0.35rem; color: var(--text-secondary);"><span style="color: var(--color-success);">+</span> <span>${inc}</span></li>`).join('')}
                    </ul>
                  </div>
                  <div>
                    <strong style="color: var(--color-danger); display: block; margin-bottom: 0.4rem;">Exclusions:</strong>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
                      ${pkg.exclusions.map(exc => `<li style="display: flex; gap: 0.35rem; color: var(--text-secondary);"><span style="color: var(--color-danger);">-</span> <span>${exc}</span></li>`).join('')}
                    </ul>
                  </div>
                </div>

                <div class="package-footer-row" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 1rem;">
                  <div class="package-price-box">
                    <span class="package-price-label" style="display: block; font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Price on niljyotitripura.com</span>
                    <span class="package-price-val" style="font-size: 1.85rem; font-weight: 900; color: var(--text-primary); font-family: var(--font-display);">${formatPrice(pkg.price)}</span>
                  </div>

                  <a href="https://api.whatsapp.com/send/?phone=917005843107&text=Hello%20Niljyoti%20Travels,%20I%20would%20like%20to%20book%20the%20Darjeeling%20Tour%20package%20(Rs.%201300.00)%20listed%20on%20your%20website." 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="btn-book-package btn-shimmer"
                     data-id="${pkg.id}"
                     style="display: inline-flex; align-items: center; gap: 0.65rem; background: var(--brand-gradient); color: #fff; padding: 0.85rem 1.6rem; border-radius: var(--radius-lg); font-weight: 800; font-size: 0.95rem; text-decoration: none; box-shadow: 0 4px 14px rgba(24, 156, 244, 0.35); transition: transform 0.2s ease, box-shadow 0.2s ease;">
                    <span>Book / Inquire Tour</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Initialize 3D Card Tilt physics on package cards
  init3DCardTilt(container);
}

