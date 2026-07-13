import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/utils';
import { EASE } from '@/animations/variants';

/** Single-open accordion. Used by the FAQ page and section. */
export default function Accordion({ items, className, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={cx('divide-y divide-hairline border-y border-hairline', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-400"
              >
                <span
                  className={cx(
                    'font-display text-xl transition-colors duration-400 sm:text-2xl',
                    isOpen ? 'text-gold' : 'text-bone group-hover:text-gold-light'
                  )}
                >
                  {item.q}
                </span>

                <span
                  aria-hidden="true"
                  className={cx(
                    'relative mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500',
                    isOpen
                      ? 'rotate-45 border-gold bg-gold text-obsidian'
                      : 'border-hairline text-muted group-hover:border-gold/60'
                  )}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${id}-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pr-12 text-[0.95rem] leading-[1.9] text-muted">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
