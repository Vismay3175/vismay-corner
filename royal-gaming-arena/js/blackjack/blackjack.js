/**
 * Blackjack game implementation
 */

let blackjackDeck = [];
let dealerCardsContainer;
let playerCardsContainer;
let dealerScoreElement;
let playerScoreElement;
let gameMessageElement;
let dealButton;
let hitButton;
let standButton;
let doubleButton;
let currentBetElement;
let betButtons;

// Initialize the blackjack game
function initializeBlackjack() {
  // Get DOM elements
  dealerCardsContainer = document.getElementById('dealer-cards');
  playerCardsContainer = document.getElementById('player-cards');
  dealerScoreElement = document.getElementById('dealer-score');
  playerScoreElement = document.getElementById('player-score');
  gameMessageElement = document.getElementById('blackjack-message');
  dealButton = document.getElementById('btn-deal');
  hitButton = document.getElementById('btn-hit');
  standButton = document.getElementById('btn-stand');
  doubleButton = document.getElementById('btn-double');
  currentBetElement = document.getElementById('current-bet');
  betButtons = document.querySelectorAll('.bet-btn');
  
  // Reset game state
  BlackjackState.reset();
  updateBetDisplay();
  
  // Clear the table
  clearTable();
  
  // Create and shuffle a new deck
  blackjackDeck = shuffleDeck(createDeck());
  
  // Set up event listeners
  setupBlackjackEventListeners();
}

// Set up event listeners for blackjack
function setupBlackjackEventListeners() {
  // Bet buttons
  betButtons.forEach(button => {
    button.addEventListener('click', () => {
      const betAmount = parseInt(button.dataset.bet);
      BlackjackState.addToBet(betAmount);
      updateBetDisplay();
      SOUNDS.CLICK.play();
    });
  });
  
  // Deal button
  dealButton.addEventListener('click', () => {
    if (BlackjackState.bet <= 0) {
      notifyError("Please place a bet first!");
      return;
    }
    
    // Start the game
    startBlackjackRound();
  });
  
  // Hit button
  hitButton.addEventListener('click', async () => {
    if (BlackjackState.gamePhase !== 'player-turn') return;
    
    // Disable hit button while dealing
    hitButton.disabled = true;
    
    SOUNDS.CARD_DEAL.play();
    
    // Deal a card to the player
    const card = dealCard(blackjackDeck);
    BlackjackState.playerCards.push(card);
    
    // Update the display
    await addCardToHand(card, playerCardsContainer);
    
    // Update scores
    BlackjackState.updateScores();
    updateScoreDisplay();
    
    // Check if player busts
    if (BlackjackState.isPlayerBust()) {
      endPlayerTurn();
    } else {
      // Re-enable hit button
      hitButton.disabled = false;
    }
  });
  
  // Stand button
  standButton.addEventListener('click', () => {
    if (BlackjackState.gamePhase !== 'player-turn') return;
    
    SOUNDS.CLICK.play();
    endPlayerTurn();
  });
  
  // Double button
  doubleButton.addEventListener('click', async () => {
    if (!BlackjackState.canDoubleDown()) return;
    
    if (BlackjackState.doubleBet()) {
      SOUNDS.CASH.play();
      updateBetDisplay();
      
      // Disable buttons while dealing
      hitButton.disabled = true;
      standButton.disabled = true;
      doubleButton.disabled = true;
      
      // Deal one more card to the player
      const card = dealCard(blackjackDeck);
      BlackjackState.playerCards.push(card);
      
      // Update the display
      await addCardToHand(card, playerCardsContainer);
      
      // Update scores
      BlackjackState.updateScores();
      updateScoreDisplay();
      
      // End player's turn
      endPlayerTurn();
    }
  });
}

