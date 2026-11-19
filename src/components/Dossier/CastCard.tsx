import { useState } from 'react';

interface CastCardProps {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  icon: string;
}

export default function CastCard({
  character,
  actor,
  knownFor,
  description,
  icon,
}: CastCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1200px', width: '100%', maxWidth: 280, height: 380 }}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Flip card for ${character}`}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="glass absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl p-6"
          style={{
            backfaceVisibility: 'hidden',
            borderColor: 'var(--color-border-gold)',
          }}
        >
          <span className="text-5xl" role="img" aria-label={character}>
            {icon}
          </span>
          <h3
            className="font-cinzel text-xl font-bold text-center tracking-wide"
            style={{ color: 'var(--color-gold)' }}
          >
            {character}
          </h3>
          <p
            className="font-jakarta text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {actor}
          </p>
          <span
            className="mt-auto text-xs uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Toca para descubrir →
          </span>
        </div>

        {/* Back */}
        <div
          className="glass absolute inset-0 flex flex-col justify-center gap-3 rounded-2xl p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: 'var(--color-border-gold)',
          }}
        >
          <h4
            className="font-cinzel text-lg font-bold"
            style={{ color: 'var(--color-gold)' }}
          >
            {actor}
          </h4>
          <p
            className="font-jakarta text-sm leading-relaxed"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {description}
          </p>
          <div className="mt-2 rounded-lg p-3" style={{ background: 'rgba(212,175,55,0.08)' }}>
            <p
              className="font-jakarta text-xs font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Conocido/a por
            </p>
            <p
              className="font-jakarta text-sm mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {knownFor}
            </p>
          </div>
          <span
            className="mt-auto text-xs uppercase tracking-widest text-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            ← Toca para volver
          </span>
        </div>
      </div>
    </div>
  );
}
