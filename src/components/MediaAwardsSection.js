// Media & Awards Section for Niljyoti Travel Agency
// Strictly extracted from https://niljyotitripura.com/media.php

export function renderMediaAwardsSection(container) {
  let activeTab = 'videos'; // 'videos' or 'awards'

  const CLIENT_VIDEOS = [
    {
      src: 'https://www.youtube.com/embed/tRGKFrFOsE8?si=Y89b14YNqqb07oZ0',
      title: 'Niljyoti Travel Agency Feature Video',
      caption: 'Niljyoti Travel Agency — Official Service Showcase & Fleet Journey Across Tripura'
    },
    {
      src: 'https://www.youtube.com/embed/50OKS8JheTw?si=JIUXFu-J7mouuuDh',
      title: 'Best Travel Agency Award Felicitation',
      caption: 'Best Award Winning Travel Agency in Tripura — Felicitation & Recognition Ceremony'
    },
    {
      src: 'https://www.youtube.com/embed/tSj5ZtEeul0',
      title: 'Niljyoti Travels Fleet Showcase',
      caption: 'Commercial Yellow-Plate Fleet & Chauffeur Services in Agartala'
    },
    {
      src: 'https://www.youtube.com/embed/sR-Li8YGaD8',
      title: 'Tripura Travel & Tourism Highlights',
      caption: 'North East India & Tripura Tourism Expeditions by Niljyoti'
    },
    {
      src: 'https://www.youtube.com/embed/R3ETAzQG2KY',
      title: 'Niljyoti Customer Experience',
      caption: 'Customer Journey & Premium Cab Experience Across Tripura'
    }
  ];

  function renderContent() {
    const contentMount = container.querySelector('#mediaTabContentMount');
    if (!contentMount) return;

    if (activeTab === 'videos') {
      contentMount.innerHTML = `
        <div class="media-grid">
          ${CLIENT_VIDEOS.map(v => `
            <div class="media-card">
              <div class="media-video-container">
                <iframe src="${v.src}" title="${v.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="media-card-caption">
                ${v.caption}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      contentMount.innerHTML = `
        <div class="media-grid">
          <div class="media-card" style="padding: 2rem 1.75rem; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
            <h4 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Best Award Winning Travel Agency in Tripura
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Honored as Tripura’s premier travel and rent-a-cab service provider for over 16 consecutive years of verified service excellence.
            </p>
          </div>

          <div class="media-card" style="padding: 2rem 1.75rem; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏛️</div>
            <h4 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Government & PSU Enlisted Vendor
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Official registered vehicle vendor for Central Government, Tripura State Departments, and public sector undertakings across Northeast India.
            </p>
          </div>

          <div class="media-card" style="padding: 2rem 1.75rem; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
            <h4 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              500+ Vehicle Fleet Count
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Extensive fleet of 500+ commercial yellow-plate cars, sedans, SUVs, and luxury coaches serving B2B and B2C clients since 2007.
            </p>
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = `
    <section class="media-section" id="mediaAwards">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>MEDIA AND REWARDS • NILJYOTI TRAVELS</span>
          </div>
          <h2 class="section-main-title">
            Best Award Winning <span class="gradient-text-primary">Travel Agency in Tripura</span>
          </h2>
          <p class="section-subtitle">
            Pioneer car rental service provider in Tripura and North East India since 2007. 16+ Years Experience, 20,000+ Happy Customers, 500+ Total Car Count.
          </p>
        </div>

        <div class="media-tabs-bar">
          <button class="media-tab-btn active" id="tabVideosBtn">
            <span>🎥 Videos (${CLIENT_VIDEOS.length})</span>
          </button>
          <button class="media-tab-btn" id="tabAwardsBtn">
            <span>🏆 Awards & Recognition</span>
          </button>
        </div>

        <div id="mediaTabContentMount"></div>
      </div>
    </section>
  `;

  renderContent();

  const tabVideosBtn = container.querySelector('#tabVideosBtn');
  const tabAwardsBtn = container.querySelector('#tabAwardsBtn');

  tabVideosBtn.addEventListener('click', () => {
    activeTab = 'videos';
    tabVideosBtn.classList.add('active');
    tabAwardsBtn.classList.remove('active');
    renderContent();
  });

  tabAwardsBtn.addEventListener('click', () => {
    activeTab = 'awards';
    tabAwardsBtn.classList.add('active');
    tabVideosBtn.classList.remove('active');
    renderContent();
  });
}
