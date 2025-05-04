/**
 * Mines game implementation
 */

let minesGridElement;
let minesNumberSelect;
let minesBetInput;
let startMinesButton;
let cashoutButton;
let currentMultiplierElement;
let potentialWinElement;

// Initialize the mines game
function initializeMines() {
  // Get DOM elements
  minesGridElement = document.getElementById('mines-grid');
  minesNumberSelect = document.getElementById('mines-number');
  minesBetInput = document.getElementById('mines-bet');
  startMinesButton = document.getElementById('btn-start-mines');
  cashoutButton = document.getElementById('btn-cashout');
  currentMultiplierElement = document.getElementById('current-multiplier');
  potentialWinElement = document.getElementById('potential-win');
  
  // Reset game state
  MinesState.reset();
  
  // Set initial values
  minesNumberSelect.value = MinesState.mines;
  minesBetInput.value = MinesState.bet;
  
  // Update display
  updateMinesDisplay();
  
  // Clear the grid
  clearMinesGrid();
  
  // Set up event listeners
  setupMinesEventListeners();
}

// Set up event listeners for mines game
function setupMinesEventListeners() {
  // Mines number select
  minesNumberSelect.addEventListener('change', () => {
    MinesState.setMines(parseInt(minesNumberSelect.value));
    SOUNDS.CLICK.play();
  });
  
  // Bet input
  minesBetInput.addEventListener('change', () => {
    const betAmount = parseInt(minesBetInput.value);
    if (isNaN(betAmount) || betAmount < 10) {
      minesBetInput.value = 10;
      MinesState.bet = 10;
    } else if (betAmount > getPlayerPoints()) {
      minesBetInput.value = getPlayerPoints();
      MinesState.bet = getPlayerPoints();
    } else {
      MinesState.bet = betAmount;
    }
    updateMinesDisplay();
  });
  
  // Start game button
  startMinesButton.addEventListener('click', () => {
    if (MinesState.gamePhase === 'betting') {
      startMinesGame();
    }
  });
  
  // Cashout button
  cashoutButton.addEventListener('click', () => {
    if (MinesState.gamePhase === 'playing' && MinesState.uncoveredPositions.length > 0) {
      cashoutMines();
    }
  });
}

// Start a new mines game
function startMinesGame() {
  // Check if bet is valid
  if (MinesState.bet <= 0 || MinesState.bet > getPlayerPoints()) {
    notifyError("Invalid bet amount!");
    return;
  }
  
  // Deduct the bet amount from player's points
  updatePlayerPoints(-MinesState.bet);
  
  // Initialize the grid
  MinesState.initializeGrid();
  
  // Create the grid UI
  createMinesGrid();
  
  // Update display
  updateMinesDisplay();
  
  // Update controls
  minesNumberSelect.disabled = true;
  minesBetInput.disabled = true;
  startMinesButton.disabled = true;
  cashoutButton.disabled = false;
  
  // Reset multiplier
  MinesState.currentMultiplier = 1.0;
  updateMultiplierDisplay();
}

// Create the mines grid
function createMinesGrid() {
  clearMinesGrid();
  
  for (let i = 0; i < MinesState.gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'mines-tile';
    tile.dataset.position = i;
    
    // Create front face (hidden)
    const tileFront = document.createElement('div');
    tileFront.className = 'mines-tile-face mines-tile-front';
    
    // Create back face (will be updated when revealed)
    const tileBack = document.createElement('div');
    tileBack.className = 'mines-tile-face mines-tile-back';
    
    tile.appendChild(tileFront);
    tile.appendChild(tileBack);
    
    // Add click event
    tile.addEventListener('click', () => {
      if (MinesState.gamePhase === 'playing' && !MinesState.uncoveredPositions.includes(i)) {
        revealTile(i);
      }
    });
    
    minesGridElement.appendChild(tile);
  }
}

// Reveal a tile
async function revealTile(position) {
  if (MinesState.gamePhase !== 'playing') return;
  
  const isGem = !MinesState.isMine(position);
  const tileElement = minesGridElement.querySelector(`[data-position="${position}"]`);
  
  if (!tileElement || MinesState.uncoveredPositions.includes(position)) return;
  
  // Play sound
  if (isGem) {
    SOUNDS.GEM_COLLECT.play();
  } else {
    SOUNDS.MINE_EXPLODE.play();
  }
  
  // Animate the reveal
  await animateRevealTile(tileElement, isGem);
  
  // Update game state
  const success = MinesState.uncoverPosition(position);
  
  if (success) {
    // Update multiplier and potential win
    updateMultiplierDisplay();
    tileElement.classList.add('disabled');
    
    // Enable cashout button
    cashoutButton.disabled = false;
  } else {
    // Game over - hit a mine
    endMinesGame(false);
  }
}

// Cashout and end the game
function cashoutMines() {
  if (MinesState.gamePhase !== 'playing' || MinesState.uncoveredPositions.length === 0) return;
  
  const winnings = MinesState.calculatePotentialWin();
  if (MinesState.cashout()) {
    SOUNDS.CASH.play();
    updatePlayerPoints(winnings);
    endMinesGame(true);
  }
}

// End the mines game
async function endMinesGame(won) {
  // Disable all tiles
  const tiles = minesGridElement.querySelectorAll('.mines-tile');
  tiles.forEach(tile => {
    tile.classList.add('disabled');
  });
  
  // Reveal all mines (with a slight delay)
  if (won) {
    const winnings = MinesState.calculatePotentialWin() - MinesState.bet;
    notifySuccess(`You won ${formatPoints(winnings)} points!`);
    recordGameResult(calculateGameResult('Mines', true, winnings, MinesState.currentMultiplier));
  } else {
    // Reveal all mines
    for (const position of MinesState.minePositions) {
      if (!MinesState.uncoveredPositions.includes(position)) {
        const tileElement = minesGridElement.querySelector(`[data-position="${position}"]`);
        if (tileElement) {
          await sleep(100);
          const backFace = tileElement.querySelector('.mines-tile-back');
          backFace.classList.add('mine');
          backFace.textContent = '💣';
          tileElement.classList.add('flipped');
        }
      }
    }
    
    notifyError(`You lost ${formatPoints(MinesState.bet)} points!`);
    recordGameResult(calculateGameResult('Mines', false, MinesState.bet));
  }
  
  // Reset controls
  minesNumberSelect.disabled = false;
  minesBetInput.disabled = false;
  startMinesButton.disabled = false;
  cashoutButton.disabled = true;
  
  // Reset game state for next round
  MinesState.reset();
  MinesState.bet = parseInt(minesBetInput.value);
  MinesState.mines = parseInt(minesNumberSelect.value);
}

// Update the mines display
function updateMinesDisplay() {
  if (minesBetInput) {
    minesBetInput.max = getPlayerPoints();
  }
}

// Update multiplier display
function updateMultiplierDisplay() {
  currentMultiplierElement.textContent = `${MinesState.currentMultiplier.toFixed(2)}x`;
  potentialWinElement.textContent = formatPoints(MinesState.calculatePotentialWin());
}

// Clear the mines grid
function clearMinesGrid() {
  minesGridElement.innerHTML = '';
}