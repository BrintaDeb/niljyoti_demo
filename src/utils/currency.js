// Currency converter utility supporting INR (base), USD, and EUR
const RATES = {
  INR: 1,
  USD: 0.012, // 1 INR ~ 0.012 USD (~$83.5 / 1000 INR)
  EUR: 0.011  // 1 INR ~ 0.011 EUR
};

const SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€'
};

let currentCurrency = 'INR';

export function setCurrency(curr) {
  if (RATES[curr]) {
    currentCurrency = curr;
    localStorage.setItem('bharat_rentals_currency', curr);
    window.dispatchEvent(new CustomEvent('currency-changed', { detail: { currency: curr } }));
  }
}

export function getCurrency() {
  const saved = localStorage.getItem('bharat_rentals_currency');
  if (saved && RATES[saved]) {
    currentCurrency = saved;
  }
  return currentCurrency;
}

export function formatPrice(amountInINR, showUnit = true) {
  const curr = getCurrency();
  const converted = amountInINR * RATES[curr];
  const symbol = SYMBOLS[curr];

  let formattedNumber;
  if (curr === 'INR') {
    // Format according to Indian numbering system (Lakhs / Thousands)
    formattedNumber = Math.round(converted).toLocaleString('en-IN');
  } else {
    formattedNumber = Math.round(converted).toLocaleString('en-US');
  }

  return `${symbol}${formattedNumber}${showUnit ? '' : ''}`;
}

export function formatPriceRaw(amountInINR) {
  const curr = getCurrency();
  const converted = amountInINR * RATES[curr];
  return Math.round(converted);
}

export function getCurrencySymbol() {
  return SYMBOLS[getCurrency()];
}
