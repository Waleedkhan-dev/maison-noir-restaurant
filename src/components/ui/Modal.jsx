import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineXMark } from 'react-icons/hi2';
import { cx } from '@/utils';
import { useLockScroll, useEscape } from '@/hooks';
import { backdrop, modalPop } from '@/animations/variants';

/**
 * Portal modal with a blurred backdrop, focus trap and Escape handling.
 */
export default function Modal({ open, onClose, children, className, label = 'Dialog' }) {
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  useLockScroll(open);
  useEscape(onClose, open);

  useEffect(() => {
    if (!open) {
      restoreRef.current?.focus?.();
      return undefined;
    }
    restoreRef.current = document.activeElement;
    const id = requestAnimationFrame(() => {
      const target =
        panelRef.current?.querySelector('[data-autofocus]') ?? panelRef.current;
      target?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* Keep Tab inside the panel while it is open. */
  const onKeyDown = (e) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            variants={modalPop}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cx(
              'glass-strong relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-modal',
              'shadow-lux no-scrollbar',
              className
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-hairline bg-obsidian/70 text-muted transition-all duration-400 hover:border-gold hover:text-gold"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
