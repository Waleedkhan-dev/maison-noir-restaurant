import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import { EASE, stagger, fadeUp } from '@/animations/variants';
import { cx } from '@/utils';

/**
 * The masthead every inner page opens with: breadcrumb, eyebrow, title, lede,
 * over a darkened photograph. Keeps all sub-pages on the same rhythm.
 */
export default function PageHeader({ eyebrow, title, lede, image, crumb, children }) {
  return (
    <header className="noise relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 sm:min-h-[70vh] sm:pb-20">
      {image && (
        <motion.img
          src={image}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      )}

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/60"
      />

      <motion.div
        variants={stagger(0.09, 0.2)}
        initial="hidden"
        animate="show"
        className="shell relative z-10"
      >
        {/* Breadcrumb — also emitted as JSON-LD by <Seo /> */}
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-faint">
            <li>
              <Link to="/" className="transition-colors hover:text-gold">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <HiChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-gold">
              {crumb ?? eyebrow}
            </li>
          </ol>
        </motion.nav>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className={cx(
            'mt-6 max-w-4xl text-[2.75rem] leading-[1.02]',
            'sm:text-6xl lg:text-[5rem]'
          )}
        >
          {title}
        </motion.h1>

        {lede && (
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-[0.95rem] leading-[1.9] text-muted sm:text-base"
          >
            {lede}
          </motion.p>
        )}

        {children && <motion.div variants={fadeUp} className="mt-10">{children}</motion.div>}
      </motion.div>
    </header>
  );
}
