import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import DishCard from '@/components/cards/DishCard';
import DishModal from '@/components/DishModal';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { CtaSection } from '@/components/sections/Cta';
import { DISHES, CATEGORIES, TAGS } from '@/data';
import { useDebounced } from '@/hooks';
import { cx } from '@/utils';
import { stagger, fadeUp, EASE } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1765021097487-6da56c1ce412?auto=format&fit=crop&w=1800&q=70';

/** Wraps each card so AnimatePresence has something to exit; the label still
 *  propagates down to DishCard's own fadeUp. */
const cardShell = {
  hidden: {},
  show: {},
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25, ease: EASE } },
};

const matches = (dish, term) =>
  [dish.name, dish.short, ...dish.ingredients].some((field) =>
    field.toLowerCase().includes(term)
  );

export default function Menu() {
  /* The URL is the source of truth for category + tags, so the nav mega-menu
     can deep-link into an already-mounted page. */
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const term = useDebounced(query).trim().toLowerCase();

  const requested = params.get('category');
  const category = CATEGORIES.some((c) => c.id === requested) ? requested : 'all';
  const tags = params.getAll('tag').filter((t) => TAGS.some((x) => x.id === t));

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(id);
  }, []);

  const write = (next) => setParams(next, { replace: true });

  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    write(next);
  };

  /* Arrow keys move between tabs — required once the tabs use a roving tabindex. */
  const onTabKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity }[e.key];
    if (step === undefined) return;
    e.preventDefault();

    const i = CATEGORIES.findIndex((c) => c.id === category);
    const next =
      step === -Infinity
        ? 0
        : step === Infinity
          ? CATEGORIES.length - 1
          : (i + step + CATEGORIES.length) % CATEGORIES.length;

    setCategory(CATEGORIES[next].id);
    document.getElementById(`tab-${CATEGORIES[next].id}`)?.focus();
  };

  const toggleTag = (id) => {
    const next = new URLSearchParams(params);
    const kept = tags.includes(id) ? tags.filter((t) => t !== id) : [...tags, id];
    next.delete('tag');
    kept.forEach((t) => next.append('tag', t));
    write(next);
  };

  const reset = () => {
    setQuery('');
    write(new URLSearchParams());
  };

  const filtered = useMemo(
    () =>
      DISHES.filter((dish) => {
        if (category !== 'all' && dish.category !== category) return false;
        if (tags.length && !tags.every((t) => dish.tags.includes(t))) return false;
        if (term && !matches(dish, term)) return false;
        return true;
      }),
    [category, tags.join(','), term] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const active = category !== 'all' || tags.length > 0 || query !== '';
  const meta = CATEGORIES.find((c) => c.id === category);

  return (
    <>
      <Seo
        title="Menu"
        description="Starters, mains, the nine-course tasting, pastry and the cellar — the complete Maison Noir collection, written each morning in Mayfair."
        breadcrumbs={[{ name: 'Menu', path: '/menu' }]}
      />

      <PageHeader
        eyebrow="The Menu"
        title={
          <>
            Written each morning.
            <br />
            <span className="text-gilded">Never printed twice.</span>
          </>
        }
        lede="The larder decides. What follows is today's collection — from the raw bar through to the cheese trolley, and nine hundred bins beneath it all."
        image={HEADER_IMAGE}
      />

      <section className="section" aria-labelledby="menu-title">
        <div className="shell">
          <h2 id="menu-title" className="sr-only">
            The collection
          </h2>

          {/* Category tabs */}
          <div className="-mx-5 overflow-x-auto px-5 no-scrollbar sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
            <div
              role="tablist"
              aria-label="Menu categories"
              onKeyDown={onTabKeyDown}
              className="flex w-max gap-1.5 rounded-full border border-hairline bg-charcoal p-1.5 lg:w-auto"
            >
              {CATEGORIES.map((c) => {
                const on = c.id === category;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={on}
                    aria-controls="menu-results"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setCategory(c.id)}
                    className={cx(
                      'relative shrink-0 rounded-full px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em]',
                      'transition-colors duration-400',
                      on ? 'text-obsidian' : 'text-muted hover:text-bone'
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="menu-tab"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gold"
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search + tags */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start lg:gap-10">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, ingredients…"
              aria-label="Search the menu"
              icon={<HiOutlineMagnifyingGlass className="h-4 w-4" />}
            />

            <div className="flex flex-wrap items-center gap-2">
              {TAGS.map((tag) => {
                const on = tags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTag(tag.id)}
                    className={cx(
                      'rounded-full border px-4 py-2 font-sans text-[11px] tracking-wide transition-all duration-400',
                      on
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-hairline text-muted hover:border-gold/60 hover:text-bone'
                    )}
                  >
                    {tag.label}
                  </button>
                );
              })}

              <AnimatePresence>
                {active && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={reset}
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 font-sans text-[11px] tracking-wide text-faint transition-colors hover:text-danger"
                  >
                    <HiOutlineXMark className="h-3.5 w-3.5" />
                    Clear all
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results */}
          <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-hairline pb-5">
            <p aria-live="polite" className="text-sm text-muted tabular-nums">
              {loading ? 'Plating…' : `${filtered.length} ${filtered.length === 1 ? 'dish' : 'dishes'}`}
            </p>
            <p className="hidden text-[11px] uppercase tracking-[0.2em] text-faint sm:block">
              {meta?.desc}
            </p>
          </div>

          <div
            className="mt-10"
            id="menu-results"
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
          >
            {loading ? (
              <SkeletonGrid count={6} />
            ) : filtered.length === 0 ? (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center gap-5 py-20 text-center"
              >
                <span className="rule-gold h-px w-24" aria-hidden="true" />
                <h3 className="text-3xl text-bone sm:text-4xl">Nothing on that plate.</h3>
                <p className="max-w-sm text-sm leading-[1.85] text-muted">
                  The kitchen has nothing matching those filters tonight. Loosen them and
                  we will find you something.
                </p>
                <Button variant="outline" onClick={reset} className="mt-2">
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={stagger(0.07)}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((dish, i) => (
                    <motion.div key={dish.id} layout variants={cardShell} exit="exit">
                      <DishCard dish={dish} index={i} onOpen={setSelected} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <DishModal dish={selected} open={!!selected} onClose={() => setSelected(null)} />

      <CtaSection />
    </>
  );
}
