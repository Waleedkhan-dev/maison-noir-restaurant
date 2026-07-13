import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlinePlay,
  HiOutlineArrowUpRight,
  HiOutlineArrowLongRight,
} from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa6';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import Modal from '@/components/ui/Modal';
import { Divider } from '@/components/ui/Misc';
import { ChefCard } from '@/components/cards/Cards';
import { CtaSection } from '@/components/sections/Cta';
import { CHEFS, DISHES } from '@/data';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const HEADER_IMG =
  'https://images.unsplash.com/photo-1768162125977-9944219971c5?auto=format&fit=crop&w=1800&q=70';

const VIDEO_POSTER =
  'https://images.unsplash.com/photo-1496811425508-6d7ebb7ff32c?auto=format&fit=crop&w=1200&q=70';

/** The shape of a service, hour by hour. */
const DAY = [
  {
    time: '06:00',
    title: 'The Market',
    body: 'Élodie is at New Covent Garden before the lights come on. What she finds decides the menu; what she does not find decides it just as much.',
  },
  {
    time: '09:00',
    title: 'Prep',
    body: 'Thirty-one people, four hours, no music. Stocks on, fish broken down, the day’s menu written in pencil and pinned to the pass.',
  },
  {
    time: '12:00',
    title: 'Service',
    body: 'The room fills. Marcus calls the tickets, the brigade answers as one, and for four hours nobody in the kitchen says anything that is not a dish.',
  },
  {
    time: '17:00',
    title: 'The Pass',
    body: 'Every plate crosses Élodie before it crosses the threshold. Roughly one in twenty goes back. Nobody argues; they simply cook it again.',
  },
  {
    time: '23:30',
    title: 'The Pencil',
    body: 'The last table leaves, the floor is scrubbed, and tomorrow’s sheet goes up blank. It is filled in at six the next morning, and not a minute before.',
  },
];

