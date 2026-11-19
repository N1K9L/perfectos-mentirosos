import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface CollapsibleCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function CollapsibleCard({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  className = '',
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`glass rounded-2xl transition-all duration-300 hover:border-[var(--color-gold)] ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 shrink-0" style={{ color: 'var(--color-gold)' }} />
          <span
            className="font-cinzel text-lg font-semibold tracking-wide"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-gold)' }} />
        </motion.span>
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
            <div className="px-5 pb-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
