import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface DressOption {
  id: string;
  emoji: string;
  text: string;
}

const options: DressOption[] = [
  { id: 'burrito', emoji: '🧣', text: 'Burrito en cobija rosada' },
  { id: 'pijamada', emoji: '🖤', text: 'Pijamada elegante de Tagus' },
  { id: 'origami', emoji: '🦢', text: 'Hacer figuritas de origami en cámara' },
  { id: 'acostados', emoji: '😴', text: 'Quedarnos hablando acostados hasta caer domi' },
];

export default function DressCode() {
  const [dressCode, setDressCode] = useLocalStorage<string>('dressCode', '');
  const [prendaRevealed, setPrendaRevealed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Dress code options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = dressCode === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setDressCode(opt.id)}
              className={`relative flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                selected
                  ? 'border-gold bg-gold/10 shadow-[0_0_24px_rgba(212,175,55,0.25)]'
                  : 'border-border-subtle bg-bg-deep/50 hover:border-gold/30'
              }`}
            >
              {/* Gold glow ring for selected */}
              {selected && (
                <motion.div
                  layoutId="dressCodeGlow"
                  className="absolute inset-0 rounded-xl border-2 border-gold"
                  style={{
                    boxShadow: '0 0 20px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.05)',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              )}
              <span className="text-3xl">{opt.emoji}</span>
              <span
                className={`text-sm font-jakarta relative z-10 ${
                  selected ? 'text-gold font-medium' : 'text-text-secondary'
                }`}
              >
                {opt.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      {/* Secret Prenda */}
      <div className="space-y-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setPrendaRevealed(!prendaRevealed)}
          className={`w-full px-4 py-3 rounded-xl font-cinzel text-sm tracking-wider transition-all duration-300 border ${
            prendaRevealed
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-crimson bg-crimson/10 text-rose-soft hover:bg-crimson/20'
          }`}
        >
          🔒 Carta de Prenda Secreta
        </motion.button>

        <AnimatePresence>
          {prendaRevealed && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              animate={{ opacity: 1, filter: 'blur(0px)', height: 'auto' }}
              exit={{ opacity: 0, filter: 'blur(12px)', height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="glass rounded-xl p-4 text-center space-y-2">
                <p className="text-text-primary text-sm font-jakarta leading-relaxed">
                  Prenda pendiente del Notion:
                </p>
                <p className="font-playfair text-gold text-base italic">
                  &quot;Leerme 9 páginas de un libro con tu voz (Aitana)&quot;
                </p>
                <p className="text-2xl">🎙️📖</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
