import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Sparkles, Lock, Unlock, BookOpen } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface DressOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const OPTIONS: DressOption[] = [
  {
    id: 'burrito',
    emoji: '🧣',
    title: 'Burrito en Cobija Rosada',
    subtitle: 'Nivel máximo de comodidad y ternura en llamada.',
  },
  {
    id: 'pijamada',
    emoji: '🖤',
    title: 'Pijamada Elegante de Tagus',
    subtitle: 'Ropa oscura, vibra misteriosa y actitud de la élite.',
  },
  {
    id: 'origami',
    emoji: '🦢',
    title: 'Origami en Cámara',
    subtitle: 'Hacer figuritas de papel antes de que empiece la peli (guiño a octubre).',
  },
  {
    id: 'acostados',
    emoji: '😴',
    title: 'Acostados hasta Quedar Domi',
    subtitle: 'Celular en la almohada y hablar suavecito hasta dormirnos juntos.',
  },
];

export default function DressCode() {
  const [dressCode, setDressCode] = useLocalStorage<string>('dressCode', 'burrito');
  const [prendaRevealed, setPrendaRevealed] = useState(false);

  return (
    <div className="space-y-8 pt-2">
      {/* Intro */}
      <div className="flex items-center gap-2 text-white">
        <Shirt className="w-4 h-4 text-[#FDA4AF]" />
        <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F0D978]">
          Elige el Vibe Oficial de la Videollamada
        </h5>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {OPTIONS.map((opt) => {
          const isSelected = dressCode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setDressCode(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'bg-[#0D1117] border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-[#881337]/40 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                      : 'bg-[#07070A] border-white/10'
                  }`}
                >
                  {opt.emoji}
                </div>
                <div>
                  <h6 className="font-cinzel text-xs sm:text-sm font-bold text-white group-hover:text-[#F0D978] transition-colors">
                    {opt.title}
                  </h6>
                  <p className="font-jakarta text-[11px] text-[#CBD5E1] mt-0.5 leading-snug">
                    {opt.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Secret Challenge (Prenda Secreta del Notion) */}
      <div className="pt-2">
        <button
          onClick={() => setPrendaRevealed(!prendaRevealed)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#881337]/20 border-2 border-[#881337]/50 hover:border-[#FDA4AF] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#881337] flex items-center justify-center text-[#FDA4AF] group-hover:scale-110 transition-transform">
              {prendaRevealed ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div className="text-left">
              <span className="font-cinzel text-xs sm:text-sm font-bold text-white block">
                🔒 Carta de Prenda Desbloqueable
              </span>
              <span className="font-jakarta text-[11px] text-[#FDA4AF]">
                {prendaRevealed ? 'Prenda del Notion revelada' : 'Toca para romper el sello y revelar el reto pendiente'}
              </span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-[#F0D978]" />
        </button>

        <AnimatePresence>
          {prendaRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden mt-3"
            >
              <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#FDA4AF]/60 shadow-[0_10px_30px_rgba(136,19,55,0.3)] text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#881337]/40 text-[#FDA4AF] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-[#F0D978]" />
                  <span>Reto Oficial del Notion</span>
                </div>
                <p className="font-playfair text-lg sm:text-xl text-[#F0D978] italic font-semibold max-w-md mx-auto leading-relaxed">
                  “Leerme 9 páginas de un libro con tu hermosa voz (Aitana) 🎙️📖”
                </p>
                <p className="font-jakarta text-xs text-[#CBD5E1]">
                  (Quedó sellado en nuestro Notion y no te salvas de cumplirlo esta noche de estreno ❤️)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
