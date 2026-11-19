import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import type { Prediction } from './types';
import { TIMING_LABELS, DETECTIVE_LABELS } from './types';
import SealedPrediction from './SealedPrediction';

interface PredictionVaultProps {
  predictions: Prediction[];
  setPredictions: (value: Prediction[] | ((prev: Prediction[]) => Prediction[])) => void;
}

export default function PredictionVault({
  predictions,
  setPredictions,
}: PredictionVaultProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [justRevealed, setJustRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const sealedCount = useMemo(
    () => predictions.filter((p) => p.sealed).length,
    [predictions]
  );

  const allRevealed = useMemo(
    () => predictions.length > 0 && predictions.every((p) => !p.sealed),
    [predictions]
  );

  const scores = useMemo(() => {
    if (!allRevealed) return null;

    const nikol = predictions.filter((p) => p.detective === 'nikol');
    const aitana = predictions.filter((p) => p.detective === 'aitana');

    return {
      nikol: {
        correct: nikol.filter((p) => p.correct === true).length,
        total: nikol.length,
      },
      aitana: {
        correct: aitana.filter((p) => p.correct === true).length,
        total: aitana.length,
      },
    };
  }, [predictions, allRevealed]);

  const handleRevealAll = useCallback(() => {
    setPredictions((prev) =>
      prev.map((p) => ({ ...p, sealed: false }))
    );
    setShowConfirm(false);
    setJustRevealed(true);
  }, [setPredictions]);

  const handleRevealOne = useCallback(
    (id: string) => {
      setPredictions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, sealed: false } : p))
      );
    },
    [setPredictions]
  );

  const handleScore = useCallback(
    (id: string, correct: boolean) => {
      setPredictions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, correct } : p))
      );
    },
    [setPredictions]
  );

  const handleCopy = useCallback(async () => {
    const formatted = predictions
      .map((p, i) => {
        const result =
          p.correct === true
            ? '✅ Correcto'
            : p.correct === false
            ? '❌ Incorrecto'
            : '⏳ Sin evaluar';
        return `${i + 1}. [${DETECTIVE_LABELS[p.detective]}] (${TIMING_LABELS[p.timing]})\n   "${p.text}"\n   ${result}`;
      })
      .join('\n\n');

    const header = '🎬 BITÁCORA SECRETA — Perfectos Mentirosos\n\n';
    const summary =
      scores
        ? `\n\n📊 RESULTADOS:\nNikol: ${scores.nikol.correct}/${scores.nikol.total} correctas\nAitana: ${scores.aitana.correct}/${scores.aitana.total} correctas`
        : '';

    await navigator.clipboard.writeText(header + formatted + summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [predictions, scores]);

  if (predictions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted font-playfair text-lg italic">
          Aún no hay predicciones selladas...
        </p>
        <p className="text-text-muted text-sm mt-2 font-jakarta">
          ¡Escribe tu primera teoría arriba! 🔮
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sealed count */}
      <div className="text-center">
        <p className="font-playfair text-text-secondary text-lg">
          🔒 <span className="text-gold font-semibold">{sealedCount}</span>{' '}
          {sealedCount === 1 ? 'teoría sellada' : 'teorías selladas'}
        </p>
      </div>

      {/* Prediction cards */}
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <SealedPrediction
            key={prediction.id}
            prediction={prediction}
            onReveal={handleRevealOne}
            onScore={handleScore}
            revealDelay={justRevealed ? index * 0.3 : 0}
          />
        ))}
      </div>

      {/* Score summary */}
      <AnimatePresence>
        {allRevealed && scores && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-xl p-6 text-center space-y-3"
          >
            <h4 className="font-cinzel text-gold text-lg tracking-wider">
              📊 Resultados
            </h4>
            <div className="flex justify-center gap-8 text-sm font-jakarta">
              <div>
                <span className="text-text-secondary">Nikol:</span>{' '}
                <span className="text-gold font-bold">
                  {scores.nikol.correct}/{scores.nikol.total}
                </span>{' '}
                <span className="text-text-muted">correctas</span>
              </div>
              <div>
                <span className="text-text-secondary">Aitana:</span>{' '}
                <span className="text-gold font-bold">
                  {scores.aitana.correct}/{scores.aitana.total}
                </span>{' '}
                <span className="text-text-muted">correctas</span>
              </div>
            </div>

            {/* Copy button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopy}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-jakarta font-semibold transition-colors"
              style={{
                background: copied
                  ? 'rgba(34, 197, 94, 0.2)'
                  : 'rgba(212, 175, 55, 0.15)',
                border: copied
                  ? '1px solid rgba(34, 197, 94, 0.4)'
                  : '1px solid rgba(212, 175, 55, 0.3)',
                color: copied ? '#22C55E' : '#D4AF37',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar mis predicciones para enviar 💌
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal all button — only when there are sealed predictions */}
      {sealedCount > 0 && (
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowConfirm(true)}
            className="w-full py-4 rounded-xl font-cinzel font-bold text-base tracking-wider text-text-primary"
            style={{
              background: 'linear-gradient(135deg, #881337, #BE185D, #881337)',
              boxShadow:
                '0 0 30px rgba(136, 19, 55, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            🎬 Fin de la película: Romper sellos y revelar teorías 🔓
          </motion.button>
        </div>
      )}

      {/* Confirmation modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative glass rounded-2xl p-8 max-w-sm w-full text-center space-y-6"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="text-5xl">🎭</div>
              <h3 className="font-cinzel text-gold text-xl">
                ¿Seguro/a?
              </h3>
              <p className="font-jakarta text-text-secondary text-sm">
                No hay vuelta atrás. Se revelarán todas las predicciones
                selladas.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-jakarta font-semibold text-sm text-text-secondary transition-colors hover:text-text-primary"
                  style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(30, 41, 59, 0.5)',
                  }}
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRevealAll}
                  className="flex-1 py-3 rounded-xl font-cinzel font-bold text-sm text-text-primary"
                  style={{
                    background:
                      'linear-gradient(135deg, #881337, #BE185D)',
                    boxShadow: '0 0 20px rgba(136, 19, 55, 0.4)',
                  }}
                >
                  ¡Revelar todo! 🔓
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
