import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineBars2,
  HiOutlineXMark,
  HiOutlineShoppingBag,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiChevronDown,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import { LuChefHat } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import { NAV_LINKS, SITE } from '@/constants';
import { useScrolled, useLockScroll } from '@/hooks';
import { useCart } from '@/store/useCart';
import { cx } from '@/utils';
import { EASE, stagger, fadeUp } from '@/animations/variants';

/* ------------------------------------------------------------ Mega menu */

function MegaMenu({ item, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="absolute left-1/2 top-full z-50 w-[min(56rem,calc(100vw-4rem))] -translate-x-1/2 pt-6"
    >
      <div className="glass-strong grid gap-8 rounded-modal p-8 shadow-lux lg:grid-cols-[1fr_1fr_1.1fr]">
        {item.columns.map((col) => (
          <div key={col.title}>
            <h3 className="eyebrow mb-5">{col.title}</h3>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={onNavigate}
                    className="group block rounded-input px-3 py-2.5 transition-colors duration-400 hover:bg-elevated/70"
                  >
                    <span className="block text-[0.95rem] text-bone transition-colors duration-300 group-hover:text-gold">
                      {link.label}
                    </span>
                    <span className="block text-[11px] text-faint">{link.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.feature && (
          <Link
            to={item.feature.path}
            onClick={onNavigate}
            className="group relative overflow-hidden rounded-card"
          >
            <Image
              src={item.feature.image}
              alt=""
              ratio="4/3"
              zoom
              className="h-full"
              sizes="300px"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="block font-display text-xl text-bone group-hover:text-gold-light">
                {item.feature.title}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-muted">
                {item.feature.copy}
              </span>
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------- Navbar */

export default function Navbar() {
  const scrolled = useScrolled(28);
  const [openMega, setOpenMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const openCart = useCart((s) => s.open);

  useLockScroll(mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[120] focus:rounded-full focus:bg-gold focus:px-6 focus:py-3 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-obsidian"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cx(
          'fixed inset-x-0 top-0 z-[90] transition-all duration-700',
          scrolled || openMega
            ? 'glass-strong border-b border-hairline py-3'
            : 'border-b border-transparent bg-transparent py-5'
        )}
      >
        <nav className="shell flex items-center justify-between gap-6" aria-label="Primary">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${SITE.name} — home`}
          >
            <LuChefHat
              className="h-8 w-8 text-gold transition-transform duration-500 group-hover:-rotate-6"
              aria-hidden="true"
            />
            <span className="font-display text-2xl font-bold uppercase tracking-tight text-bone transition-colors duration-400 group-hover:text-gold sm:text-[1.7rem]">
              Maison<span className="text-gold">Noir</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden items-center gap-8 lg:flex"
            onMouseLeave={() => setOpenMega(null)}
          >
            {NAV_LINKS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMega(item.columns ? item.label : null)}
              >
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    cx(
                      'nav-link flex items-center gap-1 py-2 font-display text-[15px] font-medium uppercase tracking-wide transition-colors duration-300',
                      isActive ? 'text-gold' : 'text-bone hover:text-gold'
                    )
                  }
                  data-active={pathname === item.path ? 'true' : 'false'}
                  aria-haspopup={item.columns ? 'true' : undefined}
                  aria-expanded={openMega === item.label ? 'true' : undefined}
                >
                  {item.label}
                  {item.columns && (
                    <HiChevronDown
                      aria-hidden="true"
                      className={cx(
                        'h-3.5 w-3.5 transition-transform duration-300',
                        openMega === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </NavLink>

                <AnimatePresence>
                  {openMega === item.label && item.columns && (
                    <MegaMenu item={item} onNavigate={() => setOpenMega(null)} />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone — the reference puts it front and centre; it converts. */}
            <a
              href={`tel:${SITE.phoneHref}`}
              className="hidden items-center gap-2.5 text-bone transition-colors duration-300 hover:text-gold xl:flex"
            >
              <HiOutlinePhone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="font-display text-sm font-medium uppercase tracking-wide">
                Call: {SITE.phone}
              </span>
            </a>

            <Link
              to="/menu"
              aria-label="Search the menu"
              className="hidden h-9 w-9 place-items-center text-bone transition-colors duration-300 hover:text-gold sm:grid"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open your order — ${count} item${count === 1 ? '' : 's'}`}
              className="relative grid h-9 w-9 place-items-center text-bone transition-colors duration-300 hover:text-gold"
            >
              <HiOutlineShoppingBag className="h-[21px] w-[21px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-light px-1 text-[10px] font-bold tabular-nums text-obsidian"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Button
              to="/reservations"
              size="sm"
              icon={<HiOutlineArrowRight className="h-3.5 w-3.5" />}
              className="hidden sm:inline-flex"
            >
              Book Now
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center border border-hairline text-bone transition-all duration-300 hover:border-gold hover:bg-gold lg:hidden"
            >
              <HiOutlineBars2 className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="noise fixed inset-0 z-[95] flex flex-col bg-obsidian lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="shell flex items-center justify-between py-5">
              <span className="font-display text-xl tracking-[0.14em] text-bone">
                MAISON NOIR
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-bone transition-colors hover:border-gold hover:text-gold"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              variants={stagger(0.06, 0.25)}
              initial="hidden"
              animate="show"
              className="shell flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8"
              aria-label="Mobile"
            >
              {[
                ...NAV_LINKS.flatMap((item) =>
                  item.columns
                    ? [item, ...item.columns.flatMap((c) => c.links)]
                    : [item]
                ),
                { label: 'Reservations', path: '/reservations' },
                { label: 'FAQ', path: '/faq' },
              ].map((link, i) => (
                <motion.div key={`${link.label}-${i}`} variants={fadeUp}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      cx(
                        'block border-b border-hairline/60 py-3.5 font-display text-[1.75rem] transition-colors duration-300 xs:text-[2rem]',
                        isActive ? 'text-gold' : 'text-bone hover:text-gold'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="shell space-y-4 border-t border-hairline py-7"
            >
              <Button to="/reservations" full size="lg">
                Reserve a Table
              </Button>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="block text-center text-xs tracking-[0.2em] text-muted transition-colors hover:text-gold"
              >
                {SITE.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
