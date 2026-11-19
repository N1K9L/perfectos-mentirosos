export interface TimelineMonthData {
  month: number;
  title: string;
  emoji: string;
  description: string;
  date?: string;
  isSpecial?: boolean;
}

export const timelineData: TimelineMonthData[] = [
  {
    month: 1,
    title: 'Enero — Nos conocimos',
    emoji: '💬',
    description:
      'Nos conocimos en Discord. El inicio de todo sin imaginar lo que venía.',
    date: '19 de enero',
  },
  {
    month: 2,
    title: 'Febrero — Millones de euros',
    emoji: '💶',
    description:
      'Hablábamos casi todos los días. Yo intentaba alejarme, pero era imposible porque me debías "millones de euros" por nuestra broma de cobrarte cada favor que hacía por ti.',
  },
  {
    month: 3,
    title: 'Marzo — 100 razones',
    emoji: '💝',
    description:
      'Empezamos a interesarnos el uno por el otro. Te "compré todo el cuerpo" de broma y me regalaste 100 razones para quedarme contigo para siempre.',
  },
  {
    month: 4,
    title: 'Abril — Te amo',
    emoji: '❤️',
    description:
      'Nos enamoramos y empezamos a tratarnos bonito: mi primer "te quiero mucho", luego tu "te amo" y finalmente mi "te amo".',
    isSpecial: true,
  },
  {
    month: 5,
    title: 'Mayo — Llamada 24/7',
    emoji: '📞',
    description:
      'Nos empezábamos a conquistar. Hicimos nuestro acuerdo de "llamada todo el tiempo" para construir algo único y superespecial, mientras yo te conocía más y mis inseguridades empezaban a atacar mi corazón.',
  },
  {
    month: 6,
    title: 'Junio — Tu cumpleaños',
    emoji: '🎂',
    description:
      'Tu cumpleaños, ya siendo novios. Videollamadas todo el tiempo y la primera vez que vimos el cielo gris juntos; aunque era gris, fue hermoso para los dos.',
  },
  {
    month: 7,
    title: 'Julio — Mi cumpleaños',
    emoji: '🎁',
    description:
      'Mi cumpleaños. Me hiciste un video y un PDF gigante con razones de por qué me amas (que tristemente perdí, pero jamás olvidé), aunque ese mes también empezamos a pelear más.',
  },
  {
    month: 8,
    title: 'Agosto — La prueba',
    emoji: '🌧️',
    description:
      'Nos separamos un tiempo, pero seguimos hablando y a veces tratándonos como novios. Casi fue el fin de todo por un error tuyo, pero el cariño pudo más y logramos volver a hablar.',
  },
  {
    month: 9,
    title: 'Septiembre — Florecer',
    emoji: '🌸',
    description:
      'Reconciliación y aprender a fluir. El amor volvió a florecer; yo estaba supremamente triste y tú me animabas todos los días, aguantando incluso los malos momentos que desahogué contigo.',
  },
  {
    month: 10,
    title: 'Octubre — Novios otra vez',
    emoji: '💍',
    description:
      'Volvimos a ser novios oficialmente. Un día súper bonito lleno de actividades juntos (nuestro Notion: figuras de papel, bingo, pelis en latino y español, siestita y emplatar comida), aunque al final del día me quedé con la sensación de que no lo habías disfrutado tanto como yo.',
    date: '19 de octubre',
    isSpecial: true,
  },
  {
    month: 11,
    title: 'Noviembre — ¡Felices 10 Meses!',
    emoji: '✨',
    description:
      'Superamos una crisis muy fuerte este mes; sacaste fuerzas para reorganizar toda nuestra relación y dejar de sentirte controlada, y yo aguanté días muy duros para que eso pasara. Hoy casi no peleamos, estamos juntitos y felices, un poco ocupados con mi trabajo y tu estudio, pero muy estables gracias a Dios y con toda la ilusión del mundo por conocernos en persona.',
    isSpecial: true,
  },
];
