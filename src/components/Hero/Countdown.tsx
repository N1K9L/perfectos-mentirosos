import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useLocalStorage';

const STORAGE_KEY = 'nikotana_callTime';

interface TimeUnit {
  label: string;
  value: number;
}

function getStoredTime(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : '18:00';
  } catch {
    return '18:00';
  }
}

export default function Countdown() {
  const [callTime, setCallTime] = useState<string>(getStoredTime);
  const [isEditing, setIsEditing] = useState(false);

  // Build target date: Nov 20, 2026 at the chosen time
  const targetDate = useMemo(() => {
    const [hours, minutes] = callTime.split(':').map(Number);
    const date = new Date(2026, 10, 20); // month is 0-indexed
    date.setHours(hours ?? 18, minutes ?? 0, 0, 0);
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
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {/* Countdown cards */}
      <div className="flex items-center gap-2 sm:gap-4">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              {/* Flip-clock card */}
              <div className="relative w-14 h-16 sm:w-20 sm:h-24 rounded-lg overflow-hidden gold-border-shimmer">
                {/* Card background */}
                <div className="absolute inset-0 bg-[#0D1117]" />

                {/* Divider line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1E293B] z-10" />

                {/* Number */}
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                  <span className="font-cinzel text-2xl sm:text-4xl font-bold text-[#D4AF37] tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>

                {/* Subtle shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              </div>

              {/* Label */}
              <span className="mt-1.5 font-jakarta text-[10px] sm:text-xs text-[#64748B] uppercase tracking-widest">
                {unit.label}
              </span>
            </div>

            {/* Colon separator */}
            {idx < units.length - 1 && (
              <span className="font-cinzel text-xl sm:text-3xl text-[#D4AF37]/50 -mt-5 sm:-mt-6">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Videocall time setter */}
      <div className="flex items-center gap-2 mt-1">
        <span className="font-jakarta text-xs text-[#64748B]">
          Hora de la videollamada:
        </span>
        {isEditing ? (
          <input
            type="time"
            value={callTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false);
            }}
            className="bg-[#0D1117] border border-[#D4AF3740] rounded px-2 py-0.5 text-xs text-[#D4AF37] font-jakarta outline-none focus:border-[#D4AF37] transition-colors"
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-[#0D1117] border border-[#D4AF3740] rounded px-2 py-0.5 text-xs text-[#D4AF37] font-jakarta hover:border-[#D4AF37] transition-colors cursor-pointer"
          >
            {callTime}
          </button>
        )}
      </div>

      {/* Past-time message */}
      {timeLeft.isPast && (
        <motion.p
          className="font-playfair text-sm text-[#FDA4AF] italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✨ ¡El momento ha llegado! ✨
        </motion.p>
      )}
    </motion.div>
  );
}
