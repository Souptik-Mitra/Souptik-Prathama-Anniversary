/**
 * Romantic Music Box / Chime Synthesizer using Web Audio API.
 * 100% self-contained, no external audio file downloads needed,
 * completely off by default (satisfies PRD non-autoplay rule).
 */

class RomanticMusicPlayer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;

  // Gentle pentatonic music box notes (frequencies in Hz: C4, D4, E4, G4, A4, C5, D5, E5)
  private readonly melody = [
    261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 261.63,
    293.66, 329.63, 392.0, 440.0, 523.25, 659.25, 523.25, 392.0,
    349.23, 392.0, 440.0, 523.25, 440.0, 392.0, 349.23, 329.63,
    261.63, 329.63, 392.0, 440.0, 523.25, 440.0, 329.63, 261.63,
  ];

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public async toggle(): Promise<boolean> {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      await this.start();
      return true;
    }
  }

  public async start(): Promise<void> {
    if (this.isRunning) return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isRunning = true;
    this.scheduleNextNote();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private scheduleNextNote(): void {
    if (!this.isRunning || !this.ctx) return;

    const freq = this.melody[this.noteIndex % this.melody.length];
    this.playChime(freq);

    this.noteIndex++;
    // Relaxed, gentle tempo (about 720ms per chime note)
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, 720);
  }

  private playChime(freq: number): void {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm, bell-like sine + triangle blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Soft chime envelope: gentle attack, long musical ring decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.9);
  }
}

export const ambientMusicPlayer = new RomanticMusicPlayer();
