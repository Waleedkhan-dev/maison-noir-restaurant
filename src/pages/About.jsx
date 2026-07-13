import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineArrowLongRight,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import { Timeline, Divider } from '@/components/ui/Misc';
import { CtaSection } from '@/components/sections/Cta';
import { AWARDS } from '@/constants';
import { TIMELINE, STATS } from '@/data';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMG =
  'https://images.unsplash.com/photo-1703565426315-4209c2e88eea?auto=format&fit=crop&w=1800&q=70';

const IMG = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const PHILOSOPHY = [
  {
    icon: HiOutlineMapPin,
    title: 'Provenance',
    body: 'Ninety-one percent of what we cook travels less than two hundred miles to reach us. The turbot is day-boat, the lamb is Herdwick, the herbs are cut in Kent that morning. We know the name of the person who grew every vegetable on the plate, and if we do not, it does not go on the plate.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Restraint',
    body: 'The temptation in a kitchen this size is to add — another garnish, another foam, another flourish that proves how hard we worked. We resist it. A course leaves the pass with three or four things on it, and each of them is there because the dish collapses without it.',
  },
  {
    icon: HiOutlineClock,
    title: 'Patience',
    body: 'Black garlic takes five years in a sealed jar beneath Curzon Street. A jus is reduced across three days. A sommelier is trained for two. Nothing here is quick, and that is not an inefficiency we intend to solve — it is the entire proposition.',
  },
];

