/**
 * BLOKIC - Audio Manager
 * Gestiona la música de fondo y efectos de sonido del juego
 */

class AudioManager {
    constructor() {
        this.musicEnabled = true;
        this.sfxEnabled = true;
        this.musicVolume = 0.7;
        this.sfxVolume = 0.7;

        this.audioContext = null;
        this.musicOscillators = [];
        this.sfxOscillators = [];
        this.musicPlaying = false;

        this.initAudioContext();
        this.loadSettings();
    }

    initAudioContext() {
        if (!this.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            try {
                this.audioContext = new AudioContext();
            } catch (e) {
                console.warn('Audio Context not available:', e);
            }
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('blokicAudioSettings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.musicEnabled = settings.musicEnabled ?? true;
                this.sfxEnabled = settings.sfxEnabled ?? true;
                this.musicVolume = settings.musicVolume ?? 0.7;
                this.sfxVolume = settings.sfxVolume ?? 0.7;
            }
        } catch (e) {
            console.warn('Failed to load audio settings:', e);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('blokicAudioSettings', JSON.stringify({
                musicEnabled: this.musicEnabled,
                sfxEnabled: this.sfxEnabled,
                musicVolume: this.musicVolume,
                sfxVolume: this.sfxVolume
            }));
        } catch (e) {
            console.warn('Failed to save audio settings:', e);
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume / 100));
        this.saveSettings();
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume / 100));
        this.saveSettings();
    }

    toggleMusic(enabled) {
        this.musicEnabled = enabled;
        if (!enabled) {
            this.stopMusic();
        }
        this.saveSettings();
    }

    toggleSFX(enabled) {
        this.sfxEnabled = enabled;
        this.saveSettings();
    }

    /**
     * Reproducir música de fondo
     */
    playBackgroundMusic() {
        if (!this.musicEnabled || !this.audioContext || this.musicPlaying) return;

        this.musicPlaying = true;
        this.initAudioContext();
        const ctx = this.audioContext;

        const playNote = (frequency, startTime, duration, volume) => {
            try {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.value = frequency;

                gain.gain.setValueAtTime(volume * this.musicVolume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

                osc.start(startTime);
                osc.stop(startTime + duration);

                this.musicOscillators.push(osc);
            } catch (e) {
                console.warn('Error playing note:', e);
            }
        };

        // Melodía simple de fondo tipo Tetris
        const now = ctx.currentTime;
        const notes = [
            { freq: 392, time: 0, duration: 0.25 },
            { freq: 440, time: 0.25, duration: 0.25 },
            { freq: 494, time: 0.5, duration: 0.5 },
            { freq: 440, time: 1, duration: 0.25 },
            { freq: 392, time: 1.25, duration: 0.25 },
            { freq: 349, time: 1.5, duration: 0.5 },
            { freq: 330, time: 2, duration: 0.5 },
            { freq: 349, time: 2.5, duration: 0.25 },
            { freq: 392, time: 2.75, duration: 0.25 }
        ];

        notes.forEach(note => {
            playNote(note.freq, now + note.time, note.duration, 0.1);
        });

        // Repetir cada 3.5 segundos
        setTimeout(() => {
            this.musicPlaying = false;
            if (this.musicEnabled) {
                this.playBackgroundMusic();
            }
        }, 3500);
    }

    stopMusic() {
        this.musicOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // Ya fue parado
            }
        });
        this.musicOscillators = [];
        this.musicPlaying = false;
    }

    /**
     * Efecto de sonido: colocar pieza
     */
    playPlacePieceSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);

            gain.gain.setValueAtTime(this.sfxVolume * 0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {
            console.warn('Error playing place piece sound:', e);
        }
    }

    /**
     * Efecto de sonido: línea completada
     */
    playLineClearSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const frequencies = [523.25, 659.25, 783.99];
            frequencies.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.value = freq;

                const startTime = now + index * 0.1;
                gain.gain.setValueAtTime(this.sfxVolume * 0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

                osc.start(startTime);
                osc.stop(startTime + 0.2);
            });
        } catch (e) {
            console.warn('Error playing line clear sound:', e);
        }
    }

    /**
     * Efecto de sonido: game over
     */
    playGameOverSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(400 - i * 50, now + i * 0.15);
                osc.frequency.exponentialRampToValueAtTime(200, now + i * 0.15 + 0.3);

                gain.gain.setValueAtTime(this.sfxVolume * 0.2, now + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3);

                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.3);
            }
        } catch (e) {
            console.warn('Error playing game over sound:', e);
        }
    }

    /**
     * Efecto de sonido: error / movimiento inválido
     */
    playErrorSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'square';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

            gain.gain.setValueAtTime(this.sfxVolume * 0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {
            console.warn('Error playing error sound:', e);
        }
    }

    /**
     * Efecto de sonido: UI click
     */
    playClickSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.value = 800;

            gain.gain.setValueAtTime(this.sfxVolume * 0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            console.warn('Error playing click sound:', e);
        }
    }

    /**
     * Efecto de sonido: warning / tiempo bajo
     */
    playWarningSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            for (let i = 0; i < 2; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.value = 700;

                const startTime = now + i * 0.15;
                gain.gain.setValueAtTime(this.sfxVolume * 0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

                osc.start(startTime);
                osc.stop(startTime + 0.1);
            }
        } catch (e) {
            console.warn('Error playing warning sound:', e);
        }
    }

    /**
     * Efecto de sonido: remesa completada
     */
    playBatchCompleteSound() {
        if (!this.sfxEnabled || !this.audioContext) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const frequencies = [659.25, 783.99, 987.77];
            frequencies.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.value = freq;

                const startTime = now + index * 0.1;
                gain.gain.setValueAtTime(this.sfxVolume * 0.3, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch (e) {
            console.warn('Error playing batch complete sound:', e);
        }
    }
}

// Instancia global
const audioManager = new AudioManager();