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
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0D1117]/90 border border-[#881337]/70 hover:border-[#FDA4AF] text-white shadow-[0_5px_20px_rgba(136,19,55,0.4)] backdrop-blur-md cursor-pointer group transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-[#881337]/50 flex items-center justify-center">
            <Heart className="w-4 h-4 text-[#FDA4AF] fill-current group-hover:scale-125 transition-transform" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-jakarta text-[#FDA4AF] tracking-widest font-bold leading-none">
              Besitos Virtuales
            </span>
            <span className="font-cinzel text-xs font-bold text-[#F0D978]">
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
