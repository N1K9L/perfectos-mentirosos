import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

interface SecretEnvelopeProps {
  message: string;
  x?: string;
  y?: string;
  className?: string;
}

export const SecretEnvelope: React.FC<SecretEnvelopeProps> = ({
  message,
  x = '10%',
  y = '50%',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 4500);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`absolute z-20 ${className}`}
      style={{ left: x, top: y }}
    >
      <div className="relative">
        <motion.button
          onClick={handleToggle}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0D1117]/80 backdrop-blur-md border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:scale-115 hover:border-[#F0D978] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer group"
          whileTap={{ scale: 0.9 }}
          title="Toca para un secreto..."
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#F0D978] transition-colors" />
        </motion.button>

        {/* Revealed mini love note */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -8 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 sm:w-56 glass-dark rounded-xl p-3 border border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-30 pointer-events-auto"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[#FDA4AF] text-[10px] uppercase font-jakarta tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Nota Secreta</span>
              </div>
              <p className="font-playfair text-xs sm:text-sm text-white italic leading-snug">
                "{message}"
              </p>
              <div className="mt-1.5 text-right font-cinzel text-[10px] text-[#D4AF37]">
                — Nikol 💛
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecretEnvelope;
