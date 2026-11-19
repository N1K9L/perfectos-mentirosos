import { FileText } from 'lucide-react';
import CollapsibleCard from '../Shared/CollapsibleCard';

export default function Synopsis() {
  return (
    <CollapsibleCard
      title="📜 Expediente Clasificado: Sinopsis"
      icon={FileText}
      defaultOpen
      className="relative overflow-hidden"
    >
      {/* CLASIFICADO watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-cinzel text-7xl sm:text-8xl font-black uppercase opacity-[0.04] tracking-[0.25em]"
          style={{
            transform: 'rotate(-25deg)',
            color: 'var(--color-gold)',
          }}
        >
          CLASIFICADO
        </span>
      </div>

      <div className="relative z-10 space-y-4">
        <p
          className="font-jakarta text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Jude Derry llega a la elitista y peligrosa Universidad Tagus con una
          misión secreta relacionada con su hermano, pero su plan se complica al
          cruzarse con los intocables hermanos Cash, herederos de la familia más
          poderosa del campus. Un juego de seducción, misterio, secretos y
          mentiras donde nadie es quien dice ser.
        </p>

        <p
          className="font-jakarta text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Dirigida por Jesús Colmenar · 103 min · Prime Video
        </p>
      </div>
    </CollapsibleCard>
  );
}
