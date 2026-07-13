import { useState } from 'react';
import { motion } from 'framer-motion';
import { cx } from '@/utils';

/**
 * Lazy image with a skeleton underneath and a fixed aspect box, so nothing
 * on the page shifts while it loads. `zoom` adds the group-hover ken-burns.
 */
export default function Image({
  src,
  alt,
  ratio = '4/3',
  className,
  imgClassName,
  zoom = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cx('relative overflow-hidden bg-elevated', className)}
      style={{ aspectRatio: ratio }}
    >
      {!loaded && !failed && (
        <div className="skeleton absolute inset-0" aria-hidden="true" />
      )}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-charcoal">
          <span className="font-display text-3xl text-graphite">MN</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          initial={false}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={cx(
            'absolute inset-0 h-full w-full object-cover',
            zoom &&
              'transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]',
            imgClassName
          )}
        />
      )}
    </div>
  );
}
