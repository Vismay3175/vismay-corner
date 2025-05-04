/**
 * Coin flip game implementation
 */

let coinElement;
let coinflipBetInput;
let startCoinflipButton;
let headsButton;
let tailsButton;

// Initialize the coin flip game
function initializeCoinflip() {
  // Get DOM elements
  coinElement = document.querySelector('.coin');
  coinflipBetInput = document.getElementById('coinflip-bet');
  startCoinflipButton = document.getElementById('btn-start-coinflip');
  headsButton = document.getElementById('btn-heads');
  tailsButton = document.getElementById('btn-tails');
  
  // Reset game state
  CoinFlipState.reset();
  
  // Set initial values
  coinflipBetInput.value = CoinFlipState.bet;
  
  // Set up event listeners
  setupCoinflipEventListeners();
}

// Set up event listeners for coin flip
function setupCoinflipEventListeners() {
  // Bet input
  coinflipBetInput.addEventListener('change', () => {
    const betAmount = parseInt(coinflipBetInput.value);
    if (isNaN(betAmount) || betAmount < 10) {
      coinflipBetInput.value = 10;
      CoinFlipState.bet = 10;
    } else if (betAmount > getPlayerPoints()) {
      coinflipBetInput.value = getPlayerPoints();
      CoinFlipState.bet = getPlayerPoints();
    } else {
      CoinFlipState.bet = betAmount;
    }
  });
  
  // Side selection buttons
  headsButton.addEventListener('click', () => {
    if (CoinFlipState.gamePhase === 'betting') {
      headsButton.classList.add('selected');
      tailsButton.classList.remove('selected');
      CoinFlipState.selectSide('heads');
      SOUNDS.CLICK.play();
    }
  });
  
  tailsButton.addEventListener('click', () => {
    if (CoinFlipState.gamePhase === 'betting') {
      tailsButton.classList.add('selected');
      headsButton.classList.remove('selected');
      CoinFlipState.selectSide('tails');
      SOUNDS.CLICK.play();
    }
  });
  
  // Start game button
  startCoinflipButton.addEventListener('click', () => {
    if (CoinFlipState.gamePhase === 'betting') {
      startCoinflipGame();
    }
  });
}

// Start a new coin flip game
async function startCoinflipGame() {
  // Validate bet and side selection
  if (CoinFlipState.bet <= 0 || CoinFlipState.bet > getPlayerPoints()) {
    notifyError("Invalid bet amount!");
    return;
  }
  
  if (!CoinFlipState.selectedSide) {
    notifyError("Please select heads or tails!");
    return;
  }
  
  // Deduct bet from points
  updatePlayerPoints(-CoinFlipState.bet);
  
  // Disable controls
  coinflipBetInput.disabled = true;
  startCoinflipButton.disabled = true;
  headsButton.disabled = true;
  tailsButton.disabled = true;
  
  // Flip the coin
  const won = await CoinFlipState.flip();
  
  // Animate coin flip
  coinElement.className = 'coin';
  void coinElement.offsetWidth; // Force reflow
  coinElement.classList.add(`flip-${CoinFlipState.result}`);
  
  // Play sound
  SOUNDS.CLICK.play();
  
  // Wait for animation
  await sleep(2000);
  
  // Show result
  if (won) {
    const winnings = CoinFlipState.bet;
    updatePlayerPoints(CoinFlipState.bet * 2);
    notifySuccess(`You won ${formatPoints(winnings)} points!`);
    recordGameResult(calculateGameResult('Coin Flip', true, winnings, 2));
  } else {
    notifyError(`You lost ${formatPoints(CoinFlipState.bet)} points!`);
    recordGameResult(calculateGameResult('Coin Flip', false, CoinFlipState.bet));
  }
  
  // Reset for next game
  await sleep(1000);
  endCoinflipGame();
}

// End the coin flip game
function endCoinflipGame() {
  // Reset controls
  coinflipBetInput.disabled = false;
  startCoinflipButton.disabled = false;
  headsButton.disabled = false;
  tailsButton.disabled = false;
  
  // Reset selection
  headsButton.classList.remove('selected');
  tailsButton.classList.remove('selected');
  
  // Reset coin
  coinElement.className = 'coin';
  
  // Reset game state
  CoinFlipState.reset();
}