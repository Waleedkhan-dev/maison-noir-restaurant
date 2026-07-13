import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import { Cursor, ScrollProgress, FloatingActions } from '@/components/layout/Ambient';
import Loader from '@/components/ui/Loader';
import { useLenis } from '@/hooks';
import { pageTransition } from '@/animations/variants';

/** Shown between lazy route chunks — a gold hairline, nothing more. */
function RouteFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Loading">
      <span className="h-px w-32 animate-pulse bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}

export default function RootLayout() {
  const { pathname } = useLocation();
  useLenis();

  /* Every navigation starts at the top — router does not do this for us. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <CartDrawer />
      <FloatingActions />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          id="main"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
