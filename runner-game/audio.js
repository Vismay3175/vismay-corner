class GameAudio {
    constructor() {
        this.backgroundMusic = null;
        this.coinSound = null;
        this.jumpSound = null;
        this.crashSound = null;
        this.gameOverSound = null;
        this.isBackgroundMusicEnabled = true;
        this.initSounds();
    }

    initSounds() {
        this.loadSounds();
    }

    loadSounds() {
        this.backgroundMusic = new Audio('https://assets.codepen.io/21542/howler-demo-bg-music.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;

        this.coinSound = new Audio('https://assets.codepen.io/21542/howler-demo-success.mp3');
        this.coinSound.volume = 0.3;

        this.jumpSound = new Audio('https://assets.codepen.io/21542/howler-demo-sprite-jump.mp3');
        this.jumpSound.volume = 0.5;

        this.crashSound = new Audio('https://assets.codepen.io/21542/howler-demo-sprite-crash.mp3');
        this.crashSound.volume = 0.7;

        this.gameOverSound = new Audio('https://assets.codepen.io/21542/howler-demo-sprite-die.mp3');
        this.gameOverSound.volume = 0.7;
    }

    playBackgroundMusic() {
        if (this.isBackgroundMusicEnabled) {
            this.backgroundMusic.currentTime = 0;
            this.backgroundMusic.play().catch(err => console.log('Audio play failed:', err));
        }
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    toggleBackgroundMusic() {
        this.isBackgroundMusicEnabled = !this.isBackgroundMusicEnabled;
        if (!this.isBackgroundMusicEnabled) {
            this.stopBackgroundMusic();
        }
    }

    playCoinSound() {
        this.coinSound.currentTime = 0;
        this.coinSound.play().catch(err => console.log('Audio play failed:', err));
    }

    playJumpSound() {
        this.jumpSound.currentTime = 0;
        this.jumpSound.play().catch(err => console.log('Audio play failed:', err));
    }

    playCrashSound() {
        this.crashSound.currentTime = 0;
        this.crashSound.play().catch(err => console.log('Audio play failed:', err));
    }

    playGameOverSound() {
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play().catch(err => console.log('Audio play failed:', err));
    }
}
