import { useState } from 'react';
import { motion } from 'framer-motion';

interface AvatarData {
  initials: string;
  name: string;
  handle: string;
  url: string;
  image: string;
  role: string;
}

const avatars: AvatarData[] = [
  {
    initials: 'A',
    name: 'Aitana',
    handle: '@aitanaass_p',
    url: 'https://www.instagram.com/aitanaass_p/',
    image: './assets/avatars/aitana.jpg',
    role: 'Mi Reina',
  },
  {
    initials: 'N',
    name: 'Nikol',
    handle: '@n000.j',
    url: 'https://www.instagram.com/n000.j/',
    image: './assets/avatars/nikol.jpg',
    role: 'Tu Novio',
  },
  {
    initials: 'N&A',
    name: 'Nikotana',
    handle: '@nikotana_',
    url: 'https://www.instagram.com/nikotana_/',
    image: './assets/avatars/nikotana.jpg',
    role: '10 Meses Juntos',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function AvatarRing() {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  return (
    <motion.div
      className="flex items-center justify-center gap-6 sm:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {avatars.map((avatar) => (
        <motion.a
          key={avatar.handle}
          href={avatar.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group cursor-pointer"
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.05 }}
          title={`Ver perfil de ${avatar.name} en Instagram`}
        >
          {/* Avatar circle with golden gradient border */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F0D978] to-[#881337] opacity-40 blur-sm group-hover:opacity-80 transition-opacity" />

            {/* Golden border ring */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-br from-[#A88A2A] via-[#F0D978] to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
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
                    {/* Subtle monogram overlay on top of portrait */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                      <span className="font-cinzel text-xs font-bold text-[#F0D978]">
                        {avatar.initials}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="font-cinzel text-lg sm:text-xl font-semibold text-[#D4AF37] select-none">
                    {avatar.initials}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Name & Handle */}
          <div className="text-center">
            <span className="block font-cinzel text-xs sm:text-sm font-semibold text-white group-hover:text-[#F0D978] transition-colors leading-tight">
              {avatar.name}
            </span>
            <span className="block font-jakarta text-[10px] sm:text-xs text-[#94A3B8] tracking-wide">
              {avatar.handle}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
