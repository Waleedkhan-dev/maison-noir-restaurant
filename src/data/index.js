import { MEDIA } from '@/constants';

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export * from './dishes';

/* ------------------------------------------------------------------ Chefs */

export const CHEFS = [
  {
    id: 'elodie-rousseau',
    name: 'Élodie Rousseau',
    role: 'Chef Patron',
    image: img('1496811425508-6d7ebb7ff32c', 800),
    bio: 'Élodie opened Maison Noir in 2005 after a decade between Lyon and Copenhagen. Her cooking is French in its discipline and Nordic in its restraint — a plate arrives with nothing on it that does not need to be there.',
    quote: 'A dish is finished when there is nothing left to remove.',
    experience: 24,
    signature: ['A5 Wagyu, Bone Marrow', 'The Winter Tasting', 'Whole Roast Celeriac'],
    awards: [
      'Two Michelin Stars — 2019 to 2026',
      'Michelin Green Star — 2023',
      'Chef of the Year, Catey Awards — 2022',
      "World's 50 Best, No. 17 — 2025",
    ],
    video: MEDIA.chefVideo,
  },
  {
    id: 'marcus-oduya',
    name: 'Marcus Oduya',
    role: 'Head Chef',
    image: img('1706945296688-5b6e75db9ebb', 800),
    bio: 'Marcus runs the pass six nights a week. He came to Maison Noir from Copenhagen in 2016 and has shaped the fermentation cellar that now underpins half the menu.',
    quote: 'Fermentation is patience you can taste.',
    experience: 16,
    signature: ['Cornish Turbot', 'Aged Beef Tartare'],
    awards: ['Young Chef of the Year — 2018', 'Craft Guild of Chefs — 2021'],
  },
  {
    id: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    role: 'Pastry Chef',
    image: img('1709837167719-1ff90bdbbac5', 800),
    bio: 'Yuki trained in Kyoto and Paris. Her soufflé has not left the menu in eleven years, and the room would riot if it did.',
    quote: 'Sweetness should arrive last, and leave first.',
    experience: 14,
    signature: ['Valrhona Soufflé', 'Blood Orange Sorbet'],
    awards: ['Pastry Chef of the Year — 2024', 'Relais Desserts, Member'],
  },
  {
    id: 'sofia-marchetti',
    name: 'Sofia Marchetti',
    role: 'Head Sommelier',
    image: img('1551632436-330c2f3bae08', 800),
    bio: 'Sofia keeps nine hundred bins beneath Curzon Street and can tell you where every one of them was standing a decade ago.',
    quote: 'The right glass makes the plate say something new.',
    experience: 12,
    signature: ['Cellar Pairing', 'Château Margaux 2015'],
    awards: ['Master Sommelier — 2021', 'Wine Spectator Grand Award — 2024'],
  },
];

/* ------------------------------------------------------------- Testimonials */

export const REVIEWS = [
  {
    id: 1,
    name: 'Amara Osei',
    role: 'Food Critic, The Standard',
    rating: 5,
    date: 'March 2026',
    avatar: img('1494790108377-be9c29b29330', 200),
    text: 'The turbot is the single best thing I have eaten in London this decade. Rousseau cooks with a confidence that borders on arrogance, and every time, she earns it.',
    source: 'Google',
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'Regular since 2011',
    rating: 5,
    date: 'February 2026',
    avatar: img('1507003211169-0a1dd7228f2d', 200),
    text: 'Fifteen years and they have never once got it wrong. They remember my wife’s allergy, my father’s chair, the wine we drank the night we announced the engagement.',
    source: 'Google',
  },
  {
    id: 3,
    name: 'Priya Raghunathan',
    role: 'Private Dining, Salon Noir',
    rating: 5,
    date: 'January 2026',
    avatar: img('1438761681033-6461ffad8d80', 200),
    text: 'We took the Salon for forty guests. The team ran the room so quietly I did not notice them working — I only noticed that nothing ever needed asking for.',
    source: 'Tripadvisor',
  },
  {
    id: 4,
    name: 'Henrik Lund',
    role: 'Copenhagen',
    rating: 5,
    date: 'December 2025',
    avatar: img('1500648767791-00dcc994a43e', 200),
    text: 'I flew in for the Winter Tasting and would do it again tomorrow. The celeriac course made me genuinely angry that I have been cooking vegetables wrong my entire life.',
    source: 'Google',
  },
  {
    id: 5,
    name: 'Isabelle Moreau',
    role: 'Wine Writer',
    rating: 5,
    date: 'December 2025',
    avatar: img('1544005313-94ddf0286df2', 200),
    text: 'Marchetti’s cellar is the most intelligently assembled list in Mayfair. She poured me a Jura I had never heard of and I have thought about it every week since.',
    source: 'Google',
  },
  {
    id: 6,
    name: 'Daniel Okonkwo',
    role: 'Anniversary Dinner',
    rating: 5,
    date: 'November 2025',
    avatar: img('1506794778202-cad84cf45f1d', 200),
    text: 'They lit the room a fraction lower when the dessert came out, and no one said a word about it. That is the level of attention here.',
    source: 'Tripadvisor',
  },
];

