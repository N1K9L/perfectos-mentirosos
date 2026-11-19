import { motion } from 'framer-motion';
import CastCard from './CastCard';

interface CastMember {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  icon: string;
  roleBadge: string;
  quote: string;
  trait: string;
}

const CAST: CastMember[] = [
  {
    character: 'Jude Derry',
    actor: 'Irene Balmes',
    knownFor: 'La Mesías (Premio Feroz)',
    description:
      'Llega a la elitista Universidad Tagus con una misión secreta por su hermano. Inteligente, decidida y con una mente rápida para jugar al ajedrez con los Cash.',
    icon: '🔍',
    roleBadge: 'LA INVESTIGADORA',
    quote: 'En Tagus nadie dice la verdad... y yo vine a destaparlo todo.',
    trait: 'Estratégica & Audaz',
  },
  {
    character: 'Aegan Cash',
    actor: 'Gleb Abrosimov',
    knownFor: 'Élite (Netflix)',
    description:
      'El hermano mayor: carismático, calculador y el líder nato de la dinastía Cash. Nada sucede en el campus sin su aprobación o conocimiento.',
    icon: '👑',
    roleBadge: 'EL LÍDER CASH',
    quote: 'El control no se negocia; se ejerce con elegancia.',
    trait: 'Impenetrable',
  },
  {
    character: 'Adrik Cash',
    actor: 'Pau Simon',
    knownFor: 'El refugio atómico',
    description:
      'El hermano mediano: reservado, intensamente enigmático y observador. Su mirada oculta los secretos más oscuros de la familia.',
    icon: '🖤',
    roleBadge: 'EL ENIGMA',
    quote: 'Las palabras mienten con facilidad; los silencios jamás.',
    trait: 'Observador Silencioso',
  },
  {
    character: 'Aleixandre Cash',
    actor: 'Pablo Scapigliati',
    knownFor: 'El bus de la vida',
    description:
      'El hermano menor: rebelde sin filtro, impredecible, fiestero y con un magnetismo caótico que atrae el peligro.',
    icon: '⚡',
    roleBadge: 'EL REBELDE',
    quote: 'Las reglas en Tagus existen para ver cómo arden.',
    trait: 'Caos Magnético',
  },
  {
    character: 'Adrien Cash',
    actor: 'Asier Etxeandia',
    knownFor: 'Dolor y gloria · Sky Rojo',
    description:
      'El imponente patriarca de los Cash. Su influencia económica y política sostiene el imperio y las sombras de la Universidad Tagus.',
    icon: '🏛️',
    roleBadge: 'EL PATRIARCA',
    quote: 'El apellido Cash está muy por encima de cualquier sospecha.',
    trait: 'Poder Absoluto',
  },
  {
    character: 'Artie',
    actor: 'Irene Ferreiro',
    knownFor: 'Skam España',
    description:
      'Pieza clave en los pasillos de Tagus. Conoce cada rumor, cada debilidad y cada alianza secreta entre los estudiantes.',
    icon: '🗝️',
    roleBadge: 'LA CONFIDENTE',
    quote: 'Si sabes a quién escuchar, el campus te lo cuenta todo.',
    trait: 'Leal & Perspicaz',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto"
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
            icon={member.icon}
            roleBadge={member.roleBadge}
            quote={member.quote}
            trait={member.trait}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
