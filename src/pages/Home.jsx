import { lazy, Suspense } from 'react';
import Seo from '@/components/Seo';
import Hero from '@/components/sections/Hero';
import CategoryStrip from '@/components/sections/CategoryStrip';
import Story from '@/components/sections/Story';
import FeaturedDishes from '@/components/sections/FeaturedDishes';
import { Divider } from '@/components/ui/Misc';

/* Below-the-fold sections load after the hero has painted. */
const ChefSection = lazy(() => import('@/components/sections/ChefSection'));
const Reviews = lazy(() => import('@/components/sections/Reviews'));
const GalleryPreview = lazy(() => import('@/components/sections/GalleryPreview'));
const Cta = lazy(() => import('@/components/sections/Cta').then((m) => ({ default: m.CtaSection })));
const Instagram = lazy(() =>
  import('@/components/sections/Cta').then((m) => ({ default: m.InstagramFeed }))
);

const Hold = ({ children }) => (
  <Suspense fallback={<div className="min-h-[40vh]" />}>{children}</Suspense>
);

export default function Home() {
  return (
    <>
      <Seo
        title="Contemporary Fine Dining in Mayfair"
        description="Maison Noir — two Michelin stars, twenty-one years on Curzon Street. A nine-course seasonal tasting menu, written each morning. Reserve your table."
      />

      <Hero />
      <CategoryStrip />
      <Story />
      <FeaturedDishes />

      <Hold>
        <ChefSection />
      </Hold>

      <div className="shell">
        <Divider />
      </div>

      <Hold>
        <Reviews />
      </Hold>

      <Hold>
        <GalleryPreview />
      </Hold>

      <Hold>
        <Cta />
      </Hold>

      <Hold>
        <Instagram />
      </Hold>
    </>
  );
}
