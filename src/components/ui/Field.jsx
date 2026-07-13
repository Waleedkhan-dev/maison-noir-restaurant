import { forwardRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cx } from '@/utils';

const baseField =
  'w-full rounded-input border bg-charcoal/60 px-4 py-3.5 text-sm text-bone placeholder:text-faint ' +
  'transition-all duration-400 outline-none border-hairline ' +
  'hover:border-graphite focus:border-gold focus:bg-charcoal focus:ring-1 focus:ring-gold/25';

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 block font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted"
    >
      {children}
      {required && <span className="ml-1 text-gold">*</span>}
    </label>
  );
}

function Error({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 text-xs text-danger"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export const Input = forwardRef(function Input(
  { label, error, required, className, icon, ...props },
  ref
) {
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint">
            {icon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cx(
            baseField,
            icon && 'pl-11',
            error && 'border-danger focus:border-danger focus:ring-danger/25'
          )}
          {...props}
        />
      </div>
      <span id={`${id}-error`}>
        <Error message={error} />
      </span>
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, required, className, rows = 4, ...props },
  ref
) {
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        aria-invalid={!!error}
        className={cx(baseField, 'resize-none', error && 'border-danger')}
        {...props}
      />
      <Error message={error} />
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, error, required, className, options = [], ...props },
  ref
) {
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          aria-invalid={!!error}
          className={cx(baseField, 'cursor-pointer appearance-none pr-10', error && 'border-danger')}
          {...props}
        >
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value} className="bg-charcoal text-bone">
                {text}
              </option>
            );
          })}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 fill-none stroke-gold stroke-[1.5]"
        >
          <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" />
        </svg>
      </div>
      <Error message={error} />
    </div>
  );
});

/** Radio group rendered as pill chips — used for guests, occasion, time. */
export function ChipGroup({ label, options, value, onChange, name, className }) {
  return (
    <fieldset className={className}>
      {label && (
        <legend className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
          {label}
        </legend>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const text = typeof opt === 'string' ? opt : opt.label;
          const disabled = typeof opt === 'object' && opt.disabled;
          const active = value === val;
          return (
            <button
              key={val}
              type="button"
              name={name}
              disabled={disabled}
              aria-pressed={active}
              onClick={() => onChange(val)}
              className={cx(
                'relative rounded-full border px-4 py-2.5 text-xs tracking-wide transition-all duration-400',
                disabled &&
                  'cursor-not-allowed border-hairline/50 text-faint line-through opacity-45',
                !disabled &&
                  (active
                    ? 'border-gold bg-gold text-obsidian'
                    : 'border-hairline text-muted hover:border-gold/60 hover:text-bone')
              )}
            >
              {text}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
