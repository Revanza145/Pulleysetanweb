import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b',
        isScrolled 
          ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-neutral-800/50' 
          : 'bg-transparent py-6 border-white/10'
      )}
    >
      <div className="container mx-auto px-10 flex items-center justify-between gap-12">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1 shrink-0">
          <span className="text-2xl md:text-3xl font-black tracking-tighter italic text-red-600 uppercase">PULLEYSETAN</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-tech text-[10px] lg:text-[11px] uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-6 py-2 border border-red-600 text-red-600 text-[10px] uppercase font-tech hover:bg-red-600 hover:text-white transition-all">
            Catalogue 2026
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[73px] bg-neutral-950 z-40 md:hidden p-10 flex flex-col gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black text-neutral-100 italic tracking-tighter flex items-center justify-between group"
              >
                {link.label}
                <ChevronRight className="text-red-600 group-hover:translate-x-2 transition-transform" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
