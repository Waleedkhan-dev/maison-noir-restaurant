import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import SectionTitle from '@/components/ui/SectionTitle';
import DishCard from '@/components/cards/DishCard';
import DishModal from '@/components/DishModal';
import Button from '@/components/ui/Button';
import { featuredDishes } from '@/data';
import { stagger, VIEWPORT } from '@/animations/variants';

export default function FeaturedDishes() {
  const [selected, setSelected] = useState(null);
  const dishes = featuredDishes();

  return (
    <section className="section relative bg-charcoal" aria-labelledby="featured-title">
      <div className="shell">
        <SectionTitle
          eyebrow="Chef's Recommendations"
          title={
            <>
              The plates we would
              <br />
              <span className="text-gilded">order ourselves.</span>
            </>
          }
          lede="Six dishes the kitchen is unwilling to take off the menu, however loudly the season argues otherwise."
        />

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} onOpen={setSelected} />
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Button to="/menu" variant="outline" size="lg" icon={<HiOutlineArrowLongRight />}>
            The Complete Menu
          </Button>
        </div>
      </div>

      <DishModal
        dish={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
