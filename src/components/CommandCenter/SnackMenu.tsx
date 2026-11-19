import { Utensils, Check, Heart, Cookie, Coffee, Film, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SnackCategory {
  title: string;
  icon: typeof Film;
  items: string[];
}

const CATEGORIES: SnackCategory[] = [
  { title: 'Snacks Salados de Cine', icon: Film, items: ['Palomitas de Maíz', 'Nachos con Queso', 'Papas Ruffles', 'Galletitas Saladas'] },
  { title: 'Dulces & Chocolatería', icon: Cookie, items: ['Chocolate Suizo', 'Gomitas Ácidas', 'Brownies Calientes', 'Helado de Vainilla'] },
  { title: 'Bebidas Sincronizadas', icon: Coffee, items: ['Coca-Cola Fría', 'Jugo Natural', 'Chocolate Caliente', 'Café Espresso'] },
];

export default function SnackMenu() {
  const [snacks, setSnacks] = useLocalStorage<string[]>('snacks', ['Palomitas de Maíz', 'Chocolate Suizo']);
  const [emplatado, setEmplatado] = useLocalStorage<boolean>('emplatado', true);
  const [dubTeam, setDubTeam] = useLocalStorage<string>('dubTeam', 'espana');

  const toggleSnack = (item: string) => {
    setSnacks((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <div className="space-y-10 pt-4">
      {/* Intro Header */}
      <div className="p-6 rounded-3xl bg-[#07070A]/80 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-cinzel text-base font-bold text-white">
            Gastronomía Sincronizada a Distancia
          </h4>
          <p className="font-jakarta text-xs text-[#CBD5E1] mt-0.5">
            Selecciona la botana que cada uno preparará en casa para cenar en llamada.
          </p>
        </div>
        <span className="font-jakarta text-xs font-bold text-[#F0D978] bg-[#D4AF37]/15 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shrink-0">
          {snacks.length} opciones listas
        </span>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title} className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F0D978]">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h5 className="font-cinzel text-xs sm:text-sm font-bold text-[#F0D978] tracking-widest uppercase">
                  {cat.title}
                </h5>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cat.items.map((item) => {
                  const isChecked = snacks.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleSnack(item)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#0D1117] border-white/10 text-[#CBD5E1] hover:border-white/30'
                      }`}
                    >
                      <span className="font-jakarta text-xs font-semibold leading-snug">
                        {item}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                          isChecked
                            ? 'border-[#F0D978] bg-[#F0D978] text-[#07070A]'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notion Ritual: Emplatar Comida */}
      <div
        onClick={() => setEmplatado(!emplatado)}
        className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center gap-5 ${
          emplatado
            ? 'bg-gradient-to-r from-[#881337]/35 via-[#5B0820]/40 to-[#0D1117] border-[#FDA4AF] shadow-[0_0_25px_rgba(136,19,55,0.35)]'
            : 'bg-[#0D1117] border-white/10 hover:border-[#FDA4AF]/40'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#881337]/50 border border-[#FDA4AF] flex items-center justify-center text-[#FDA4AF] shrink-0">
          <Utensils className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-sm sm:text-base font-bold text-white">
              Ritual del Notion: Emplatar la comida como si fuera para el otro
            </span>
            {emplatado && <Heart className="w-4 h-4 text-[#FDA4AF] fill-current" />}
          </div>
          <p className="font-jakarta text-xs text-[#CBD5E1] mt-1 leading-relaxed">
            Servir todo con esmero en la vajilla bonita, encender una vela en el escritorio y cenar viéndonos en pantalla.
          </p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
            emplatado
              ? 'border-[#FDA4AF] bg-[#FDA4AF] text-[#07070A]'
              : 'border-white/30 bg-transparent'
          }`}
        >
          {emplatado && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>

      {/* Duelo de Doblaje */}
      <div className="p-6 rounded-3xl bg-[#0D1117] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F0D978]" />
            <h5 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              El Gran Duelo Oficial de Doblaje
            </h5>
          </div>
          <span className="text-[10px] font-jakarta uppercase tracking-wider text-[#FDA4AF] bg-[#881337]/40 px-3 py-1 rounded-full border border-[#881337]">
            Debate de Pareja
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setDubTeam('espana')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              dubTeam === 'espana'
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                : 'bg-[#07070A]/60 border-white/10 hover:border-[#D4AF37]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-sm font-bold text-white">
                Team Español Peninsular (España)
              </span>
              {dubTeam === 'espana' && <Check className="w-4 h-4 text-[#F0D978]" />}
            </div>
            <p className="font-jakarta text-xs text-[#F0D978] mt-1 font-semibold">
              Españoleta (Aitana)
            </p>
            <p className="font-jakarta text-[11px] text-[#CBD5E1] mt-1 leading-snug">
              Audio original en versión castellano. ¡Aitana ya ganó esta ronda por ser película española!
            </p>
          </button>

          <button
            onClick={() => setDubTeam('latino')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              dubTeam === 'latino'
                ? 'bg-[#881337]/25 border-[#FDA4AF] shadow-[0_0_20px_rgba(136,19,55,0.25)]'
                : 'bg-[#07070A]/60 border-white/10 hover:border-[#FDA4AF]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-sm font-bold text-white">
                Team Español Latinoamericano
              </span>
              {dubTeam === 'latino' && <Check className="w-4 h-4 text-[#FDA4AF]" />}
            </div>
            <p className="font-jakarta text-xs text-[#FDA4AF] mt-1 font-semibold">
              Caleño (Nikol)
            </p>
            <p className="font-jakarta text-[11px] text-[#CBD5E1] mt-1 leading-snug">
              Para los que defienden con orgullo el doblaje latino con acento neutro.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
