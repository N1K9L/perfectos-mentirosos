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
    <div className="space-y-12 py-2">
      {/* Intro */}
      <div className="flex items-center gap-3.5 text-white">
        <div className="w-10 h-10 rounded-2xl bg-[#FDA4AF]/15 border border-[#FDA4AF]/40 flex items-center justify-center text-[#FDA4AF] shrink-0">
          <Shirt className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-cinzel text-sm sm:text-base font-bold tracking-widest uppercase text-[#F0D978]">
            Vibe &amp; Código de Vestimenta de la Cita
          </h5>
          <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1]">
            Elige el ambiente ideal para disfrutar nuestra noche de estreno juntos en videollamada
          </p>
        </div>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {OPTIONS.map((opt) => {
          const isSelected = dressCode === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => setDressCode(opt.id)}
              className={`p-6 sm:p-8 rounded-[26px] border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)]'
                  : 'bg-[#0D1117] border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-[#881337]/50 border-[#D4AF37] text-[#F0D978] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                      : 'bg-[#07070A] border-white/10 text-[#94A3B8]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h6 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#F0D978] transition-colors">
                    {opt.title}
                  </h6>
                  <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {opt.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Secret Challenge (Prenda Secreta del Notion) */}
      <div className="pt-4">
        <button
          onClick={() => setPrendaRevealed(!prendaRevealed)}
          className="w-full flex items-center justify-between p-6 sm:p-8 rounded-[26px] bg-[#881337]/25 border-2 border-[#881337]/60 hover:border-[#FDA4AF] transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#881337] flex items-center justify-center text-[#FDA4AF] group-hover:scale-105 transition-transform shrink-0 shadow-md">
              {prendaRevealed ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div className="text-left space-y-0.5">
              <span className="font-cinzel text-sm sm:text-base font-bold text-white block">
                Carta de Prenda Desbloqueable
              </span>
              <span className="font-jakarta text-xs sm:text-sm text-[#FDA4AF]">
                {prendaRevealed ? 'Prenda del Notion revelada' : 'Toca para romper el sello y revelar el reto pendiente'}
              </span>
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-[#F0D978] shrink-0 ml-2" />
        </button>

        <AnimatePresence>
          {prendaRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden mt-6"
            >
              <div className="p-8 sm:p-14 rounded-[28px] bg-[#0D1117] border-2 border-[#FDA4AF]/60 shadow-[0_15px_40px_rgba(136,19,55,0.35)] text-center space-y-6">
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#881337]/50 text-[#FDA4AF] text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#FDA4AF]/40">
                  <BookOpen className="w-4 h-4 text-[#F0D978]" />
                  <span>Reto Oficial de Nuestro Notion</span>
                </div>
                <p className="font-playfair text-2xl sm:text-3xl text-[#F0D978] italic font-semibold max-w-xl mx-auto leading-relaxed">
                  “Leerme 9 páginas de un libro con tu hermosa voz (Aitana)”
                </p>
                <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
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
