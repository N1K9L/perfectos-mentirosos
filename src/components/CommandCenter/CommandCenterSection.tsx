import { motion } from 'framer-motion';
import { Flame, UtensilsCrossed, Shirt, Ticket } from 'lucide-react';
import CollapsibleCard from '../Shared/CollapsibleCard';
import HypeThermometer from './HypeThermometer';
import SnackMenu from './SnackMenu';
import DressCode from './DressCode';
import VIPTicket from './VIPTicket';

export default function CommandCenterSection() {
  return (
    <section
      id="command-center"
      className="relative py-28 sm:py-40 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 mb-20"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#881337]/30 border border-[#881337]/50 text-[#FDA4AF] text-xs sm:text-sm uppercase tracking-widest font-jakarta font-semibold shadow-lg">
          <span>Protocolo de Cita</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span>Sincronización a Distancia</span>
        </div>

        <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider gold-shimmer">
          CENTRO DE COMANDO
        </h2>

        <p className="font-playfair text-lg sm:text-2xl text-[#CBD5E1] italic max-w-2xl mx-auto leading-relaxed">
          Diseñado para preparar nuestra noche de cine perfecta paso a paso.
          Toca cada expediente para desplegarlo.
        </p>
      </motion.div>

      {/* Accordion Modules */}
      <div className="space-y-10 sm:space-y-12">
        <CollapsibleCard
          title="I. Termómetro de Hype & Predicciones"
          icon={Flame}
          badge="Expectativa"
          defaultOpen
        >
          <HypeThermometer />
        </CollapsibleCard>

        <CollapsibleCard
          title="II. Menú & Gastronomía Sincronizada"
          icon={UtensilsCrossed}
          badge="Snacks & Duelo"
        >
          <SnackMenu />
        </CollapsibleCard>

        <CollapsibleCard
          title="III. Dress Code & Prenda Secreta"
          icon={Shirt}
          badge="Vibe de la Llamada"
        >
          <DressCode />
        </CollapsibleCard>

        <CollapsibleCard
          title="IV. Boleto Holográfico VIP"
          icon={Ticket}
          badge="Pase Oficial"
        >
          <VIPTicket />
        </CollapsibleCard>
      </div>
    </section>
  );
}
