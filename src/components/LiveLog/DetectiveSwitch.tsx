import { motion } from 'framer-motion';
import type { DetectiveMode } from './types';

interface DetectiveSwitchProps {
  mode: DetectiveMode;
  setMode: (value: DetectiveMode | ((prev: DetectiveMode) => DetectiveMode)) => void;
}

export default function DetectiveSwitch({ mode, setMode }: DetectiveSwitchProps) {
  const isAitana = mode === 'aitana';

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-jakarta text-xs uppercase tracking-widest text-[#94A3B8] font-bold">
        ¿Quién está escribiendo en este dispositivo?
      </span>

      <div className="relative flex items-center rounded-full p-1.5 bg-[#0D1117] border-2 border-[#D4AF37]/40 max-w-sm w-full shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        {/* Nikol Option */}
        <button
          onClick={() => setMode('nikol')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-cinzel text-xs sm:text-sm font-bold transition-all cursor-pointer z-10 ${
            !isAitana
              ? 'text-[#07070A]'
              : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <span>Modo Nikol 🕵️‍♂️</span>
        </button>

        {/* Aitana Option */}
        <button
          onClick={() => setMode('aitana')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-cinzel text-xs sm:text-sm font-bold transition-all cursor-pointer z-10 ${
            isAitana
              ? 'text-[#07070A]'
              : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <span>Modo Aitana 🕵️‍♀️</span>
        </button>

        {/* Sliding Pill Indicator */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-full shadow-lg"
          style={{
            width: 'calc(50% - 6px)',
            background: isAitana
              ? 'linear-gradient(135deg, #FDA4AF, #F0D978)'
              : 'linear-gradient(135deg, #F0D978, #D4AF37)',
          }}
          animate={{ left: isAitana ? 'calc(50% + 3px)' : '3px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </div>
    </div>
  );
}
