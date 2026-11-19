import LZString from 'lz-string';

const STATE_KEYS = [
  'nikotana_hypeLevel',
  'nikotana_cashBrother',
  'nikotana_liar',
  'nikotana_snacks',
  'nikotana_dressCode',
  'nikotana_ticketConfirmed',
  'nikotana_ticketTime',
  'nikotana_predictions',
  'nikotana_detectiveMode',
  'nikotana_kissCounter',
  'nikotana_dubTeam',
  'nikotana_emplatado',
] as const;

export function exportState(): string {
  const state: Record<string, unknown> = {};
  STATE_KEYS.forEach(key => {
    const val = localStorage.getItem(key);
    if (val !== null) {
      try {
        state[key] = JSON.parse(val);
      } catch {
        state[key] = val;
      }
    }
  });
  return LZString.compressToEncodedURIComponent(JSON.stringify(state));
}

export function importState(encoded: string): Record<string, unknown> | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const state = JSON.parse(json);
    return state;
  } catch {
    return null;
  }
}

export function generateShareUrl(): string {
  const compressed = exportState();
  return `${window.location.origin}${window.location.pathname}?state=${compressed}`;
}

export function generateWhatsAppSummary(): string {
  const hype = localStorage.getItem('nikotana_hypeLevel');
  const brother = localStorage.getItem('nikotana_cashBrother');
  const liar = localStorage.getItem('nikotana_liar');
  const snacks = localStorage.getItem('nikotana_snacks');
  const dressCode = localStorage.getItem('nikotana_dressCode');
  const ticketConfirmed = localStorage.getItem('nikotana_ticketConfirmed');
  const ticketTime = localStorage.getItem('nikotana_ticketTime');
  const dubTeam = localStorage.getItem('nikotana_dubTeam');
  const emplatado = localStorage.getItem('nikotana_emplatado');

  const lines: string[] = [
    '🎬✨ *PERFECTOS MENTIROSOS — MIS ELECCIONES* ✨🎬',
    '',
  ];

  if (hype) lines.push(`🔥 Mi nivel de hype: ${JSON.parse(hype)}%`);
  if (brother) lines.push(`💎 Hermano Cash favorito: ${JSON.parse(brother)}`);
  if (liar) lines.push(`🤥 El más mentiroso: ${JSON.parse(liar)}`);
  if (dubTeam) lines.push(`🗣️ Team doblaje: ${JSON.parse(dubTeam)}`);
  if (emplatado) lines.push(`🍽️ Emplatado especial: ${JSON.parse(emplatado) ? 'Sí 💕' : 'No'}`);

  if (snacks) {
    const parsed = JSON.parse(snacks) as string[];
    if (parsed.length > 0) {
      lines.push('', '🍿 *Mis snacks para la cita:*');
      parsed.forEach(s => lines.push(`  • ${s}`));
    }
  }

  if (dressCode) lines.push(`\n👗 Dress code: ${JSON.parse(dressCode)}`);
  if (ticketTime) lines.push(`🎟️ Hora de la cita: ${JSON.parse(ticketTime)}`);
  if (ticketConfirmed) lines.push(`✅ Asistencia confirmada: ${JSON.parse(ticketConfirmed) ? '¡SÍ!' : 'Pendiente'}`);

  lines.push('', '💌 Generado con amor desde nikotana.github.io');

  const compressed = exportState();
  const url = `${window.location.origin}${window.location.pathname}?state=${compressed}`;
  lines.push(`\n🔗 Ver mis elecciones: ${url}`);

  return lines.join('\n');
}
