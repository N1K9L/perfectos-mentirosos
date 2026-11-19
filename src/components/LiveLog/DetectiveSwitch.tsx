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
      <p className="font-playfair text-text-secondary text-sm tracking-wider uppercase">
        ¿Quién predice?
      </p>
      <div
        className="relative flex items-center rounded-full p-1 cursor-pointer select-none"
        style={{
          background: 'rgba(13, 17, 23, 0.8)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          width: 280,
          height: 48,
        }}
        onClick={() => setMode(isAitana ? 'nikol' : 'aitana')}
        role="switch"
        aria-checked={isAitana}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setMode(isAitana ? 'nikol' : 'aitana');
          }
        }}
      >
        {/* Sliding gold indicator */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 136,
            height: 40,
            background: 'linear-gradient(135deg, #A88A2A, #D4AF37, #F0D978)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          }}
          animate={{ x: isAitana ? 136 : 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {/* Labels */}
        <div className="relative z-10 flex w-full">
          <span
            className={`flex-1 text-center text-sm font-semibold transition-colors duration-300 leading-[40px] ${
              !isAitana ? 'text-bg-deep' : 'text-text-secondary'
            }`}
          >
            Nikol 🕵️‍♂️
          </span>
          <span
            className={`flex-1 text-center text-sm font-semibold transition-colors duration-300 leading-[40px] ${
              isAitana ? 'text-bg-deep' : 'text-text-secondary'
            }`}
          >
            Aitana 🕵️‍♀️
          </span>
        </div>
      </div>
    </div>
  );
}
