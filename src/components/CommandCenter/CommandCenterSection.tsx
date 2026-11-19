import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Flame, UtensilsCrossed, Shirt, Ticket } from 'lucide-react';
import HypeThermometer from './HypeThermometer';
import SnackMenu from './SnackMenu';
import DressCode from './DressCode';
import VIPTicket from './VIPTicket';
import type { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ModuleCard({ title, icon: Icon, children, defaultOpen = false }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold/30">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gold flex-shrink-0" />
          <h3 className="font-cinzel text-sm sm:text-base tracking-wider text-text-primary group-hover:text-gold transition-colors">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border-subtle pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const modules = [
  {
    title: 'Termómetro de Hype',
    icon: Flame,
    component: HypeThermometer,
  },
  {
    title: 'Menú de Snacks & Bebidas',
    icon: UtensilsCrossed,
    component: SnackMenu,
  },
  {
    title: 'Dress Code de la Noche',
    icon: Shirt,
    component: DressCode,
  },
  {
    title: 'Tu Entrada VIP',
    icon: Ticket,
    component: VIPTicket,
  },
] as const;

export default function CommandCenterSection() {
  return (
    <section
      id="command-center"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3"
        >
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl tracking-wider gold-shimmer">
            CENTRO DE COMANDO
          </h2>
          <p className="font-playfair text-text-secondary text-lg sm:text-xl italic">
            Prepara tu cita a distancia 💌
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-4">
          {modules.map((mod, idx) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ModuleCard title={mod.title} icon={mod.icon}>
                <mod.component />
              </ModuleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
