import { motion } from 'framer-motion';
import { cx } from '@/utils';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

/**
 * Eyebrow → headline → lede. Every section on the site opens with this so the
 * vertical rhythm is identical throughout.
 */
export default function SectionTitle({
  eyebrow,
  title,
  lede,
  align = 'center',
  as: Heading = 'h2',
  className,
  light = false,
}) {
  const alignment = {
    center: 'items-center text-center mx-auto',
    left: 'items-start text-left',
    right: 'items-end text-right ml-auto',
  }[align];

  return (
    <motion.div
      variants={stagger(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={cx('flex max-w-3xl flex-col gap-5', alignment, className)}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="overflow-hidden">
        <Heading
          className={cx(
            'text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[3.75rem]',
            light ? 'text-bone' : 'text-bone'
          )}
        >
          {title}
        </Heading>
      </motion.div>

      {lede && (
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-[0.95rem] leading-[1.85] text-muted sm:text-base"
        >
          {lede}
        </motion.p>
      )}
    </motion.div>
  );
}
