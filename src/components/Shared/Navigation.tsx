import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  onToggleSound?: () => void;
  isMuted?: boolean;
}

const navItems = [
  { label: 'Película', id: 'dossier' },
  { label: 'La Cita', id: 'command-center' },
  { label: 'Bitácora', id: 'live-log' },
  { label: 'Historia', id: 'timeline' },
];

export const Navigation: React.FC<NavigationProps> = ({ onToggleSound, isMuted = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: resalta la sección visible
  useEffect(() => {
    const ids = ['hero', ...navItems.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'hero' ? '' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`pointer-events-auto relative w-full max-w-3xl flex items-center gap-1 sm:gap-3 rounded-full p-1.5 sm:p-2 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)]' : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#F0D978] hover:border-[#D4AF37] transition-colors cursor-pointer"
          aria-label="Volver al inicio"
        >
          <span className="font-cinzel text-[10px] sm:text-[11px] font-bold">N&amp;A</span>
        </button>

        {/* Secciones: siempre visibles, también en móvil */}
        <div className="flex-1 min-w-0 flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative px-2.5 sm:px-4 py-2 rounded-full font-jakarta text-[12.5px] sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive ? 'text-[#07070A]' : 'text-[#CBD5E1] hover:text-white'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[#F0D978]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        {onToggleSound && (
          <button
            onClick={onToggleSound}
            className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#F0D978] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Activar sonido ambiente' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#F0D978]" />}
          </button>
        )}

        {/* Barra de progreso de lectura */}
        <motion.span
          className="absolute left-6 right-6 -bottom-px h-px origin-left bg-gradient-to-r from-[#D4AF37] to-[#FDA4AF] transition-opacity duration-500"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </div>
    </motion.nav>
  );
};

export default Navigation;
