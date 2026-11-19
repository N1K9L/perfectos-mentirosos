import { motion } from 'framer-motion';
import CastCard from './CastCard';

interface CastMember {
  character: string;
  actor: string;
  knownFor: string;
  description: string;
  icon: string;
}

const CAST: CastMember[] = [
  {
    character: 'Jude Derry',
    actor: 'Irene Balmes',
    knownFor: 'La Mesías',
    description:
      'Protagonista inteligente, decidida y con una agenda oculta en Tagus.',
    icon: '🔍',
  },
  {
    character: 'Aegan Cash',
    actor: 'Gleb Abrosimov',
    knownFor: 'Élite',
    description:
      'El hermano mayor: carismático, calculador, líder nato y el más difícil de descifrar.',
    icon: '👑',
  },
  {
    character: 'Adrik Cash',
    actor: 'Pau Simon',
    knownFor: 'El refugio atómico',
    description:
      'El hermano mediano: enigmático, reservado, observador y con una mirada que esconde demasiadas verdades.',
    icon: '🖤',
  },
  {
    character: 'Aleixandre "Alex" Cash',
    actor: 'Pablo Scapigliati',
    knownFor: 'El bus de la vida',
    description:
      'El hermano menor: rebelde, impulsivo, impredecible y magnético.',
    icon: '⚡',
  },
  {
    character: 'Adrien Cash',
    actor: 'Asier Etxeandia',
    knownFor: '',
    description: 'El patriarca imponente de la familia Cash.',
    icon: '🏛️',
  },
  {
    character: 'Artie',
    actor: 'Irene Ferreiro',
    knownFor: 'Skam España',
    description:
      'Pieza clave en la vida universitaria del campus.',
    icon: '🗝️',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function CastGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {CAST.map((member) => (
        <motion.div key={member.character} variants={itemVariants}>
          <CastCard
            character={member.character}
            actor={member.actor}
            knownFor={member.knownFor}
            description={member.description}
            icon={member.icon}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
