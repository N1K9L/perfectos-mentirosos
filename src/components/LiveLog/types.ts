export type DetectiveMode = 'nikol' | 'aitana';

export type Timing = 'inicio' | 'mitad' | 'antes-del-final';

export interface Prediction {
  id: string;
  text: string;
  timing: Timing;
  timestamp: string;
  detective: DetectiveMode;
  sealed: boolean;
  correct: boolean | null;
}

export const TIMING_LABELS: Record<Timing, string> = {
  'inicio': 'Inicio 🎬',
  'mitad': 'Mitad 🎭',
  'antes-del-final': 'Antes del final 😱',
};

export const DETECTIVE_LABELS: Record<DetectiveMode, string> = {
  nikol: 'Nikol 🕵️‍♂️',
  aitana: 'Aitana 🕵️‍♀️',
};