/* ----------------------------------------------------------------- Gallery */

export const GALLERY = [
  { id: 1, src: img('1726835498689-b4f6dbcdbdfb', 1000), category: 'interior', alt: 'The main dining room at dusk, candles lit', span: 'tall' },
  { id: 2, src: img('1616669944447-d65d41a222bd', 1000), category: 'dishes', alt: 'A plated course from the winter tasting menu' },
  { id: 3, src: img('1768162125977-9944219971c5', 1000), category: 'kitchen', alt: 'The pass during evening service', span: 'wide' },
  { id: 4, src: img('1562601579-599dec564e06', 1000), category: 'wine', alt: 'Bottles resting in the cellar beneath Curzon Street', span: 'tall' },
  { id: 5, src: img('1673912402587-57ac40f1b4a5', 1000), category: 'dishes', alt: 'The Valrhona soufflé, opened at the table' },
  { id: 6, src: img('1551632436-cbf8dd35adfa', 1000), category: 'interior', alt: 'A corner banquette set for two' },
  { id: 7, src: img('1600891964092-4316c288032e', 1000), category: 'dishes', alt: 'A5 wagyu resting before service', span: 'wide' },
  { id: 8, src: img('1587372767238-84dca9e88123', 1000), category: 'kitchen', alt: 'Herbs from the Kentish garden' },
  { id: 9, src: img('1663551469021-558895dbe71d', 1000), category: 'wine', alt: 'A decanter under low light', span: 'tall' },
  { id: 10, src: img('1572116469696-31de0f17cc34', 1000), category: 'interior', alt: 'The bar at Maison Noir' },
  { id: 11, src: img('1643856557143-09189e523fd6', 1000), category: 'interior', alt: 'The terrace, laid for lunch', span: 'wide' },
  { id: 12, src: img('1473093226795-af9932fe5856', 1000), category: 'dishes', alt: 'Risotto finished with winter truffle' },
];

export const GALLERY_FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'interior', label: 'The Room' },
  { id: 'dishes', label: 'The Plate' },
  { id: 'kitchen', label: 'The Kitchen' },
  { id: 'wine', label: 'The Cellar' },
];

/* ------------------------------------------------------------------ Events */

export const EVENTS = [
  {
    id: 'burgundy-tasting',
    title: 'Burgundy, Vertically',
    type: 'Wine Tasting',
    date: '2026-08-14',
    dateLabel: '14 August 2026',
    time: '19:00 — 22:30',
    price: 12000,
    seats: 24,
    seatsLeft: 6,
    image: img('1568213816046-0ee1c42bd559', 900),
    description:
      'Sofia Marchetti opens eight vintages of Gevrey-Chambertin from a single domaine, spanning 1996 to 2019, served alongside five courses built to follow the wines rather than lead them.',
  },
  {
    id: 'jazz-supper',
    title: 'Late Supper & Jazz',
    type: 'Live Music',
    date: '2026-08-22',
    dateLabel: '22 August 2026',
    time: '21:30 — 01:00',
    price: 4500,
    seats: 60,
    seatsLeft: 21,
    image: img('1415201364774-f6f0bb35f28f', 900),
    description:
      'The room is cleared, the lights come down, and a quartet plays until one. Small plates from the bar menu, a negroni in your hand, and no reason to be anywhere else.',
  },
  {
    id: 'chefs-table',
    title: "Chef's Table, Winter",
    type: 'Special Night',
    date: '2026-09-05',
    dateLabel: '5 September 2026',
    time: '18:30 — 23:00',
    price: 18000,
    seats: 8,
    seatsLeft: 2,
    image: img('1600565193348-f74bd3c7ccdf', 900),
    description:
      'Eight seats at the pass. Élodie cooks in front of you, explains every plate, and pours what she happens to be drinking. The most direct access to this kitchen there is.',
  },
  {
    id: 'truffle-season',
    title: 'Alba Truffle Dinner',
    type: 'Seasonal',
    date: '2026-10-11',
    dateLabel: '11 October 2026',
    time: '19:00 — 23:00',
    price: 15000,
    seats: 40,
    seatsLeft: 18,
    image: img('1642354609876-5386fea5e7fc', 900),
    description:
      'One night, one ingredient. White truffle from Alba shaved over six courses, weighed at the table, with a Piedmont wine flight to match.',
  },
];

