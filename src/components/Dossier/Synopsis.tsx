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

      <div className="relative z-10 space-y-6 pt-2">
        {/* Quote / Opening hook */}
        <p className="font-playfair text-base sm:text-xl text-[#F0D978] italic leading-relaxed border-l-2 border-[#D4AF37] pl-4">
          “Mentir es un arte en la Universidad Tagus... pero enamorarse de un Cash es una sentencia.”
        </p>

        {/* Synopsis body text */}
        <p className="font-jakarta text-sm sm:text-base leading-relaxed text-[#F1F5F9]">
          Jude Derry llega a la elitista y peligrosa Universidad Tagus con una misión secreta directamente ligada a su hermano. Sin embargo, su cuidadosa estrategia se complica al colisionar con los intocables hermanos Cash —Aegan, Adrik y Alex— herederos de la dinastía más poderosa del campus. Lo que comienza como un plan de infiltración se transforma en un voraz juego de seducción, secretos y mentiras donde nadie es quien dice ser.
        </p>

        {/* Metadata Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#07070A]/80 border border-[#D4AF37]/20">
            <Clapperboard className="w-4 h-4 text-[#FDA4AF] shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Dirección</span>
              <span className="text-xs font-bold text-white">Jesús Colmenar</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#07070A]/80 border border-[#D4AF37]/20">
            <Clock className="w-4 h-4 text-[#F0D978] shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Duración</span>
              <span className="text-xs font-bold text-white">103 Minutos</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#07070A]/80 border border-[#D4AF37]/20">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Estreno</span>
              <span className="text-xs font-bold text-[#F0D978]">Prime Video · 20 Nov</span>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
}
