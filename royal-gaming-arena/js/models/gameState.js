/**
 * Game state management
 */

// Blackjack game state
const BlackjackState = {
  bet: 0,
  playerCards: [],
  dealerCards: [],
  playerScore: 0,
  dealerScore: 0,
  gamePhase: 'betting', // betting, player-turn, dealer-turn, game-over
  gameResult: null, // win, lose, push, blackjack
  
  // Reset game state
  reset() {
    this.bet = 0;
    this.playerCards = [];
    this.dealerCards = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gamePhase = 'betting';
    this.gameResult = null;
  },
  
  // Place a bet
  placeBet(amount) {
    if (this.gamePhase !== 'betting') return false;
    
    const playerPoints = getPlayerPoints();
    if (amount > playerPoints) {
      notifyError("You don't have enough points!");
      return false;
    }
    
    this.bet = amount;
    return true;
  },
  
  // Add a bet amount
  addToBet(amount) {
    if (this.gamePhase !== 'betting') return false;
    
    const newBet = this.bet + amount;
    const playerPoints = getPlayerPoints();
    
    if (newBet > playerPoints) {
      notifyError("You don't have enough points!");
      return false;
    }
    
    this.bet = newBet;
    return true;
  },
  
  // Check if player can double down
  canDoubleDown() {
    if (this.gamePhase !== 'player-turn') return false;
    if (this.playerCards.length !== 2) return false;
    
    const playerPoints = getPlayerPoints();
    return playerPoints >= this.bet;
  },
  
  // Double the bet
  doubleBet() {
    if (!this.canDoubleDown()) return false;
    
    const playerPoints = getPlayerPoints();
    if (this.bet * 2 > playerPoints) {
      notifyError("You don't have enough points to double down!");
      return false;
    }
    
    updatePlayerPoints(-this.bet); // Deduct the additional bet
    this.bet *= 2;
    return true;
  },
  
  // Start a new game
  startGame() {
    if (this.bet <= 0) {
      notifyError("Please place a bet first!");
      return false;
    }
    
    this.gamePhase = 'player-turn';
    return true;
  },
  
  // Calculate the value of a blackjack hand
  calculateHandValue(cards) {
    let value = 0;
    let aces = 0;
    
    for (const card of cards) {
      if (card.value === 'A') {
        aces++;
        value += 11;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }
    
    // Adjust aces if needed
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  },
  
  // Update scores
  updateScores() {
    this.playerScore = this.calculateHandValue(this.playerCards);
    this.dealerScore = this.calculateHandValue(this.dealerCards);
  },
  
  // Check for blackjack
  checkForBlackjack() {
    if (this.playerCards.length === 2 && this.playerScore === 21) {
      return true;
    }
    return false;
  },
  
  // Check if player busts
  isPlayerBust() {
    return this.playerScore > 21;
  },
  
  // Check if dealer busts
  isDealerBust() {
    return this.dealerScore > 21;
  },
  
  // Determine game result
  determineResult() {
    if (this.playerScore > 21) {
      this.gameResult = 'lose';
      return 'lose';
    }
    
    if (this.dealerScore > 21) {
      this.gameResult = 'win';
      return 'win';
    }
    
    if (this.playerScore > this.dealerScore) {
      this.gameResult = 'win';
      return 'win';
    } else if (this.playerScore < this.dealerScore) {
      this.gameResult = 'lose';
      return 'lose';
    } else {
      this.gameResult = 'push';
      return 'push';
    }
  },
  
  // Calculate winnings
  calculateWinnings() {
    if (this.gameResult === 'win') {
      return this.bet;
    } else if (this.gameResult === 'push') {
      return 0;
    } else {
      return -this.bet;
    }
  }
};

// Mines game state
const MinesState = {
  bet: 50,
  mines: 5,
  grid: [],
  gridSize: 25, // 5x5 grid
  minePositions: [],
  uncoveredPositions: [],
  gamePhase: 'betting', // betting, playing, game-over
  currentMultiplier: 1.0,
  
  // Reset game state
  reset() {
    this.grid = [];
    this.minePositions = [];
    this.uncoveredPositions = [];
    this.gamePhase = 'betting';
    this.currentMultiplier = 1.0;
  },
  
  // Place a bet
  placeBet(amount) {
    if (this.gamePhase !== 'betting') return false;
    
    const playerPoints = getPlayerPoints();
    if (amount > playerPoints) {
      notifyError("You don't have enough points!");
      return false;
    }
    
    this.bet = amount;
    return true;
  },
  
  // Set number of mines
  setMines(mines) {
    if (this.gamePhase !== 'betting') return false;
    
    if (mines < 1 || mines > 24) {
      notifyError("Invalid number of mines!");
      return false;
    }
    
    this.mines = mines;
    return true;
  },
  
  // Initialize grid
  initializeGrid() {
    this.grid = Array(this.gridSize).fill('hidden');
    this.minePositions = [];
    this.uncoveredPositions = [];
    
    // Randomly place mines
    while (this.minePositions.length < this.mines) {
      const position = Math.floor(Math.random() * this.gridSize);
      if (!this.minePositions.includes(position)) {
        this.minePositions.push(position);
      }
    }
    
    this.gamePhase = 'playing';
    return true;
  },
  
  // Check if a position is a mine
  isMine(position) {
    return this.minePositions.includes(position);
  },
  
  // Uncover a position
  uncoverPosition(position) {
    if (this.gamePhase !== 'playing') return false;
    if (this.uncoveredPositions.includes(position)) return false;
    
    this.uncoveredPositions.push(position);
    
    if (this.isMine(position)) {
      this.gamePhase = 'game-over';
      return false; // Hit a mine, game over
    }
    
    // Update multiplier
    this.updateMultiplier();
    
    return true;
  },
  
  // Calculate the current multiplier
  updateMultiplier() {
    const gemCount = this.uncoveredPositions.length;
    const remainingGems = this.gridSize - this.mines - gemCount;
    const minesCount = this.mines;
    
    // Calculate probability-based multiplier
    let multiplier = 1.0;
    for (let i = 0; i < gemCount; i++) {
      const prob = (this.gridSize - this.mines - i) / (this.gridSize - i);
      multiplier *= 1 / prob;
    }
    
    this.currentMultiplier = parseFloat(multiplier.toFixed(2));
    return this.currentMultiplier;
  },
  
  // Calculate potential win
  calculatePotentialWin() {
    return Math.floor(this.bet * this.currentMultiplier);
  },
  
  // Cashout
  cashout() {
    if (this.gamePhase !== 'playing') return false;
    if (this.uncoveredPositions.length === 0) return false;
    
    this.gamePhase = 'game-over';
    return true;
  }
};

// Coin flip game state
let CoinFlipState = {
  bet: 0,
  selectedSide: null, // 'heads' or 'tails'
  gamePhase: 'betting', // betting, flipping, complete
  result: null, // 'heads' or 'tails'
  
  // Reset game state
  reset() {
    this.bet = 0;
    this.selectedSide = null;
    this.gamePhase = 'betting';
    this.result = null;
  },
  
  // Place a bet
  placeBet(amount) {
    if (this.gamePhase !== 'betting') return false;
    
    const playerPoints = getPlayerPoints();
    if (amount > playerPoints) {
      notifyError("You don't have enough points!");
      return false;
    }
    
    this.bet = amount;
    return true;
  },
  
  // Select a side
  selectSide(side) {
    if (this.gamePhase !== 'betting') return false;
    if (!['heads', 'tails'].includes(side)) return false;
    
    this.selectedSide = side;
    return true;
  },
  
  // Flip the coin
  async flip() {
    if (this.gamePhase !== 'betting' || !this.selectedSide || this.bet <= 0) return false;
    
    this.gamePhase = 'flipping';
    
    // Simulate coin flip
    await sleep(2000);
    
    this.result = Math.random() < 0.5 ? 'heads' : 'tails';
    this.gamePhase = 'complete';
    
    return this.result === this.selectedSide;
  },
  
  // Calculate winnings
  calculateWinnings() {
    if (this.gamePhase !== 'complete') return 0;
    if (this.result === this.selectedSide) {
      return this.bet;
    }
    return -this.bet;
  }
};