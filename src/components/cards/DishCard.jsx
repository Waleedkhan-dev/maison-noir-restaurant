import { motion } from 'framer-motion';
import { HiOutlineFire, HiOutlineClock, HiOutlinePlus } from 'react-icons/hi2';
import { LuChefHat } from 'react-icons/lu';
import Image from '@/components/ui/Image';
import { Badge, Burst, Rating, DietaryIcons } from '@/components/ui/Misc';
import { useTilt } from '@/hooks';
import { useCart } from '@/store/useCart';
import { formatPrice, cx } from '@/utils';
import { fadeUp } from '@/animations/variants';

/**
 * The card the whole menu is built from. Tilts in 3D toward the cursor, lifts
 * on hover, and opens the detail modal on click.
 */
export default function DishCard({ dish, onOpen, index = 0 }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(7);
  const add = useCart((s) => s.add);
  const isChefsChoice = dish.tags.includes('chef');

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        className={cx(
          'group relative flex h-full flex-col overflow-hidden rounded-card border bg-charcoal',
          'transition-colors duration-500',
          isChefsChoice
            ? 'border-gold/25 hover:border-gold/60'
            : 'border-hairline hover:border-gold/40'
        )}
      >
        {/* Image */}
        <button
          type="button"
          onClick={() => onOpen?.(dish)}
          aria-label={`View details for ${dish.name}`}
          className="relative block w-full text-left"
        >
          <Image src={dish.image} alt={dish.name} ratio="4/3" zoom className="w-full" />

          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />

          {/* Badges */}
          <span className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
            {isChefsChoice && (
              <Badge tone="gold" icon={<LuChefHat className="h-3.5 w-3.5" />}>
                Chef's Choice
              </Badge>
            )}
            {dish.tags.includes('new') && <Badge tone="dark">New</Badge>}
          </span>

          {/* Starburst — the theme's signature corner mark */}
          {dish.tags.includes('best-seller') && (
            <span className="pointer-events-none absolute right-3 top-3">
              <Burst tone="amber">Hot</Burst>
            </span>
          )}

          {/* Meta on hover */}
          <span className="pointer-events-none absolute bottom-4 left-4 flex gap-4 text-[11px] tracking-wider text-bone/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex items-center gap-1.5">
              <HiOutlineFire className="h-3.5 w-3.5 text-gold" />
              {dish.calories} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineClock className="h-3.5 w-3.5 text-gold" />
              {dish.prepTime} min
            </span>
          </span>
        </button>

        {/* Body */}
        <div
          className="flex flex-1 flex-col p-6"
          style={{ transform: 'translateZ(28px)' }}
        >
          <Rating value={dish.rating} count={dish.reviews} className="mb-3" />

          <h3 className="text-2xl leading-tight text-bone transition-colors duration-400 group-hover:text-gold-light">
            <button type="button" onClick={() => onOpen?.(dish)} className="text-left">
              {dish.name}
            </button>
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {dish.short}
          </p>

          <DietaryIcons items={dish.dietary} className="mt-4" />

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <span className="font-display text-3xl text-gilded">
              {formatPrice(dish.price)}
            </span>

            <button
              type="button"
              onClick={() => add(dish)}
              aria-label={`Add ${dish.name} to your order`}
              className={cx(
                'group/btn flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5',
                'font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted',
                'transition-all duration-500 hover:border-gold hover:bg-gold hover:text-obsidian'
              )}
            >
              <HiOutlinePlus className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-90" />
              Add
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
