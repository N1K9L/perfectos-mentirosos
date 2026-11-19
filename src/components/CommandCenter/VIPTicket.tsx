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
    <div className="flex flex-col items-center space-y-8 pt-2">
      {/* 3D Ticket Container */}
      <div style={{ perspective: '1200px' }} className="w-full max-w-lg">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full holographic rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] bg-[#0A0D14]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ticket Perforations / Notches */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07070A] border border-[#D4AF37]/50 z-20" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07070A] border border-[#D4AF37]/50 z-20" />

          {/* Ticket Header Ribbon */}
          <div className="bg-gradient-to-r from-[#881337] via-[#5B0820] to-[#881337] px-6 py-3 border-b border-[#D4AF37]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#F0D978]" />
              <span className="font-cinzel text-xs font-bold text-white tracking-widest uppercase">
                Tagus Cinema · Pase VIP de Estreno
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#FDA4AF] tracking-widest font-bold">
              #NKAT-2026
            </span>
          </div>

          {/* Main Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-jakarta tracking-[0.25em] text-[#FDA4AF] font-bold">
                Función Exclusiva a Distancia
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black gold-shimmer tracking-wider">
                PERFECTOS MENTIROSOS
              </h3>
            </div>

            {/* Grid of Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#07070A]/80 border border-[#D4AF37]/20 font-jakarta text-xs">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Invitados Especiales</span>
                <span className="font-cinzel text-sm font-bold text-white block mt-0.5">
                  NIKOL &amp; AITANA
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Ubicación / Sala</span>
                <span className="font-cinzel text-sm font-bold text-[#F0D978] block mt-0.5">
                  Fila 1 · Llamada 24/7
                </span>
              </div>

              <div className="col-span-2 pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Fecha y Hora de la Cita:</span>
                <input
                  type="datetime-local"
                  value={ticketTime}
                  onChange={(e) => setTicketTime(e.target.value)}
                  className="bg-[#141A24] border border-[#D4AF37]/40 text-[#F0D978] font-bold font-jakarta rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Barcode & Signature */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-1 h-9 opacity-80">
                {[3, 1, 4, 2, 5, 2, 1, 4, 2, 6, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4].map((w, idx) => (
                  <div key={idx} className="bg-[#D4AF37] h-full rounded-sm" style={{ width: `${w}px` }} />
                ))}
              </div>

              <div className="text-center sm:text-right">
                <span className="font-jakarta text-[10px] text-[#94A3B8] block">Estado de Asistencia</span>
                <span className={`font-cinzel text-xs font-bold ${ticketConfirmed ? 'text-[#22C55E]' : 'text-[#FDA4AF]'}`}>
                  {ticketConfirmed ? 'CONFIRMADO CON AMOR' : 'ESPERANDO CONFIRMACIÓN'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Action Button */}
      <div className="text-center space-y-2">
        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-cinzel text-sm font-bold tracking-wider cursor-pointer transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] ${
            ticketConfirmed
              ? 'bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E]'
              : 'bg-gradient-to-r from-[#D4AF37] via-[#F0D978] to-[#D4AF37] text-[#07070A] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]'
          }`}
        >
          {ticketConfirmed ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              <span>¡Cita Confirmada! Nos Vemos Ahí 💛</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#07070A]" />
              <span>Confirmar Asistencia con Confeti ✨</span>
            </>
          )}
        </motion.button>
        <p className="font-jakarta text-xs text-[#CBD5E1]">
          {ticketConfirmed
            ? 'Tu confirmación quedó guardada automáticamente.'
            : 'Presiona el botón para confirmar tu boleto para la noche de estreno.'}
        </p>
      </div>
    </div>
  );
}
