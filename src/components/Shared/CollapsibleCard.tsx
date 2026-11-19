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
      className={`luxury-card rounded-[28px] transition-all duration-300 border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 shadow-[0_15px_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-6 sm:p-8 md:p-9 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F0D978] group-hover:scale-105 group-hover:bg-[#D4AF37]/25 transition-all shrink-0 shadow-md">
            <Icon className="h-6 w-6 shrink-0" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
            <span className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-[#F0D978] transition-colors">
              {title}
            </span>
            {badge && (
              <span className="font-jakarta text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#881337]/40 text-[#FDA4AF] border border-[#881337]/60 w-fit shrink-0">
                {badge}
              </span>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#F0D978] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-colors shrink-0 ml-2"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-10 md:px-12 pb-10 sm:pb-12 pt-6 md:pt-8 border-t border-white/10 space-y-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
