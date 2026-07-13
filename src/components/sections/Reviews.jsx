import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import SectionTitle from '@/components/ui/SectionTitle';
import Counter from '@/components/ui/Counter';
import { ReviewCard } from '@/components/cards/Cards';
import { Rating } from '@/components/ui/Misc';
import { REVIEWS } from '@/data';
import { SITE } from '@/constants';
import { fadeUp, VIEWPORT } from '@/animations/variants';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Reviews() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="reviews-title">
      {/* ambient glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]"
      />

      <div className="shell relative">
        <SectionTitle
          eyebrow="Testimonials"
          title={
            <>
              What the room
              <br />
              <span className="text-gilded">says afterwards.</span>
            </>
          }
        />

        {/* Google rating strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="glass mx-auto mt-10 flex w-fit items-center gap-5 rounded-full px-7 py-4"
        >
          <FcGoogle className="h-7 w-7 shrink-0" aria-hidden="true" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl text-gilded">
              <Counter value={SITE.rating.value} decimals={1} />
            </span>
            <span className="text-xs text-faint">/ 5</span>
          </div>
          <span className="h-8 w-px bg-hairline" aria-hidden="true" />
          <div>
            <Rating value={SITE.rating.value} />
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-faint">
              <Counter value={SITE.rating.count} /> reviews
            </p>
          </div>
        </motion.div>

        <div className="mt-16 [&_.swiper]:!overflow-visible [&_.swiper-pagination]:!static [&_.swiper-pagination]:!mt-12">
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            speed={900}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2,
              slideShadows: false,
            }}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            a11y={{ enabled: true }}
            className="pb-2"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id} className="h-auto self-stretch">
                <div className="h-full py-4">
                  <ReviewCard review={review} className="h-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
