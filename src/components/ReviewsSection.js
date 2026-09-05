// Customer Video Reviews & Testimonials Section
// Strictly extracted from https://niljyotitripura.com/all_reviews.php & index.php

export function renderReviewsSection(container) {
  const CLIENT_REVIEWS = [
    {
      videoId: 'wsricQugYRY',
      title: 'Customer Experience Review - Niljyoti Travels Agartala',
      caption: 'Featured Video Review from niljyotitripura.com'
    },
    {
      videoId: 'OW9xRrE8A9M',
      title: 'Happy Customer Feedback - Car Rental Tripura',
      caption: 'Featured Video Review from niljyotitripura.com'
    },
    {
      videoId: 'WTYkj6TKWnA',
      title: 'Valuable Customer Review - Agartala Trip',
      caption: 'Customer Feedback from all_reviews.php'
    },
    {
      videoId: 'ihfdZBd46pY',
      title: 'Tourist & Travel Experience in Tripura',
      caption: 'Customer Feedback from all_reviews.php'
    },
    {
      videoId: '50OKS8JheTw',
      title: 'Customer Testimonial & Best Agency Experience',
      caption: 'Customer Feedback from all_reviews.php'
    }
  ];

  container.innerHTML = `
    <section class="reviews-section" id="reviews">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>ALL REVIEWS • NILJYOTI TRAVELS</span>
          </div>
          <h2 class="section-main-title">
            Our Valuable Customer <span class="gradient-text-primary">Reviews</span>
          </h2>
          <p class="section-subtitle">
            Authentic customer video experiences and feedback from travelers across Tripura and North East India with Niljyoti Travels.
          </p>
        </div>

        <div class="reviews-grid">
          ${CLIENT_REVIEWS.map(r => `
            <article class="review-card">
              <div class="review-video-wrap">
                <iframe src="https://www.youtube.com/embed/${r.videoId}" title="${r.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="review-card-body">
                <div class="review-stars-row">
                  ★★★★★
                  <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); margin-left: 0.35rem;">5.0 Verified Experience</span>
                </div>
                <div class="review-author-name" style="margin-top: 0.4rem;">${r.title}</div>
                <div style="font-size: 0.78rem; color: var(--text-tertiary); margin-top: 0.2rem;">${r.caption}</div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
