import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineXMark,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlay,
  HiOutlineArrowsPointingOut,
} from 'react-icons/hi2';
import Seo from '@/components/Seo';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from '@/components/ui/Image';
import { CtaSection } from '@/components/sections/Cta';
import { GALLERY, GALLERY_FILTERS } from '@/data';
import { useEscape, useLockScroll } from '@/hooks';
import { cx } from '@/utils';
import { fadeUp, stagger, backdrop, VIEWPORT, EASE } from '@/animations/variants';

const HEADER_IMG =
  'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?auto=format&fit=crop&w=1800&q=70';

const POSTER = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** `span` drives the tile shape — and the lightbox box, so neither ever crops. */
const RATIO = { tall: [3, 4], wide: [3, 2] };
const ratioOf = (span) => RATIO[span] ?? [1, 1];

const VIDEOS = [
  {
    id: 'the-pass',
    title: 'An Evening at the Pass',
    caption: 'Ninety seconds of a Thursday service, filmed from behind the pass.',
    poster: POSTER('1577219491135-ce391730fb2c'),
    alt: 'The brigade working the pass during evening service',
    src: 'https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4',
  },
  {
    id: 'the-room',
    title: 'The Room, Before Six',
    caption: 'The dining room laid, lit, and entirely empty — the last quiet hour.',
    poster: POSTER('1517248135467-4c7edcad34c4'),
    alt: 'The dining room at Maison Noir laid for service before guests arrive',
    src: 'https://videos.pexels.com/video-files/3335000/3335000-uhd_2560_1440_24fps.mp4',
  },
  {
    id: 'the-cellar',
    title: 'Nine Hundred Bins',
    caption: 'Sofia Marchetti walks the cellar beneath Curzon Street.',
    poster: POSTER('1510812431401-41d2bd2722f3'),
    alt: 'Bottles resting in the cellar beneath Curzon Street',
    src: 'https://videos.pexels.com/video-files/2909914/2909914-hd_1920_1080_30fps.mp4',
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  /** null, or { kind: 'image' | 'video', index } */
  const [view, setView] = useState(null);

  const photos = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((item) => item.category === filter)),
    [filter]
  );

  const collection = view?.kind === 'video' ? VIDEOS : photos;
  const active = view ? collection[view.index] : null;

  const close = useCallback(() => setView(null), []);
  const step = useCallback(
    (delta) =>
      setView((current) => {
        if (!current) return current;
        const list = current.kind === 'video' ? VIDEOS : photos;
        const index = (current.index + delta + list.length) % list.length;
        return { ...current, index };
      }),
    [photos]
  );

  useEscape(close, !!view);
  useLockScroll(!!view);

  useEffect(() => {
    if (!view) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, step]);

  /* Changing the filter would leave the lightbox pointing at nothing. */
  const changeFilter = (id) => {
    setView(null);
    setFilter(id);
  };

  return (
    <>
      <Seo
        title="Gallery"
        description="The room, the plate, the kitchen and the cellar — Maison Noir photographed across a single winter season in Mayfair."
        breadcrumbs={[{ name: 'Gallery', path: '/gallery' }]}
      />

      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            The room, the plate,
            <br />
            <span className="text-gilded">the hours between.</span>
          </>
        }
        lede="Photographed across one winter season — service, prep, the cellar at four in the afternoon, and the twenty minutes before the doors open."
        image={HEADER_IMG}
      />

      {/* ---------------------------------------------------------- Masonry */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="shell">
          <SectionTitle
            eyebrow="Photography"
            title={
              <>
                Twelve frames,
                <span className="text-gilded"> one season.</span>
              </>
            }
            className="mb-12"
          />

          {/* Filter chips */}
          <div
            role="tablist"
            aria-label="Filter the gallery by category"
            className="no-scrollbar mb-12 flex gap-2 overflow-x-auto pb-1 sm:justify-center"
          >
            {GALLERY_FILTERS.map((chip) => {
              const on = chip.id === filter;
              return (
                <button
                  key={chip.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => changeFilter(chip.id)}
                  className={cx(
                    'relative shrink-0 rounded-full border px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-500',
                    on
                      ? 'border-gold text-obsidian'
                      : 'border-hairline text-muted hover:border-gold/50 hover:text-gold'
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="gallery-pill"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gold"
                    />
                  )}
                  <span className="relative z-10">{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* CSS-columns masonry — nothing here reflows the neighbours */}
          <motion.div
            layout
            className="gap-4 columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {photos.map((photo, i) => (
                <motion.figure
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="group mb-4 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setView({ kind: 'image', index: i })}
                    aria-label={`Open ${photo.alt} full screen`}
                    className="relative block w-full overflow-hidden rounded-card"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      ratio={ratioOf(photo.span).join('/')}
                      zoom
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <span className="text-left text-xs leading-relaxed text-bone">
                        {photo.alt}
                      </span>
                      <HiOutlineArrowsPointingOut
                        className="h-5 w-5 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Video */}
      <section className="section pt-0" aria-labelledby="video-title">
        <div className="shell">
          <SectionTitle
            eyebrow="In Motion"
            title={
              <>
                Three short films,
                <span className="text-gilded"> no narration.</span>
              </>
            }
            lede="Because a photograph cannot tell you how quiet a kitchen of thirty-one people can be."
            className="mb-16"
          />

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-6 md:grid-cols-3 lg:gap-8"
          >
            {VIDEOS.map((video, i) => (
              <motion.li key={video.id} variants={fadeUp} className="group">
                <button
                  type="button"
                  onClick={() => setView({ kind: 'video', index: i })}
                  aria-label={`Play ${video.title}`}
                  className="block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-card">
                    <Image
                      src={video.poster}
                      alt={video.alt}
                      ratio="16/9"
                      zoom
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-obsidian/45 transition-colors duration-500 group-hover:bg-obsidian/25"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 grid place-items-center"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold text-obsidian shadow-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                        <HiOutlinePlay className="h-6 w-6 translate-x-px" />
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl text-bone transition-colors duration-500 group-hover:text-gold-light">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.85] text-muted">{video.caption}</p>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Lightbox */}
      <AnimatePresence>
        {view && active && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={view.kind === 'video' ? active.title : active.alt}
            className="fixed inset-0 z-[100] flex flex-col bg-obsidian/95 backdrop-blur-md"
          >
            {/* Chrome */}
            <div className="relative z-20 flex items-center justify-between gap-4 p-4 sm:p-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-faint tabular-nums">
                {view.index + 1} / {collection.length}
              </span>

              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-obsidian/70 text-muted transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Stage — clicking the backdrop closes */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 z-0 cursor-default"
            />

            <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-4 sm:px-20 sm:pb-8">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-obsidian/70 text-muted transition-colors duration-500 hover:border-gold hover:text-gold sm:left-6"
              >
                <HiOutlineChevronLeft className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={`${view.kind}-${active.id}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex max-h-full w-full max-w-5xl flex-col items-center gap-5"
                >
                  {view.kind === 'video' ? (
                    <video
                      src={active.src}
                      poster={active.poster}
                      controls
                      autoPlay
                      playsInline
                      preload="none"
                      className="max-h-[72vh] w-full rounded-card bg-obsidian object-contain"
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    /* width is derived from the ratio so the box never exceeds 72vh */
                    <div
                      className="w-full"
                      style={{
                        maxWidth: `calc(72vh * ${ratioOf(active.span)[0]} / ${
                          ratioOf(active.span)[1]
                        })`,
                      }}
                    >
                      <Image
                        src={active.src}
                        alt={active.alt}
                        ratio={ratioOf(active.span).join('/')}
                        priority
                        className="rounded-card"
                        sizes="90vw"
                      />
                    </div>
                  )}

                  <figcaption className="max-w-xl text-center text-sm leading-relaxed text-muted">
                    {view.kind === 'video' ? (
                      <>
                        <span className="block text-base text-bone">{active.title}</span>
                        <span className="mt-1 block">{active.caption}</span>
                      </>
                    ) : (
                      active.alt
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-obsidian/70 text-muted transition-colors duration-500 hover:border-gold hover:text-gold sm:right-6"
              >
                <HiOutlineChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaSection />
    </>
  );
}
