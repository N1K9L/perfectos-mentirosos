import { useState } from 'react';
import { Shield, Sparkles, ArrowRight, Eye } from 'lucide-react';

interface CastCardProps {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  icon: string;
  roleBadge: string;
  quote: string;
  trait: string;
}

export default function CastCard({
  character,
  actor,
  knownFor,
  description,
  icon,
  roleBadge,
  quote,
  trait,
}: CastCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer select-none w-full max-w-[320px] h-[440px]"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`Expediente de ${character}`}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden luxury-card border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#881337]/30 to-transparent blur-2xl pointer-events-none" />

          {/* Top Badge & Insignia */}
          <div className="flex items-center justify-between z-10">
            <span className="font-jakarta text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#881337]/40 text-[#FDA4AF] border border-[#881337]/60">
              {roleBadge}
            </span>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 bg-[#07070A]/80 flex items-center justify-center text-[#F0D978]">
              <Shield className="w-4 h-4" />
            </div>
          </div>

          {/* Central Emblem & Avatar representation */}
          <div className="flex flex-col items-center text-center my-auto z-10 space-y-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E293B] via-[#0D1117] to-[#07070A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <span className="text-4xl drop-shadow-md">{icon}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#881337] border border-[#F0D978] flex items-center justify-center text-[10px] text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#F0D978]" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                {character}
              </h3>
              <p className="font-jakarta text-xs sm:text-sm font-semibold text-[#F0D978]">
                {actor}
              </p>
            </div>

            <p className="font-playfair text-xs italic text-[#CBD5E1] px-2 leading-relaxed">
              "{quote}"
            </p>
          </div>

          {/* Bottom Flip Action Hint */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between z-10">
            <span className="font-jakarta text-[11px] font-semibold text-[#94A3B8]">
              Rasgo: <strong className="text-white">{trait}</strong>
            </span>
            <span className="inline-flex items-center gap-1 font-jakarta text-xs font-bold text-[#F0D978] group-hover:translate-x-1 transition-transform">
              <span>Ver ficha</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* BACK SIDE (FLIPPED DOSSIER) */}
        <div
          className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden bg-[#0A0E14] border-2 border-[#F0D978] shadow-[0_0_35px_rgba(212,175,55,0.3)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
            <div>
              <span className="font-jakarta text-[10px] text-[#FDA4AF] uppercase tracking-wider block font-bold">
                Expediente Tagus Confidencial
              </span>
              <h4 className="font-cinzel text-base font-bold text-[#F0D978]">
                {actor}
              </h4>
            </div>
            <Eye className="w-4 h-4 text-[#D4AF37]" />
          </div>

          {/* Description */}
          <div className="space-y-4 my-auto">
            <div>
              <span className="font-jakarta text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                Perfil Psicológico:
              </span>
              <p className="font-jakarta text-xs sm:text-sm text-[#F1F5F9] leading-relaxed mt-1">
                {description}
              </p>
            </div>

            {knownFor && (
              <div className="p-3 rounded-xl bg-[#141A24] border border-[#D4AF37]/20">
                <span className="font-jakarta text-[10px] text-[#F0D978] uppercase tracking-wider block font-bold">
                  Trabajos destacados:
                </span>
                <p className="font-jakarta text-xs font-semibold text-white mt-0.5">
                  {knownFor}
                </p>
              </div>
            )}
          </div>

          {/* Return Hint */}
          <div className="pt-3 border-t border-white/10 text-center">
            <span className="font-jakarta text-xs font-semibold text-[#FDA4AF]">
              🔄 Toca para volver a la portada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
