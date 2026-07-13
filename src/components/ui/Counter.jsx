import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '@/hooks';
import { formatNumber } from '@/utils';

/** Counts up from zero the first time it scrolls into view. */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className,
}) {
  const [ref, inView] = useInViewOnce();
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => formatNumber(v, decimals));

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      count.set(value);
      return undefined;
    }
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, duration, count, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
