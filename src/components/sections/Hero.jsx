import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineArrowLeft } from 'react-icons/hi2';
import { LuUtensilsCrossed } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import { useMousePosition } from '@/hooks';
import { EASE } from '@/animations/variants';
import { INGREDIENTS, HERO_SLIDES } from '@/constants';
import { formatPrice, cx } from '@/utils';

const HEADLINE = ['Fine dining', 'in the heart', 'of Mayfair'];
const AUTOPLAY_MS = 5000;

/* Ingredients drifting through the frame, feathered so they read as depth. */
const FLOATERS = [
  { src: INGREDIENTS.tomato, top: '13%', left: '38%', size: 90, blur: 3, dur: 9, rot: 12 },
  { src: INGREDIENTS.chilli, top: '12%', left: '92%', size: 82, blur: 1, dur: 7, rot: -18 },
  { src: INGREDIENTS.garlic, top: '38%', left: '3%', size: 74, blur: 4, dur: 8, rot: 10 },
  { src: INGREDIENTS.tomato, top: '58%', left: '95%', size: 104, blur: 5, dur: 10, rot: -10 },
  { src: INGREDIENTS.herb, top: '84%', left: '38%', size: 88, blur: 2, dur: 8.5, rot: 16 },
  { src: INGREDIENTS.chilli, top: '90%', left: '86%', size: 70, blur: 3, dur: 6.5, rot: 24 },
];

const FEATHER = {
  WebkitMaskImage: 'radial-gradient(circle, black 52%, transparent 74%)',
  maskImage: 'radial-gradient(circle, black 52%, transparent 74%)',
};

function Floaters() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {FLOATERS.map((f, i) => (
        <motion.img
          key={i}
          src={f.src}
          alt=""
          loading="lazy"
          className="absolute rounded-full object-cover"
          style={{
            ...FEATHER,
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            filter: `blur(${f.blur}px) saturate(1.15)`,
            opacity: 0.85 - f.blur * 0.06,
          }}
          animate={{ y: [0, -22, 0], rotate: [0, f.rot, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

/* The plate swings in from the side it was sent, so direction reads naturally. */
const plateVariants = {
  enter: (dir) => ({ opacity: 0, scale: 0.8, rotate: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, scale: 1, rotate: 0 },
  exit: (dir) => ({ opacity: 0, scale: 0.8, rotate: dir > 0 ? -40 : 40 }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();

  const [[index, direction], setSlide] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];

  const go = useCallback((next, dir) => {
    const total = HERO_SLIDES.length;
    setSlide([(next + total) % total, dir]);
  }, []);

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  /* Autoplay — stops while hovered, focused, or if the tab is hidden. */
  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [paused, next, index]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const px = useSpring(
    useTransform(x, [0, typeof window === 'undefined' ? 1440 : window.innerWidth], [16, -16]),
    { stiffness: 55, damping: 20 }
  );
  const py = useSpring(
    useTransform(y, [0, typeof window === 'undefined' ? 900 : window.innerHeight], [12, -12]),
    { stiffness: 55, damping: 20 }
  );

  return (
    <section
      ref={ref}
      className="noise relative flex min-h-[92vh] items-center overflow-hidden bg-obsidian pb-16 pt-32 lg:min-h-dvh lg:pt-24"
      aria-label="Introduction"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[38rem] w-[38rem] translate-x-1/4 rounded-full bg-gold/12 blur-[130px]"
      />

      <Floaters />

      <div className="shell relative z-30 grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        {/* Copy */}
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }}>
          {/* The kicker changes with the slide; the headline never does. */}
          <div className="flex min-h-[2rem] items-center gap-2.5">
            <LuUtensilsCrossed className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="eyebrow text-lg normal-case tracking-normal"
              >
                {slide.kicker}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="mt-6 text-[3rem] leading-[0.95] xs:text-[3.6rem] sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.45 + i * 0.11, duration: 1, ease: EASE }}
                  className={i === 1 ? 'block text-gilded' : 'block text-bone'}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Live region so the dish name is announced as the slider advances */}
          <div aria-live="polite" aria-atomic="true" className="mt-6 min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-display text-2xl font-semibold uppercase text-bone sm:text-3xl"
              >
                {slide.name}
                <span className="ml-3 text-gold">{formatPrice(slide.price)}</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
            className="mt-3 max-w-lg text-[0.95rem] leading-[1.9] text-muted sm:text-base"
          >
            Two Michelin stars, twenty-one years on Curzon Street. From the wood oven to
            the nine-course tasting — every plate written the morning it is served.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
            className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-4"
          >
            <Button to="/menu" size="lg" icon={<HiOutlineArrowRight className="h-4 w-4" />}>
              View All Menu
            </Button>
            <Button to="/reservations" size="lg" variant="outline">
              Book a Table
            </Button>
          </motion.div>
        </motion.div>

        {/* Plate slider */}
        <motion.div
          style={reduced ? undefined : { y: plateY, opacity: fade }}
          className="relative mx-auto w-full max-w-[24rem] sm:max-w-[30rem] lg:max-w-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured dishes"
        >
          <motion.div
            style={reduced ? undefined : { x: px, y: py }}
            className="relative aspect-square"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                custom={direction}
                variants={plateVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: EASE }}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="absolute inset-0 h-full w-full rounded-full object-cover shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
              />
            </AnimatePresence>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-bone/10"
            />

            {/* Starburst price — re-pops on every slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: -8 }}
                exit={{ scale: 0, rotate: 20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 13 }}
                className="starburst absolute -right-1 bottom-4 z-10 grid h-24 w-24 place-items-center text-center sm:h-28 sm:w-28 lg:-right-3"
              >
                <span>
                  <span className="block font-display text-[9px] font-medium uppercase tracking-widest">
                    Only now
                  </span>
                  <span className="block font-display text-2xl font-bold leading-none">
                    {formatPrice(slide.price)}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous dish"
              className="grid h-10 w-10 place-items-center border border-hairline text-bone transition-colors duration-300 hover:border-gold hover:bg-gold"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Show ${s.name}`}
                  aria-current={i === index}
                  className={cx(
                    'h-2 transition-all duration-500',
                    i === index ? 'w-8 bg-gold' : 'w-2 bg-graphite hover:bg-faint'
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next dish"
              className="grid h-10 w-10 place-items-center border border-hairline text-bone transition-colors duration-300 hover:border-gold hover:bg-gold"
            >
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
