import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Pencil } from 'lucide-react';
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
      <span className="font-jakarta text-xs sm:text-sm text-[#94A3B8] tracking-wide">
        Estreno · 20 de noviembre · Prime Video
      </span>

      {/* Countdown Cards */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center space-y-2.5">
              {/* Luxury Digital Card */}
              <div className="relative w-16 h-20 sm:w-24 sm:h-28 rounded-2xl overflow-hidden glass flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={unit.value}
                    initial={{ y: '-100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-cinzel text-3xl sm:text-5xl font-semibold text-[#F0D978] tabular-nums"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* High Contrast Label */}
              <span className="font-jakarta text-[10px] sm:text-[11px] font-medium text-[#94A3B8] uppercase tracking-[0.22em]">
                {unit.label}
              </span>
            </div>

            {/* Glowing Colon */}
            {idx < units.length - 1 && (
              <span className="font-cinzel text-xl sm:text-3xl text-[#D4AF37]/40 -mt-7 select-none">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Videocall Time Pill */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
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
            className="inline-flex items-center gap-1.5 font-jakarta text-xs font-semibold text-[#F0D978] hover:text-white transition-colors cursor-pointer"
            title="Toca para ajustar la hora"
          >
            {callTime} h <Pencil className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
