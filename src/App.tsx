/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProductGrid from './components/sections/ProductGrid';
import Features from './components/sections/Features';
import About from './components/sections/About';
import CvtRecommendation from './components/sections/CvtRecommendation';
import News from './components/sections/News';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CvtRecommendation />
        <ProductGrid />
        <About />
        <News />
      </main>
      <Footer />
    </div>
  );
}
