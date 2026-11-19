import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Sparkles, Lock, Unlock, BookOpen, Coffee, Feather, Moon } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface DressOption {
  id: string;
  icon: typeof Shirt;
  title: string;
  subtitle: string;
}

const OPTIONS: DressOption[] = [
  {
    id: 'burrito',
    icon: Coffee,
    title: 'Burrito en Cobija Rosada',
    subtitle: 'Nivel máximo de ternura, cobija suave y confort total en llamada.',
  },
  {
    id: 'pijamada',
    icon: Sparkles,
    title: 'Pijamada Élite Tagus',
    subtitle: 'Ropa oscura, atmósfera de misterio y actitud reservada de campus.',
  },
  {
    id: 'origami',
    icon: Feather,
    title: 'Origami en Cámara',
    subtitle: 'Plegar figuras de papel juntos en videollamada antes de la función.',
  },
  {
    id: 'acostados',
    icon: Moon,
    title: 'Acostados hasta Quedar Domi',
    subtitle: 'Celular en la almohada, susurros cómplices y dormirnos juntos.',
  },
];

export default function DressCode() {
  const [dressCode, setDressCode] = useLocalStorage<string>('dressCode', 'burrito');
  const [prendaRevealed, setPrendaRevealed] = useState(false);

  return (
    <div className="space-y-10 pt-4">
      {/* Intro */}
      <div className="flex items-center gap-2.5 text-white">
        <div className="w-8 h-8 rounded-xl bg-[#FDA4AF]/15 border border-[#FDA4AF]/40 flex items-center justify-center text-[#FDA4AF]">
          <Shirt className="w-4 h-4" />
        </div>
        <div>
          <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F0D978]">
            Vibe &amp; Código de Vestimenta de la Cita
          </h5>
          <p className="font-jakarta text-[11px] text-[#CBD5E1]">
            Elige el ambiente para nuestra noche de estreno
          </p>
        </div>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map((opt) => {
          const isSelected = dressCode === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => setDressCode(opt.id)}
              className={`p-5 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                  : 'bg-[#0D1117] border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-[#881337]/50 border-[#D4AF37] text-[#F0D978] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-[#07070A] border-white/10 text-[#94A3B8]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h6 className="font-cinzel text-xs sm:text-sm font-bold text-white group-hover:text-[#F0D978] transition-colors">
                    {opt.title}
                  </h6>
                  <p className="font-jakarta text-xs text-[#CBD5E1] leading-relaxed">
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
          className="w-full flex items-center justify-between p-5 rounded-3xl bg-[#881337]/25 border-2 border-[#881337]/60 hover:border-[#FDA4AF] transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#881337] flex items-center justify-center text-[#FDA4AF] group-hover:scale-105 transition-transform">
              {prendaRevealed ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div className="text-left">
              <span className="font-cinzel text-xs sm:text-sm font-bold text-white block">
                Carta de Prenda Desbloqueable
              </span>
              <span className="font-jakarta text-xs text-[#FDA4AF]">
                {prendaRevealed ? 'Prenda del Notion revelada' : 'Toca para romper el sello y revelar el reto pendiente'}
              </span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-[#F0D978]" />
        </button>

        <AnimatePresence>
          {prendaRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden mt-4"
            >
              <div className="p-8 rounded-3xl bg-[#0D1117] border-2 border-[#FDA4AF]/60 shadow-[0_15px_40px_rgba(136,19,55,0.35)] text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#881337]/50 text-[#FDA4AF] text-xs font-bold uppercase tracking-wider border border-[#FDA4AF]/40">
                  <BookOpen className="w-4 h-4 text-[#F0D978]" />
                  <span>Reto Oficial de Nuestro Notion</span>
                </div>
                <p className="font-playfair text-xl sm:text-2xl text-[#F0D978] italic font-semibold max-w-lg mx-auto leading-relaxed">
                  “Leerme 9 páginas de un libro con tu hermosa voz (Aitana)”
                </p>
                <p className="font-jakarta text-xs text-[#CBD5E1] max-w-md mx-auto">
                  Firmado y sellado en nuestro Notion compartido. Toca cumplirlo antes de que rueden los créditos de la película.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
