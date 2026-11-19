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
  onReveal: _onReveal,
  onScore,
  revealDelay = 0,
}: SealedPredictionProps) {
  const rotation = useMemo(
    () => (Math.random() * 4 - 2).toFixed(2),
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
      className="relative rounded-xl p-5 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(13, 17, 23, 0.9), rgba(7, 7, 10, 0.95))',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23D4AF37\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-jakarta text-gold font-semibold tracking-wider uppercase">
            {DETECTIVE_LABELS[prediction.detective]}
          </span>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xs text-text-muted font-jakarta">
            {TIMING_LABELS[prediction.timing]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-jakarta">
            {formattedTime}
          </span>
          {prediction.sealed ? (
            <Lock className="w-3.5 h-3.5 text-crimson" />
          ) : (
            <Unlock className="w-3.5 h-3.5 text-gold" />
          )}
        </div>
      </div>

      {/* Prediction text */}
      <p
        className={`font-jakarta text-sm leading-relaxed text-text-primary mb-3 transition-all duration-800 ${
          prediction.sealed ? 'sealed-text' : 'sealed-text revealed'
        }`}
      >
        {prediction.text}
      </p>

      {/* Footer */}
      {prediction.sealed ? (
        <div className="flex items-center justify-center pt-2">
          <span className="wax-seal inline-block text-2xl rounded-full p-1">
            🔴
          </span>
        </div>
      ) : (
        <div className="pt-2">
          {prediction.correct === null ? (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScore(prediction.id, true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold font-jakarta transition-colors"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#22C55E',
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Le atiné ✅
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScore(prediction.id, false)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold font-jakarta transition-colors"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                }}
              >
                <XCircle className="w-4 h-4" />
                Fallé ❌
              </motion.button>
            </div>
          ) : (
            <div
              className="text-center py-2 rounded-lg text-sm font-semibold font-jakarta"
              style={{
                background: prediction.correct
                  ? 'rgba(34, 197, 94, 0.1)'
                  : 'rgba(239, 68, 68, 0.1)',
                color: prediction.correct ? '#22C55E' : '#EF4444',
              }}
            >
              {prediction.correct ? '✅ ¡Le atinó!' : '❌ Falló'}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
