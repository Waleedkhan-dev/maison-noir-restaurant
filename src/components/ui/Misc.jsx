import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi2';
import { cx } from '@/utils';
import { DIETARY } from '@/constants';
import { VIEWPORT, fadeUp } from '@/animations/variants';

/* -------------------------------------------------------------- Badge */

const BADGE_TONES = {
  gold: 'border-gold bg-gold text-bone',
  muted: 'border-hairline bg-elevated text-muted',
  dark: 'border-obsidian bg-obsidian/90 text-bone',
  success: 'border-success bg-success text-bone',
  danger: 'border-danger bg-danger text-bone',
};

export function Badge({ children, tone = 'muted', className, icon }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-input border px-3 py-1.5',
        'font-display text-[11px] font-semibold uppercase tracking-wide leading-none',
        BADGE_TONES[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** The circular starburst tag — "HOT", "-10%", a price. The theme's loudest mark. */
export function Burst({ children, tone = 'danger', className }) {
  return (
    <span
      className={cx(
        'starburst grid h-14 w-14 place-items-center text-center',
        'font-display text-[11px] font-bold uppercase leading-none',
        tone === 'amber' && 'starburst-amber',
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------- Rating */

export function Rating({ value, count, size = 'sm', className }) {
  const px = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
  return (
    <div className={cx('flex items-center gap-2', className)}>
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`Rated ${value} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <HiStar
            key={i}
            aria-hidden="true"
            className={cx(px, i <= Math.round(value) ? 'text-gold' : 'text-graphite')}
          />
        ))}
      </div>
      <span className="text-xs text-muted tabular-nums">
        {value.toFixed(1)}
        {count != null && <span className="text-faint"> ({count})</span>}
      </span>
    </div>
  );
}

/* --------------------------------------------------- Dietary icon row */

export function DietaryIcons({ items = [], className }) {
  if (!items.length) return null;
  return (
    <ul className={cx('flex flex-wrap gap-1.5', className)}>
      {items.map((key) => {
        const meta = DIETARY[key];
        if (!meta) return null;
        return (
          <li key={key}>
            <span
              title={meta.label}
              aria-label={meta.label}
              className="grid h-6 min-w-6 place-items-center rounded-full border border-hairline px-1.5 font-sans text-[9px] font-medium tracking-wider text-muted"
            >
              {meta.short}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* --------------------------------------------------- Ornamental divider */

/** The animated SVG rule that separates major sections. */
export function Divider({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={cx('flex items-center justify-center gap-4', className)}
      aria-hidden="true"
    >
      <span className="rule-gold h-px w-16 sm:w-32" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 rotate-45 fill-gold/70">
        <rect width="24" height="24" rx="4" />
      </svg>
      <span className="rule-gold h-px w-16 sm:w-32" />
    </motion.div>
  );
}

/* ------------------------------------------------------------ Timeline */

export function Timeline({ items }) {
  return (
    <ol className="relative">
      {/* the spine */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-gold via-gold-deep to-transparent md:left-1/2"
      />

      {items.map((item, i) => (
        <motion.li
          key={item.year}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className={cx(
            'relative pb-14 pl-10 md:w-1/2 md:pb-20',
            i % 2 === 0
              ? 'md:ml-0 md:pl-0 md:pr-14 md:text-right'
              : 'md:ml-auto md:pl-14'
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'absolute top-1.5 grid h-4 w-4 place-items-center rounded-full border border-gold bg-obsidian',
              'left-0',
              i % 2 === 0 ? 'md:-right-2 md:left-auto' : 'md:-left-2'
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>

          <span className="font-sans text-[11px] font-medium tracking-[0.3em] text-gold">
            {item.year}
          </span>
          <h3 className="mt-3 text-2xl text-bone sm:text-3xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-[1.85] text-muted">{item.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
