import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@/animations/variants';
import { SITE } from '@/constants';

/**
 * First-paint luxury loader. Runs once per session — a reload inside the same
 * tab goes straight to the site rather than making the guest wait twice.
 */
export default function Loader() {
  const [done, setDone] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('mn-loaded') === '1'
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (done) return undefined;

    const start = performance.now();
    const DURATION = 1900;
    let frame;

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out so it decelerates into 100 rather than snapping
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('mn-loaded', '1');
        setTimeout(() => setDone(true), 420);
      }
    };

    frame = requestAnimationFrame(tick);
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, [done]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="noise fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: EASE }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Wordmark, letter by letter */}
          <div className="flex overflow-hidden">
            {SITE.name.split('').map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.9, ease: EASE }}
                className="font-display text-4xl tracking-[0.12em] text-bone sm:text-6xl"
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="eyebrow mt-5"
          >
            {SITE.tagline}
          </motion.span>

          {/* Progress rule */}
          <div className="mt-14 h-px w-56 overflow-hidden bg-graphite sm:w-72">
            <motion.div
              className="h-full bg-gold origin-left"
              style={{ scaleX: progress / 100 }}
            />
          </div>

          <span className="mt-5 font-sans text-[10px] tracking-[0.35em] text-faint tabular-nums">
            {String(progress).padStart(3, '0')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
