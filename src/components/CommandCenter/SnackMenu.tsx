import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SnackCategory {
  label: string;
  items: string[];
}

const categories: SnackCategory[] = [
  { label: '🍿 Snacks', items: ['Palomitas', 'Nachos', 'Papas', 'Galletas'] },
  { label: '🍫 Dulces', items: ['Chocolate', 'Gomitas', 'Brownies', 'Helado'] },
  { label: '🥤 Bebidas', items: ['Coca-Cola', 'Jugo', 'Chocolate caliente', 'Café'] },
];

export default function SnackMenu() {
  const [snacks, setSnacks] = useLocalStorage<string[]>('snacks', []);
  const [emplatado, setEmplatado] = useLocalStorage<boolean>('emplatado', false);
  const [dubTeam, setDubTeam] = useLocalStorage<string>('dubTeam', '');

  const toggleSnack = (item: string) => {
    setSnacks((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <div className="space-y-6">
      {/* Snack categories */}
      {categories.map((cat) => (
        <div key={cat.label} className="space-y-2">
          <h4 className="font-cinzel text-gold text-sm tracking-widest">
            {cat.label}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {cat.items.map((item) => {
              const checked = snacks.includes(item);
              return (
                <motion.label
                  key={item}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 border text-sm font-jakarta ${
                    checked
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border-subtle bg-bg-deep/50 text-text-secondary hover:border-gold/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSnack(item)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked ? 'border-gold bg-gold' : 'border-text-muted'
                    }`}
                  >
                    {checked && (
                      <svg
                        className="w-3 h-3 text-bg-deep"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  {item}
                </motion.label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      {/* Emplatado toggle */}
      <motion.label
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border ${
          emplatado
            ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
            : 'border-border-subtle bg-bg-deep/50 hover:border-gold/30'
        }`}
      >
        <input
          type="checkbox"
          checked={emplatado}
          onChange={() => setEmplatado(!emplatado)}
          className="sr-only"
        />
        <div
          className={`w-10 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${
            emplatado ? 'bg-gold' : 'bg-text-muted/30'
          }`}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md"
            animate={{ x: emplatado ? 16 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>
        <span className="text-text-primary text-sm font-jakarta">
          Emplatar la comida como si fuera para el otro 🍽️
        </span>
      </motion.label>

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      {/* Dub Duel */}
      <div className="space-y-3">
        <h4 className="font-cinzel text-gold text-sm tracking-widest uppercase">
          ⚔️ Duelo de Doblajes
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`flex flex-col items-center gap-1 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200 border text-center ${
              dubTeam === 'espanol'
                ? 'border-gold bg-gold/10 shadow-[0_0_16px_rgba(212,175,55,0.2)]'
                : 'border-border-subtle bg-bg-deep/50 hover:border-gold/30'
            }`}
          >
            <input
              type="radio"
              name="dubTeam"
              value="espanol"
              checked={dubTeam === 'espanol'}
              onChange={() => setDubTeam('espanol')}
              className="sr-only"
            />
            <span className="text-2xl">🇪🇸</span>
            <span className="text-sm font-jakarta text-text-primary">
              Team Español de España
            </span>
            <span className="text-xs text-text-muted">(Españoleta - Aitana)</span>
          </label>

          <label
            className={`flex flex-col items-center gap-1 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200 border text-center ${
              dubTeam === 'latino'
                ? 'border-crimson bg-crimson/10 shadow-[0_0_16px_rgba(136,19,55,0.3)]'
                : 'border-border-subtle bg-bg-deep/50 hover:border-crimson/30'
            }`}
          >
            <input
              type="radio"
              name="dubTeam"
              value="latino"
              checked={dubTeam === 'latino'}
              onChange={() => setDubTeam('latino')}
              className="sr-only"
            />
            <span className="text-2xl">🇨🇴</span>
            <span className="text-sm font-jakarta text-text-primary">
              Team Latino
            </span>
            <span className="text-xs text-text-muted">(Nikol)</span>
          </label>
        </div>

        <p className="text-xs text-text-muted text-center italic font-jakarta">
          Spoiler: Aitana ya ganó porque la peli ES española 😂🇪🇸
        </p>
      </div>
    </div>
  );
}
