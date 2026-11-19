import React, { useMemo } from 'react';

interface GlowParticle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const particles = useMemo<GlowParticle[]>(() => {
    const colors = ['#D4AF37', '#F0D978', '#FDA4AF', '#BE185D', '#FFFFFF'];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + 3) % 94}%`,
      size: Math.floor(Math.random() * 8 + 10),
      duration: Math.floor(Math.random() * 8 + 12),
      delay: Math.floor(Math.random() * 6),
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 24 24"
          className="absolute select-none"
          style={{
            left: p.left,
            bottom: '-30px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            color: p.color,
            animation: `floatingHeartGlow ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ))}
      <style>{`
        @keyframes floatingHeartGlow {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) rotate(35deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