/* ---------------------------------------------------------- Private dining */

export const PRIVATE_ROOMS = [
  {
    id: 'salon-noir',
    name: 'Salon Noir',
    capacity: '10 — 40 guests',
    seated: 40,
    standing: 65,
    minSpend: 150000,
    image: img('1515982200576-f29f11444503', 1000),
    description:
      'Our largest private room, panelled in smoked oak with its own entrance from Curzon Street and a cellar door that opens directly onto the reserve list.',
    features: ['Private entrance', 'Dedicated sommelier', 'AV & screen', 'Cellar access'],
  },
  {
    id: 'the-cellar',
    name: 'The Cellar',
    capacity: '2 — 12 guests',
    seated: 12,
    standing: 20,
    minSpend: 80000,
    image: img('1767969217506-b28edac04107', 1000),
    description:
      'A vaulted room beneath the restaurant, surrounded on all four sides by nine hundred bins. Candlelit, cool, and entirely yours for the evening.',
    features: ['Surrounded by the cellar', 'Candlelit', 'Bespoke pairing', 'Chef visit'],
  },
  {
    id: 'the-pass',
    name: "The Chef's Table",
    capacity: '2 — 8 guests',
    seated: 8,
    standing: 8,
    minSpend: 100000,
    image: img('1772993629598-f10e8c10ddc7', 1000),
    description:
      'Eight stools at the pass, inside the kitchen. You watch the brigade work, and the brigade watches you eat. Not for the shy.',
    features: ['Inside the kitchen', 'Cooked by Élodie', 'Off-menu courses', 'Kitchen tour'],
  },
  {
    id: 'the-terrace',
    name: 'The Terrace',
    capacity: '10 — 30 guests',
    seated: 30,
    standing: 45,
    minSpend: 120000,
    image: img('1759866614095-d867221143f7', 1000),
    description:
      'A walled garden terrace behind the dining room, heated and covered from October, planted with the herbs that end up on your plate.',
    features: ['Outdoor, heated', 'Herb garden', 'Bar service', 'Retractable roof'],
  },
];

/* ------------------------------------------------------------------- Blog */

