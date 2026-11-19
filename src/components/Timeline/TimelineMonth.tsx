import React, { useRef } from 'react';

interface TimelineMonthProps {
  month: number;
  title: string;
  description: string;
  emoji: string;
  isSpecial?: boolean;
}

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
      className={`timeline-month relative flex items-center w-full mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
    >
      {/* Connecting line segment (vertical gold line, centered) */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/40 to-[#D4AF37]/20 pointer-events-none timeline-line-segment" />

      {/* Node circle */}
      <div
        className={`timeline-node absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
          isSpecial
            ? 'border-[#881337] shadow-[0_0_20px_rgba(136,19,55,0.6),0_0_40px_rgba(136,19,55,0.3)]'
            : 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4),0_0_30px_rgba(212,175,55,0.2)]'
        } bg-[#07070A]`}
      >
        <span className="font-cinzel text-sm font-bold text-[#D4AF37]">
          {month}
        </span>
      </div>

      {/* Spacer for the line side */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <div
        ref={cardRef}
        className={`timeline-card ml-16 md:ml-0 md:w-1/2 ${
          isLeft ? 'md:pr-16' : 'md:pl-16'
        }`}
      >
        <div
          className={`glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] group ${
            isSpecial
              ? 'border-[#881337]/30 hover:border-[#881337]/60 hover:shadow-[0_0_30px_rgba(136,19,55,0.2)]'
              : 'hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]'
          }`}
        >
          {/* Special glow overlay */}
          {isSpecial && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#881337]/10 via-transparent to-[#D4AF37]/5 pointer-events-none rounded-2xl" />
          )}

          {/* Emoji */}
          <div className="text-4xl mb-3">{emoji}</div>

          {/* Title */}
          <h3
            className={`font-cinzel text-lg md:text-xl font-bold mb-3 ${
              isSpecial ? 'text-[#FDA4AF]' : 'text-[#D4AF37]'
            }`}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="font-jakarta text-sm md:text-base text-[#94A3B8] leading-relaxed">
            {description}
          </p>

          {/* Decorative corner accent */}
          <div
            className={`absolute top-0 ${
              isLeft ? 'right-0' : 'left-0'
            } w-16 h-16 opacity-20 pointer-events-none`}
          >
            <div
              className={`absolute top-0 ${
                isLeft ? 'right-0' : 'left-0'
              } w-px h-8 ${isSpecial ? 'bg-[#881337]' : 'bg-[#D4AF37]'}`}
            />
            <div
              className={`absolute top-0 ${
                isLeft ? 'right-0' : 'left-0'
              } w-8 h-px ${isSpecial ? 'bg-[#881337]' : 'bg-[#D4AF37]'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineMonth;
