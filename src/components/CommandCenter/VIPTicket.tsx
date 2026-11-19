import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function VIPTicket() {
  const [ticketTime, setTicketTime] = useLocalStorage<string>('ticketTime', '');
  const [ticketConfirmed, setTicketConfirmed] = useLocalStorage<boolean>(
    'ticketConfirmed',
    false
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleConfirm = () => {
    setTicketConfirmed(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F0D978', '#881337', '#FDA4AF', '#FFFFFF'],
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 3D Ticket */}
      <div style={{ perspective: '1000px' }} className="w-full max-w-md">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="relative w-full holographic rounded-2xl overflow-hidden border border-gold/30"
          style={{
            transformStyle: 'preserve-3d',
            background:
              'linear-gradient(135deg, #0D1117 0%, #1a1a2e 30%, #0D1117 60%, #1a1a2e 100%)',
          }}
        >
          {/* Ticket perforation line */}
          <div className="absolute right-16 top-0 bottom-0 border-r-2 border-dashed border-gold/20" />

          {/* Main ticket content */}
          <div className="p-6 sm:p-8 pr-20 space-y-4">
            {/* Header */}
            <div className="space-y-1">
              <p className="font-cinzel text-xs tracking-[0.3em] text-text-muted uppercase">
                Pase VIP
              </p>
              <h3 className="font-cinzel text-gold text-lg sm:text-xl tracking-wider gold-shimmer">
                PERFECTOS MENTIROSOS
              </h3>
            </div>

            {/* Details */}
            <div className="space-y-2 font-jakarta text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gold/60 text-xs mt-0.5 flex-shrink-0 w-16">
                  INVITADOS
                </span>
                <span className="text-text-primary font-medium">
                  NIKOL & AITANA
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold/60 text-xs mt-0.5 flex-shrink-0 w-16">
                  FUNCIÓN
                </span>
                <span className="text-text-primary">PERFECTOS MENTIROSOS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold/60 text-xs mt-0.5 flex-shrink-0 w-16">
                  FECHA
                </span>
                <input
                  type="datetime-local"
                  value={ticketTime}
                  onChange={(e) => setTicketTime(e.target.value)}
                  className="bg-transparent border-b border-gold/30 text-text-primary text-sm px-1 py-0.5 focus:outline-none focus:border-gold transition-colors font-jakarta"
                />
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold/60 text-xs mt-0.5 flex-shrink-0 w-16">
                  FILA
                </span>
                <span className="text-text-primary">1 — EN LLAMADA 24/7</span>
              </div>
            </div>
          </div>

          {/* Stub / tear-off section */}
          <div className="absolute right-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-1 bg-gold/5">
            <span
              className="font-cinzel text-gold/40 text-xs tracking-widest"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              VIP ★ VIP
            </span>
          </div>

          {/* Gold corner accent */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-gold to-transparent" />
          </div>
          <div className="absolute bottom-0 right-16 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-gold to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-gold to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Confirm button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: ticketConfirmed ? 1 : 1.03 }}
        onClick={!ticketConfirmed ? handleConfirm : undefined}
        className={`px-8 py-3 rounded-xl font-cinzel text-sm tracking-wider transition-all duration-300 border ${
          ticketConfirmed
            ? 'border-gold bg-gold/15 text-gold cursor-default shadow-[0_0_20px_rgba(212,175,55,0.2)]'
            : 'border-gold bg-gold/10 text-gold hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(212,175,55,0.25)] cursor-pointer'
        }`}
      >
        {ticketConfirmed ? '✅ ¡Confirmado! Nos vemos ahí 💛' : 'Confirmar Asistencia ✨'}
      </motion.button>
    </div>
  );
}
