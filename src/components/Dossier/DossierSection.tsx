import { motion } from 'framer-motion';
import Synopsis from './Synopsis';
import CastGrid from './CastGrid';

export default function DossierSection() {
  return (
    <section
      id="dossier"
      className="relative py-20 sm:py-28 px-4"
      style={{ backgroundColor: 'var(--color-bg-deep)' }}
    >
      <div className="mx-auto max-w-6xl space-y-14">
        {/* Section header */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide gold-shimmer">
            EL DOSSIER
          </h2>
          <p
            className="font-playfair text-lg sm:text-xl italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Perfectos Mentirosos · 100% Libre de Spoilers
          </p>
        </motion.div>

        {/* Synopsis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Synopsis />
        </motion.div>

        {/* Cast grid */}
        <div className="space-y-8">
          <motion.h3
            className="font-cinzel text-2xl sm:text-3xl font-semibold text-center tracking-wide"
            style={{ color: 'var(--color-gold)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Reparto
          </motion.h3>
          <CastGrid />
        </div>
      </div>
    </section>
  );
}
