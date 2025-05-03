/**
 * Storage utilities for the casino games
 */

// Local storage keys
const STORAGE_KEYS = {
  PLAYER_DATA: 'royal_games_player_data',
  GAME_HISTORY: 'royal_games_history',
  SETTINGS: 'royal_games_settings'
};

// Default player data
const DEFAULT_PLAYER_DATA = {
  points: 1000,
  gamesPlayed: 0,
  blackjackWins: 0,
  blackjackLosses: 0,
  minesWins: 0,
  minesLosses: 0
};

// Default settings
const DEFAULT_SETTINGS = {
  soundEnabled: true
};

// Get player data from local storage
function getPlayerData() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.PLAYER_DATA);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error getting player data:', error);
  }
  
  return { ...DEFAULT_PLAYER_DATA };
}

// Save player data to local storage
function savePlayerData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving player data:', error);
  }
}

// Update player points
function updatePlayerPoints(points) {
  const playerData = getPlayerData();
  playerData.points = Math.max(0, playerData.points + points);
  savePlayerData(playerData);
  
  // Update UI
  const pointsElement = document.getElementById('points-value');
  if (pointsElement) {
    animateNumber(pointsElement, parseInt(pointsElement.textContent.replace(/,/g, '')), playerData.points);
  }
  
  return playerData.points;
}

// Get current player points
function getPlayerPoints() {
  return getPlayerData().points;
}

// Record game result
function recordGameResult(result) {
  try {
    // Update game history
    const history = getGameHistory();
    history.unshift(result);
    
    // Keep only the last 20 games
    while (history.length > 20) {
      history.pop();
    }
    
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history));
    
    // Update player stats
    const playerData = getPlayerData();
    playerData.gamesPlayed++;
    
    if (result.game === 'Blackjack') {
      if (result.won) {
        playerData.blackjackWins++;
      } else {
        playerData.blackjackLosses++;
      }
    } else if (result.game === 'Mines') {
      if (result.won) {
        playerData.minesWins++;
      } else {
        playerData.minesLosses++;
      }
    }
    
    savePlayerData(playerData);
    
    // Update UI if on home screen
    updateGameHistoryUI();
    
  } catch (error) {
    console.error('Error recording game result:', error);
  }
}

// Get game history
function getGameHistory() {
  try {
    const storedHistory = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error('Error getting game history:', error);
  }
  
  return [];
}

// Get game settings
function getSettings() {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Error getting settings:', error);
  }
  
  return { ...DEFAULT_SETTINGS };
}

// Save game settings
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Toggle sound setting
function toggleSound() {
  const settings = getSettings();
  settings.soundEnabled = !settings.soundEnabled;
  saveSettings(settings);
  
  // Update UI
  const soundButton = document.getElementById('toggle-sound');
  if (soundButton) {
    if (settings.soundEnabled) {
      soundButton.classList.remove('sound-off');
      soundButton.classList.add('sound-on');
    } else {
      soundButton.classList.remove('sound-on');
      soundButton.classList.add('sound-off');
    }
  }
  
  return settings.soundEnabled;
}

// Check if sound is enabled
function isSoundEnabled() {
  return getSettings().soundEnabled;
}

// Update the game history UI
function updateGameHistoryUI() {
  const historyContainer = document.getElementById('game-history');
  if (!historyContainer) return;
  
  const history = getGameHistory();
  historyContainer.innerHTML = '';
  
  if (history.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'text-center text-neutral-500';
    emptyMessage.textContent = 'No game history yet. Play a game to see your results!';
    historyContainer.appendChild(emptyMessage);
    return;
  }
  
  history.forEach(result => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    // Game info
    const gameInfo = document.createElement('div');
    gameInfo.className = 'history-game';
    
    const gameIcon = document.createElement('div');
    gameIcon.className = `history-icon ${result.game === 'Blackjack' ? 'blackjack-icon' : 'mines-icon'}`;
    gameIcon.style.width = '24px';
    gameIcon.style.height = '24px';
    gameIcon.style.fontSize = '12px';
    
    const gameName = document.createElement('span');
    gameName.textContent = result.game;
    
    gameInfo.appendChild(gameIcon);
    gameInfo.appendChild(gameName);
    
    // Result info
    const resultInfo = document.createElement('div');
    resultInfo.className = 'history-result';
    
    // Add result with + or - and the amount
    const resultText = document.createElement('span');
    resultText.className = result.won ? 'win' : 'loss';
    resultText.textContent = result.won 
      ? `+${formatPoints(result.amount)}` 
      : `-${formatPoints(result.amount)}`;
    
    resultInfo.appendChild(resultText);
    
    // Add to history item
    historyItem.appendChild(gameInfo);
    historyItem.appendChild(resultInfo);
    
    // Add to container
    historyContainer.appendChild(historyItem);
  });
}