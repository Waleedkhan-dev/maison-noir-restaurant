const photo = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/**
 * The hero slider. Each slide swaps the plate, the price tag and the eyebrow —
 * the headline stays put so the brand line never flickers.
 */
export const HERO_SLIDES = [
  {
    id: 'pizza',
    name: 'Wood-Fired Pizza',
    kicker: 'Stone-baked · 90 seconds',
    price: 1600,
    image: photo('1628840042765-356cda07504e', 900),
    alt: 'A wood-fired pizza with mozzarella and tomato',
  },
  {
    id: 'burger',
    name: 'The Signature Burger',
    kicker: 'Dry-aged chuck · smoked cheddar',
    price: 1150,
    image: photo('1586190848861-99aa4a171e90', 900),
    alt: 'A double cheeseburger with lettuce and tomato',
  },
  {
    id: 'shawarma',
    name: 'Charcoal Shawarma',
    kicker: 'Spit-roasted · garlic toum',
    price: 450,
    image: photo('1773620494884-940e0db95e46', 900),
    alt: 'Two shawarma wraps served with fries on a board',
  },
  {
    id: 'chicken',
    name: 'Grilled Piri Chicken',
    kicker: 'Flame-grilled · 24-hour marinade',
    price: 1250,
    image: photo('1773620494293-e9e075dd48fd', 900),
    alt: 'Grilled chicken served with rice and vegetables',
  },
  {
    id: 'pasta',
    name: 'Seafood Linguine',
    kicker: 'Hand-rolled · day-boat catch',
    price: 1450,
    image: photo('1775634018153-51e9884dbf7c', 900),
    alt: 'Seafood linguine with tomatoes and a glass of white wine',
  },
];

/* Shot on dark surfaces — a white-background crop reads as a white disc. */
export const INGREDIENTS = {
  chilli: photo('1764154727059-8320ad2052f4', 240),
  tomato: photo('1723983298961-bf9cb6cf9e7f', 240),
  herb: photo('1696937525057-efcb5dbc84e3', 240),
  garlic: photo('1579705744772-f26014b5e084', 240),
};

/**
 * Video sources. Stock hosts frequently block hotlinking, so both players fall
 * back to their poster image if the file will not load. To guarantee playback,
 * drop your own files in `public/media/` and point these at `/media/hero.mp4`.
 */
export const MEDIA = {
  heroVideo: 'https://videos.pexels.com/video-files/3298832/3298832-hd_1920_1080_24fps.mp4',
  heroPoster:
    'https://images.unsplash.com/photo-1778731525602-dc44818f0e5e?auto=format&fit=crop&w=1920&q=70',
  chefVideo: 'https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4',
};

