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
    <div className={`luxury-card rounded-3xl ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#F0D978] shrink-0 transition-colors group-hover:bg-[#D4AF37]/20">
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            {badge && (
              <span className="block font-jakarta text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FDA4AF]/80 mb-1">
                {badge}
              </span>
            )}
            <span className="block font-cinzel text-lg sm:text-xl font-semibold tracking-wide text-white">
              {title}
            </span>
          </div>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A3B8] group-hover:text-[#F0D978] group-hover:bg-white/5 transition-colors shrink-0"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-10 pb-10 pt-2 space-y-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