export const POSTS = [
  {
    id: 'winter-larder',
    title: 'What the Winter Larder Teaches Us',
    excerpt:
      'When the growing stops, the cooking has to get more interesting. Élodie on why January is the hardest and best month in the kitchen.',
    author: 'Élodie Rousseau',
    date: '2026-06-28',
    dateLabel: '28 June 2026',
    readTime: 6,
    category: 'Kitchen',
    image: img('1605279682024-5a25531582dc', 900),
    body: [
      'Every year, sometime around the second week of January, the deliveries thin out. The Kentish garden gives us nothing but roots and brassicas. The coast is unreliable. The list of what we cannot cook becomes longer than the list of what we can.',
      'This is, without question, my favourite moment of the year.',
      'Abundance is a poor teacher. In August, a tomato does most of the work for you — you salt it, you dress it, you get out of its way and the plate is very good. Nobody learns anything. In January, a celeriac gives you nothing for free. You bake it in salt for four hours and it still tastes like a celeriac. So you go further. You brown butter until it smells of hazelnut, you shave truffle across it, you find lovage in a greenhouse in Sussex, and slowly a dish appears that could not have existed in any other month.',
      'Constraint is the only reliable source of originality I have ever found. The menu you are eating in February was written by scarcity, and it is better for it.',
    ],
  },
  {
    id: 'fermentation-cellar',
    title: 'Inside the Fermentation Cellar',
    excerpt:
      'Marcus Oduya on the two hundred jars beneath Curzon Street, and the eighteen months it takes before any of them reach a plate.',
    author: 'Marcus Oduya',
    date: '2026-06-14',
    dateLabel: '14 June 2026',
    readTime: 8,
    category: 'Kitchen',
    image: img('1592878912415-353c89227af4', 900),
    body: [
      'There are two hundred and forty jars in the cellar at the moment. The oldest was sealed in 2021 and will not be opened until the black garlic inside it has spent five full years turning from something sharp into something that tastes like molasses and coffee and very good balsamic all at once.',
      'People assume fermentation is a technique. It is closer to a relationship. You check on it, you taste it, you leave it alone when it asks to be left alone.',
      'Everything on the tasting menu touches this room somewhere — a koji cure, a garum made from the trim we would otherwise throw away, a vinegar drawn from last year’s wine. It is the least glamorous room in the building and the reason the food tastes the way it does.',
    ],
  },
  {
    id: 'nine-hundred-bins',
    title: 'How to Read a Wine List',
    excerpt:
      'Nine hundred bins is intimidating by design — but Sofia Marchetti says the best thing you can say to a sommelier is the simplest.',
    author: 'Sofia Marchetti',
    date: '2026-05-30',
    dateLabel: '30 May 2026',
    readTime: 5,
    category: 'Cellar',
    image: img('1541971897566-308cf7ad0934', 900),
    body: [
      'Guests apologise to me constantly. They apologise for not knowing Burgundy, for liking something sweet, for the budget they have in mind. Please stop. The apology is the only part of the conversation that helps me not at all.',
      'Here is what does help: tell me a wine you have enjoyed, tell me roughly what you would like to spend, and let me do the rest. That is the entire job. I have nine hundred bins and I am looking for a reason to open one of the strange ones.',
      'The most expensive bottle on the list is rarely the one I would drink tonight. Ask me which one I would drink tonight.',
    ],
  },
  {
    id: 'the-second-star',
    title: 'The Morning After the Second Star',
    excerpt:
      'What actually changes when the Guide calls — and the one thing in the kitchen we refused to change at all.',
    author: 'Élodie Rousseau',
    date: '2026-05-12',
    dateLabel: '12 May 2026',
    readTime: 7,
    category: 'The House',
    image: img('1718939044138-5b76d9dd938b', 900),
    body: [
      'The phone rings at seven in the morning and a very polite person tells you that your life has changed. Then you hang up, and you still have a hundred and forty covers to prep.',
      'What changed: the bookings went from two weeks out to four months out overnight. The pressure on every plate that leaves the pass went up permanently, and it has never come back down.',
      'What did not change: we still write the menu in the morning based on what arrived at the door. We were asked, more than once, to standardise it — to lock the menu so that a guest flying in from Singapore gets exactly the dish they read about. We said no. If the turbot is not right today, you are not eating the turbot today. That is the whole restaurant, and no star is worth trading it.',
    ],
  },
  {
    id: 'sustainable-star',
    title: 'The Green Star, Honestly',
    excerpt:
      'Sustainability in fine dining is mostly theatre. Here is what we actually measure, and where we still fall short.',
    author: 'Marcus Oduya',
    date: '2026-04-19',
    dateLabel: '19 April 2026',
    readTime: 9,
    category: 'The House',
    image: img('1566385101042-1a0aa0c1268c', 900),
    body: [
      'We were given a Green Star in 2023 and I want to be precise about what it does and does not mean, because the phrase has been diluted into meaninglessness by people selling avocados flown in from Peru.',
      'What we can defend: ninety-one percent of our produce comes from within two hundred miles. Our food waste is under four percent by weight, because the fermentation cellar eats the trim. Every fish on the menu is day-boat and line-caught, and we have refused three species outright.',
      'Where we fall short: the wine cellar. Nine hundred bins is not a low-carbon proposition and I will not pretend otherwise. We are working on it. We are not there.',
    ],
  },
  {
    id: 'service-is-invisible',
    title: 'Good Service Should Be Invisible',
    excerpt:
      'Our head of service on the art of anticipating a table without ever hovering over it.',
    author: 'Élodie Rousseau',
    date: '2026-03-27',
    dateLabel: '27 March 2026',
    readTime: 4,
    category: 'The Room',
    image: img('1776614277456-0fcbc6712eb6', 900),
    body: [
      'If you can remember your waiter’s face at the end of the night, something has gone slightly wrong. Not badly wrong — just slightly. The best service is a room that seems to run itself.',
      'The water glass fills before you reach for it. The plate arrives the moment the conversation reaches a natural pause. The lights come down a fraction when dessert lands. Nobody announces any of this. Nobody asks if everything is okay while your mouth is full.',
      'It takes about two years to train someone to do this well, and roughly ten seconds to undo it with one badly-timed question.',
    ],
  },
];

