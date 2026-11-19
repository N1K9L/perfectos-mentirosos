import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import Synopsis from './Synopsis';
import CastGrid from './CastGrid';

export default function DossierSection() {
  return (
    <section
      id="dossier"
      className="relative py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="space-y-20 sm:space-y-24">
        {/* Section header */}
        <motion.div
          className="text-center space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#881337]/30 border border-[#D4AF37]/40 text-[#FDA4AF] text-xs sm:text-sm uppercase tracking-widest font-jakarta font-semibold shadow-lg">
            <Film className="w-4 h-4 text-[#F0D978]" />
            <span>Novela de Alex Mírez · Adaptación Oficial Prime Video</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider gold-shimmer">
            EL DOSSIER DE LA PELÍCULA
          </h2>

          <p className="font-playfair text-lg sm:text-2xl text-[#CBD5E1] italic max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber antes del estreno, 100% libre de spoilers.
          </p>
        </motion.div>

        {/* Synopsis Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <Synopsis />
        </motion.div>

        {/* Cast Section */}
        <div className="space-y-12 pt-8">
          <div className="text-center space-y-3">
            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-wide text-white">
              Fichas del Reparto &amp; Personajes
            </h3>
            <p className="font-jakarta text-sm sm:text-base text-[#F0D978] font-semibold tracking-wide">
              Toca o haz clic en cualquier tarjeta para voltear el expediente confidencial 🔄
            </p>
          </div>

          <CastGrid />
        </div>
      </div>
    </section>
  );
}
