import { STATIONS } from './data/stations.js';
import { renderNavbar } from './components/Navbar.js';
import { renderBookingPod } from './components/BookingPod.js';
import { renderHowItWorksSection } from './components/HowItWorksSection.js';
import { renderFleetCatalog } from './components/FleetCatalog.js';
import { renderPackagesSection } from './components/PackagesSection.js';
import { renderMediaAwardsSection } from './components/MediaAwardsSection.js';
import { renderReviewsSection } from './components/ReviewsSection.js';
import { renderVehicleSpecsModal } from './components/VehicleSpecsModal.js';
import { renderCheckoutModal } from './components/CheckoutModal.js';
import { renderBookingConfirmationModal } from './components/BookingConfirmationModal.js';
import { renderManageBookingModal } from './components/ManageBookingModal.js';
import { renderWhyChooseUs } from './components/WhyChooseUs.js';
import { renderStationsSection } from './components/StationsSection.js';
import { renderFAQSection } from './components/FAQSection.js';
import { renderContactSection } from './components/ContactSection.js';
import { renderFooter } from './components/Footer.js';
import { init3DCardTilt } from './utils/card3dTilt.js';
import { initScrollAnimations } from './utils/scrollAnimations.js';

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Global Application State
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const dropDate = new Date(tomorrow);
  dropDate.setDate(tomorrow.getDate() + 3);

  const formatDate = (d) => d.toISOString().split('T')[0];

  let appState = {
    searchCriteria: {
      mode: 'car', // 'car' or 'van'
      serviceType: 'self', // 'self' or 'chauffeur'
      pickupStation: STATIONS[0], // Agartala MBB Airport IXA
      dropoffStation: STATIONS[0],
      pickupDate: formatDate(tomorrow),
      pickupTime: '10:00',
      dropoffDate: formatDate(dropDate),
      dropoffTime: '10:00',
      durationDays: 3,
      durationHours: 72,
      durationText: '3 Days, 0 Hours',
      driverAge: '26-69',
      appliedPromo: null
    },
    selectedVehicle: null,
    activeModal: null
  };

  // Mount Point Selectors
  const navbarMount = document.getElementById('navbarMount');
  const bookingPodMount = document.getElementById('bookingPod');
  const howItWorksMount = document.getElementById('howItWorksMount');
  const fleetMount = document.getElementById('fleetMount');
  const packagesMount = document.getElementById('packagesMount');
  const mediaAwardsMount = document.getElementById('mediaAwardsMount');
  const reviewsMount = document.getElementById('reviewsMount');
  const whyChooseMount = document.getElementById('whyChooseMount');
  const stationsMount = document.getElementById('stationsMount');
  const faqMount = document.getElementById('faqMount');
  const contactMount = document.getElementById('contactMount');
  const footerMount = document.getElementById('footerMount');

  // Modal Mount Points
  const specsModalMount = document.getElementById('specsModalMount');
  const checkoutModalMount = document.getElementById('checkoutModalMount');
  const confirmationModalMount = document.getElementById('confirmationModalMount');
  const manageModalMount = document.getElementById('manageModalMount');

  // 1. Render Navigation
  renderNavbar(navbarMount, {
    onOpenManageBooking: () => {
      renderManageBookingModal(manageModalMount, {
        onClose: () => { manageModalMount.innerHTML = ''; }
      });
    }
  });

  // 2. Render Booking Pod
  function mountBookingPod() {
    renderBookingPod(bookingPodMount, {
      initialCriteria: appState.searchCriteria,
      onSearch: (updatedCriteria) => {
        appState.searchCriteria = { ...appState.searchCriteria, ...updatedCriteria };
        mountFleetCatalog();
      }
    });
  }
  mountBookingPod();

  // 3. Render "How Niljyoti Car Rental Works" (3 Steps)
  if (howItWorksMount) {
    renderHowItWorksSection(howItWorksMount);
  }

  // 4. Render Fleet Catalog
  function mountFleetCatalog() {
    renderFleetCatalog(fleetMount, {
      searchCriteria: appState.searchCriteria,
      onSelectVehicle: (vehicle) => {
        appState.selectedVehicle = vehicle;
        renderCheckoutModal(checkoutModalMount, {
          vehicle,
          searchCriteria: appState.searchCriteria,
          onClose: () => { checkoutModalMount.innerHTML = ''; },
          onBookingComplete: (bookingRecord) => {
            renderBookingConfirmationModal(confirmationModalMount, {
              booking: bookingRecord,
              onClose: () => { confirmationModalMount.innerHTML = ''; }
            });
          }
        });
      },
      onOpenSpecs: (vehicle) => {
        renderVehicleSpecsModal(specsModalMount, {
          vehicle,
          onClose: () => { specsModalMount.innerHTML = ''; },
          onSelect: (selectedVehicle) => {
            appState.selectedVehicle = selectedVehicle;
            renderCheckoutModal(checkoutModalMount, {
              vehicle: selectedVehicle,
              searchCriteria: appState.searchCriteria,
              onClose: () => { checkoutModalMount.innerHTML = ''; },
              onBookingComplete: (bookingRecord) => {
                renderBookingConfirmationModal(confirmationModalMount, {
                  booking: bookingRecord,
                  onClose: () => { confirmationModalMount.innerHTML = ''; }
                });
              }
            });
          }
        });
      }
    });
  }
  mountFleetCatalog();

  // 5. Render Tour Packages (Tripura & Northeast Circuits)
  if (packagesMount) {
    renderPackagesSection(packagesMount, {
      onSelectPackage: (pkg) => {
        console.log('Selected package:', pkg);
      }
    });
  }

  // 6. Render Media & Awards ("Best Award Winning Agency in Tripura")
  if (mediaAwardsMount) {
    renderMediaAwardsSection(mediaAwardsMount);
  }

  // 7. Render Customer Video Reviews (Real Customer Video Stories)
  if (reviewsMount) {
    renderReviewsSection(reviewsMount);
  }

  // 8. Render Why Choose Us (16+ Years Experience, Govt Enlisted Vendor)
  renderWhyChooseUs(whyChooseMount);

  // 9. Render Stations Directory with Group Accordions
  renderStationsSection(stationsMount, {
    onSelectStation: (station) => {
      appState.searchCriteria.pickupStation = station;
      appState.searchCriteria.dropoffStation = station;
      mountBookingPod();
      const podEl = document.getElementById('bookingPod');
      if (podEl) {
        podEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // 10. Render FAQ Accordions
  renderFAQSection(faqMount);

  // 12. Render Contact Us with Interactive Form & Google Map
  if (contactMount) {
    renderContactSection(contactMount);
  }

  // 13. Render Footer & Alliances
  renderFooter(footerMount, {
    onOpenBookingPod: () => {
      const podEl = document.getElementById('bookingPod');
      if (podEl) {
        podEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // 14. Initialize 3D Card Tilt Physics on Hero Visual Banner
  const heroVisualBanner = document.getElementById('heroVisualBanner');
  if (heroVisualBanner) {
    init3DCardTilt(heroVisualBanner);
  }

  // 15. Initialize Scroll Reveals & Rolling Number Counters
  initScrollAnimations();
});

