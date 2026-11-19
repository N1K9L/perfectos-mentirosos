import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { importState } from '../../utils/stateSync';
import confetti from 'canvas-confetti';

export const StateImporter: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get('state');

    if (stateParam) {
      const imported = importState(stateParam);
      if (imported && typeof imported === 'object') {
        Object.entries(imported).forEach(([key, val]) => {
          try {
            window.localStorage.setItem(key, JSON.stringify(val));
          } catch (e) {
            console.warn('Failed to restore imported key', key, e);
          }
        });

        setNotification('¡Has recibido y sincronizado las elecciones de tu pareja! 💌');
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.2 },
          colors: ['#D4AF37', '#881337', '#FDA4AF'],
        });

        // Clean up URL without reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        // Auto dismiss after 6 seconds
        const timer = setTimeout(() => {
          setNotification(null);
        }, 6000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] glass-dark border border-[#D4AF37] p-4 rounded-2xl shadow-[0_10px_35px_rgba(212,175,55,0.4)] flex items-center justify-between gap-3 text-white"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0" />
            <p className="font-jakarta text-xs sm:text-sm font-medium leading-tight">
              {notification}
            </p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 text-[#94A3B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StateImporter;
