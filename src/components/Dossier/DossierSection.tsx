import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import Synopsis from './Synopsis';
import CastGrid from './CastGrid';

export default function DossierSection() {
  return (
    <section
      id="dossier"
      className="relative py-24 sm:py-32 px-4 max-w-6xl mx-auto"
    >
      <div className="space-y-16">
        {/* Section header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#881337]/30 border border-[#D4AF37]/40 text-[#FDA4AF] text-xs uppercase tracking-widest font-jakarta font-semibold">
            <Film className="w-3.5 h-3.5 text-[#F0D978]" />
            <span>Novela de Alex Mírez · Adaptación Oficial Prime Video</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black tracking-wide gold-shimmer">
            EL DOSSIER DE LA PELÍCULA
          </h2>

          <p className="font-playfair text-lg sm:text-xl text-[#CBD5E1] italic max-w-xl mx-auto leading-relaxed">
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
        <div className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-white">
              Fichas del Reparto &amp; Personajes
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-[#F0D978] font-semibold">
              Toca o haz clic en cualquier tarjeta para voltear el expediente 3D 🔄
            </p>
          </div>

          <CastGrid />
        </div>
      </div>
    </section>
  );
}
