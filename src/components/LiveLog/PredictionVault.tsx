import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Lock, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#881337', '#FDA4AF', '#FFFFFF'],
    });
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
            ? '✅ Le atinó'
            : p.correct === false
            ? '❌ Falló'
            : '⏳ Sin calificar';
        return `${i + 1}. [${DETECTIVE_LABELS[p.detective]}] (${TIMING_LABELS[p.timing]})\n   "${p.text}"\n   ${result}`;
      })
      .join('\n\n');

    const header = '🎬 BITÁCORA SECRETA — Perfectos Mentirosos\n\n';
    const summary =
      scores
        ? `\n\n📊 PUNTAJE FINAL:\nNikol: ${scores.nikol.correct}/${scores.nikol.total} aciertos\nAitana: ${scores.aitana.correct}/${scores.aitana.total} aciertos`
        : '';

    await navigator.clipboard.writeText(header + formatted + summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [predictions, scores]);

  if (predictions.length === 0) {
    return (
      <div className="text-center py-16 p-8 rounded-[26px] bg-[#0D1117] border border-white/10 space-y-3">
        <p className="font-playfair text-xl sm:text-2xl text-[#FDA4AF] italic">
          Aún no hay predicciones selladas en la bóveda...
        </p>
        <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
          Escribe tu primera sospecha en el formulario de arriba y pulsa "Sellar Predicción" 🔮
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Vault Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0D1117] border border-[#D4AF37]/35 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F0D978]">
            <Lock className="w-4 h-4" />
          </div>
          <span className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wider">
            BÓVEDA DE EXPEDIENTES CLASIFICADOS
          </span>
        </div>
        <span className="font-jakarta text-xs sm:text-sm font-bold text-[#F0D978] bg-[#D4AF37]/15 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 w-fit">
          {sealedCount} {sealedCount === 1 ? 'sellada' : 'selladas'} / {predictions.length} total
        </span>
      </div>

      {/* Prediction Cards Grid */}
      <div className="space-y-6">
        {predictions.map((prediction, index) => (
          <SealedPrediction
            key={prediction.id}
            prediction={prediction}
            onReveal={handleRevealOne}
            onScore={handleScore}
            revealDelay={justRevealed ? index * 0.2 : 0}
          />
        ))}
      </div>

      {/* Post-Credits Results & Scoring */}
      <AnimatePresence>
        {allRevealed && scores && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#141A24] to-[#0D1117] border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.3)] text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-[#F0D978]" />
              <h4 className="font-cinzel text-lg sm:text-xl font-bold gold-shimmer tracking-wider">
                Marcador Final de Detectives
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto font-jakarta">
              <div className="p-3.5 rounded-2xl bg-[#07070A] border border-white/10">
                <span className="text-xs text-[#CBD5E1] block font-semibold">Detective Nikol 🕵️‍♂️</span>
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#F0D978] block mt-1">
                  {scores.nikol.correct}/{scores.nikol.total}
                </span>
                <span className="text-[10px] text-[#94A3B8]">aciertos</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#07070A] border border-white/10">
                <span className="text-xs text-[#CBD5E1] block font-semibold">Detective Aitana 🕵️‍♀️</span>
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#FDA4AF] block mt-1">
                  {scores.aitana.correct}/{scores.aitana.total}
                </span>
                <span className="text-[10px] text-[#94A3B8]">aciertos</span>
              </div>
            </div>

            {/* Copy Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-jakarta font-bold transition-all cursor-pointer bg-[#D4AF37]/20 border border-[#D4AF37] text-white hover:bg-[#D4AF37]/30"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>¡Resultados Copiados al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#F0D978]" />
                  <span>Copiar Predicciones para Comparar por Chat 💌</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Master Reveal Button (when sealed predictions exist) */}
      {sealedCount > 0 && (
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowConfirm(true)}
            className="w-full py-4 px-6 rounded-2xl font-cinzel font-bold text-sm sm:text-base tracking-wider text-white cursor-pointer bg-gradient-to-r from-[#881337] via-[#BE185D] to-[#881337] border-2 border-[#FDA4AF] shadow-[0_0_30px_rgba(136,19,55,0.6)] hover:shadow-[0_0_40px_rgba(136,19,55,0.9)] transition-all"
          >
            🎬 Fin de la Película: Romper Sellos y Revelar Teorías 🔓
          </motion.button>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setShowConfirm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative p-8 rounded-3xl bg-[#0D1117] border-2 border-[#D4AF37] max-w-sm w-full text-center space-y-5 shadow-2xl z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#881337]/40 border border-[#D4AF37] flex items-center justify-center text-3xl mx-auto shadow-lg">
                🎭
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                ¿Romper los Sellos de Lacre?
              </h3>
              <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Esta acción desbloqueará y revelará todas las teorías escritas durante la película para que podamos calificarlas y descubrir quién es el mejor detective.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-jakarta font-semibold text-xs text-[#CBD5E1] bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRevealAll}
                  className="flex-1 py-3 rounded-xl font-cinzel font-bold text-xs text-white bg-gradient-to-r from-[#881337] to-[#BE185D] border border-[#FDA4AF] shadow-lg cursor-pointer"
                >
                  ¡Romper Sellos! 🔓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
