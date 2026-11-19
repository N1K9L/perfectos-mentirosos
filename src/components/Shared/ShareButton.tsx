import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Link as LinkIcon, Check, X, Sparkles } from 'lucide-react';
import { generateWhatsAppSummary, generateShareUrl } from '../../utils/stateSync';
import confetti from 'canvas-confetti';

export const ShareButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleCopySummary = async () => {
    const text = generateWhatsAppSummary();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      confetti({ particleCount: 30, spread: 50, origin: { x: 0.8, y: 0.8 } });
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch (e) {
      console.warn('Clipboard failed', e);
    }
  };

  const handleCopyLink = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      confetti({ particleCount: 30, spread: 50, origin: { x: 0.8, y: 0.8 } });
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.warn('Clipboard failed', e);
    }
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppSummary();
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F0D978] to-[#D4AF37] text-[#07070A] font-jakarta font-bold text-sm shadow-[0_5px_25px_rgba(212,175,55,0.5)] cursor-pointer group hover:shadow-[0_8px_30px_rgba(212,175,55,0.7)] transition-all"
        >
          <Send className="w-4 h-4 text-[#07070A] group-hover:rotate-12 transition-transform" />
          <span>Enviar elecciones 💌</span>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg glass-dark rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#F0D978]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                      Sincronización a Distancia 💌
                    </h3>
                    <p className="font-jakarta text-xs text-[#CBD5E1]">
                      Comparte tus snacks, predicciones y hora con tu pareja
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-[#CBD5E1] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* WhatsApp Summary Preview */}
              <div className="space-y-4">
                <label className="block text-xs font-jakarta uppercase tracking-wider text-[#F0D978] font-bold">
                  Vista Previa del Mensaje para WhatsApp:
                </label>
                <div className="p-4 rounded-xl bg-[#07070A] border border-[#D4AF37]/30 font-mono text-xs text-white whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                  {generateWhatsAppSummary()}
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-jakarta font-semibold text-sm shadow-[0_4px_15px_rgba(37,211,102,0.3)] transition-all cursor-pointer"
                  >
                    <span>Abrir en WhatsApp Directo 💬</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl glass border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white text-xs font-jakarta font-medium transition-all cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-[#25D366]" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#D4AF37]" />
                          <span>Copiar Texto</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl glass border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white text-xs font-jakarta font-medium transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-[#25D366]" />
                          <span>¡Link Copiado!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4 text-[#D4AF37]" />
                          <span>Copiar Link Mágico</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-[#64748B] text-center font-jakarta pt-2">
                  ✨ El Link Mágico incluye un código especial con tus opciones seleccionadas para que al abrirlo se carguen idénticas.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShareButton;
