import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { DISHES, CATEGORIES } from '@/data';
import { cx } from '@/utils';
import { VIEWPORT, EASE } from '@/animations/variants';

/* Alternating flame / amber panels, as in the reference. */
const PANELS = [
  { id: 'starter', tone: 'flame', flag: 'Hot' },
  { id: 'main', tone: 'amber', flag: 'Hot' },
  { id: 'tasting', tone: 'flame', flag: 'New' },
  { id: 'dessert', tone: 'amber', flag: 'Hot' },
  { id: 'wine', tone: 'flame', flag: '−10%' },
];

const panelData = PANELS.map((p) => {
  const category = CATEGORIES.find((c) => c.id === p.id);
  const dishes = DISHES.filter((d) => d.category === p.id);
  return {
    ...p,
    label: category.label,
    count: dishes.length,
    image: dishes[0]?.image,
  };
});

/**
 * The colour-blocked category rail. Each panel expands on hover, exactly the
 * kind of loud, immediate navigation the theme is built around.
 */
export default function CategoryStrip() {
  return (
    <section aria-label="Menu categories" className="relative">
      <ul className="grid grid-cols-2 lg:grid-cols-5">
        {panelData.map((panel, i) => (
          <motion.li
            key={panel.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
            className={cx(
              'group relative overflow-hidden',
              panel.tone === 'flame' ? 'bg-gold' : 'bg-gold-light',
              /* the fifth panel spans both columns on the 2-col mobile grid */
              i === 4 && 'col-span-2 lg:col-span-1'
            )}
          >
            <Link
              to={`/menu?category=${panel.id}`}
              className="flex h-full flex-col items-center px-5 pb-8 pt-10 text-center"
            >
              {/* Ghosted word behind the plate */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-8 select-none font-display text-[3.5rem] font-bold uppercase leading-none text-obsidian/[0.08] sm:text-[5rem]"
              >
                {panel.label}
              </span>

              <span
                className={cx(
                  'relative z-10 grid h-11 w-11 place-items-center rounded-full font-display text-[11px] font-bold uppercase leading-none',
                  panel.tone === 'flame'
                    ? 'bg-gold-light text-obsidian'
                    : 'bg-gold text-bone'
                )}
              >
                {panel.flag}
              </span>

              <Image
                src={panel.image}
                alt=""
                ratio="1/1"
                className="relative z-10 mt-6 w-full max-w-[190px] rounded-full shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-105"
                sizes="(max-width: 1024px) 45vw, 18vw"
              />

              <h3 className="relative z-10 mt-6 text-3xl text-bone sm:text-4xl">
                {panel.label}
              </h3>

              <span className="relative z-10 mt-4 border border-bone/60 px-4 py-2 font-display text-[11px] font-medium uppercase tracking-wide text-bone transition-colors duration-400 group-hover:bg-obsidian group-hover:border-obsidian">
                {panel.count}+ menu items
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
