import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Ticket, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function VIPTicket() {
  const [ticketTime, setTicketTime] = useLocalStorage<string>('ticketTime', '2026-11-20T20:30');
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
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F0D978', '#881337', '#FDA4AF', '#FFFFFF'],
    });
  };

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      {/* 3D Ticket Container */}
      <div style={{ perspective: '1200px' }} className="w-full max-w-xl">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full holographic rounded-[28px] overflow-hidden border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.25)] bg-[#0A0D14]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ticket Perforations / Notches */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#07070A] border border-[#D4AF37]/50 z-20" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#07070A] border border-[#D4AF37]/50 z-20" />

          {/* Ticket Header Ribbon */}
          <div className="bg-gradient-to-r from-[#881337] via-[#5B0820] to-[#881337] px-8 py-4 border-b border-[#D4AF37]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Ticket className="w-5 h-5 text-[#F0D978]" />
              <span className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                Tagus Cinema · Pase VIP de Estreno
              </span>
            </div>
            <span className="font-mono text-xs text-[#FDA4AF] tracking-widest font-bold">
              #NKAT-2026
            </span>
          </div>

          {/* Main Ticket Body */}
          <div className="p-8 sm:p-12 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[11px] uppercase font-jakarta tracking-[0.25em] text-[#FDA4AF] font-bold">
                Función Exclusiva a Distancia
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-black gold-shimmer tracking-wider">
                PERFECTOS MENTIROSOS
              </h3>
            </div>

            {/* Grid of Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-[#07070A]/85 border border-[#D4AF37]/25 font-jakarta text-sm">
              <div className="space-y-1">
                <span className="text-xs text-[#94A3B8] uppercase block font-semibold tracking-wider">Invitados Especiales</span>
                <span className="font-cinzel text-base sm:text-lg font-bold text-white block">
                  NIKOL &amp; AITANA
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-[#94A3B8] uppercase block font-semibold tracking-wider">Ubicación / Sala</span>
                <span className="font-cinzel text-base sm:text-lg font-bold text-[#F0D978] block">
                  Fila 1 · Llamada 24/7
                </span>
              </div>

              <div className="col-span-1 sm:col-span-2 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#94A3B8] uppercase font-semibold tracking-wider">Fecha y Hora de la Cita:</span>
                <input
                  type="datetime-local"
                  value={ticketTime}
                  onChange={(e) => setTicketTime(e.target.value)}
                  className="bg-[#141A24] border border-[#D4AF37]/40 text-[#F0D978] font-bold font-jakarta rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Barcode & Signature */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-1.5 h-10 opacity-80">
                {[3, 1, 4, 2, 5, 2, 1, 4, 2, 6, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4].map((w, idx) => (
                  <div key={idx} className="bg-[#D4AF37] h-full rounded-sm" style={{ width: `${w}px` }} />
                ))}
              </div>

              <div className="text-center sm:text-right">
                <span className="font-jakarta text-xs text-[#94A3B8] block">Estado de Asistencia</span>
                <span className={`font-cinzel text-xs sm:text-sm font-bold ${ticketConfirmed ? 'text-[#22C55E]' : 'text-[#FDA4AF]'}`}>
                  {ticketConfirmed ? 'CONFIRMADO CON AMOR' : 'ESPERANDO CONFIRMACIÓN'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Action Button */}
      <div className="text-center space-y-3 pt-2">
        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`flex items-center justify-center gap-3 px-10 py-5 rounded-full font-cinzel text-sm sm:text-base font-bold tracking-wider cursor-pointer transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] ${
            ticketConfirmed
              ? 'bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E]'
              : 'bg-gradient-to-r from-[#D4AF37] via-[#F0D978] to-[#D4AF37] text-[#07070A] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]'
          }`}
        >
          {ticketConfirmed ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
              <span>¡Cita Confirmada! Nos Vemos Ahí 💛</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-[#07070A]" />
              <span>Confirmar Asistencia con Confeti ✨</span>
            </>
          )}
        </motion.button>
        <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1]">
          {ticketConfirmed
            ? 'Tu confirmación quedó guardada automáticamente en tu expediente.'
            : 'Presiona el botón para confirmar tu boleto para la noche de estreno.'}
        </p>
      </div>
    </div>
  );
}
