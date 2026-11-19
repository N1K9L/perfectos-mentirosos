import React from 'react';

interface SectionDividerProps {
  className?: string;
  variant?: 'gold' | 'crimson' | 'simple';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  variant = 'gold',
}) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto py-24 sm:py-36 px-4 flex items-center justify-center ${className}`}>
      {/* Left fading line */}
      <div
        className="flex-1 h-px"
        style={{
          background:
            variant === 'crimson'
              ? 'linear-gradient(90deg, transparent, rgba(136, 19, 55, 0.4), rgba(136, 19, 55, 0.8))'
              : 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.7))',
        }}
      />

      {/* Center Ornament */}
      <div className="mx-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/50" />
        <div className="w-3 h-3 rotate-45 bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
          <div className="w-1 h-1 bg-[#F0D978]" />
        </div>
        <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/50" />
      </div>

      {/* Right fading line */}
      <div
        className="flex-1 h-px"
        style={{
          background:
            variant === 'crimson'
              ? 'linear-gradient(90deg, rgba(136, 19, 55, 0.8), rgba(136, 19, 55, 0.4), transparent)'
              : 'linear-gradient(90deg, rgba(212, 175, 55, 0.7), rgba(212, 175, 55, 0.3), transparent)',
        }}
      />
    </div>
  );
};

export default SectionDivider;
