import { motion } from 'framer-motion';
import { Flame, CheckCircle, HelpCircle } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function getHypeLabel(level: number): { text: string; emoji: string; desc: string } {
  if (level < 150) return { text: 'Curioso/a', emoji: '🤔', desc: 'Expectativas medidas para la primera cita de cine.' };
  if (level < 400) return { text: 'Enganchado/a', emoji: '🔥', desc: '¡Ganas de ver qué traman los hermanos Cash!' };
  if (level < 750) return { text: 'OBSESIONADO/A', emoji: '💀', desc: 'No puedo esperar al estreno en videollamada.' };
  return { text: 'MODO FAN DE ALEX MÍREZ', emoji: '🤯', desc: '¡Nivel máximo! Teorías listas y palomitas en mano.' };
}

const BROTHERS = [
  { id: 'Aegan', name: 'Aegan Cash', desc: 'El mayor, líder intocable 👑' },
  { id: 'Adrik', name: 'Adrik Cash', desc: 'El mediano, mirada enigmática 🖤' },
  { id: 'Alex', name: 'Alex Cash', desc: 'El menor, rebelde y magnético ⚡' },
];

const LIARS = [
  { id: 'Aegan', name: 'Aegan Cash' },
  { id: 'Adrik', name: 'Adrik Cash' },
  { id: 'Alex', name: 'Alex Cash' },
  { id: 'Jude', name: 'Jude Derry' },
];

export default function HypeThermometer() {
  const [hypeLevel, setHypeLevel] = useLocalStorage<number>('hypeLevel', 500);
  const [cashBrother, setCashBrother] = useLocalStorage<string>('cashBrother', 'Adrik');
  const [liar, setLiar] = useLocalStorage<string>('liar', 'Aegan');

  const label = getHypeLabel(hypeLevel);
  const fillPercent = Math.min(100, Math.max(1, (hypeLevel / 1000) * 100));

  return (
    <div className="space-y-8 pt-2">
      {/* Slider & Visual Gauge */}
      <div className="p-6 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FDA4AF] animate-bounce" />
            <span className="font-cinzel text-sm font-bold text-[#F0D978] tracking-wider uppercase">
              Nivel de Expectativa para el Estreno
            </span>
          </div>
          <span className="font-cinzel text-xl sm:text-2xl font-black text-[#F0D978] tabular-nums">
            {hypeLevel}%
          </span>
        </div>

        {/* Thermometer Bar */}
        <div className="relative w-full h-7 rounded-full bg-[#141A24] border border-[#D4AF37]/30 overflow-hidden shadow-inner">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #881337 0%, #BE185D 50%, #D4AF37 100%)',
            }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>

        {/* Custom Range Input */}
        <input
          type="range"
          min={1}
          max={1000}
          value={hypeLevel}
          onChange={(e) => setHypeLevel(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#F0D978] bg-[#1E293B]"
        />

        {/* Dynamic Status Display */}
        <motion.div
          key={label.text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
            <span className="text-xl">{label.emoji}</span>
            <span className="font-cinzel text-sm sm:text-base font-bold gold-shimmer">
              {label.text}
            </span>
          </div>
          <p className="font-jakarta text-xs text-[#E2E8F0] mt-1.5 font-medium">
            {label.desc}
          </p>
        </motion.div>
      </div>

      {/* Mini-polls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Poll 1: Favorite Brother */}
        <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <HelpCircle className="w-4 h-4 text-[#FDA4AF]" />
            <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-wide">
              ¿Qué hermano Cash crees que te caerá mejor?
            </h5>
          </div>

          <div className="space-y-2">
            {BROTHERS.map((b) => {
              const isSelected = cashBrother === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setCashBrother(b.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#07070A]/60 border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div>
                    <span className="font-cinzel text-xs font-bold text-white block">
                      {b.name}
                    </span>
                    <span className="font-jakarta text-[11px] text-[#CBD5E1]">
                      {b.desc}
                    </span>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#F0D978] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Poll 2: The Biggest Liar */}
        <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <HelpCircle className="w-4 h-4 text-[#FDA4AF]" />
            <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-wide">
              ¿Cuál sospechas que es el más mentiroso?
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {LIARS.map((l) => {
              const isSelected = liar === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLiar(l.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#881337]/30 border-[#FDA4AF] shadow-[0_0_15px_rgba(136,19,55,0.3)]'
                      : 'bg-[#07070A]/60 border-white/10 hover:border-[#FDA4AF]/40'
                  }`}
                >
                  <span className="font-cinzel text-xs font-bold text-white">
                    {l.name}
                  </span>
                  {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#FDA4AF] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
