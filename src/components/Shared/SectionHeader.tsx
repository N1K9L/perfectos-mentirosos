import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Cabecera de sección limpia: etiqueta fina, título que sube palabra por palabra y subtítulo sobrio. */
export default function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  const words = title.split(' ');

  return (
    <motion.header
      className={`text-center max-w-2xl mx-auto mb-16 sm:mb-20 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      <motion.div
        className="flex items-center justify-center gap-3 mb-6"
        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
      >
        <span className="h-px w-8 bg-[#D4AF37]/50" />
        <span className="font-jakarta text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[#D4AF37]/50" />
      </motion.div>

      <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold tracking-wide text-white leading-tight">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.7, ease: EASE } },
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className="mt-6 font-jakarta text-base sm:text-lg text-[#94A3B8] leading-relaxed"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
