/**
 * Audio and notification system for the casino games
 */

// Sound effects - can be replaced with real audio files
const SOUNDS = {
  CARD_DEAL: {
    play: () => playSound('card_deal')
  },
  CARD_FLIP: {
    play: () => playSound('card_flip')
  },
  WIN: {
    play: () => playSound('win')
  },
  LOSE: {
    play: () => playSound('lose')
  },
  CLICK: {
    play: () => playSound('click')
  },
  CASH: {
    play: () => playSound('cash')
  },
  MINE_EXPLODE: {
    play: () => playSound('mine_explode')
  },
  GEM_COLLECT: {
    play: () => playSound('gem_collect')
  }
};

// Play a sound if enabled
function playSound(soundId) {
  if (!isSoundEnabled()) return;
  
  // In a real implementation, this would play actual audio files
  // For this demo, we'll just log that the sound was played
  console.log(`Playing sound: ${soundId}`);
  
  // Example of how to implement actual sound playing:
  /*
  const sound = new Audio(`sounds/${soundId}.mp3`);
  sound.volume = 0.5;
  sound.play().catch(error => {
    console.error('Error playing sound:', error);
  });
  */
}

// Show a success notification
function notifySuccess(message, duration = 3000) {
  showNotification(message, 'success', duration);
  SOUNDS.WIN.play();
}

// Show an error notification
function notifyError(message, duration = 3000) {
  showNotification(message, 'error', duration);
  SOUNDS.LOSE.play();
}

// Show an info notification
function notifyInfo(message, duration = 3000) {
  showNotification(message, 'info', duration);
  SOUNDS.CLICK.play();
}

// Show a warning notification
function notifyWarning(message, duration = 3000) {
  showNotification(message, 'warning', duration);
  SOUNDS.CLICK.play();
}

// Show a game notification in the game area
function showGameMessage(gameId, message, duration = 2000) {
  const messageElement = document.getElementById(`${gameId}-message`);
  if (!messageElement) return;
  
  messageElement.textContent = message;
  messageElement.classList.add('show');
  
  setTimeout(() => {
    messageElement.classList.remove('show');
  }, duration);
}