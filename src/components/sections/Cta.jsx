import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { HiOutlineArrowLongRight, HiOutlinePhone } from 'react-icons/hi2';
import Button from '@/components/ui/Button';
import { Divider } from '@/components/ui/Misc';
import { SITE } from '@/constants';
import { INSTAGRAM as FEED } from '@/data';
import Image from '@/components/ui/Image';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

const BG =
  'https://images.unsplash.com/photo-1469234496837-d0101f54be3e?auto=format&fit=crop&w=1800&q=70';

/** The closing reservation CTA — parallax photograph, glass panel, two actions. */
export function CtaSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      ref={ref}
      className="noise relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-0 -top-[12%] h-[124%]"
        aria-hidden="true"
      >
        <img
          src={BG}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <span aria-hidden="true" className="absolute inset-0 bg-obsidian/85" />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,10,0.4)_0%,rgba(8,8,10,0.95)_100%)]"
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="shell relative z-10 flex flex-col items-center py-28 text-center lg:py-40"
      >
        <motion.span variants={fadeUp} className="eyebrow">
          Reservations
        </motion.span>

        <motion.h2
          id="cta-title"
          variants={fadeUp}
          className="mt-6 max-w-4xl text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          The table is set.
          <br />
          <span className="text-gilded">The evening is yours.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-lg text-[0.95rem] leading-[1.9] text-muted"
        >
          Tables open on the first of each month. Weekend evenings are typically taken
          within hours — we would book early.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-11 flex flex-col gap-3 xs:flex-row xs:gap-4"
        >
          <Button to="/reservations" size="lg" icon={<HiOutlineArrowLongRight />}>
            Reserve a Table
          </Button>
          <Button
            href={`tel:${SITE.phoneHref}`}
            size="lg"
            variant="glass"
            icon={<HiOutlinePhone className="h-4 w-4" />}
          >
            {SITE.phone}
          </Button>
        </motion.div>

        <Divider className="mt-16 w-full max-w-md" />
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------- Instagram */

export function InstagramFeed() {
  const handle = '@maisonnoir';

  return (
    <section className="section pb-0" aria-labelledby="instagram-title">
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-3 text-center"
        >
          <span className="eyebrow">Instagram</span>
          <h2 id="instagram-title" className="text-3xl sm:text-4xl">
            Follow along at{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gilded underline decoration-gold/30 underline-offset-8 transition-colors hover:decoration-gold"
            >
              {handle}
            </a>
          </h2>
        </motion.div>
      </div>

      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3"
      >
        {FEED.map((src, i) => (
          <motion.li key={src} variants={fadeUp}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group relative block overflow-hidden"
              aria-label={`Open Instagram post ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                ratio="1/1"
                zoom
                sizes="(max-width: 640px) 50vw, 16vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-obsidian/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
