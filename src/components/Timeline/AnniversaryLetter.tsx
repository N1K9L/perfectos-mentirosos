import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plane, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const AnniversaryLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [kissCount, setKissCount] = useLocalStorage<number>('kissCounter', 100);
  const [floatingKisses, setFloatingKisses] = useState<{ id: number; x: number }[]>([]);

  const handleKiss = (e: React.MouseEvent) => {
    setKissCount((prev) => prev + 1);
    
    // Spawn floating kiss emoji
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const newKiss = { id: Date.now() + Math.random(), x };
    setFloatingKisses((prev) => [...prev, newKiss]);
    
    setTimeout(() => {
      setFloatingKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1500);

    confetti({
      particleCount: 15,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#881337', '#FDA4AF', '#FFFFFF'],
    });
  };

  const handleOpenLetter = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#881337', '#FDA4AF', '#F0D978'],
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 mt-20 mb-28">
      {/* Decorative intro banner */}
      <motion.div
        className="text-center mb-10 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#881337]/20 border border-[#881337]/40 text-[#FDA4AF] text-xs uppercase tracking-widest font-jakarta">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Epílogo de Nuestros Primeros 10 Meses</span>
        </div>
        <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold gold-shimmer">
          Carta de Aniversario
        </h3>
        <p className="font-playfair text-[#94A3B8] italic text-base sm:text-lg">
          Para la mujer que convirtió un saludo en Discord en mi lugar seguro.
        </p>
      </motion.div>

      {/* Sealed Envelope / Letter container */}
      <div className="relative">
        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            className="glass rounded-3xl p-8 sm:p-12 text-center border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-[0_10px_40px_rgba(0,0,0,0.6)] cursor-pointer group relative overflow-hidden transition-all duration-500"
            onClick={handleOpenLetter}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Ambient luxury glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#881337]/20 via-transparent to-[#D4AF37]/10 opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col items-center gap-6 py-6">
              {/* Wax Seal Button */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#881337] via-[#5B0820] to-[#881337] border-2 border-[#D4AF37] wax-seal flex items-center justify-center shadow-[0_0_30px_rgba(136,19,55,0.8)] group-hover:scale-105 transition-transform">
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F0D978]">
                    N &amp; A
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-cinzel text-xl sm:text-2xl text-[#F1F5F9] font-semibold group-hover:text-[#D4AF37] transition-colors">
                  Sobre Reservado: Solo para Aitana
                </h4>
                <p className="font-jakarta text-sm text-[#CBD5E1]">
                  Haz clic para romper el sello de lacre y leer tu carta de 10 meses 📜✨
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-jakarta tracking-wider uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/30">
                <Gift className="w-4 h-4 text-[#FDA4AF]" />
                <span>Abrir Mensaje Especial</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Opened Parchment Letter View */
          <motion.div
            className="glass-dark rounded-3xl p-6 sm:p-12 border border-[#D4AF37]/40 shadow-[0_15px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top vintage seal ribbon */}
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#881337]/40 border border-[#D4AF37] flex items-center justify-center">
                  <span className="font-cinzel text-xs font-bold text-[#D4AF37]">10M</span>
                </div>
                <div>
                  <h5 className="font-cinzel text-sm sm:text-base font-bold text-[#D4AF37]">
                    EXPEDIENTE: NUESTRA PROMESA
                  </h5>
                  <p className="font-jakarta text-xs text-[#94A3B8]">19 de Enero — 19 de Noviembre</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-jakarta text-[#94A3B8] hover:text-[#D4AF37] underline transition-colors"
              >
                Volver a sellar 🔒
              </button>
            </div>

            {/* Letter Body */}
            <div className="space-y-6 font-playfair text-[#F1F5F9] leading-relaxed text-base sm:text-lg">
              <p className="text-xl sm:text-2xl font-bold font-cinzel text-[#D4AF37]">
                Mi reina, mi compañera de vida, mi Aitana:
              </p>

              <p>
                Hoy cumplimos 10 meses. Y cuando miro hacia atrás, a aquel 19 de enero donde dos personas que no tenían ni idea de lo que Dios tenía preparado se cruzaron en Discord, no puedo evitar sonreír con el corazón en paz.
              </p>

              <p>
                Pasamos por tantas etapas: desde cobrarte millones de euros de broma, hasta las 100 razones que me escribiste, el primer “te quiero”, aquel inolvidable “te amo” que lo cambió todo, y el pacto de estar en llamada 24/7 para no soltarnos jamás.
              </p>

              <p className="italic text-[#FDA4AF] bg-[#881337]/15 p-4 rounded-xl border-l-2 border-[#881337]">
                “Sé que no ha sido un camino plano. Tuvimos cielos grises, momentos donde las dudas y la distancia nos desafiaron, y crisis que nos exigieron madurar y respetarnos de verdad. Pero este noviembre demostró quiénes somos: dos almas que eligen estar juntas con libertad, con respeto y con un amor inquebrantable.”
              </p>

              <p>
                Hoy no solo celebramos 10 meses de noviazgo; celebramos que seguimos eligiéndonos cada día. Gracias por tu paciencia con mis ocupaciones, por tu esfuerzo en tu estudio, por tus risas y por cada segundo que pasamos conectados.
              </p>

              {/* Typography Play: Te amo wall */}
              <div className="py-4 text-center space-y-2 select-none">
                <span className="block font-cinzel text-2xl sm:text-4xl font-extrabold gold-shimmer">
                  TE AMO INFINITAMENTE
                </span>
                <p className="font-jakarta text-xs uppercase tracking-widest text-[#FDA4AF]">
                  Te amo con el alma · Te amo cada día más · Te amo sin condiciones
                </p>
              </div>

              <p className="text-right font-cinzel text-[#D4AF37] text-lg sm:text-xl font-semibold pt-4">
                Por siempre tu novio,
                <br />
                <span className="text-2xl sm:text-3xl text-white">Nikol 💛</span>
              </p>
            </div>

            {/* Interactive Kiss Counter Module */}
            <div className="mt-10 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h5 className="font-cinzel text-base font-bold text-[#F0D978]">
                  Contador Oficial de Besos Virtuales 💋
                </h5>
                <p className="font-jakarta text-xs text-[#94A3B8]">
                  Presiona el corazón para enviarle besitos a Nikol en tiempo real.
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={handleKiss}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#881337] to-[#BE185D] hover:from-[#BE185D] hover:to-[#881337] text-white font-jakarta font-medium shadow-[0_0_20px_rgba(136,19,55,0.5)] active:scale-95 transition-all group cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current text-[#FDA4AF] group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-bold">Enviar Besito ({kissCount})</span>
                </button>

                {/* Floating kiss indicators */}
                <AnimatePresence>
                  {floatingKisses.map((kiss) => (
                    <motion.span
                      key={kiss.id}
                      className="absolute pointer-events-none text-2xl select-none"
                      style={{ left: `${kiss.x}px`, bottom: '40px' }}
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -70, scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                      😘💋
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Boarding Pass (Pase de Abordar Simbólico) */}
            <div className="mt-12 pt-8 border-t border-[#D4AF37]/30">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-jakarta">
                  El Futuro Que Nos Espera ✈️
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Pase de Abordar Oficial
                </h4>
              </div>

              <div className="holographic rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.15)] relative overflow-hidden">
                {/* Boarding pass decorative notches */}
                <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070A] border border-[#D4AF37]/40" />
                <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070A] border border-[#D4AF37]/40" />

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  {/* Left: Origin & Destination */}
                  <div className="flex items-center gap-4 sm:gap-8 text-center sm:text-left">
                    <div>
                      <span className="text-xs font-jakarta text-[#94A3B8] uppercase block">Origen</span>
                      <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                        NIKOL 🇨🇴
                      </p>
                      <span className="text-xs text-[#FDA4AF] font-jakarta">Cali, Colombia</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Plane className="w-7 h-7 text-[#F0D978] animate-pulse" />
                      <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1" />
                      <span className="text-[10px] text-[#64748B] font-jakarta">VUELO NK-AT-001</span>
                    </div>

                    <div>
                      <span className="text-xs font-jakarta text-[#94A3B8] uppercase block">Destino</span>
                      <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                        AITANA 🇪🇸
                      </p>
                      <span className="text-xs text-[#FDA4AF] font-jakarta">España</span>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="grid grid-cols-2 gap-4 text-left border-y sm:border-y-0 sm:border-x border-[#D4AF37]/30 py-4 sm:py-0 sm:px-6 w-full lg:w-auto">
                    <div>
                      <span className="text-[10px] uppercase text-[#64748B] font-jakarta block">Asiento</span>
                      <p className="font-cinzel text-sm sm:text-base font-bold text-white">Fila 1 - Junto a ti</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#64748B] font-jakarta block">Fecha</span>
                      <p className="font-cinzel text-sm sm:text-base font-bold text-white">Muy Pronto ✨</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] uppercase text-[#64748B] font-jakarta block">Misión</span>
                      <p className="font-jakarta text-xs sm:text-sm font-semibold text-[#F0D978]">
                        Próxima parada: Conocernos en persona y no soltarnos jamás.
                      </p>
                    </div>
                  </div>

                  {/* Right: Barcode simulation */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1 h-12 opacity-80">
                      {[4, 2, 6, 1, 5, 2, 4, 1, 7, 3, 2, 5, 1, 4, 3, 2, 6, 2, 4].map((w, idx) => (
                        <div
                          key={idx}
                          className="bg-[#D4AF37] h-full rounded-sm"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-[#94A3B8] tracking-widest">
                      NIKOTANA-10M-FOREVER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