// Start a new round of blackjack
async function startBlackjackRound() {
  if (BlackjackState.gamePhase !== 'betting') return;
  
  // Deduct the bet amount from player's points
  updatePlayerPoints(-BlackjackState.bet);
  
  // Update buttons
  dealButton.disabled = true;
  betButtons.forEach(btn => btn.disabled = true);
  
  // Start the game
  BlackjackState.startGame();
  clearTable();
  
  // Deal initial cards
  await dealInitialCards();
  
  // Update scores - only show player's score and first dealer card value
  BlackjackState.updateScores();
  playerScoreElement.textContent = BlackjackState.playerScore;
  dealerScoreElement.textContent = getCardValue(BlackjackState.dealerCards[0]);
  
  // Check for blackjack
  if (BlackjackState.checkForBlackjack()) {
    // Show dealer's hidden card
    await flipDealerCard();
    
    // Check if dealer also has blackjack
    if (BlackjackState.dealerScore === 21) {
      // Push - player gets bet back
      BlackjackState.gameResult = 'push';
      updatePlayerPoints(BlackjackState.bet);
      await showGameResult("Push! It's a tie.");
    } else {
      // Player wins with blackjack (pays 3:2)
      BlackjackState.gameResult = 'blackjack';
      const winnings = Math.floor(BlackjackState.bet * 1.5);
      updatePlayerPoints(BlackjackState.bet + winnings);
      await showGameResult(`Blackjack! You win ${formatPoints(winnings)} points!`);
      recordGameResult(calculateGameResult('Blackjack', true, winnings, 1.5));
    }
    
    endBlackjackRound();
    return;
  }
  
  // Enable player controls
  hitButton.disabled = false;
  standButton.disabled = false;
  doubleButton.disabled = !BlackjackState.canDoubleDown();
}

// End the player's turn and start the dealer's turn
async function endPlayerTurn() {
  // Disable player controls
  hitButton.disabled = true;
  standButton.disabled = true;
  doubleButton.disabled = true;
  
  // Check if player busts
  if (BlackjackState.isPlayerBust()) {
    BlackjackState.gamePhase = 'game-over';
    BlackjackState.gameResult = 'lose';
    
    // Show dealer's hidden card
    await flipDealerCard();
    
    await showGameResult("Bust! You went over 21.");
    recordGameResult(calculateGameResult('Blackjack', false, BlackjackState.bet));
    endBlackjackRound();
    return;
  }
  
  // Change game phase
  BlackjackState.gamePhase = 'dealer-turn';
  
  // Show dealer's hidden card
  await flipDealerCard();
  
  // Dealer draws cards until they have at least 17
  await dealerDrawCards();
  
  // Determine the result
  const result = BlackjackState.determineResult();
  const winnings = BlackjackState.calculateWinnings();
  
  if (result === 'win') {
    updatePlayerPoints(BlackjackState.bet + winnings);
    await showGameResult(`You win ${formatPoints(winnings)} points!`);
    recordGameResult(calculateGameResult('Blackjack', true, winnings));
  } else if (result === 'lose') {
    await showGameResult("Dealer wins.");
    recordGameResult(calculateGameResult('Blackjack', false, BlackjackState.bet));
  } else { // push
    updatePlayerPoints(BlackjackState.bet); // Return the bet
    await showGameResult("Push! It's a tie.");
  }
  
  endBlackjackRound();
}

// End the current round of blackjack
function endBlackjackRound() {
  BlackjackState.gamePhase = 'betting';
  
  // Reset the bet display
  BlackjackState.bet = 0;
  updateBetDisplay();
  
  // Enable betting controls
  dealButton.disabled = false;
  betButtons.forEach(btn => btn.disabled = false);
}

