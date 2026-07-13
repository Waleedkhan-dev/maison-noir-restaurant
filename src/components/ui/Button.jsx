import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cx } from '@/utils';
import { useMagnetic } from '@/hooks';
import { SPRING } from '@/animations/variants';

const VARIANTS = {
  primary:
    'bg-gold text-bone border border-gold hover:bg-gold-light hover:border-gold-light hover:text-obsidian shadow-[0_12px_36px_-14px_rgba(240,80,30,0.65)]',
  outline:
    'border border-hairline text-bone hover:border-gold hover:bg-gold hover:text-bone bg-transparent',
  ghost: 'border border-transparent text-bone hover:text-gold bg-transparent',
  glass: 'glass text-bone hover:border-gold hover:bg-gold hover:text-bone',
  dark: 'bg-obsidian text-bone border border-graphite hover:border-gold hover:bg-gold',
  amber:
    'bg-gold-light text-obsidian border border-gold-light hover:bg-gold hover:border-gold hover:text-bone',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3.5 text-xs',
  lg: 'px-9 py-4 text-[13px] sm:text-sm',
};

/**
 * The one button. Magnetic on hover, ripples from the click point, and
 * renders as <button>, <Link> or <a> depending on the props it gets.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    icon,
    magnetic = true,
    full = false,
    className,
    onClick,
    disabled,
    ...props
  },
  forwardedRef
) {
  const [ripples, setRipples] = useState([]);
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(magnetic ? 0.22 : 0);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = `${e.clientX}-${e.clientY}-${rect.top}`;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((item) => item.id !== id)), 650);
    onClick?.(e);
  };

  const classes = cx(
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-input',
    'font-display font-semibold uppercase tracking-[0.06em] leading-none',
    'transition-colors duration-400 will-change-transform',
    'disabled:pointer-events-none disabled:opacity-40',
    VARIANTS[variant],
    SIZES[size],
    full && 'w-full',
    className
  );

  const inner = (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-current opacity-25"
          initial={{ width: 0, height: 0, x: r.x, y: r.y, opacity: 0.3 }}
          animate={{
            width: 380,
            height: 380,
            x: r.x - 190,
            y: r.y - 190,
            opacity: 0,
          }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    ref: (node) => {
      ref.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    style: magnetic ? { x, y } : undefined,
    onMouseMove: magnetic ? onMouseMove : undefined,
    onMouseLeave: magnetic ? onMouseLeave : undefined,
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap: { scale: disabled ? 1 : 0.97 },
    transition: SPRING,
    className: classes,
    onClick: handleClick,
    ...props,
  };

  if (to) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink to={to} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" disabled={disabled} {...motionProps}>
      {inner}
    </motion.button>
  );
});

export default Button;
