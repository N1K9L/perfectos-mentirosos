import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import confetti from 'canvas-confetti';

export const KissCounter: React.FC = () => {
  const [kissCount, setKissCount] = useLocalStorage<number>('kissCounter', 100);
  const [effects, setEffects] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = () => {
    setKissCount((prev) => prev + 1);

    const id = Date.now() + Math.random();
    setEffects((prev) => [...prev, { id, x: Math.random() * 30 - 15, y: -45 }]);

    setTimeout(() => {
      setEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 1200);

    if ((kissCount + 1) % 10 === 0) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: 0.1, y: 0.9 },
        colors: ['#881337', '#FDA4AF', '#D4AF37'],
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
      <div className="relative">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label={`Enviar un besito (${kissCount})`}
          className="relative flex items-center gap-2.5 p-1.5 sm:pl-1.5 sm:pr-4 rounded-full glass-dark text-white cursor-pointer group transition-colors hover:border-[#FDA4AF]/40"
        >
          <div className="relative w-9 h-9 rounded-full bg-[#881337]/40 flex items-center justify-center">
            <Heart className="w-4 h-4 text-[#FDA4AF] fill-current group-hover:scale-125 transition-transform" />
          </div>
          <span className="sm:hidden absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#F0D978] text-[#07070A] text-[10px] font-jakarta font-bold flex items-center justify-center">
            {kissCount}
          </span>
          <div className="hidden sm:flex flex-col text-left gap-0.5">
            <span className="text-[10px] uppercase font-jakarta text-[#FDA4AF]/80 tracking-[0.18em] font-semibold leading-none">
              Besitos Virtuales
            </span>
            <span className="font-jakarta text-xs font-semibold text-[#F0D978]">
              {kissCount} para ti
            </span>
          </div>
        </motion.button>

        {/* Floating Heart Popup Indicator */}
        <AnimatePresence>
          {effects.map((eff) => (
            <motion.div
              key={eff.id}
              className="absolute left-1/2 -top-4 pointer-events-none select-none text-[#FDA4AF]"
              initial={{ opacity: 1, y: 0, x: eff.x, scale: 0.8 }}
              animate={{ opacity: 0, y: eff.y, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Heart className="w-5 h-5 fill-current" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KissCounter;
