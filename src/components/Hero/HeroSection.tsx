import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
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
      className="relative w-full min-h-screen py-24 sm:py-32 overflow-hidden bg-[#07070A] flex items-center justify-center"
    >
      {/* 3D Canvas — behind everything */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} color="#F0D978" />
            <ParticleField />
            <TagusEmblem />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial Dark Vignette for Pristine Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,7,10,0.5)_0%,rgba(7,7,10,0.92)_85%)] pointer-events-none z-[1]" />

      {/* Top & Bottom Cinematic Gradient Fades */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#07070A] to-transparent pointer-events-none z-[2]" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#07070A] to-transparent pointer-events-none z-[2]" />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 max-w-4xl mx-auto my-auto text-center space-y-8">
        {/* Top Tagus Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#881337]/30 border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F0D978]" />
          <span className="font-cinzel text-xs font-bold text-white tracking-[0.2em] uppercase">
            UNIVERSIDAD TAGUS · EXPEDIENTE NO. 10
          </span>
        </motion.div>

        {/* Avatar Ring */}
        <AvatarRing />

        {/* Title & Subtitle */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <motion.h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-center gold-shimmer leading-tight tracking-wide drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Bienvenido a Tagus, Aitana
          </motion.h1>

          <motion.p
            className="font-playfair text-lg sm:text-2xl text-[#FDA4AF] text-center italic drop-shadow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Nuestra cita de estreno &amp; 10 meses juntos 💛
          </motion.p>
        </div>

        {/* Countdown */}
        <Countdown />

        {/* Scroll Indicator */}
        <motion.div
          className="pt-6 flex flex-col items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          onClick={() => {
            const next = document.getElementById('dossier');
            next?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-jakarta text-[11px] text-[#CBD5E1] uppercase tracking-[0.25em] font-semibold">
            Explorar Expediente
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-[#F0D978]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
