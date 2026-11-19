import { motion } from 'framer-motion';
import SectionHeader from '../Shared/SectionHeader';
import Synopsis from './Synopsis';
import CastGrid from './CastGrid';

export default function DossierSection() {
  return (
    <section
      id="dossier"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="space-y-16 sm:space-y-20">
        <SectionHeader
          eyebrow="Novela de Alex Mírez · Prime Video"
          title="El Dossier"
          subtitle="Lo esencial antes del estreno, sin spoilers."
          className="!mb-0"
        />

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
        <div className="space-y-10 pt-4">
          <div className="text-center space-y-3">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-wide text-white">
              Reparto
            </h3>
            <p className="font-jakarta text-sm sm:text-base text-[#94A3B8]">
              Toca una tarjeta para darle la vuelta.
            </p>
          </div>

          <CastGrid />
        </div>
      </div>
    </section>
  );
}
