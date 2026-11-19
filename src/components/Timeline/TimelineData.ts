export interface TimelineMonthData {
  month: number;
  title: string;
  category: string;
  description: string;
  date?: string;
  isSpecial?: boolean;
}

export const timelineData: TimelineMonthData[] = [
  {
    month: 1,
    title: 'Enero — Nos conocimos',
    category: 'El Primer Saludo',
    description:
      'Nos conocimos en Discord. El inicio de todo sin imaginar lo que Dios tenía preparado.',
    date: '19 de enero',
  },
  {
    month: 2,
    title: 'Febrero — Millones de euros',
    category: 'Nuestra Primera Broma',
    description:
      'Hablábamos casi todos los días. Yo intentaba alejarme, pero era imposible porque me debías "millones de euros" por nuestra broma de cobrarte cada favor que hacía por ti.',
  },
  {
    month: 3,
    title: 'Marzo — 100 razones',
    category: 'El Despertar del Cariño',
    description:
      'Empezamos a interesarnos de verdad el uno por el otro. Te "compré todo el cuerpo" de broma y me regalaste 100 razones para quedarme contigo para siempre.',
  },
  {
    month: 4,
    title: 'Abril — Te amo',
    category: 'Las Palabras Clave',
    description:
      'Nos enamoramos y empezamos a tratarnos con toda la ternura: mi primer "te quiero mucho", luego tu "te amo" y finalmente mi "te amo" del alma.',
    isSpecial: true,
  },
  {
    month: 5,
    title: 'Mayo — Llamada 24/7',
    category: 'El Gran Acuerdo',
    description:
      'Nos empezábamos a conquistar. Hicimos nuestro acuerdo de "llamada todo el tiempo" para construir algo único y superespecial, mientras yo te conocía más y mis inseguridades empezaban a desafiar mi corazón.',
  },
  {
    month: 6,
    title: 'Junio — Tu cumpleaños',
    category: 'Cielos Grises Hermosos',
    description:
      'Tu cumpleaños, ya siendo novios. Videollamadas a todas horas y la primera vez que vimos el cielo gris juntos; aunque estuviera gris, fue hermoso para los dos.',
  },
  {
    month: 7,
    title: 'Julio — Mi cumpleaños',
    category: 'Detalles que Quedan',
    description:
      'Mi cumpleaños. Me hiciste un video y un PDF gigante con razones de por qué me amas (que tristemente perdí, pero jamás olvidé), aunque ese mes también empezamos a tener más roces.',
  },
  {
    month: 8,
    title: 'Agosto — La prueba',
    category: 'Superar la Tormenta',
    description:
      'Nos separamos un tiempo, pero seguimos hablando y a veces tratándonos como novios. Casi fue el fin de todo por un error, pero el cariño sincero pudo más y logramos volver a encontrarnos.',
  },
  {
    month: 9,
    title: 'Septiembre — Florecer',
    category: 'Reconciliación & Paz',
    description:
      'Reconciliación y aprender a fluir juntos. El amor volvió a florecer; yo estaba supremamente triste y tú me animabas todos los días, aguantando con paciencia incluso los momentos difíciles que desahogué contigo.',
  },
  {
    month: 10,
    title: 'Octubre — Novios otra vez',
    category: '19 de Octubre',
    description:
      'Volvimos a ser novios oficialmente. Un día súper bonito lleno de actividades juntos (nuestro Notion: figuras de papel, bingo, pelis en latino y español, siestita y emplatar comida), con la ilusión de construir algo duradero.',
    date: '19 de octubre',
    isSpecial: true,
  },
  {
    month: 11,
    title: 'Noviembre — ¡Felices 10 Meses!',
    category: 'Madurez & Libertad',
    description:
      'Superamos una crisis muy fuerte este mes; sacaste fuerzas para reorganizar nuestra relación y sentirte libre y valorada, y yo aguanté días duros para que eso pasara. Hoy casi no peleamos, estamos juntitos y felices, ocupados con mi trabajo y tu estudio, pero muy estables gracias a Dios y con toda la ilusión del mundo por conocernos en persona.',
    isSpecial: true,
  },
];
