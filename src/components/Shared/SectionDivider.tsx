import React from 'react';

interface SectionDividerProps {
  className?: string;
  variant?: 'gold' | 'crimson' | 'simple';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', variant = 'gold' }) => {
  const color = variant === 'crimson' ? 'rgba(253, 164, 175, 0.22)' : 'rgba(212, 175, 55, 0.22)';
  return (
    <div className={`w-full max-w-5xl mx-auto px-6 py-4 sm:py-8 ${className}`} aria-hidden>
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </div>
  );
};

export default SectionDivider;
