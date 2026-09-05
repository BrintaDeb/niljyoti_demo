export const PROTECTION_PACKAGES = [
  {
    id: 'basic',
    name: 'Standard Commercial Cab Protection',
    tier: 'Essential',
    pricePerDay: 0,
    excessAmount: 5000,
    badge: 'Included Free',
    isDefault: true,
    tagline: 'Standard commercial passenger insurance and 24/7 Niljyoti Roadside Assistance.',
    features: [
      { text: 'Comprehensive Commercial Passenger Insurance', included: true },
      { text: 'Collision Damage Protection (CDW)', included: true },
      { text: '24/7 Niljyoti Highway Breakdown Support', included: true },
      { text: 'Standard Excess capped at ₹5,000', included: true },
      { text: 'Minor Scratches & Glass Shield', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Niljyoti Zero Liability Shield',
    tier: 'Peace of Mind',
    pricePerDay: 299,
    excessAmount: 0,
    badge: '₹0 Zero Excess',
    isDefault: false,
    tagline: 'Absolute ₹0 financial liability for complete peace of mind on hill journeys.',
    features: [
      { text: 'Comprehensive Commercial Passenger Insurance', included: true },
      { text: 'Collision Damage Protection with ZERO Deductible', included: true },
      { text: '₹0 Excess on any accidental vehicle damage', included: true },
      { text: 'Glass, Headlights & Tyre Rim Protection Included', included: true },
      { text: 'Priority Replacement Cab Guarantee within 2 Hours', included: true }
    ]
  }
];
