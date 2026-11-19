import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { useCountdown } from '../../hooks/useLocalStorage';

const STORAGE_KEY = 'nikotana_callTime';

interface TimeUnit {
  label: string;
  value: number;
}

function getStoredTime(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : '20:30';
  } catch {
    return '20:30';
  }
}

export default function Countdown() {
  const [callTime, setCallTime] = useState<string>(getStoredTime);
  const [isEditing, setIsEditing] = useState(false);

  // Target: Nov 20, 2026
  const targetDate = useMemo(() => {
    const [hours, minutes] = callTime.split(':').map(Number);
    const date = new Date(2026, 10, 20); // Nov is 10 in JS
    date.setHours(hours ?? 20, minutes ?? 30, 0, 0);
    return date;
  }, [callTime]);

  const timeLeft = useCountdown(targetDate);

  const handleTimeChange = useCallback((newTime: string) => {
    setCallTime(newTime);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTime));
    } catch {
      // silent
    }
  }, []);

  const units: TimeUnit[] = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8 }}
    >
      {/* Event Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#881337]/30 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <Calendar className="w-3.5 h-3.5 text-[#F0D978]" />
        <span className="font-jakarta text-xs font-semibold text-[#F1F5F9] tracking-wider uppercase">
          Estreno Oficial: 20 de Noviembre de 2026 · Prime Video
        </span>
      </div>

      {/* Countdown Cards */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 w-full">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-2.5 sm:gap-4">
            <div className="flex flex-col items-center">
              {/* Luxury Digital Card */}
              <div className="relative w-16 h-20 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] bg-gradient-to-b from-[#141A24] via-[#0D1117] to-[#07070A] group">
                {/* Horizontal split groove */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#D4AF37]/20 z-10" />

                {/* Top glossy reflection */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                {/* Numerical display */}
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                  <span className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F0D978] drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)] tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* High Contrast Label */}
              <span className="mt-2 font-jakarta text-[11px] sm:text-xs font-bold text-[#E2E8F0] uppercase tracking-[0.2em]">
                {unit.label}
              </span>
            </div>

            {/* Glowing Colon */}
            {idx < units.length - 1 && (
              <span className="font-cinzel text-2xl sm:text-4xl font-bold text-[#D4AF37] -mt-6 animate-pulse select-none">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Videocall Time Pill */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass border border-[#D4AF37]/30 shadow-lg">
        <Clock className="w-4 h-4 text-[#FDA4AF]" />
        <span className="font-jakarta text-xs text-[#CBD5E1]">
          Hora acordada de videollamada:
        </span>

        {isEditing ? (
          <input
            type="time"
            value={callTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="bg-[#07070A] border border-[#D4AF37] rounded-lg px-2 py-0.5 text-xs text-[#F0D978] font-bold font-jakarta focus:outline-none"
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="font-jakarta text-xs font-bold text-[#F0D978] hover:text-white underline underline-offset-4 decoration-[#D4AF37]/60 transition-colors cursor-pointer"
            title="Toca para ajustar la hora"
          >
            {callTime} hrs ✏️
          </button>
        )}
      </div>
    </motion.div>
  );
}
