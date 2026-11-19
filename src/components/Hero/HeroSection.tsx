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
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 max-w-4xl mx-auto my-auto text-center space-y-10">
        {/* Top Tagus Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="hidden sm:block h-px w-8 bg-[#D4AF37]/50" />
          <span className="font-jakarta text-[10px] sm:text-xs font-semibold text-[#D4AF37] tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap">
            Universidad Tagus · Expediente 10
          </span>
          <span className="hidden sm:block h-px w-8 bg-[#D4AF37]/50" />
        </motion.div>

        {/* Avatar Ring */}
        <AvatarRing />

        {/* Title & Subtitle */}
        <div className="space-y-5 max-w-3xl mx-auto">
          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-semibold text-center text-white leading-[1.1] tracking-wide">
            {['Bienvenido', 'a', 'Tagus,'].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden align-bottom pb-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom pb-1">
              <motion.span
                className="inline-block gold-shimmer"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Aitana
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="font-playfair text-lg sm:text-2xl text-[#FDA4AF]/90 text-center italic"
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Nuestra cita de estreno y 10 meses juntos
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
          <span className="font-jakarta text-[11px] text-[#94A3B8] uppercase tracking-[0.25em] font-medium">
            Explorar
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
