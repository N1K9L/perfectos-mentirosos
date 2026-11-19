import { motion } from 'framer-motion';
import CastCard from './CastCard';

interface CastMember {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  photoUrl: string;
  roleBadge: string;
  quote: string;
  trait: string;
}

const CAST: CastMember[] = [
  {
    character: 'Jude Derry',
    actor: 'Irene Balmes',
    knownFor: 'La Mesías (Premio Feroz 2024)',
    description:
      'Llega a la elitista Universidad Tagus con una misión secreta por su hermano. Inteligente, decidida y con una mente aguda para descifrar las intrigas del campus.',
    photoUrl: './assets/cast/irene-balmes.jpg',
    roleBadge: 'LA INVESTIGADORA',
    quote: 'En Tagus nadie dice la verdad... y yo vine a destaparlo todo.',
    trait: 'Estratégica & Audaz',
  },
  {
    character: 'Aegan Cash',
    actor: 'Gleb Abrosimov',
    knownFor: 'Élite (Temporada 6 & 7)',
    description:
      'El hermano mayor: carismático, calculador y el líder indiscutible de los hermanos Cash. Nada sucede en el campus sin su aprobación.',
    photoUrl: './assets/cast/gleb-abrosimov.jpg',
    roleBadge: 'EL LÍDER CASH',
    quote: 'El control no se negocia; se ejerce con elegancia.',
    trait: 'Impenetrable',
  },
  {
    character: 'Adrik Cash',
    actor: 'Pau Simon',
    knownFor: 'El refugio atómico (Netflix)',
    description:
      'El hermano mediano: reservado, intensamente enigmático y observador. Su mirada oculta los secretos más profundos y peligrosos de la dinastía.',
    photoUrl: './assets/cast/pau-simon.jpg',
    roleBadge: 'EL ENIGMA',
    quote: 'Las palabras mienten con facilidad; los silencios jamás.',
    trait: 'Observador Silencioso',
  },
  {
    character: 'Aleixandre Cash',
    actor: 'Pablo Scapigliati',
    knownFor: 'El bus de la vida (2024)',
    description:
      'El hermano menor: rebelde, impulsivo, magnético y desafiante. No teme al caos ni a romper cualquier protocolo de la universidad.',
    photoUrl: './assets/cast/pablo-scapigliati.jpg',
    roleBadge: 'EL REBELDE',
    quote: 'Las reglas en Tagus existen para ver cómo arden.',
    trait: 'Caos Magnético',
  },
  {
    character: 'Adrien Cash',
    actor: 'Asier Etxeandia',
    knownFor: 'Dolor y gloria · Sky Rojo · Velvet',
    description:
      'El imponente patriarca de los Cash. Su influencia económica y política sostiene el imperio y las sombras de la Universidad Tagus.',
    photoUrl: './assets/cast/asier-etxeandia.jpg',
    roleBadge: 'EL PATRIARCA',
    quote: 'El apellido Cash está muy por encima de cualquier sospecha.',
    trait: 'Poder Absoluto',
  },
  {
    character: 'Artie',
    actor: 'Irene Ferreiro',
    knownFor: 'Skam España (Movistar+)',
    description:
      'Pieza clave en los pasillos de Tagus. Conoce cada rumor, debilidad y alianza secreta entre los estudiantes del campus.',
    photoUrl: './assets/cast/irene-ferreiro.jpg',
    roleBadge: 'LA CONFIDENTE',
    quote: 'Si sabes a quién escuchar, el campus te lo cuenta todo.',
    trait: 'Leal & Perspicaz',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function CastGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14 justify-items-center max-w-6xl mx-auto pt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {CAST.map((member) => (
        <motion.div key={member.character} variants={itemVariants} className="w-full flex justify-center">
          <CastCard
            character={member.character}
            actor={member.actor}
            knownFor={member.knownFor}
            description={member.description}
            photoUrl={member.photoUrl}
            roleBadge={member.roleBadge}
            quote={member.quote}
            trait={member.trait}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
