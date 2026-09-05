// How Niljyoti Car Rental Works Section (3 Steps)
// Strictly extracted from https://niljyotitripura.com/index.php

export function renderHowItWorksSection(container) {
  container.innerHTML = `
    <section class="how-it-works-section" id="howItWorks">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>SEAMLESS 3-STEP RENTAL PROCESS</span>
          </div>
          <h2 class="section-main-title">
            How Niljyoti Car Rental <span class="gradient-text-primary">Works in 3 Steps</span>
          </h2>
          <p class="section-subtitle">
            The easy way to takeover a lease or rent a cab across Tripura and North East India.
          </p>
        </div>

        <div class="how-steps-grid">
          <!-- Step 1 -->
          <div class="how-step-card">
            <span class="step-number-badge">1</span>
            <div class="step-icon-bubble">📍</div>
            <h3 class="step-card-title">Choose Location</h3>
            <p class="step-card-desc">
              Choosing the right location is a crucial decision that can greatly impact your goals and outcomes. Select Maharaja Bir Bikram Airport (IXA), Agartala HQ, or any Tripura hub.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="how-step-card">
            <span class="step-number-badge">2</span>
            <div class="step-icon-bubble">📅</div>
            <h3 class="step-card-title">Pick Up Date</h3>
            <p class="step-card-desc">
              Choosing the right pick-up date is important to ensure that you're available to start your journey. Select starting date, ending date, and your preferred vehicle.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="how-step-card">
            <span class="step-number-badge">3</span>
            <div class="step-icon-bubble">🚘</div>
            <h3 class="step-card-title">Enjoy the Ride</h3>
            <p class="step-card-desc">
              Finally, Life's experiences are as much about the journey as they are about the destination. Travel smoothly with 24/7 Niljyoti support across Tripura & North East India.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
