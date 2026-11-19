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
      <div
        className="glass rounded-2xl p-6 space-y-5"
        style={{ border: '1px solid rgba(212, 175, 55, 0.15)' }}
      >
        {/* Textarea */}
        <div>
          <label
            htmlFor="prediction-text"
            className="block font-playfair text-sm text-text-secondary mb-2"
          >
            Tu teoría / predicción
          </label>
          <textarea
            id="prediction-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Creo que el personaje va a..."
            rows={3}
            className="w-full rounded-xl px-4 py-3 text-sm font-jakarta text-text-primary placeholder-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-gold/40 transition-shadow"
            style={{
              background: 'rgba(7, 7, 10, 0.7)',
              border: '1px solid rgba(30, 41, 59, 0.5)',
            }}
          />
        </div>

        {/* Timing selector */}
        <div>
          <p className="font-playfair text-sm text-text-secondary mb-3">
            ¿En qué momento de la peli estamos?
          </p>
          <div className="flex flex-wrap gap-2">
            {TIMINGS.map((t) => (
              <label
                key={t}
                className={`relative flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 text-sm font-jakarta transition-all duration-200 ${
                  timing === t
                    ? 'text-bg-deep font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{
                  background:
                    timing === t
                      ? 'linear-gradient(135deg, #A88A2A, #D4AF37)'
                      : 'rgba(13, 17, 23, 0.6)',
                  border:
                    timing === t
                      ? '1px solid #D4AF37'
                      : '1px solid rgba(30, 41, 59, 0.5)',
                }}
              >
                <input
                  type="radio"
                  name="timing"
                  value={t}
                  checked={timing === t}
                  onChange={() => setTiming(t)}
                  className="sr-only"
                />
                {TIMING_LABELS[t]}
              </label>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!text.trim()}
          whileHover={{ scale: text.trim() ? 1.02 : 1 }}
          whileTap={{ scale: text.trim() ? 0.97 : 1 }}
          className="w-full py-3 rounded-xl font-cinzel font-semibold text-sm tracking-wider transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #881337, #BE185D)',
            color: '#F1F5F9',
            boxShadow: text.trim()
              ? '0 0 25px rgba(136, 19, 55, 0.4)'
              : 'none',
          }}
        >
          <Lock className="inline-block w-4 h-4 mr-2 -mt-0.5" />
          Sellar Predicción 🔒
        </motion.button>
      </div>

      {/* Wax seal stamp animation overlay */}
      <AnimatePresence>
        {showSeal && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="text-7xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(136, 19, 55, 0.8))',
              }}
            >
              🔴
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
