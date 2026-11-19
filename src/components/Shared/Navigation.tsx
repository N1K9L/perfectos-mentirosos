import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  onToggleSound?: () => void;
  isMuted?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onToggleSound,
  isMuted = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'El Dossier', id: 'dossier' },
    { label: 'Cita a Distancia', id: 'command-center' },
    { label: 'Bitácora Secreta', id: 'live-log' },
    { label: 'Nuestra Historia', id: 'timeline' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark border-b border-[#D4AF37]/20 py-3 shadow-[0_5px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 bg-[#881337]/30 flex items-center justify-center text-[#F0D978] group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <span className="font-cinzel text-xs font-bold">N&amp;A</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-cinzel text-sm font-bold gold-shimmer tracking-wider">
              TAGUS ARCHIVES
            </span>
            <span className="font-jakarta text-[9px] text-[#FDA4AF] uppercase tracking-widest leading-none">
              10 Meses Juntos
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-jakarta text-xs uppercase tracking-widest text-[#E2E8F0] font-semibold hover:text-[#F0D978] transition-colors relative group py-1 cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F0D978] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Right Actions: Sound & Mobile Menu */}
        <div className="flex items-center gap-3">
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full border border-[#D4AF37]/30 bg-[#0D1117]/60 text-[#D4AF37] hover:border-[#D4AF37] hover:scale-105 transition-all cursor-pointer"
              title={isMuted ? 'Activar ambientación sonora' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#94A3B8]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#F0D978] animate-pulse" />
              )}
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F1F5F9] hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-b border-[#D4AF37]/20 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-cinzel text-base text-left text-[#F1F5F9] hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