/* -------------------------------------------------------------------- FAQ */

export const FAQS = [
  {
    q: 'How far in advance should I book?',
    a: 'Tables open on the first of each month for the month ahead, and Friday and Saturday evenings typically go within the first few hours. For a weekend, plan on four to six weeks. Midweek, a fortnight is usually comfortable. We hold a small number of tables back for same-day walk-ins at the bar.',
  },
  {
    q: 'Is there a dress code?',
    a: 'Smart. We ask that you avoid sportswear and trainers in the main dining room, but we have no interest in turning anyone away over a jacket. Come dressed for an occasion and you will be right.',
  },
  {
    q: 'Can you accommodate dietary requirements?',
    a: 'Yes — and properly, not as an afterthought. The Garden Tasting is entirely plant-based by design rather than by substitution. For allergies, tell us at the time of booking and again on the night; the kitchen rewrites the menu around you rather than removing components from it.',
  },
  {
    q: 'Do you take children?',
    a: 'Children over ten are very welcome in the dining room and we will happily prepare a smaller version of the tasting menu. For younger children, the Sunday lunch service is the gentlest introduction.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Reservations can be cancelled free of charge up to 48 hours before service. Inside 48 hours we charge Rs 2,500 per guest, and for the Chef’s Table the full amount. We will always try to move you rather than charge you.',
  },
  {
    q: 'Is the tasting menu required?',
    a: 'No. À la carte is served at every service except the Chef’s Table. That said, the tasting menu is where the kitchen is at its most ambitious, and it is what we would order.',
  },
  {
    q: 'Do you offer parking?',
    a: 'There is no on-site parking. We recommend the Q-Park on Park Lane, a four-minute walk away, and we validate the first three hours. Green Park station is six minutes on foot.',
  },
  {
    q: 'Can I buy a gift card?',
    a: 'Yes. Gift cards are available in any denomination, arrive in a linen envelope by post or instantly by email, and never expire. Contact us and we will arrange it the same day.',
  },
];

/* ------------------------------------------------------------------ Story */

export const TIMELINE = [
  { year: '2005', title: 'The Doors Open', body: 'Élodie Rousseau takes a derelict townhouse on Curzon Street and serves thirty-two covers on the first night. Twenty-nine of them are friends.' },
  { year: '2011', title: 'The First Star', body: 'The Guide arrives unannounced in March. The star follows in October, and the phone does not stop ringing for a fortnight.' },
  { year: '2016', title: 'The Cellar', body: 'We dig out the basement and lay down the first three hundred bins. Marcus joins from Copenhagen and starts filling jars.' },
  { year: '2019', title: 'The Second Star', body: 'A second star, and a decision not to change a single thing about how the menu is written each morning.' },
  { year: '2023', title: 'The Green Star', body: 'Ninety-one percent of produce sourced within two hundred miles. Food waste below four percent. Recognised for it, and still not satisfied.' },
  { year: '2026', title: 'Twenty-One Years', body: 'Nine hundred bins, four private rooms, and the same insistence that the plate arrives with nothing on it that does not need to be there.' },
];

export const STATS = [
  { value: 2, suffix: '', label: 'Michelin Stars' },
  { value: 21, suffix: '', label: 'Years in Mayfair' },
  { value: 900, suffix: '+', label: 'Bins in the Cellar' },
  { value: 4.9, suffix: '', label: 'Guest Rating', decimals: 1 },
];

/* -------------------------------------------------------- Reservation opts */

export const OCCASIONS = [
  'Dining',
  'Birthday',
  'Anniversary',
  'Engagement',
  'Business',
  'Celebration',
];

export const TIME_SLOTS = [
  { time: '17:30', available: true },
  { time: '18:00', available: true },
  { time: '18:30', available: false },
  { time: '19:00', available: true },
  { time: '19:30', available: false },
  { time: '20:00', available: true },
  { time: '20:30', available: true },
  { time: '21:00', available: true },
  { time: '21:30', available: false },
  { time: '22:00', available: true },
];

/* ------------------------------------------------------------- Instagram */

export const INSTAGRAM = [
  img('1616669944447-d65d41a222bd', 500),
  img('1726835498689-b4f6dbcdbdfb', 500),
  img('1600891964092-4316c288032e', 500),
  img('1673912402587-57ac40f1b4a5', 500),
  img('1562601579-599dec564e06', 500),
  img('1473093226795-af9932fe5856', 500),
];
