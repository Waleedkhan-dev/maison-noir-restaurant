import { motion } from 'framer-motion';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import Seo from '@/components/Seo';
import Button from '@/components/ui/Button';
import { Divider } from '@/components/ui/Misc';
import { fadeUp, stagger } from '@/animations/variants';

/* A few motes of gold drifting behind the numerals. Deliberately restrained. */
const PARTICLES = [
  { left: '12%', top: '26%', size: 4, delay: 0, drift: -18 },
  { left: '78%', top: '18%', size: 3, delay: 0.8, drift: 14 },
  { left: '30%', top: '72%', size: 5, delay: 1.6, drift: -12 },
  { left: '66%', top: '68%', size: 3, delay: 2.4, drift: 16 },
  { left: '88%', top: '48%', size: 4, delay: 3.2, drift: -10 },
  { left: '8%', top: '54%', size: 3, delay: 4, drift: 12 },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="This table does not exist."
        noindex
      />

      <main className="noise relative grid min-h-dvh place-items-center overflow-hidden px-6 py-32">
        {/* Radial gold glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.13)_0%,transparent_68%)]"
        />

        {PARTICLES.map((p) => (
          <motion.span
            key={p.left + p.top}
            aria-hidden="true"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: [0, p.drift, 0] }}
            transition={{
              duration: 7,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute rounded-full bg-gold blur-[1px]"
          />
        ))}

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Error 404
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-display text-[7rem] leading-none text-gilded sm:text-[11rem] lg:text-[14rem]"
          >
            404
          </motion.p>

          <motion.div variants={fadeUp} className="w-full max-w-sm">
            <Divider className="my-8" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="max-w-2xl text-3xl sm:text-5xl">
            This table does not exist.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-[0.95rem] leading-[1.9] text-muted"
          >
            The page you asked for is not on tonight&rsquo;s menu. It may have been taken
            off, or you may have followed a link that has since been cleared away.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-11 flex flex-col gap-3 xs:flex-row xs:gap-4"
          >
            <Button to="/" icon={<HiOutlineArrowLongRight />}>
              Back to the Front Door
            </Button>
            <Button to="/menu" variant="outline">
              See the Menu
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
