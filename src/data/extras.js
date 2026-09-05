// Optional Rental Add-ons & Equipment for Niljyoti Travels
// Grounded strictly in Tripura & North East travel operations

export const EXTRAS = [
  {
    id: 'additional-driver',
    name: 'Additional Driver Registration',
    icon: '👥',
    description: 'Permit a second driver to operate the vehicle with full insurance validity.',
    pricePerDay: 350,
    unit: 'day',
    isOneTime: false,
    badge: 'Popular for Hill Trips',
    maxQuantity: 2
  },
  {
    id: 'child-seat',
    name: 'Child / Infant Booster Seat (ISOFIX)',
    icon: '💺',
    description: 'Certified safety seat suitable for infants and young children.',
    pricePerDay: 250,
    unit: 'day',
    isOneTime: false,
    badge: 'Family Safety',
    maxQuantity: 2
  },
  {
    id: 'interstate-permit',
    name: 'Interstate Border Permit Assistance',
    icon: '📑',
    description: 'Commercial permit & statutory documentation clearance for cross-border travel between Tripura, Assam, and Meghalaya.',
    pricePerDay: 750,
    unit: 'trip',
    isOneTime: true,
    badge: 'North East Transit',
    maxQuantity: 1
  }
];

export const PROMO_CODES = {
  'CORP2026': { code: 'CORP2026', discountPercent: 15, label: 'Corporate B2B Preferred Rate (15% OFF)' },
  'NILJYOTI10': { code: 'NILJYOTI10', discountPercent: 10, label: 'Niljyoti Travels Special Discount (10% OFF)' },
  'FESTIVE15': { code: 'FESTIVE15', discountPercent: 15, label: 'Special Festive Discount (15% OFF)' }
};