export const SITE = {
  name: 'Maison Noir',
  tagline: 'Contemporary Fine Dining',
  legalName: 'Maison Noir Restaurant Group Ltd.',
  url: 'https://maisonnoir.com',
  description:
    'A two-Michelin-star restaurant serving a seasonal tasting menu of contemporary European cuisine, in the heart of Mayfair.',
  address: {
    street: '14 Curzon Street',
    district: 'Mayfair',
    city: 'London',
    postcode: 'W1J 5HN',
    country: 'United Kingdom',
  },
  geo: { lat: 51.5063, lng: -0.1462 },
  phone: '+44 20 7946 0221',
  phoneHref: '+442079460221',
  email: 'reservations@maisonnoir.com',
  priceRange: 'Rs 1,000 — 12,000',
  rating: { value: 4.9, count: 2847 },
  hours: [
    { day: 'Tuesday — Thursday', service: 'Dinner', time: '18:00 — 23:00' },
    { day: 'Friday — Saturday', service: 'Lunch & Dinner', time: '12:00 — 23:30' },
    { day: 'Sunday', service: 'Lunch', time: '12:00 — 16:00' },
    { day: 'Monday', service: 'Closed', time: '—' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'X', href: 'https://x.com', icon: 'x' },
    { name: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
  ],
};

/** Primary navigation. Items with `columns` render as a mega menu. */
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Experience',
    path: '/about',
    columns: [
      {
        title: 'The House',
        links: [
          { label: 'Our Story', path: '/about', hint: 'Twenty years in Mayfair' },
          { label: 'The Chef', path: '/chef', hint: 'Élodie Rousseau' },
          { label: 'Gallery', path: '/gallery', hint: 'Room, plate, cellar' },
        ],
      },
      {
        title: 'Occasions',
        links: [
          { label: 'Private Dining', path: '/private-dining', hint: 'Four salons' },
          { label: 'Events', path: '/events', hint: 'Tastings & suppers' },
          { label: 'Testimonials', path: '/testimonials', hint: '2,847 reviews' },
        ],
      },
    ],
    feature: {
      title: 'The Winter Tasting',
      copy: 'Nine courses, cellar pairing. Served from 18:00.',
      path: '/menu',
      image:
        'https://images.unsplash.com/photo-1765021097487-6da56c1ce412?auto=format&fit=crop&w=600&q=70',
    },
  },
  {
    label: 'Menu',
    path: '/menu',
    columns: [
      {
        title: 'Menus',
        links: [
          { label: 'À La Carte', path: '/menu', hint: 'Full collection' },
          { label: 'Tasting Menu', path: '/menu?category=tasting', hint: 'Nine courses' },
          { label: 'Desserts', path: '/menu?category=dessert', hint: 'Pastry counter' },
        ],
      },
      {
        title: 'Cellar',
        links: [
          { label: 'Wine & Pairings', path: '/menu?category=wine', hint: '900 bins' },
          { label: 'Cocktails', path: '/menu?category=cocktail', hint: 'Bar Noir' },
          { label: 'Daily Specials', path: '/menu?tag=new', hint: 'Changes at dawn' },
        ],
      },
    ],
    feature: {
      title: 'Order at Home',
      copy: 'Signature plates, delivered across Zone 1.',
      path: '/menu',
      image:
        'https://images.unsplash.com/photo-1616669944447-d65d41a222bd?auto=format&fit=crop&w=600&q=70',
    },
  },
  { label: 'Journal', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = [
  {
    title: 'Restaurant',
    links: [
      { label: 'Our Story', path: '/about' },
      { label: 'The Chef', path: '/chef' },
      { label: 'Menu', path: '/menu' },
      { label: 'Gallery', path: '/gallery' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Reservations', path: '/reservations' },
      { label: 'Private Dining', path: '/private-dining' },
      { label: 'Events', path: '/events' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Journal', path: '/blog' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Gift Cards', path: '/contact' },
    ],
  },
];

export const AWARDS = [
  { title: 'Two Michelin Stars', year: '2019 — 2026', body: 'Guide Michelin' },
  { title: 'Green Star', year: '2023', body: 'Sustainable Gastronomy' },
  { title: "World's 50 Best", year: '2025', body: 'No. 17' },
  { title: 'Wine Spectator', year: '2024', body: 'Grand Award' },
];

/** Feature flags for the dietary icon row on dish cards. */
export const DIETARY = {
  vegan: { label: 'Vegan', short: 'VG' },
  vegetarian: { label: 'Vegetarian', short: 'V' },
  'gluten-free': { label: 'Gluten free', short: 'GF' },
  'dairy-free': { label: 'Dairy free', short: 'DF' },
  spicy: { label: 'Spicy', short: 'S' },
  nuts: { label: 'Contains nuts', short: 'N' },
  shellfish: { label: 'Contains shellfish', short: 'SF' },
};

export const TAX_RATE = 0.16; // GST on restaurant services
export const TAX_LABEL = 'GST (16%)';
export const DELIVERY_FEE = 250;
export const TIP_PRESETS = [0, 0.1, 0.125, 0.15, 0.2];
export const COUPONS = { MAISON10: 0.1, NOIR20: 0.2, WELCOME: 0.15 };
