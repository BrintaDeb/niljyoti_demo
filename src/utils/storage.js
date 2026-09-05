const STORAGE_KEY = 'bharat_rentals_bookings';

export function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load bookings from storage', e);
    return [];
  }
}

export function saveBooking(booking) {
  try {
    const bookings = getStoredBookings();
    bookings.unshift(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('booking-created', { detail: booking }));
    return true;
  } catch (e) {
    console.error('Failed to save booking', e);
    return false;
  }
}

export function findBooking(referenceId, emailOrPhone) {
  const bookings = getStoredBookings();
  const cleanRef = referenceId.trim().toUpperCase();
  const cleanLookup = emailOrPhone.trim().toLowerCase();

  return bookings.find(b => {
    const matchRef = b.id.toUpperCase() === cleanRef;
    const matchEmail = b.driver?.email?.toLowerCase() === cleanLookup;
    const matchPhone = b.driver?.phone?.replace(/\D/g, '') === cleanLookup.replace(/\D/g, '');
    return matchRef && (matchEmail || matchPhone);
  });
}

export function cancelBooking(bookingId) {
  try {
    const bookings = getStoredBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx].status = 'Cancelled';
      bookings[idx].cancelledAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new CustomEvent('booking-cancelled', { detail: bookings[idx] }));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to cancel booking', e);
    return false;
  }
}
