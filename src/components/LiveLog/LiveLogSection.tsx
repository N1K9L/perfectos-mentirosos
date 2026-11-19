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
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <div className="space-y-12">
        {/* Section header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F0D978] text-xs uppercase tracking-widest font-jakarta font-semibold">
            <span>Bóveda en Tiempo Real</span>
            <span className="w-1 h-1 rounded-full bg-[#FDA4AF]" />
            <span>Anti-Spoilers para Discord</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold gold-shimmer tracking-wider">
            BITÁCORA SECRETA
          </h2>
          <p className="font-playfair text-[#CBD5E1] text-lg sm:text-xl italic max-w-xl mx-auto leading-relaxed">
            Escribe tus sospechas en vivo durante la llamada. Al sellarlas quedarán censuradas para que puedas compartir pantalla sin arruinar nada.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="luxury-card rounded-3xl p-6 sm:p-10 space-y-10 border border-[#D4AF37]/30 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Detective Mode Selector */}
          <DetectiveSwitch mode={detectiveMode} setMode={setDetectiveMode} />

          {/* Form */}
          <PredictionForm
            detective={detectiveMode}
            onSubmit={handleNewPrediction}
          />

          {/* Gold Decorative Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <span className="text-[#D4AF37] text-xs font-cinzel tracking-widest uppercase font-bold">
              Expedientes Registrados
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>

          {/* Prediction Vault Archive */}
          <PredictionVault
            predictions={predictions}
            setPredictions={setPredictions}
          />
        </motion.div>
      </div>
    </section>
  );
}
