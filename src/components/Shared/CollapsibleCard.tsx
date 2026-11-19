import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface CollapsibleCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  badge?: string;
}

export default function CollapsibleCard({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  className = '',
  badge,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`luxury-card rounded-3xl transition-all duration-300 border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 p-5 sm:p-6 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F0D978] group-hover:scale-105 transition-transform">
            <Icon className="h-5 w-5 shrink-0" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-white group-hover:text-[#F0D978] transition-colors">
              {title}
            </span>
            {badge && (
              <span className="font-jakarta text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#881337]/40 text-[#FDA4AF] border border-[#881337]/60 w-fit">
                {badge}
              </span>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#F0D978] group-hover:border-[#D4AF37]/50"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