export default function Chef() {
  const [videoOpen, setVideoOpen] = useState(false);

  const chef = CHEFS[0];
  const brigade = CHEFS.slice(1);
  const signatures = chef.signature
    .map((name) => DISHES.find((dish) => dish.name === name))
    .filter(Boolean);

  return (
    <>
      <Seo
        title="The Chef"
        description="Élodie Rousseau — Chef Patron of Maison Noir. Twenty-four years between Lyon, Copenhagen and Mayfair, and a kitchen built on the belief that a dish is finished when there is nothing left to remove."
        breadcrumbs={[{ name: 'Chef', path: '/chef' }]}
      />

      <PageHeader
        eyebrow="The Kitchen"
        title={
          <>
            Thirty-one people,
            <br />
            <span className="text-gilded">one pass.</span>
          </>
        }
        lede="Élodie Rousseau has cooked at Maison Noir every service since 2005. This is her brigade, her day, and the three plates she would be remembered for."
        image={HEADER_IMG}
      />

      {/* --------------------------------------------------------- Chef hero */}
      <section className="section" aria-labelledby="chef-title">
        <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Portrait + video trigger */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <Image
              src={chef.image}
              alt={`${chef.name}, ${chef.role} of Maison Noir, at the pass`}
              ratio="4/5"
              zoom
              priority
              className="rounded-card"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-obsidian/70 via-transparent to-transparent"
            />

            {/* Experience plaque */}
            <div className="glass-strong absolute -right-3 top-8 rounded-card px-6 py-5 text-center sm:right-6">
              <span className="block font-display text-4xl text-gilded sm:text-5xl">
                <Counter value={chef.experience} />
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.26em] text-faint">
                Years at the stove
              </span>
            </div>

            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="glass-strong absolute bottom-6 left-6 flex items-center gap-4 rounded-full py-2.5 pl-2.5 pr-6 text-left transition-colors duration-500 hover:border-gold/60"
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-obsidian transition-transform duration-500 group-hover:scale-105"
              >
                <HiOutlinePlay className="h-5 w-5 translate-x-px" />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-bone">
                  Watch the introduction
                </span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-faint">
                  Two minutes, one kitchen
                </span>
              </span>
            </button>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <span className="eyebrow">{chef.role}</span>
            </motion.div>

            <motion.h2
              id="chef-title"
              variants={fadeUp}
              className="mt-6 text-[2.5rem] leading-[1.04] sm:text-6xl"
            >
              {chef.name}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              {chef.bio}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
            >
              She writes the menu each morning in pencil, tastes every sauce before
              service, and sends back roughly one plate in twenty at the pass. Ask anyone
              in the brigade what she is like to work for and they will tell you the same
              thing: exacting, and never once unfair.
            </motion.p>

            <motion.figure
              variants={fadeUp}
              className="mt-9 border-l-2 border-gold/60 py-1 pl-6"
            >
              <FaQuoteLeft className="h-5 w-5 text-gold/50" aria-hidden="true" />
              <blockquote className="mt-4 font-sans text-xl italic leading-relaxed text-bone sm:text-[1.75rem]">
                “{chef.quote}”
              </blockquote>
            </motion.figure>

            {/* Awards */}
            <motion.ul variants={fadeUp} className="mt-10 border-t border-hairline">
              {chef.awards.map((award) => (
                <li
                  key={award}
                  className="flex items-center gap-4 border-b border-hairline py-4"
                >
                  <span className="h-px w-6 shrink-0 bg-gold/60" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-muted">{award}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10">
              <Button to="/menu" variant="outline" icon={<HiOutlineArrowLongRight />}>
                Read the Menu
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- Signature dishes */}
      <section className="section pt-0" aria-labelledby="signature-title">
        <div className="shell">
          <SectionTitle
            eyebrow="Signature Dishes"
            title={
              <>
                Three plates she would be
                <span className="text-gilded"> remembered for.</span>
              </>
            }
            lede="If you are here once and only once, these are the courses she would put in front of you."
            className="mb-16"
          />

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-6 md:grid-cols-3 lg:gap-8"
          >
            {signatures.map((dish) => (
              <motion.li key={dish.id} variants={fadeUp} className="group h-full">
                <Link
                  to="/menu"
                  className="flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-charcoal transition-colors duration-500 hover:border-gold/40"
                >
                  <Image
                    src={dish.image}
                    alt={`${dish.name} — ${dish.short}`}
                    ratio="4/3"
                    zoom
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl leading-snug text-bone transition-colors duration-500 group-hover:text-gold-light">
                      {dish.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-[1.85] text-muted">
                      {dish.short}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                      On the menu
                      <HiOutlineArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ------------------------------------------------------- The brigade */}
      <section className="section pt-0" aria-labelledby="brigade-title">
        <div className="shell">
          <SectionTitle
            eyebrow="The Brigade"
            title={
              <>
                She does not cook
                <span className="text-gilded"> alone.</span>
              </>
            }
            lede="The three people who make the room work — and who would tell you, unprompted, that they run it."
            className="mb-16"
          />

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {brigade.map((member, i) => (
              <ChefCard key={member.id} chef={member} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------- A day at the pass */}
      <section className="section pt-0" aria-labelledby="day-title">
        <div className="shell">
          <Divider className="mb-20" />

          <SectionTitle
            eyebrow="A Day at the Pass"
            title={
              <>
                Six in the morning
                <span className="text-gilded"> to half eleven at night.</span>
              </>
            }
            lede="Seventeen and a half hours, six days a week, and the sheet goes up blank again at dawn."
            className="mb-16"
          />
        </div>

        {/* Scrolls horizontally on mobile, five columns from lg */}
        <motion.ol
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-14 2xl:px-20"
        >
          {DAY.map((step, i) => (
            <motion.li
              key={step.time}
              variants={fadeUp}
              className="glass flex w-[76vw] shrink-0 snap-start flex-col rounded-card p-7 transition-colors duration-500 hover:border-gold/35 xs:w-[68vw] sm:w-[42vw] lg:w-auto"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-3xl text-gilded">{step.time}</span>
                <span className="font-sans text-[10px] tracking-[0.3em] text-faint">
                  0{i + 1}
                </span>
              </div>

              <span className="rule-gold mt-5 h-px w-full" aria-hidden="true" />

              <h3 className="mt-6 text-xl text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-[1.85] text-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <CtaSection />

      {/* --------------------------------------------------------- Video modal */}
      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        label={`${chef.name} — video introduction`}
        className="max-w-4xl overflow-hidden p-0"
      >
        <video
          src={chef.video}
          poster={VIDEO_POSTER}
          controls
          autoPlay
          playsInline
          preload="none"
          className="aspect-video w-full bg-obsidian object-cover"
        >
          <track kind="captions" />
        </video>

        <div className="p-7 sm:p-8">
          <span className="eyebrow">Introduction</span>
          <h2 className="mt-3 text-3xl text-bone">Inside the kitchen with {chef.name}</h2>
          <p className="mt-3 max-w-xl text-sm leading-[1.85] text-muted">
            Two minutes at the pass on an ordinary Thursday — the market run, the pencil,
            and the one in twenty plates that goes back.
          </p>
        </div>
      </Modal>
    </>
  );
}
