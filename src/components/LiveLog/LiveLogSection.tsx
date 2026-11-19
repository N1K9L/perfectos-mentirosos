import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import DetectiveSwitch from './DetectiveSwitch';
import PredictionForm from './PredictionForm';
import PredictionVault from './PredictionVault';
import type { DetectiveMode, Prediction } from './types';

export default function LiveLogSection() {
  const [detectiveMode, setDetectiveMode] = useLocalStorage<DetectiveMode>(
    'detectiveMode',
    'nikol'
  );
  const [predictions, setPredictions] = useLocalStorage<Prediction[]>(
    'predictions',
    []
  );

  const handleNewPrediction = useCallback(
    (prediction: Prediction) => {
      setPredictions((prev) => [...prev, prediction]);
    },
    [setPredictions]
  );

  return (
    <section
      id="live-log"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Section header */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold gold-shimmer tracking-wider">
            BITÁCORA SECRETA
          </h2>
          <p className="font-playfair text-text-secondary text-lg sm:text-xl italic">
            Predicciones en tiempo real 🔮
          </p>
        </motion.div>

        {/* Main content in glass container */}
        <motion.div
          className="glass rounded-2xl p-6 sm:p-8 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Detective mode toggle */}
          <DetectiveSwitch mode={detectiveMode} setMode={setDetectiveMode} />

          {/* Prediction form */}
          <PredictionForm
            detective={detectiveMode}
            onSubmit={handleNewPrediction}
          />

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
              }}
            />
            <span className="text-text-muted text-xs font-jakarta tracking-widest uppercase">
              Archivo
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
              }}
            />
          </div>

          {/* Prediction vault */}
          <PredictionVault
            predictions={predictions}
            setPredictions={setPredictions}
          />
        </motion.div>
      </div>
    </section>
  );
}
