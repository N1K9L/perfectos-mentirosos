import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function getHypeLabel(level: number): { text: string; emoji: string } {
  if (level < 100) return { text: 'Curioso/a', emoji: '🤔' };
  if (level < 300) return { text: 'Enganchado/a', emoji: '🔥' };
  if (level < 600) return { text: 'OBSESIONADO/A', emoji: '💀' };
  return { text: 'MODO FAN DE ALEX MÍREZ', emoji: '🤯' };
}

const brothers = ['Aegan', 'Adrik', 'Alex'] as const;
const liars = ['Aegan', 'Adrik', 'Alex', 'Jude'] as const;

export default function HypeThermometer() {
  const [hypeLevel, setHypeLevel] = useLocalStorage<number>('hypeLevel', 1);
  const [cashBrother, setCashBrother] = useLocalStorage<string>('cashBrother', '');
  const [liar, setLiar] = useLocalStorage<string>('liar', '');

  const label = getHypeLabel(hypeLevel);
  const fillPercent = (hypeLevel / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* Thermometer */}
      <div className="space-y-3">
        <h4 className="font-cinzel text-gold text-sm tracking-widest uppercase">
          Termómetro de Hype
        </h4>

        {/* Visual bar */}
        <div className="relative w-full h-8 rounded-full bg-bg-deep border border-border-subtle overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, #881337 0%, #D4AF37 100%)`,
            }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary drop-shadow-lg font-jakarta">
            {hypeLevel}%
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={1}
          max={1000}
          value={hypeLevel}
          onChange={(e) => setHypeLevel(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-gold"
          style={{
            background: `linear-gradient(90deg, #881337 0%, #D4AF37 ${fillPercent}%, #1E293B ${fillPercent}%)`,
          }}
        />

        {/* Label */}
        <motion.div
          key={label.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-2xl">{label.emoji}</span>
          <p
            className={`font-cinzel text-sm mt-1 tracking-wider ${
              hypeLevel >= 600
                ? 'gold-shimmer text-lg font-bold'
                : 'text-gold'
            }`}
          >
            {label.text}
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      {/* Mini-polls */}
      <div className="space-y-5">
        {/* Poll 1: Cash Brother */}
        <div className="space-y-2">
          <p className="font-playfair text-text-primary text-sm">
            ¿Qué hermano Cash crees que te va a caer mejor?
          </p>
          <div className="flex flex-wrap gap-3">
            {brothers.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 border text-sm font-jakarta ${
                  cashBrother === name
                    ? 'border-gold bg-gold/10 text-gold shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                    : 'border-border-subtle bg-bg-deep/50 text-text-secondary hover:border-gold/40'
                }`}
              >
                <input
                  type="radio"
                  name="cashBrother"
                  value={name}
                  checked={cashBrother === name}
                  onChange={() => setCashBrother(name)}
                  className="sr-only"
                />
                {name}
              </label>
            ))}
          </div>
        </div>

        {/* Poll 2: Liar */}
        <div className="space-y-2">
          <p className="font-playfair text-text-primary text-sm">
            ¿Cuál crees que es el más mentiroso?
          </p>
          <div className="flex flex-wrap gap-3">
            {liars.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 border text-sm font-jakarta ${
                  liar === name
                    ? 'border-crimson bg-crimson/10 text-rose-soft shadow-[0_0_12px_rgba(136,19,55,0.3)]'
                    : 'border-border-subtle bg-bg-deep/50 text-text-secondary hover:border-crimson/40'
                }`}
              >
                <input
                  type="radio"
                  name="liar"
                  value={name}
                  checked={liar === name}
                  onChange={() => setLiar(name)}
                  className="sr-only"
                />
                {name}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
