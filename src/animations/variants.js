/**
 * Shared Framer Motion variants. Every animation on the site pulls from here so
 * timing and easing stay identical across pages.
 */

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  epic: 1.4,
};

/** Standard scroll-reveal viewport config — fires once, slightly early. */
export const VIEWPORT = { once: true, margin: '-80px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

export const slideRight = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent that staggers its children. Pass a custom delay via `custom`. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Curtain reveal — clips the child up from beneath a mask. */
export const curtainUp = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: DURATION.epic, ease: EASE },
  },
};

/** Character-by-character headline reveal. */
export const letterUp = {
  hidden: { opacity: 0, y: 40, rotateX: -55 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: EASE },
  },
};

/** Page transition used by the route AnimatePresence. */
export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } },
};

/** Modal + backdrop pairing. */
export const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

export const modalPop = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: { opacity: 0, scale: 0.97, y: 12, transition: { duration: 0.25 } },
};

/** Shared hover spring for cards and magnetic elements. */
export const SPRING = { type: 'spring', stiffness: 260, damping: 26, mass: 0.6 };
export const SPRING_SOFT = { type: 'spring', stiffness: 120, damping: 20 };