export default function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <>
      <Seo
        title="Our Story"
        description="Twenty-one years on Curzon Street. How a derelict Mayfair townhouse became a two-Michelin-star kitchen — and the three things we have never been willing to change."
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />

      <PageHeader
        eyebrow="Our Story"
        title={
          <>
            Twenty-one years,
            <br />
            <span className="text-gilded">one pencil.</span>
          </>
        }
        lede="A derelict townhouse, thirty-two covers, and a menu written each morning from whatever arrived at the door. Very little about that has changed."
        image={HEADER_IMG}
      />

      {/* ------------------------------------------------------ Long-form story */}
      <section ref={ref} className="section relative overflow-hidden" aria-labelledby="house-title">
        <div className="shell grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <motion.div
            style={reduced ? undefined : { y }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group lg:sticky lg:top-32 lg:self-start"
          >
            <Image
              src={IMG('1552566626-52f8b828add9', 1100)}
              alt="The panelled dining room at Maison Noir, laid for evening service"
              ratio="4/5"
              zoom
              className="rounded-card"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <p className="mt-5 text-xs leading-relaxed text-faint">
              14 Curzon Street, Mayfair — the room as it stands today, four renovations
              and twenty-one winters on from the first night.
            </p>
          </motion.div>

          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <span className="eyebrow">The House</span>
            </motion.div>

            <motion.h2
              id="house-title"
              variants={fadeUp}
              className="mt-6 text-[2.25rem] leading-[1.06] sm:text-5xl"
            >
              We opened with thirty-two covers.
              <br />
              <span className="text-gilded">Twenty-nine were friends.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              In the spring of 2005, Élodie Rousseau signed a lease on a townhouse that
              had been empty for six years. The kitchen was a corridor. The dining room
              had a hole in the ceiling that let in the rain, and for the first two
              services a bucket sat in the corner of it. She had spent a decade between
              Lyon and Copenhagen and she had, by her own account, no plan beyond cooking
              what she could find that morning.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              That is still how the menu is written. At half past six each morning the
              deliveries arrive at the door on Curzon Street, and what is in the crates
              decides what is served that night. Not the other way around. It is an
              inconvenient way to run a restaurant with a four-month waiting list, and we
              have been asked more than once to standardise it — to lock the menu so that
              a guest flying in from Singapore is guaranteed the dish they read about.
            </motion.p>

            <motion.figure
              variants={fadeUp}
              className="my-10 border-l-2 border-gold/60 py-1 pl-6 sm:pl-8"
            >
              <blockquote className="font-sans text-xl italic leading-relaxed text-bone sm:text-[1.8rem]">
                “If the turbot is not right today, you are not eating the turbot today.
                That is the whole restaurant, and no star is worth trading it.”
              </blockquote>
              <figcaption className="mt-4 text-[11px] uppercase tracking-[0.24em] text-faint">
                Élodie Rousseau — Chef Patron
              </figcaption>
            </motion.figure>

            <motion.p
              variants={fadeUp}
              className="text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              We said no, and we keep saying it. The first star came in 2011 and the
              second in 2019; a Green Star followed in 2023, for the two-hundred-mile
              radius and the fermentation cellar that eats almost all of our waste. Each
              of them changed the bookings and none of them changed the pencil.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              What we are, twenty-one years on, is a room of fifty-eight seats, nine
              hundred bins in the basement, a brigade of thirty-one, and a single
              stubborn insistence: that the plate arrives with nothing on it that does
              not need to be there.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Button to="/chef" variant="outline" icon={<HiOutlineArrowLongRight />}>
                Meet the Kitchen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Timeline */}
      <section className="section pt-0" aria-labelledby="timeline-title">
        <div className="shell">
          <SectionTitle
            eyebrow="Milestones"
            title={
              <>
                Twenty-one years,
                <span className="text-gilded"> in six moments.</span>
              </>
            }
            lede="The nights that changed the building — and the ones we spent pretending nothing had."
            className="mb-20"
          />

          <Timeline items={TIMELINE} />
        </div>
      </section>

      {/* -------------------------------------------------------- Stats band */}
      <section className="relative pb-24 lg:pb-32" aria-label="Maison Noir in numbers">
        <div className="shell">
          <motion.dl
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass grid grid-cols-2 divide-hairline rounded-card lg:grid-cols-4 lg:divide-x"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-3 px-6 py-12 text-center lg:py-16"
              >
                <dd className="font-display text-5xl text-gilded sm:text-6xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </dd>
                <dt className="text-[10px] uppercase tracking-[0.24em] text-faint sm:text-[11px]">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ------------------------------------------------------- Philosophy */}
      <section className="section pt-0" aria-labelledby="philosophy-title">
        <div className="shell">
          <SectionTitle
            eyebrow="Philosophy"
            title={
              <>
                Provenance, restraint,
                <span className="text-gilded"> patience.</span>
              </>
            }
            lede="Three words that decide every argument in this kitchen, in that order."
            className="mb-16"
          />

          <motion.ul
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-6 md:grid-cols-3 lg:gap-8"
          >
            {PHILOSOPHY.map(({ icon: Icon, title, body }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="glass flex flex-col rounded-card p-8 transition-colors duration-500 hover:border-gold/35 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-gold/10"
                >
                  <Icon className="h-6 w-6 text-gold" />
                </span>

                <span className="mt-8 font-sans text-[10px] tracking-[0.3em] text-faint">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-3xl text-bone">{title}</h3>
                <p className="mt-4 text-sm leading-[1.9] text-muted">{body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- Awards */}
      <section className="section pt-0" aria-labelledby="awards-title">
        <div className="shell">
          <Divider className="mb-20" />

          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
            <SectionTitle
              eyebrow="Recognition"
              title={
                <>
                  Kind words,
                  <span className="text-gilded"> in print.</span>
                </>
              }
              lede="We do not cook for the guides. We are, however, glad they came."
              align="left"
              as="h2"
            />

            <motion.ul
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="border-t border-hairline"
            >
              {AWARDS.map((award) => (
                <motion.li
                  key={award.title}
                  variants={fadeUp}
                  className="group relative flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-hairline py-7 sm:py-8"
                >
                  {/* gold rule that draws in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />

                  <div className="min-w-0">
                    <h3 className="text-2xl text-bone transition-colors duration-500 group-hover:text-gold-light sm:text-3xl">
                      {award.title}
                    </h3>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-faint">
                      {award.body}
                    </p>
                  </div>

                  <span className="shrink-0 font-display text-xl text-gold sm:text-2xl">
                    {award.year}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
