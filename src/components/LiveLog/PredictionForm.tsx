import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { DetectiveMode, Prediction, Timing } from './types';
import { TIMING_LABELS } from './types';

interface PredictionFormProps {
  detective: DetectiveMode;
  onSubmit: (prediction: Prediction) => void;
}

const TIMINGS: Timing[] = ['inicio', 'mitad', 'antes-del-final'];

export default function PredictionForm({ detective, onSubmit }: PredictionFormProps) {
  const [text, setText] = useState('');
  const [timing, setTiming] = useState<Timing>('inicio');
  const [showSeal, setShowSeal] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!text.trim()) return;

    const prediction: Prediction = {
      id: crypto.randomUUID(),
      text: text.trim(),
      timing,
      timestamp: new Date().toISOString(),
      detective,
      sealed: true,
      correct: null,
    };

    onSubmit(prediction);
    setText('');
    setTiming('inicio');

    // Wax seal animation
    setShowSeal(true);
    setTimeout(() => setShowSeal(false), 1200);
  }, [text, timing, detective, onSubmit]);

  return (
    <div className="relative">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1117] border-2 border-[#D4AF37]/30 shadow-2xl space-y-6">
        {/* Textarea */}
        <div className="space-y-2">
          <label
            htmlFor="prediction-text"
            className="block font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider uppercase"
          >
            Registrar Sospecha o Teoría en Vivo:
          </label>
          <textarea
            id="prediction-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ejemplo: 'Yo digo que Adrik no mató a nadie y está protegiendo a Alex...'"
            rows={3}
            className="w-full rounded-2xl px-4 py-3.5 text-sm font-jakarta text-white placeholder-slate-400 bg-[#07070A] border border-[#D4AF37]/40 resize-none focus:outline-none focus:border-[#F0D978] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all leading-relaxed"
          />
        </div>

        {/* Timing selector */}
        <div className="space-y-2.5">
          <span className="block font-jakarta text-xs font-semibold text-[#CBD5E1]">
            ¿En qué momento de la película se te ocurrió?
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {TIMINGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTiming(t)}
                className={`py-2 px-2 sm:px-3 rounded-xl font-jakarta text-xs font-bold border transition-all cursor-pointer ${
                  timing === t
                    ? 'bg-[#D4AF37] border-[#F0D978] text-[#07070A] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-[#141A24] border-white/10 text-[#CBD5E1] hover:border-white/30'
                }`}
              >
                {TIMING_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-cinzel text-sm font-bold tracking-wider cursor-pointer transition-all ${
            text.trim()
              ? 'bg-gradient-to-r from-[#881337] via-[#BE185D] to-[#881337] text-white border border-[#FDA4AF] shadow-[0_0_20px_rgba(136,19,55,0.4)] hover:shadow-[0_0_30px_rgba(136,19,55,0.7)]'
              : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Sellar Predicción Anti-Spoilers 🔒</span>
        </motion.button>
      </div>

      {/* Wax Seal Stamp Animation Overlay */}
      <AnimatePresence>
        {showSeal && (
          <motion.div
            initial={{ scale: 2.5, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#881337] to-[#5B0820] border-4 border-[#F0D978] flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(136,19,55,0.9)]">
              <span className="font-cinzel text-xs font-black text-[#F0D978] tracking-widest">
                SELLADO
              </span>
              <span className="text-2xl mt-1">🔒</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
