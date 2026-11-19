import { useState } from 'react';
import { Shield, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface CastCardProps {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  photoUrl: string;
  roleBadge: string;
  quote: string;
  trait: string;
}

export default function CastCard({
  character,
  actor,
  knownFor,
  description,
  photoUrl,
  roleBadge,
  quote,
  trait,
}: CastCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer select-none w-full max-w-[360px] h-[520px] sm:h-[540px] group"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`Expediente de ${character} (${actor})`}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 rounded-3xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE (REAL ACTOR PHOTOGRAPH) */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border border-[#D4AF37]/40 group-hover:border-[#F0D978] shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500 bg-[#07070A]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background Real Actor Image */}
          <img
            src={photoUrl}
            alt={actor}
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
          />

          {/* Deep Cinematic Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/50 to-black/30 pointer-events-none" />

          {/* Top Pill & Crest */}
          <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10">
            <span className="font-jakarta text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-[#07070A]/85 text-[#F0D978] border border-[#D4AF37]/60 backdrop-blur-md shadow-lg">
              {roleBadge}
            </span>
            <div className="w-9 h-9 rounded-full border border-[#D4AF37]/70 bg-[#07070A]/80 backdrop-blur-md flex items-center justify-center text-[#F0D978] shadow-md">
              <Shield className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Character Info */}
          <div className="absolute bottom-0 inset-x-0 p-7 sm:p-8 z-10 space-y-3.5 bg-gradient-to-t from-[#07070A] via-[#07070A]/95 to-transparent pt-16">
            <div className="space-y-1">
              <span className="font-jakarta text-xs text-[#FDA4AF] uppercase tracking-widest font-semibold block">
                {actor}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white tracking-wide drop-shadow-md">
                {character}
              </h3>
            </div>

            <p className="font-playfair text-sm italic text-[#CBD5E1] line-clamp-2 leading-relaxed">
              "{quote}"
            </p>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="font-jakarta text-xs text-[#94A3B8]">
                Rasgo: <strong className="text-white font-semibold">{trait}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 font-jakarta text-xs font-bold text-[#F0D978] group-hover:translate-x-1 transition-transform">
                <span>Ver expediente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (CLASSICAL DOSSIER) */}
        <div
          className="absolute inset-0 rounded-3xl p-8 sm:p-9 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#141A24] via-[#0D1117] to-[#07070A] border-2 border-[#F0D978] shadow-[0_0_40px_rgba(212,175,55,0.35)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
            <div>
              <span className="font-jakarta text-[11px] text-[#FDA4AF] uppercase tracking-widest font-bold block">
                Universidad Tagus · Archivo Confidencial
              </span>
              <h4 className="font-cinzel text-xl font-black text-[#F0D978] mt-1">
                {actor} como {character}
              </h4>
            </div>
            <Eye className="w-5 h-5 text-[#D4AF37] shrink-0 ml-2" />
          </div>

          {/* Description */}
          <div className="space-y-5 my-auto py-2">
            <div>
              <span className="font-jakarta text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold block mb-1.5">
                Perfil del Personaje:
              </span>
              <p className="font-jakarta text-sm sm:text-base text-[#F1F5F9] leading-relaxed">
                {description}
              </p>
            </div>

            {knownFor && (
              <div className="p-4 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/30 space-y-1">
                <span className="font-jakarta text-[11px] text-[#F0D978] uppercase tracking-wider font-bold block">
                  Trayectoria destacada:
                </span>
                <p className="font-jakarta text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {knownFor}
                </p>
              </div>
            )}
          </div>

          {/* Return Hint */}
          <div className="pt-4 border-t border-white/10 text-center">
            <span className="inline-flex items-center gap-2 font-jakarta text-xs font-bold text-[#FDA4AF]">
              <Sparkles className="w-4 h-4 text-[#F0D978]" />
              <span>Toca para voltear a la fotografía</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
