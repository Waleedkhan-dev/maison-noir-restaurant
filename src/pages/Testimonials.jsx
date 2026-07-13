import { motion } from 'framer-motion';
import { HiOutlineArrowUpRight, HiOutlineStar } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import { Rating } from '@/components/ui/Misc';
import { ReviewCard } from '@/components/cards/Cards';
import { CtaSection } from '@/components/sections/Cta';
import { SITE, AWARDS } from '@/constants';
import { REVIEWS } from '@/data';
import { fadeUp, stagger, scaleIn, VIEWPORT } from '@/animations/variants';

const HEADER_IMAGE =
  'https://images.unsplash.com/photo-1699730148132-1409a3728479?auto=format&fit=crop&w=1800&q=70';

const GOOGLE_REVIEW_URL = 'https://www.google.com/maps';

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials"
        description={`Rated ${SITE.rating.value} from ${SITE.rating.count} guest reviews. What critics, regulars and first-timers say about dinner at Maison Noir.`}
        breadcrumbs={[{ name: 'Testimonials', path: '/testimonials' }]}
      />

      <PageHeader
        eyebrow="Testimonials"
        crumb="Testimonials"
        title="Two thousand evenings, written up."
        lede="Critics, regulars of fifteen years, and people who flew in for one dinner. We have not edited a word of it."
        image={HEADER_IMAGE}
      />

      {/* Rating summary band */}
      <section className="section pb-0" aria-labelledby="rating-summary">
        <div className="shell">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass grid gap-10 rounded-card p-9 sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16"
          >
            <div className="text-center lg:text-left">
              <h2 id="rating-summary" className="sr-only">
                Guest rating
              </h2>

              <div className="flex items-end justify-center gap-2 lg:justify-start">
                <Counter
                  value={SITE.rating.value}
                  decimals={1}
                  className="font-display text-7xl leading-none text-gilded sm:text-8xl"
                />
                <span className="pb-2 font-display text-2xl text-faint">/ 5</span>
              </div>

              <Rating
                value={SITE.rating.value}
                size="lg"
                className="mt-6 justify-center lg:justify-start"
              />

              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-faint">
                <Counter value={SITE.rating.count} /> reviews on Google & Tripadvisor
              </p>
            </div>

            <motion.ul
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid gap-6 border-hairline sm:grid-cols-2 lg:border-l lg:pl-16"
            >
              {AWARDS.map((award) => (
                <motion.li key={award.title} variants={fadeUp}>
                  <p className="font-display text-xl text-bone">{award.title}</p>
                  <p className="mt-1.5 text-xs text-muted">{award.body}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                    {award.year}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* All reviews */}
      <section className="section" aria-label="Guest reviews">
        <div className="shell">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="columns-1 gap-6 md:columns-2 lg:columns-3"
          >
            {REVIEWS.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                className="mb-6 break-inside-avoid"
              />
            ))}
          </motion.div>

          {/* Leave a review */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-16 flex flex-col items-center gap-6 rounded-card border border-hairline bg-charcoal p-10 text-center sm:p-14"
          >
            <HiOutlineStar className="h-8 w-8 text-gold" aria-hidden="true" />

            <h2 className="max-w-xl text-3xl sm:text-4xl">
              Dined with us? <span className="text-gilded">Say so.</span>
            </h2>

            <p className="max-w-md text-[0.95rem] leading-[1.9] text-muted">
              Every review is read by the whole brigade on Tuesday morning — the kind ones
              and, more usefully, the ones that are not.
            </p>

            <Button
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer noopener"
              icon={<HiOutlineArrowUpRight className="h-4 w-4" />}
            >
              Leave a Google Review
            </Button>
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
