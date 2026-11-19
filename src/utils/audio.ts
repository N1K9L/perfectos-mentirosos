// Ambient romantic sound generator using Web Audio API (Zero external assets needed)

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let masterGain: GainNode | null = null;
let intervalId: number | null = null;

const CHORD_FREQS = [
  // Warm D minor / F Major romantic pentatonic ambient pads
  146.83, // D3
  220.0,  // A3
  261.63, // C4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
];

export function toggleAmbientSound(): boolean {
  if (isPlaying) {
    stopAmbientSound();
    return false;
  } else {
    startAmbientSound();
    return true;
  }
}

export function startAmbientSound() {
  if (isPlaying) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);
    masterGain.connect(audioCtx.destination);

    // Warm sub drone
    const droneOsc = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.value = 73.42; // D2 deep warm bass
    droneGain.gain.value = 0.4;
    droneOsc.connect(droneGain);
    droneGain.connect(masterGain);
    droneOsc.start();

    // Random soft chimes
    const playChime = () => {
      if (!audioCtx || !masterGain || !isPlaying) return;
      const freq = CHORD_FREQS[Math.floor(Math.random() * CHORD_FREQS.length)];
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + 5);
    };

    intervalId = window.setInterval(playChime, 2500);
    playChime();

    isPlaying = true;
  } catch (e) {
    console.warn('Audio start failed', e);
  }
}

export function stopAmbientSound() {
  if (!isPlaying || !audioCtx || !masterGain) return;

  try {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    setTimeout(() => {
      isPlaying = false;
    }, 1000);
  } catch (e) {
    console.warn('Audio stop failed', e);
    isPlaying = false;
  }
}
