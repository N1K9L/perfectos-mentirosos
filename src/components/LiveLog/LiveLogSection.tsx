import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SectionHeader from '../Shared/SectionHeader';
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
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="space-y-16 sm:space-y-20">
        <SectionHeader
          eyebrow="Bóveda anti-spoilers"
          title="Bitácora Secreta"
          subtitle="Escribe tus sospechas durante la llamada. Al sellarlas quedan ocultas para compartir pantalla sin arruinar nada."
          className="!mb-0"
        />

        {/* Main Content Card */}
        <motion.div
          className="luxury-card rounded-3xl p-6 sm:p-10 md:p-12 space-y-12"
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
          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[#94A3B8] text-[11px] sm:text-xs font-jakarta tracking-[0.24em] uppercase font-semibold">
              Expedientes Registrados
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
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
