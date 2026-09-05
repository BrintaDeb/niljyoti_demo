// Contact Us Section with Interactive Form & Google Map
// Extracted and enhanced from https://niljyotitripura.com/contact.php

export function renderContactSection(container) {
  container.innerHTML = `
    <section class="contact-section" id="contact">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-eyebrow">
            <span>GET IN TOUCH WITH US</span>
          </div>
          <h2 class="section-main-title">
            Connect with <span class="gradient-text-primary">Niljyoti Travels</span>
          </h2>
          <p class="section-subtitle">
            Need an urgent airport pickup, multi-day Northeast tour package, or commercial fleet booking? Reach out to our 24/7 Agartala dispatch team.
          </p>
        </div>

        <div class="contact-layout-grid">
          <!-- Left: Inquiry Form -->
          <div class="contact-card-box">
            <h3 class="contact-form-title">Send a Quick Inquiry</h3>
            <p class="contact-form-subtitle">
              Fill in your trip details and our reservations desk will call or WhatsApp you within 15 minutes.
            </p>

            <form id="contactInquiryForm">
              <div class="contact-form-grid">
                <div class="contact-form-group">
                  <label class="contact-input-label" for="contactName">Your Full Name *</label>
                  <input type="text" class="contact-text-input" id="contactName" placeholder="e.g. Sanjib Roy" required />
                </div>

                <div class="contact-form-group">
                  <label class="contact-input-label" for="contactPhone">Mobile Number (WhatsApp) *</label>
                  <input type="tel" class="contact-text-input" id="contactPhone" placeholder="+91 98765 43210" required />
                </div>

                <div class="contact-form-group">
                  <label class="contact-input-label" for="contactEmail">Email Address</label>
                  <input type="email" class="contact-text-input" id="contactEmail" placeholder="you@example.com" />
                </div>

                <div class="contact-form-group">
                  <label class="contact-input-label" for="contactPickup">Pickup Location</label>
                  <input type="text" class="contact-text-input" id="contactPickup" placeholder="Agartala Airport (IXA) / City" />
                </div>

                <div class="contact-form-group full">
                  <label class="contact-input-label" for="contactSubject">Vehicle or Tour Requirement</label>
                  <input type="text" class="contact-text-input" id="contactSubject" placeholder="e.g. Innova Crysta for 3 Days Unakoti Tour" />
                </div>

                <div class="contact-form-group full">
                  <label class="contact-input-label" for="contactMessage">Special Requests / Message</label>
                  <textarea class="contact-textarea" id="contactMessage" placeholder="Tell us your dates, number of passengers, or any specific requests..."></textarea>
                </div>
              </div>

              <div id="contactFormStatus" style="display: none; margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.88rem; font-weight: 600;"></div>

              <button type="submit" class="btn-send-inquiry" id="btnSubmitContact">
                <span>Send Inquiry</span>
                <span>➔</span>
              </button>
            </form>
          </div>

          <!-- Right: Info Channels & Google Map -->
          <div class="contact-info-col">
            <!-- Channels Box -->
            <div class="contact-channels-box">
              <div class="channel-item">
                <div class="channel-icon-wrap">📞</div>
                <div>
                  <div class="channel-title">Emergency 24/7 Helpline</div>
                  <a href="tel:+919436456088" class="channel-val">+91 9436456088</a>
                  <div class="channel-subtext">Immediate airport flight meet & highway breakdown assistance</div>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon-wrap">📱</div>
                <div>
                  <div class="channel-title">Mobile & Direct Desk</div>
                  <a href="tel:+917005683554" class="channel-val">+91 7005683554</a>
                  <div class="channel-subtext">Reservations, billing, corporate tariffs & outstation charters</div>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon-wrap">✉️</div>
                <div>
                  <div class="channel-title">Official Email</div>
                  <a href="mailto:a_sanjib@yahoo.co.in" class="channel-val">a_sanjib@yahoo.co.in</a>
                  <div class="channel-subtext">For corporate tenders, Govt orders & tour itinerary customization</div>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon-wrap">📍</div>
                <div>
                  <div class="channel-title">Head Office Location</div>
                  <div class="channel-val" style="font-size: 0.88rem;">Niljyoti Travel Agency, Central Road, Agartala, Tripura 799001</div>
                  <div class="channel-subtext">Registered with Government of Tripura, Tourism Directorate</div>
                </div>
              </div>

              <!-- Quick Buttons -->
              <div class="quick-chat-row">
                <a href="https://api.whatsapp.com/send/?phone=917005843107&text=Hello%20Niljyoti%20Travels,%20I%20would%20like%20to%20inquire%20about%20car%20rental%20services%20in%20Tripura." 
                   target="_blank" 
                   class="btn-whatsapp-chat">
                  <span>💬 Chat on WhatsApp</span>
                </a>
                <a href="tel:+919436456088" class="btn-call-emergency">
                  <span>🚨 Call 24/7 Desk</span>
                </a>
              </div>
            </div>

            <!-- Google Map -->
            <div class="google-map-embed-wrap">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d467141.8591186563!2d91.265221!3d23.834746!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f5fc5fe7605b%3A0xecdf68187d2c4d98!2sNiljyoti%20Travel%20Agency%2C%20Agartala%20Tripura!5e0!3m2!1sen!2sus!4v1712853343418!5m2!1sen!2sus" 
                      title="Niljyoti Travel Agency Map" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Form submission handler
  const form = container.querySelector('#contactInquiryForm');
  const statusBox = container.querySelector('#contactFormStatus');
  const submitBtn = container.querySelector('#btnSubmitContact');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#contactName').value;
      const phone = container.querySelector('#contactPhone').value;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        statusBox.style.display = 'block';
        statusBox.style.background = '#eaf5fe';
        statusBox.style.border = '1px solid #b8e2fc';
        statusBox.style.color = '#163b5c';
        statusBox.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your inquiry has been received. A Niljyoti Travels executive will call or WhatsApp you at <strong>${phone}</strong> within 15 minutes.`;

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Inquiry Sent ✓</span>';
      }, 700);
    });
  }
}
