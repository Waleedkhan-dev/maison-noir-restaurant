import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlay, HiOutlineArrowLongRight } from 'react-icons/hi2';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { CHEFS } from '@/data';
import { fadeUp, stagger, VIEWPORT } from '@/animations/variants';

/** Chef feature with an award list and a video introduction. */
export default function ChefSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const chef = CHEFS[0];

  return (
    <section className="section relative bg-charcoal" aria-labelledby="chef-title">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        {/* Portrait + play */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative"
        >
          <Image
            src={chef.image}
            alt={`${chef.name}, Chef Patron of Maison Noir`}
            ratio="4/5"
            zoom
            className="rounded-card"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
          <span className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play the chef's introduction"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="glass-strong relative grid h-20 w-20 place-items-center rounded-full text-gold transition-transform duration-700 group-hover:scale-110 sm:h-24 sm:w-24">
              <HiOutlinePlay className="ml-1 h-7 w-7" />
              <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2.6s]" />
            </span>
          </button>

          {/* Experience plaque */}
          <div className="glass-strong absolute -bottom-6 -right-2 rounded-card px-6 py-5 text-center sm:right-6">
            <span className="block font-display text-4xl text-gilded">
              {chef.experience}
            </span>
            <span className="block text-[9px] uppercase tracking-[0.24em] text-faint">
              Years at the pass
            </span>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            <span className="eyebrow">The Chef</span>
          </motion.div>

          <motion.h2
            id="chef-title"
            variants={fadeUp}
            className="mt-6 text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
          >
            Élodie
            <br />
            <span className="text-gilded">Rousseau.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-[0.95rem] leading-[1.95] text-muted sm:text-base"
          >
            {chef.bio}
          </motion.p>

          <motion.ul variants={stagger(0.07)} className="mt-9 space-y-3.5">
            {chef.awards.map((award) => (
              <motion.li
                key={award}
                variants={fadeUp}
                className="flex items-center gap-4 border-b border-hairline pb-3.5 text-sm text-bone"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {award}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button to="/chef" icon={<HiOutlineArrowLongRight />}>
              Meet the Brigade
            </Button>
            <Button variant="outline" onClick={() => setVideoOpen(true)}>
              Watch the Introduction
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        label="Chef's introduction"
        className="max-w-5xl"
      >
        <video
          controls
          autoPlay
          playsInline
          className="aspect-video w-full rounded-modal bg-obsidian"
          poster={chef.image}
        >
          <source src={chef.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </section>
  );
}
