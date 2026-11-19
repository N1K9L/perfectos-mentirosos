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
    <div className="space-y-12 py-2">
      {/* Intro Header */}
      <div className="p-8 sm:p-10 rounded-[26px] bg-[#07070A]/85 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
            Gastronomía Sincronizada a Distancia
          </h4>
          <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            Selecciona la botana que cada uno preparará en casa para cenar en llamada mientras vemos el estreno.
          </p>
        </div>
        <span className="font-jakarta text-xs sm:text-sm font-bold text-[#F0D978] bg-[#D4AF37]/15 px-5 py-2 rounded-full border border-[#D4AF37]/40 shrink-0">
          {snacks.length} opciones listas
        </span>
      </div>

      {/* Categories Grid */}
      <div className="space-y-10 sm:space-y-12">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#F0D978] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-cinzel text-sm sm:text-base font-bold text-[#F0D978] tracking-widest uppercase">
                  {cat.title}
                </h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {cat.items.map((item) => {
                  const isChecked = snacks.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleSnack(item)}
                      className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                          : 'bg-[#0D1117] border-white/10 text-[#CBD5E1] hover:border-white/30'
                      }`}
                    >
                      <span className="font-jakarta text-xs sm:text-sm font-semibold leading-relaxed">
                        {item}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 transition-colors ${
                          isChecked
                            ? 'border-[#F0D978] bg-[#F0D978] text-[#07070A]'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
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
        className={`p-8 sm:p-10 md:p-12 rounded-[28px] border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 ${
          emplatado
            ? 'bg-gradient-to-r from-[#881337]/35 via-[#5B0820]/40 to-[#0D1117] border-[#FDA4AF] shadow-[0_0_30px_rgba(136,19,55,0.35)]'
            : 'bg-[#0D1117] border-white/10 hover:border-[#FDA4AF]/40'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#881337]/50 border border-[#FDA4AF] flex items-center justify-center text-[#FDA4AF] shrink-0 shadow-lg">
          <Utensils className="w-7 h-7" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="font-cinzel text-base sm:text-lg font-bold text-white">
              Ritual del Notion: Emplatar la comida como si fuera para el otro
            </span>
            {emplatado && <Heart className="w-5 h-5 text-[#FDA4AF] fill-current shrink-0" />}
          </div>
          <p className="font-jakarta text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            Servir todo con esmero en la vajilla bonita, encender una vela en el escritorio y cenar viéndonos en pantalla como si estuviéramos en la misma mesa.
          </p>
        </div>
        <div
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 self-end sm:self-center ${
            emplatado
              ? 'border-[#FDA4AF] bg-[#FDA4AF] text-[#07070A]'
              : 'border-white/30 bg-transparent'
          }`}
        >
          {emplatado && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>

      {/* Duelo de Doblaje */}
      <div className="p-8 sm:p-10 rounded-[28px] bg-[#0D1117] border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F0D978]" />
            <h5 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              El Gran Duelo Oficial de Doblaje
            </h5>
          </div>
          <span className="text-[11px] font-jakarta uppercase tracking-wider text-[#FDA4AF] bg-[#881337]/40 px-3.5 py-1.5 rounded-full border border-[#881337] w-fit">
            Debate Oficial de Pareja
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => setDubTeam('espana')}
            className={`p-6 sm:p-8 rounded-2xl border text-left transition-all cursor-pointer space-y-2.5 ${
              dubTeam === 'espana'
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                : 'bg-[#07070A]/60 border-white/10 hover:border-[#D4AF37]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-base font-bold text-white">
                Team Español Peninsular (España)
              </span>
              {dubTeam === 'espana' && <Check className="w-5 h-5 text-[#F0D978]" />}
            </div>
            <p className="font-jakarta text-xs sm:text-sm text-[#F0D978] font-semibold">
              Españoleta (Aitana) 🇪🇸
            </p>
            <p className="font-jakarta text-xs text-[#CBD5E1] leading-relaxed">
              Audio original en versión castellano. ¡Aitana ya ganó esta ronda por ser película española con actores españoles!
            </p>
          </button>

          <button
            onClick={() => setDubTeam('latino')}
            className={`p-6 sm:p-8 rounded-2xl border text-left transition-all cursor-pointer space-y-2.5 ${
              dubTeam === 'latino'
                ? 'bg-[#881337]/25 border-[#FDA4AF] shadow-[0_0_25px_rgba(136,19,55,0.25)]'
                : 'bg-[#07070A]/60 border-white/10 hover:border-[#FDA4AF]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-base font-bold text-white">
                Team Español Latinoamericano
              </span>
              {dubTeam === 'latino' && <Check className="w-5 h-5 text-[#FDA4AF]" />}
            </div>
            <p className="font-jakarta text-xs sm:text-sm text-[#FDA4AF] font-semibold">
              Caleño (Nikol) 🇨🇴
            </p>
            <p className="font-jakarta text-xs text-[#CBD5E1] leading-relaxed">
              Para los que defienden con orgullo y cariño el doblaje latino con acento neutro para noches de película.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
