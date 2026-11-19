import { FileText, Clapperboard, Clock, Sparkles } from 'lucide-react';
import CollapsibleCard from '../Shared/CollapsibleCard';

export default function Synopsis() {
  return (
    <CollapsibleCard
      title="Expediente Clasificado: Sinopsis Oficial"
      icon={FileText}
      defaultOpen
      className="relative overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]"
    >
      {/* CLASIFICADO watermark background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="font-cinzel text-6xl sm:text-8xl font-black uppercase opacity-[0.03] tracking-[0.3em] text-[#D4AF37]"
          style={{ transform: 'rotate(-20deg)' }}
        >
          CLASIFICADO
        </span>
      </div>

      <div className="relative z-10 space-y-8 py-2">
        {/* Quote / Opening hook */}
        <p className="font-playfair text-lg sm:text-2xl text-[#F0D978] italic leading-relaxed border-l-4 border-[#D4AF37] pl-6 py-2">
          “Mentir es un arte en la Universidad Tagus... pero enamorarse de un Cash es una sentencia.”
        </p>

        {/* Synopsis body text */}
        <p className="font-jakarta text-base sm:text-lg leading-loose text-[#F1F5F9] font-normal">
          Jude Derry llega a la elitista y peligrosa Universidad Tagus con una misión secreta directamente ligada a su hermano. Sin embargo, su cuidadosa estrategia se complica al colisionar con los intocables hermanos Cash —Aegan, Adrik y Alex— herederos de la dinastía más poderosa del campus. Lo que comienza como un plan de infiltración se transforma en un voraz juego de seducción, secretos y mentiras donde nadie es quien dice ser.
        </p>

        {/* Metadata Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/30">
            <div className="w-10 h-10 rounded-xl bg-[#881337]/30 border border-[#FDA4AF]/40 flex items-center justify-center shrink-0">
              <Clapperboard className="w-5 h-5 text-[#FDA4AF]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Dirección</span>
              <span className="text-sm font-bold text-white">Jesús Colmenar</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/30">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#F0D978]/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#F0D978]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Duración</span>
              <span className="text-sm font-bold text-white">103 Minutos</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/30">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block font-semibold">Estreno</span>
              <span className="text-sm font-bold text-[#F0D978]">Prime Video · 20 Nov</span>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
}
