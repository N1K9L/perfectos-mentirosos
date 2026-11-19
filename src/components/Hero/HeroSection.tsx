import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ParticleField from './ParticleField';
import TagusEmblem from './TagusEmblem';
import AvatarRing from './AvatarRing';
import Countdown from './Countdown';

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#07070A]"
    >
      {/* 3D Canvas — behind everything */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#F0D978" />
            <ParticleField />
            <TagusEmblem />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#07070A] to-transparent pointer-events-none" />

        <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-2xl mx-auto">
          {/* Avatar Ring */}
          <AvatarRing />

          {/* Title */}
          <motion.h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-center gold-shimmer leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          >
            Bienvenido a Tagus, Aitana
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-playfair text-lg sm:text-xl lg:text-2xl text-[#FDA4AF] text-center italic"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
          >
            Nuestra cita de estreno &amp; 10 meses juntos 💛
          </motion.p>

          {/* Countdown */}
          <Countdown />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07070A] to-transparent pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => {
            const next = document.getElementById('dossier');
            next?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-jakarta text-[10px] text-[#64748B] uppercase tracking-[0.2em]">
            Explorar
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-[#D4AF37]/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
