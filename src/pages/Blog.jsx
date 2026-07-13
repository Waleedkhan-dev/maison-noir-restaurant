import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowLongDown, HiOutlineEnvelope } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { Divider } from '@/components/ui/Misc';
import { BlogCard } from '@/components/cards/Cards';
import { POSTS } from '@/data';
import { cx } from '@/utils';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&w=1800&q=70';

export default function Blog() {
  const [featured, ...rest] = POSTS;

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(rest.map((p) => p.category)))],
    [rest]
  );

  const [filter, setFilter] = useState('All');

  const shown = useMemo(
    () => (filter === 'All' ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest]
  );

  return (
    <>
      <Seo
        title="The Journal"
        description="Notes from the kitchen, the cellar and the room — Élodie Rousseau, Marcus Oduya and Sofia Marchetti on how Maison Noir actually works."
        breadcrumbs={[{ name: 'Journal', path: '/blog' }]}
      />

      <PageHeader
        eyebrow="Journal"
        crumb="Journal"
        title="Notes from the kitchen, the cellar, the room."
        lede="Not press releases. The people who cook the food and pour the wine, writing about what they were thinking while they did it."
        image={HEADER_IMAGE}
      />

      {/* Featured post */}
      <section className="section pb-0" aria-labelledby="featured-post">
        <div className="shell">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={fadeUp} className="mb-9 flex items-center gap-4">
              <span className="eyebrow">Latest</span>
              <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
            </motion.div>

            <h2 id="featured-post" className="sr-only">
              Featured article
            </h2>

            <BlogCard post={featured} featured />
          </motion.div>
        </div>
      </section>

      {/* Archive */}
      <section className="section" aria-label="All articles">
        <div className="shell">
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mb-14 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter articles by category"
          >
            {categories.map((category) => {
              const active = filter === category;
              return (
                <motion.button
                  key={category}
                  variants={fadeUp}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                  className={cx(
                    'rounded-full border px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-500',
                    active
                      ? 'border-gold bg-gold text-obsidian'
                      : 'border-hairline text-muted hover:border-gold/60 hover:text-bone'
                  )}
                >
                  {category}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            key={filter}
            variants={stagger(0.09)}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Newsletter cross-link — the form itself lives in the footer */}
      <section className="pb-28 lg:pb-40" aria-labelledby="journal-newsletter">
        <div className="shell">
          <Divider className="mb-20" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-6 text-center"
          >
            <HiOutlineEnvelope className="h-8 w-8 text-gold" aria-hidden="true" />

            <h2 id="journal-newsletter" className="max-w-2xl text-3xl sm:text-4xl">
              The Journal, once a month.{' '}
              <span className="text-gilded">Nothing else.</span>
            </h2>

            <p className="max-w-lg text-[0.95rem] leading-[1.9] text-muted">
              New writing, the menu as it changes, and first sight of the one-night dinners
              before they are announced anywhere else. Sign up at the foot of this page — it
              takes an email address and nothing more.
            </p>

            <Button
              href="#newsletter-email"
              variant="outline"
              size="sm"
              icon={<HiOutlineArrowLongDown className="h-4 w-4" />}
            >
              Subscribe Below
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
