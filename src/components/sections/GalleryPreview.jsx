import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLongRight, HiOutlinePlus } from 'react-icons/hi2';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import { GALLERY } from '@/data';
import { stagger, fadeUp, VIEWPORT } from '@/animations/variants';
import { cx } from '@/utils';

/* A deliberate, asymmetric bento — not a grid of equal squares. */
const LAYOUT = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
];

export default function GalleryPreview() {
  const shots = GALLERY.slice(0, 6);

  return (
    <section className="section" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            align="left"
            eyebrow="Gallery"
            title={
              <>
                The room, the plate,
                <br />
                <span className="text-gilded">the cellar.</span>
              </>
            }
            className="lg:max-w-xl"
          />
          <Button to="/gallery" variant="outline" icon={<HiOutlineArrowLongRight />}>
            View All
          </Button>
        </div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[200px] lg:auto-rows-[230px]"
        >
          {shots.map((shot, i) => (
            <motion.div key={shot.id} variants={fadeUp} className={cx('group relative', LAYOUT[i])}>
              <Link
                to="/gallery"
                className="block h-full overflow-hidden rounded-card"
                aria-label={`Gallery — ${shot.alt}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  ratio="auto"
                  zoom
                  className="h-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
                <span className="pointer-events-none absolute inset-0 bg-obsidian/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-all duration-700 group-hover:opacity-100">
                  <span className="glass grid h-12 w-12 place-items-center rounded-full text-gold">
                    <HiOutlinePlus className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
