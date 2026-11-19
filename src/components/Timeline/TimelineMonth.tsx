import React, { useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface TimelineMonthProps {
  month: number;
  title: string;
  category: string;
  description: string;
  isSpecial?: boolean;
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

const TimelineMonth: React.FC<TimelineMonthProps> = ({
  month,
  title,
  category,
  description,
  isSpecial = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = month % 2 !== 0;

  return (
    <div
      className={`timeline-month relative flex items-center w-full mb-28 md:mb-36 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
    >
      {/* Central Gold Spine */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/50 to-[#D4AF37]/20 pointer-events-none" />

      {/* Node Emblem */}
      <div
        className={`timeline-node absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
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
          isLeft ? 'md:pr-20' : 'md:pl-20'
        }`}
      >
        <div
          className={`luxury-card rounded-[28px] p-8 sm:p-11 md:p-12 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] group border-2 ${
            isSpecial
              ? 'border-[#881337] hover:border-[#FDA4AF] shadow-[0_0_35px_rgba(136,19,55,0.3)]'
              : 'border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.12)]'
          }`}
        >
          {/* Ambient Glow */}
          {isSpecial && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#881337]/20 via-transparent to-[#D4AF37]/10 pointer-events-none rounded-[28px]" />
          )}

          {/* Top Category Badge */}
          <div className="flex items-center justify-between mb-5">
            <span
              className={`text-[11px] font-jakarta font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                isSpecial
                  ? 'bg-[#881337]/50 text-[#FDA4AF] border border-[#FDA4AF]/40'
                  : 'bg-[#D4AF37]/15 text-[#F0D978] border border-[#D4AF37]/35'
              }`}
            >
              {category}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              {isSpecial ? (
                <Heart className="w-4 h-4 text-[#FDA4AF] fill-current animate-pulse" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#F0D978]" />
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-cinzel text-2xl sm:text-3xl font-black mb-4 tracking-wide ${
              isSpecial ? 'text-[#FDA4AF]' : 'text-white group-hover:text-[#F0D978]'
            } transition-colors`}
          >
            {title}
          </h3>

          {/* Description — Crisp & Readable */}
          <p className="font-jakarta text-base sm:text-lg text-[#F1F5F9] leading-relaxed sm:leading-loose font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineMonth;
