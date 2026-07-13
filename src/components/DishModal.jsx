import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineFire, HiOutlineClock, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2';
import { LuChefHat, LuWine } from 'react-icons/lu';
import Modal from '@/components/ui/Modal';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import { Badge, Rating, DietaryIcons } from '@/components/ui/Misc';
import { useCart } from '@/store/useCart';
import { formatPrice } from '@/utils';
import { stagger, fadeUp } from '@/animations/variants';

/** Detail view for a dish: photography, ingredients, nutrition, add-to-order. */
export default function DishModal({ dish, open, onClose }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (open) setQty(1);
  }, [open, dish?.id]);

  if (!dish) return null;

  const handleAdd = () => {
    add(dish, qty);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} label={dish.name} className="max-w-4xl">
      <div className="grid md:grid-cols-2">
        <div className="relative">
          <Image
            src={dish.image}
            alt={dish.name}
            ratio="4/5"
            className="h-full md:rounded-l-modal"
            priority
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-obsidian/50" />

          {dish.tags.includes('chef') && (
            <span className="absolute left-5 top-5">
              <Badge tone="gold" icon={<LuChefHat className="h-3 w-3" />}>
                Chef's Choice
              </Badge>
            </span>
          )}
        </div>

        <motion.div
          variants={stagger(0.07, 0.15)}
          initial="hidden"
          animate="show"
          className="flex flex-col p-7 sm:p-9"
        >
          <motion.div variants={fadeUp}>
            <Rating value={dish.rating} count={dish.reviews} />
            <h2 className="mt-3 text-4xl leading-tight text-bone">{dish.name}</h2>
            <p className="mt-4 text-sm leading-[1.9] text-muted">{dish.description}</p>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-7 grid grid-cols-3 gap-3 border-y border-hairline py-5"
          >
            {[
              { icon: HiOutlineFire, label: 'Calories', value: `${dish.calories}` },
              { icon: HiOutlineClock, label: 'Prepared in', value: `${dish.prepTime}m` },
              { icon: LuChefHat, label: 'Protein', value: `${dish.nutrition.protein}g` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-4 w-4 text-gold" aria-hidden="true" />
                <dd className="mt-2 font-display text-xl text-bone">{value}</dd>
                <dt className="text-[9px] uppercase tracking-[0.18em] text-faint">
                  {label}
                </dt>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="mt-6">
            <h3 className="eyebrow">Ingredients</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {dish.ingredients.map((item) => (
                <li key={item}>
                  <span className="inline-block rounded-full border border-hairline px-3 py-1.5 text-[11px] text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {dish.dietary.length > 0 && (
            <motion.div variants={fadeUp} className="mt-6">
              <h3 className="eyebrow">Dietary</h3>
              <DietaryIcons items={dish.dietary} className="mt-3" />
            </motion.div>
          )}

          {dish.pairing && (
            <motion.p
              variants={fadeUp}
              className="mt-6 flex items-start gap-3 rounded-input border border-gold/20 bg-gold/[0.04] p-4 text-xs leading-relaxed text-muted"
            >
              <LuWine className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <span className="text-gold">Pairing — </span>
                {dish.pairing}
              </span>
            </motion.p>
          )}

          {/* Quantity + add */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-between gap-4 border-t border-hairline pt-7"
          >
            <div className="flex items-center gap-1 rounded-full border border-hairline p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-gold"
              >
                <HiOutlineMinus className="h-4 w-4" />
              </button>
              <span
                aria-live="polite"
                className="w-8 text-center text-sm tabular-nums text-bone"
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-gold"
              >
                <HiOutlinePlus className="h-4 w-4" />
              </button>
            </div>

            <span className="font-display text-4xl text-gilded">
              {formatPrice(dish.price * qty)}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5">
            <Button full size="lg" onClick={handleAdd} data-autofocus>
              Add to Order
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Modal>
  );
}
