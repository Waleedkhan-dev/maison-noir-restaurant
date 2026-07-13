import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import { STATS } from '@/data';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const IMG = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Story + image collage + animated counters. */
export default function Story() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yA = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const yB = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);

  return (
    <section ref={ref} className="section relative overflow-hidden" aria-labelledby="story-title">
      <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Collage */}
        <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            style={reduced ? undefined : { y: yA }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="group space-y-4 sm:space-y-6"
          >
            <Image
              src={IMG('1726835498689-b4f6dbcdbdfb')}
              alt="The dining room at Maison Noir, lit by candlelight"
              ratio="3/4"
              zoom
              className="rounded-card"
              sizes="(max-width: 1024px) 45vw, 22vw"
            />
            <Image
              src={IMG('1587372767238-84dca9e88123')}
              alt="Herbs from the kitchen garden in Kent"
              ratio="1/1"
              zoom
              className="rounded-card"
              sizes="(max-width: 1024px) 45vw, 22vw"
            />
          </motion.div>

          <motion.div
            style={reduced ? undefined : { y: yB }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group mt-10 space-y-4 sm:space-y-6"
          >
            <Image
              src={IMG('1629407119384-d42320c3e576')}
              alt="Chefs working the pass during evening service"
              ratio="1/1"
              zoom
              className="rounded-card"
              sizes="(max-width: 1024px) 45vw, 22vw"
            />
            <Image
              src={IMG('1562601579-599dec564e06')}
              alt="Bottles resting in the cellar beneath the restaurant"
              ratio="3/4"
              zoom
              className="rounded-card"
              sizes="(max-width: 1024px) 45vw, 22vw"
            />
          </motion.div>

          {/* Est. plaque */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center sm:h-32 sm:w-32"
          >
            <div>
              <span className="block font-display text-2xl text-gold sm:text-3xl">2005</span>
              <span className="block text-[8px] uppercase tracking-[0.28em] text-faint">
                Established
              </span>
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            <span className="eyebrow">Our Story</span>
          </motion.div>

          <motion.h2
            id="story-title"
            variants={fadeUp}
            className="mt-6 text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
          >
            A townhouse, a kitchen,
            <br />
            <span className="text-gilded">and no shortcuts.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
          >
            In 2005, Élodie Rousseau took a derelict townhouse on Curzon Street and served
            thirty-two covers on the first night. Twenty-nine of them were friends. The
            menu was written that morning, in pencil, from whatever had arrived at the door.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
          >
            Twenty-one years and two Michelin stars later, that has not changed. The pencil
            is still there. If the turbot is not right today, you are not eating the turbot
            today — and no star has ever been worth trading that for.
          </motion.p>

          <motion.figure variants={fadeUp} className="mt-9 border-l-2 border-gold/60 pl-6">
            <blockquote className="font-sans text-xl italic leading-relaxed text-bone sm:text-[1.75rem]">
              “A dish is finished when there is nothing left to remove.”
            </blockquote>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.24em] text-faint">
              Élodie Rousseau — Chef Patron
            </figcaption>
          </motion.figure>

          <motion.div variants={fadeUp} className="mt-10">
            <Button to="/about" variant="outline" icon={<HiOutlineArrowLongRight />}>
              The Full Story
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Counters */}
      <motion.dl
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="shell mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-hairline pt-16 lg:mt-28 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <dd className="font-display text-5xl text-gilded sm:text-6xl lg:text-7xl">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            </dd>
            <dt className="mt-3 text-[10px] uppercase tracking-[0.24em] text-faint sm:text-[11px]">
              {stat.label}
            </dt>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
