import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';

/* Home ships in the main bundle; everything else is split. */
const About = lazy(() => import('@/pages/About'));
const Menu = lazy(() => import('@/pages/Menu'));
const Reservations = lazy(() => import('@/pages/Reservations'));
const Chef = lazy(() => import('@/pages/Chef'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const PrivateDining = lazy(() => import('@/pages/PrivateDining'));
const Events = lazy(() => import('@/pages/Events'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Faq = lazy(() => import('@/pages/Faq'));
const Contact = lazy(() => import('@/pages/Contact'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'menu', element: <Menu /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'chef', element: <Chef /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'private-dining', element: <PrivateDining /> },
      { path: 'events', element: <Events /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogPost /> },
      { path: 'faq', element: <Faq /> },
      { path: 'contact', element: <Contact /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
