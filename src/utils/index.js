/** Merge conditional class names without pulling in a dependency. */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** Rupees are never shown with paisa — round to the whole unit. */
export const formatPrice = (value) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export const formatNumber = (value, decimals = 0) =>
  new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

export const formatDate = (iso, opts = {}) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...opts,
  });

/** Today, as a yyyy-mm-dd string — the min value for the date picker. */
export const todayISO = () => new Date().toISOString().split('T')[0];

/** Split a string into words then characters, for staggered headline reveals. */
export const splitWords = (text) =>
  text.split(' ').map((word) => ({ word, chars: word.split('') }));

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Reads a query param without re-rendering on every keystroke elsewhere. */
export const getParam = (search, key, fallback = '') =>
  new URLSearchParams(search).get(key) ?? fallback;
