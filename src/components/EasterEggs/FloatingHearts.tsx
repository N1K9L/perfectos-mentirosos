import React, { useMemo } from 'react';

const HEARTS = ['❤️', '💛', '💕', '💖', '✨', '🤍', '🌹'];

interface HeartParticle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const particles = useMemo<HeartParticle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 4) % 96}%`,
      size: Math.floor(Math.random() * 12 + 14),
      duration: Math.floor(Math.random() * 10 + 14),
      delay: Math.floor(Math.random() * 10),
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatingHeart ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style>{`
        @keyframes floatingHeart {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) rotate(45deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
