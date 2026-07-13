import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { HiOutlineArrowUp, HiOutlineCalendarDays } from 'react-icons/hi2';
import { useMousePosition, useMediaQuery } from '@/hooks';
import { EASE } from '@/animations/variants';
import { Link } from 'react-router-dom';

/* ----------------------------------------------------------- Custom cursor */

/**
 * Two-part cursor: a gold dot that tracks exactly, and a ring that lags behind
 * and swells over anything interactive. Desktop + fine-pointer only.
 */
export function Cursor() {
  const fine = useMediaQuery('(pointer: fine)');
  const { x, y } = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!fine) return undefined;

    const isInteractive = (el) =>
      el?.closest?.('a, button, [role="button"], input, select, textarea, [data-cursor]');

    const onOver = (e) => setHovering(!!isInteractive(e.target));
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    setHidden(false);

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] overflow-hidden"
    >
      <motion.span
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-gold"
      />
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : 1,
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          marginLeft: hovering ? -26 : -15,
          marginTop: hovering ? -26 : -15,
          borderColor: hovering ? 'rgba(201,162,39,0.9)' : 'rgba(201,162,39,0.35)',
          backgroundColor: hovering ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0)',
        }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute block rounded-full border"
      />
    </div>
  );
}

/* ------------------------------------------------------- Scroll progress */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light"
    />
  );
}

/* ---------------------------------------------- Back to top + reserve FAB */

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onReservations = pathname === '/reservations';

  return (
    <div className="fixed bottom-5 right-5 z-[92] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            key="top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="glass grid h-12 w-12 place-items-center rounded-full text-bone transition-colors duration-400 hover:border-gold/60 hover:text-gold"
          >
            <HiOutlineArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!onReservations && (
          <motion.div
            key="reserve"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
          >
            {/* The halo is clipped by this wrapper — an animate-ping scales past
                the viewport edge and would otherwise widen the page. */}
            <span className="relative block overflow-hidden rounded-full p-1">
              <span
                aria-hidden="true"
                className="absolute inset-1 animate-ping rounded-full bg-gold/20 [animation-duration:3s]"
              />
              <Link
                to="/reservations"
                className="group relative flex items-center gap-3 rounded-full bg-gold py-3.5 pl-4 pr-5 text-obsidian shadow-gold transition-all duration-500 hover:bg-gold-light"
              >
                <HiOutlineCalendarDays className="h-5 w-5" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                  Reserve
                </span>
              </Link>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
