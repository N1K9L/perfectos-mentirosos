import { motion } from 'framer-motion';
import { Flame, CheckCircle, HelpCircle, Crown, Shield, Zap, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function getHypeLabel(level: number): { text: string; desc: string; icon: typeof Flame } {
  if (level < 150) return { text: 'Curiosidad Inicial', desc: 'Expectativas medidas para nuestra primera cita de cine.', icon: Sparkles };
  if (level < 400) return { text: 'Expectativa Creciente', desc: '¡Ganas de ver qué secretos traman los hermanos Cash!', icon: Flame };
  if (level < 750) return { text: 'Fiebre de Estreno', desc: 'Contando las horas para nuestra videollamada sincronizada.', icon: Zap };
  return { text: 'Modo Fan de Alex Mírez', desc: '¡Nivel máximo! Teorías listas, snacks servidos y sospechas al tope.', icon: Crown };
}

const BROTHERS = [
  { id: 'Aegan', name: 'Aegan Cash', desc: 'El mayor, líder intocable y calculador', icon: Crown },
  { id: 'Adrik', name: 'Adrik Cash', desc: 'El mediano, reservado y enigmático', icon: Shield },
  { id: 'Alex', name: 'Alex Cash', desc: 'El menor, rebelde, impulsivo y magnético', icon: Zap },
];

const LIARS = [
  { id: 'Aegan', name: 'Aegan Cash' },
  { id: 'Adrik', name: 'Adrik Cash' },
  { id: 'Alex', name: 'Alex Cash' },
  { id: 'Jude', name: 'Jude Derry' },
];

export default function HypeThermometer() {
  const [hypeLevel, setHypeLevel] = useLocalStorage<number>('hypeLevel', 650);
  const [cashBrother, setCashBrother] = useLocalStorage<string>('cashBrother', 'Adrik');
  const [liar, setLiar] = useLocalStorage<string>('liar', 'Aegan');

  const label = getHypeLabel(hypeLevel);
  const StatusIcon = label.icon;
  const fillPercent = Math.min(100, Math.max(1, (hypeLevel / 1000) * 100));

  return (
    <div className="space-y-10 pt-4">
      {/* Gauge Box */}
      <div className="p-8 rounded-3xl bg-[#07070A]/80 border border-[#D4AF37]/35 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#881337]/40 border border-[#FDA4AF] flex items-center justify-center text-[#FDA4AF]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-widest uppercase block">
                Termómetro de Expectativa
              </span>
              <span className="font-jakarta text-[11px] text-[#94A3B8]">
                Desliza para calibrar tu nivel de hype
              </span>
            </div>
          </div>
          <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#F0D978] tabular-nums">
            {hypeLevel}%
          </span>
        </div>

        {/* Thermometer Bar */}
        <div className="relative w-full h-8 rounded-full bg-[#141A24] border border-[#D4AF37]/40 overflow-hidden shadow-inner p-1">
          <motion.div
            className="h-full rounded-full"
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
          className="text-center pt-2 space-y-1.5"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 shadow-md">
            <StatusIcon className="w-4 h-4 text-[#F0D978]" />
            <span className="font-cinzel text-sm sm:text-base font-bold gold-shimmer tracking-wider">
              {label.text}
            </span>
          </div>
          <p className="font-jakarta text-xs sm:text-sm text-[#E2E8F0] font-medium max-w-md mx-auto">
            {label.desc}
          </p>
        </motion.div>
      </div>

      {/* Mini-polls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Poll 1: Favorite Brother */}
        <div className="p-6 rounded-3xl bg-[#0D1117] border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 text-white">
            <HelpCircle className="w-4 h-4 text-[#FDA4AF]" />
            <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-wide">
              ¿Qué hermano Cash crees que te caerá mejor?
            </h5>
          </div>

          <div className="space-y-2.5">
            {BROTHERS.map((b) => {
              const isSelected = cashBrother === b.id;
              const Icon = b.icon;
              return (
                <button
                  key={b.id}
                  onClick={() => setCashBrother(b.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#07070A]/60 border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F0D978]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-xs sm:text-sm font-bold text-white block">
                        {b.name}
                      </span>
                      <span className="font-jakarta text-[11px] text-[#CBD5E1]">
                        {b.desc}
                      </span>
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#F0D978] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Poll 2: The Biggest Liar */}
        <div className="p-6 rounded-3xl bg-[#0D1117] border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 text-white">
            <HelpCircle className="w-4 h-4 text-[#FDA4AF]" />
            <h5 className="font-cinzel text-xs sm:text-sm font-bold tracking-wide">
              ¿Cuál sospechas que es el más mentiroso?
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {LIARS.map((l) => {
              const isSelected = liar === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLiar(l.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#881337]/35 border-[#FDA4AF] shadow-[0_0_15px_rgba(136,19,55,0.3)]'
                      : 'bg-[#07070A]/60 border-white/10 hover:border-[#FDA4AF]/40'
                  }`}
                >
                  <span className="font-cinzel text-xs font-bold text-white">
                    {l.name}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#FDA4AF] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
