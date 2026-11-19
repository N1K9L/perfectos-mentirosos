import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';
import type { Prediction } from './types';
import { TIMING_LABELS, DETECTIVE_LABELS } from './types';

interface SealedPredictionProps {
  prediction: Prediction;
  onReveal?: (id: string) => void;
  onScore: (id: string, correct: boolean) => void;
  revealDelay?: number;
}

export default function SealedPrediction({
  prediction,
  onScore,
  revealDelay = 0,
}: SealedPredictionProps) {
  const rotation = useMemo(
    () => (Math.random() * 2 - 1).toFixed(2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prediction.id]
  );

  const formattedTime = useMemo(() => {
    const d = new Date(prediction.timestamp);
    return d.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [prediction.timestamp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: revealDelay, duration: 0.5 }}
      className="relative rounded-2xl p-6 sm:p-7 overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-gradient-to-br from-[#10141D] to-[#0A0D12] space-y-4"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-cinzel text-[#F0D978] font-bold tracking-wider uppercase">
            {DETECTIVE_LABELS[prediction.detective]}
          </span>
          <span className="text-xs text-white/30">•</span>
          <span className="text-xs sm:text-sm text-[#FDA4AF] font-jakarta font-semibold">
            {TIMING_LABELS[prediction.timing]}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm text-[#CBD5E1] font-mono font-medium">
            {formattedTime}
          </span>
          {prediction.sealed ? (
            <Lock className="w-4 h-4 text-[#FDA4AF]" />
          ) : (
            <Unlock className="w-4 h-4 text-[#F0D978]" />
          )}
        </div>
      </div>

      {/* Prediction text */}
      <div className="relative py-2">
        <p
          className={`font-jakarta text-base sm:text-lg leading-relaxed text-white font-medium transition-all duration-700 ${
            prediction.sealed ? 'sealed-text select-none' : 'sealed-text revealed'
          }`}
        >
          {prediction.text}
        </p>

        {prediction.sealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-[#881337] border border-[#F0D978] flex items-center justify-center shadow-[0_0_20px_rgba(136,19,55,0.8)]">
              <span className="text-sm">🔒</span>
            </div>
            <span className="font-cinzel text-xs text-[#F0D978] font-black uppercase tracking-widest bg-[#07070A]/85 px-3 py-1 rounded-full border border-[#D4AF37]/40">
              EXPEDIENTE CENSURADO
            </span>
          </div>
        )}
      </div>

      {/* Footer / Scoring */}
      {!prediction.sealed && (
        <div className="pt-4 border-t border-white/10">
          {prediction.correct === null ? (
            <div className="flex gap-3">
              <button
                onClick={() => onScore(prediction.id, true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold font-jakarta bg-[#22C55E]/20 border border-[#22C55E]/60 text-[#22C55E] hover:bg-[#22C55E]/30 transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Le atiné ✅</span>
              </button>
              <button
                onClick={() => onScore(prediction.id, false)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold font-jakarta bg-[#EF4444]/20 border border-[#EF4444]/60 text-[#EF4444] hover:bg-[#EF4444]/30 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Fallé ❌</span>
              </button>
            </div>
          ) : (
            <div
              className={`text-center py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold font-jakarta border ${
                prediction.correct
                  ? 'bg-[#22C55E]/15 border-[#22C55E]/50 text-[#22C55E]'
                  : 'bg-[#EF4444]/15 border-[#EF4444]/50 text-[#EF4444]'
              }`}
            >
              {prediction.correct ? '🏆 ¡Predicción Correcta! (+1 punto)' : '💥 Teoría Descartada'}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
