import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface AvatarData {
  initials: string;
  name: string;
  handle: string;
  url: string;
  image: string;
  role: string;
  isCenter?: boolean;
}

const AVATARS: AvatarData[] = [
  {
    initials: 'N',
    name: 'Nikol',
    handle: '@n000.j',
    url: 'https://www.instagram.com/n000.j/',
    image: './assets/avatars/nikol.jpg',
    role: 'Tu Novio 🇨🇴',
  },
  {
    initials: 'N&A',
    name: 'Nikotana',
    handle: '@nikotana_',
    url: 'https://www.instagram.com/nikotana_/',
    image: './assets/avatars/nikotana.jpg',
    role: '10 Meses Juntos',
    isCenter: true,
  },
  {
    initials: 'A',
    name: 'Aitana',
    handle: '@aitanaass_p',
    url: 'https://www.instagram.com/aitanaass_p/',
    image: './assets/avatars/aitana.jpg',
    role: 'Mi Reina 🇪🇸',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

export default function AvatarRing() {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  return (
    <motion.div
      className="flex items-center justify-center gap-5 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {AVATARS.map((avatar) => {
        const isCenter = avatar.isCenter;
        return (
          <motion.a
            key={avatar.handle}
            href={avatar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2.5 group cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.06 }}
            title={`Ver perfil de ${avatar.name} en Instagram`}
          >
            {/* Avatar circle with golden gradient border */}
            <div className="relative">
              {/* Outer glow */}
              <div
                className={`absolute -inset-1.5 rounded-full blur-md transition-opacity ${
                  isCenter
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#FDA4AF] to-[#D4AF37] opacity-60 group-hover:opacity-100'
                    : 'bg-gradient-to-br from-[#D4AF37] to-[#881337] opacity-40 group-hover:opacity-80'
                }`}
              />

              {/* Golden border ring */}
              <div
                className={`relative rounded-full p-[2.5px] shadow-2xl transition-all ${
                  isCenter
                    ? 'w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#F0D978] via-[#FDA4AF] to-[#D4AF37]'
                    : 'w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A88A2A] via-[#F0D978] to-[#D4AF37]'
                }`}
              >
                {/* Inner circle with image or monogram */}
                <div className="w-full h-full rounded-full bg-[#0D1117] overflow-hidden flex items-center justify-center relative">
                  {!imgError[avatar.handle] ? (
                    <>
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        onError={() =>
                          setImgError((prev) => ({ ...prev, [avatar.handle]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-cinzel text-xs font-bold text-[#F0D978]">
                          {avatar.initials}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="font-cinzel text-lg sm:text-xl font-bold text-[#D4AF37] select-none">
                      {avatar.initials}
                    </span>
                  )}
                </div>

                {/* Center Badge Icon */}
                {isCenter && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#881337] border border-[#F0D978] flex items-center justify-center shadow-lg">
                    <Heart className="w-3 h-3 text-[#FDA4AF] fill-current animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Handle (High Contrast) */}
            <div className="text-center space-y-0.5">
              <span className="block font-cinzel text-xs sm:text-sm font-bold text-white group-hover:text-[#F0D978] transition-colors leading-tight">
                {avatar.name}
              </span>
              <span className="block font-jakarta text-[10px] sm:text-xs text-[#FDA4AF] font-semibold tracking-wide">
                {avatar.handle}
              </span>
              <span className="block font-jakarta text-[9px] text-[#94A3B8] font-medium">
                {avatar.role}
              </span>
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
