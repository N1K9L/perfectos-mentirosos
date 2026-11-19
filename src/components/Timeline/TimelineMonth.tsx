import React, { useRef } from 'react';

interface TimelineMonthProps {
  month: number;
  title: string;
  description: string;
  emoji: string;
  isSpecial?: boolean;
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

const TimelineMonth: React.FC<TimelineMonthProps> = ({
  month,
  title,
  description,
  emoji,
  isSpecial = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = month % 2 !== 0;

  return (
    <div
      className={`timeline-month relative flex items-center w-full mb-14 md:mb-20 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
    >
      {/* Central Gold Spine */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/50 to-[#D4AF37]/20 pointer-events-none" />

      {/* Node Emblem */}
      <div
        className={`timeline-node absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
          isSpecial
            ? 'border-[#FDA4AF] bg-[#881337] shadow-[0_0_25px_rgba(136,19,55,0.8),0_0_15px_rgba(212,175,55,0.4)]'
            : 'border-[#F0D978] bg-[#0D1117] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
        }`}
      >
        <span className="font-cinzel text-xs font-black text-[#F0D978]">
          {ROMAN_NUMERALS[month - 1] ?? month}
        </span>
      </div>

      {/* Spacer for desktop alignment */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card Content */}
      <div
        ref={cardRef}
        className={`timeline-card ml-16 md:ml-0 md:w-1/2 ${
          isLeft ? 'md:pr-14' : 'md:pl-14'
        }`}
      >
        <div
          className={`luxury-card rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] group border-2 ${
            isSpecial
              ? 'border-[#881337] hover:border-[#FDA4AF] shadow-[0_0_30px_rgba(136,19,55,0.25)]'
              : 'border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.1)]'
          }`}
        >
          {/* Ambient Glow */}
          {isSpecial && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#881337]/20 via-transparent to-[#D4AF37]/10 pointer-events-none rounded-3xl" />
          )}

          {/* Top Emoji & Month Tag */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl sm:text-4xl">{emoji}</span>
            <span className={`text-[10px] font-jakarta font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isSpecial
                ? 'bg-[#881337]/50 text-[#FDA4AF] border border-[#FDA4AF]/40'
                : 'bg-[#D4AF37]/15 text-[#F0D978] border border-[#D4AF37]/30'
            }`}>
              Mes {month}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-cinzel text-lg sm:text-xl font-bold mb-3 tracking-wide ${
              isSpecial ? 'text-[#FDA4AF]' : 'text-white group-hover:text-[#F0D978]'
            } transition-colors`}
          >
            {title}
          </h3>

          {/* Description — Crisp & Readable */}
          <p className="font-jakarta text-sm sm:text-base text-[#F1F5F9] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineMonth;
