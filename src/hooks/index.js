import { useState, useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/* ------------------------------------------------------------ Smooth scroll */

/** Boots Lenis once for the whole app and exposes the instance. */
export function useLenis() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    ref.current = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ref.current = null;
    };
  }, [reduced]);

  return ref;
}

/* ------------------------------------------------------------ Scroll state */

/** True once the page has scrolled past `threshold` px. Drives the solid navbar. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/* ---------------------------------------------------------------- Pointer */

/** Raw mouse position, in px. Used by the cursor and parallax effects. */
export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return { x, y };
}

/**
 * Magnetic hover — the element leans toward the cursor and springs back.
 * Returns a ref plus the x/y springs to feed into a motion element's style.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  const onMouseMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [reduced, strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}

/**
 * 3D tilt on hover. Feeds rotateX/rotateY springs; the consumer sets
 * `transformStyle: preserve-3d` and a perspective on the parent.
 */
export function useTilt(max = 9) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 20 });

  const onMouseMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * max * 2);
      rotateX.set(-py * max * 2);
    },
    [reduced, max, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ------------------------------------------------------------------- Misc */

/** Locks body scroll while a modal or drawer is open. */
export function useLockScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = previous;
      document.body.style.paddingRight = '';
    };
  }, [locked]);
}

/** Closes on Escape. */
export function useEscape(handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && handler();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handler, active]);
}

/** Fires once when the element scrolls into view — used by the counters. */
export function useInViewOnce(margin = '-60px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView];
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Debounced value — keeps the menu search from filtering on every keystroke. */
export function useDebounced(value, delay = 220) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