// Deal the initial cards
async function dealInitialCards() {
  // Deal two cards to the player (both face up)
  const playerCard1 = dealCard(blackjackDeck);
  const playerCard2 = dealCard(blackjackDeck);
  
  // Deal two cards to the dealer (one face up, one face down)
  const dealerCard1 = dealCard(blackjackDeck);
  const dealerCard2 = dealCard(blackjackDeck);
  
  // Add cards to state
  BlackjackState.playerCards = [playerCard1, playerCard2];
  BlackjackState.dealerCards = [dealerCard1, dealerCard2];
  
  // Add cards to the UI (with animation)
  SOUNDS.CARD_DEAL.play();
  await addCardToHand(playerCard1, playerCardsContainer);
  await sleep(300);
  
  SOUNDS.CARD_DEAL.play();
  await addCardToHand(dealerCard1, dealerCardsContainer);
  await sleep(300);
  
  SOUNDS.CARD_DEAL.play();
  await addCardToHand(playerCard2, playerCardsContainer);
  await sleep(300);
  
  SOUNDS.CARD_DEAL.play();
  // Dealer's second card is face down
  await addCardToHand(dealerCard2, dealerCardsContainer, false);
}

// Add a card to a hand with animation
async function addCardToHand(card, container, faceUp = true) {
  const cardElement = createCardElement(card, faceUp);
  cardElement.style.opacity = 0;
  container.appendChild(cardElement);
  
  // Animate the card being dealt
  await animateDealCard(cardElement);
  
  return cardElement;
}

// Flip the dealer's face-down card
async function flipDealerCard() {
  const dealerCardElements = dealerCardsContainer.querySelectorAll('.card');
  if (dealerCardElements.length < 2) return;
  
  // The second card is the face-down one
  const hiddenCardElement = dealerCardElements[1];
  const hiddenCard = BlackjackState.dealerCards[1];
  
  // Update the card faces before flipping
  const frontFace = hiddenCardElement.querySelector('.card-front');
  const backFace = hiddenCardElement.querySelector('.card-back');
  
  // Update the front face with the correct card values
  frontFace.innerHTML = '';
  
  const valueTop = document.createElement('div');
  valueTop.className = `card-value ${hiddenCard.suit}`;
  valueTop.textContent = hiddenCard.value;
  
  const suitCenter = document.createElement('div');
  suitCenter.className = `card-suit ${hiddenCard.suit}`;
  suitCenter.textContent = SUIT_SYMBOLS[hiddenCard.suit];
  
  const valueBottom = document.createElement('div');
  valueBottom.className = `card-value-bottom ${hiddenCard.suit}`;
  valueBottom.textContent = hiddenCard.value;
  
  frontFace.appendChild(valueTop);
  frontFace.appendChild(suitCenter);
  frontFace.appendChild(valueBottom);
  
  SOUNDS.CARD_FLIP.play();
  await animateFlipCard(hiddenCardElement, true);
  
  // Update the dealer's score
  BlackjackState.updateScores();
  dealerScoreElement.textContent = BlackjackState.dealerScore;
}

// Dealer draws cards until they have at least 17
async function dealerDrawCards() {
  while (BlackjackState.dealerScore < 17) {
    // Pause for effect
    await sleep(800);
    
    // Deal a card to the dealer
    const card = dealCard(blackjackDeck);
    BlackjackState.dealerCards.push(card);
    
    // Update the display
    SOUNDS.CARD_DEAL.play();
    await addCardToHand(card, dealerCardsContainer);
    
    // Update scores
    BlackjackState.updateScores();
    dealerScoreElement.textContent = BlackjackState.dealerScore;
  }
}

// Update the bet display
function updateBetDisplay() {
  currentBetElement.textContent = formatPoints(BlackjackState.bet);
}

// Update the score display
function updateScoreDisplay() {
  playerScoreElement.textContent = BlackjackState.playerScore;
  // Only show dealer's full score when second card is revealed
  if (dealerCardsContainer.querySelectorAll('.card.flipped').length > 1) {
    dealerScoreElement.textContent = BlackjackState.dealerScore;
  }
}

// Show the game result
async function showGameResult(message) {
  return showGameMessage('blackjack', message, 3000);
}

// Clear the table
function clearTable() {
  dealerCardsContainer.innerHTML = '';
  playerCardsContainer.innerHTML = '';
  dealerScoreElement.textContent = '0';
  playerScoreElement.textContent = '0';
  gameMessageElement.textContent = '';
  gameMessageElement.classList.remove('show');
}