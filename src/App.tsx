import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import HeroSection from './components/Hero/HeroSection';
import DossierSection from './components/Dossier/DossierSection';
import CommandCenterSection from './components/CommandCenter/CommandCenterSection';
import LiveLogSection from './components/LiveLog/LiveLogSection';
import TimelineSection from './components/Timeline/TimelineSection';
import Navigation from './components/Shared/Navigation';
import SectionDivider from './components/Shared/SectionDivider';
import ShareButton from './components/Shared/ShareButton';
import StateImporter from './components/Shared/StateImporter';
import FloatingHearts from './components/EasterEggs/FloatingHearts';
import KissCounter from './components/EasterEggs/KissCounter';
import SecretEnvelope from './components/EasterEggs/SecretEnvelope';
import { toggleAmbientSound } from './utils/audio';

export default function App() {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleToggleAudio = () => {
    const active = toggleAmbientSound();
    setIsAudioActive(active);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[#07070A] text-[#F1F5F9] selection:bg-[#D4AF37] selection:text-[#07070A] overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#881337]/10 via-[#D4AF37]/[0.03] to-transparent blur-[140px]" />
      </div>

      {/* State Importer for magic link ?state=... */}
      <StateImporter />

      {/* Floating ambient hearts */}
      <FloatingHearts />

      {/* Fixed Navigation bar */}
      <Navigation onToggleSound={handleToggleAudio} isMuted={!isAudioActive} />

      {/* Main Flow */}
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <div className="relative">
          <HeroSection />
          <SecretEnvelope
            message="Desde el primer día en Discord supe que eras tú. Te amo, mi reina 👑"
            x="85%"
            y="75%"
            className="hidden sm:block"
          />
        </div>

        <SectionDivider variant="gold" />

        {/* Section 2: El Dossier de la Película */}
        <div className="relative">
          <DossierSection />
          <SecretEnvelope
            message="No importa qué secretos tenga Tagus, nuestro amor siempre gana 🖤"
            x="8%"
            y="20%"
          />
        </div>

        <SectionDivider variant="crimson" />

        {/* Section 3: Centro de Mando de Nuestra Cita */}
        <div className="relative">
          <CommandCenterSection />
          <SecretEnvelope
            message="Aitana: Ya ganaste el duelo de doblaje... pero me debes las 9 páginas con tu hermosa voz 🎙️📖"
            x="88%"
            y="45%"
            className="hidden md:block"
          />
        </div>

        <SectionDivider variant="gold" />

        {/* Section 4: Bitácora Secreta en Vivo */}
        <div className="relative">
          <LiveLogSection />
          <SecretEnvelope
            message="¿Crees que le vas a atinar a quién miente? Yo ya sé que tú eres mi premio mayor 💛"
            x="6%"
            y="80%"
          />
        </div>

        <SectionDivider variant="crimson" />

        {/* Section 5: Gran Final — Línea del Tiempo 10 Meses */}
        <div className="relative">
          <TimelineSection />
          <SecretEnvelope
            message="10 meses son solo el prólogo de toda una vida juntos. Próxima parada: abrazarte en persona ✈️"
            x="90%"
            y="15%"
            className="hidden sm:block"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-16 pb-28 border-t border-white/[0.06] text-center space-y-3">
        <p className="font-cinzel text-sm sm:text-base font-semibold text-[#D4AF37] tracking-[0.2em]">
          NIKOL &amp; AITANA · 10 MESES
        </p>
        <p className="font-jakarta text-xs text-[#94A3B8]">
          Perfectos Mentirosos · Hecho con todo mi amor para ti
        </p>
        <p className="font-mono text-[10px] text-[#64748B] pt-2">
          nikotana.github.io · 2026
        </p>
      </footer>

      {/* Floating Kiss Counter (Bottom-Left) */}
      <KissCounter />

      {/* Floating Share Button (Bottom-Right) */}
      <ShareButton />
    </div>
    </MotionConfig>
  );
}
