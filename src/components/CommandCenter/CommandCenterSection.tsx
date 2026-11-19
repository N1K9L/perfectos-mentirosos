import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Shirt, Ticket, type LucideIcon } from 'lucide-react';
import SectionHeader from '../Shared/SectionHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import HypeThermometer from './HypeThermometer';
import SnackMenu from './SnackMenu';
import DressCode from './DressCode';
import VIPTicket from './VIPTicket';

type TabId = 'hype' | 'menu' | 'dress' | 'ticket';

const tabs: { id: TabId; label: string; hint: string; icon: LucideIcon }[] = [
  { id: 'hype', label: 'Hype', hint: 'Termómetro y predicciones', icon: Flame },
  { id: 'menu', label: 'Menú', hint: 'Snacks y duelo de doblaje', icon: UtensilsCrossed },
  { id: 'dress', label: 'Outfit', hint: 'Prenda secreta y carta', icon: Shirt },
  { id: 'ticket', label: 'Boleto', hint: 'Tu pase VIP', icon: Ticket },
];

const panels: Record<TabId, () => ReactNode> = {
  hype: () => <HypeThermometer />,
  menu: () => <SnackMenu />,
  dress: () => <DressCode />,
  ticket: () => <VIPTicket />,
};

export default function CommandCenterSection() {
  const [active, setActive] = useLocalStorage<TabId>('commandTab', 'hype');
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="command-center" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeader
        eyebrow="Nuestra cita a distancia"
        title="Centro de Comando"
        subtitle="Todo lo de la noche de estreno en un solo lugar. Elige una pestaña."
      />

      {/* Pestañas */}
      <div
        role="tablist"
        aria-label="Módulos de la cita"
        className="grid grid-cols-4 gap-1 p-1.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.06] max-w-2xl mx-auto mb-10 sm:mb-12"
      >
        {tabs.map((t) => {
          const isActive = t.id === current.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={`relative flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 py-3 sm:py-2.5 rounded-xl sm:rounded-full font-jakarta text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                isActive ? 'text-[#07070A]' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="cc-tab"
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-[#F0D978]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative w-4 h-4" strokeWidth={1.8} />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel activo */}
      <div className="luxury-card rounded-3xl p-6 sm:p-10 md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="font-jakarta text-xs uppercase tracking-[0.24em] text-[#D4AF37]/80">{current.hint}</p>
            {panels[current.id]()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
