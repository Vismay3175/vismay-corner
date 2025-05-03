/**
 * Card deck implementation for Blackjack
 */

// Card suits and values
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Suit symbols
const SUIT_SYMBOLS = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

// Create a new deck of cards
function createDeck() {
  const deck = [];
  
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }
  
  return deck;
}

// Shuffle a deck of cards
function shuffleDeck(deck) {
  return shuffleArray([...deck]);
}

// Create a visual card element
function createCardElement(card, faceUp = true) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  
  // Create front face
  const cardFront = document.createElement('div');
  cardFront.className = 'card-face card-front';
  
  // Top value and suit
  const valueTop = document.createElement('div');
  valueTop.className = `card-value ${card.suit}`;
  valueTop.textContent = card.value;
  
  // Center suit
  const suitCenter = document.createElement('div');
  suitCenter.className = `card-suit ${card.suit}`;
  suitCenter.textContent = SUIT_SYMBOLS[card.suit];
  
  // Bottom value and suit (inverted)
  const valueBottom = document.createElement('div');
  valueBottom.className = `card-value-bottom ${card.suit}`;
  valueBottom.textContent = card.value;
  
  cardFront.appendChild(valueTop);
  cardFront.appendChild(suitCenter);
  cardFront.appendChild(valueBottom);
  
  // Create back face
  const cardBack = document.createElement('div');
  cardBack.className = 'card-face card-back';
  
  // Add faces to card
  cardElement.appendChild(cardFront);
  cardElement.appendChild(cardBack);
  
  // Set initial state
  if (!faceUp) {
    cardElement.classList.add('flipped');
  }
  
  return cardElement;
}

// Deal a card from the deck
function dealCard(deck) {
  if (deck.length === 0) {
    throw new Error('Deck is empty!');
  }
  
  return deck.pop();
}

// Get a card's value for scoring
function getCardValue(card) {
  if (card.value === 'A') {
    return 11; // Ace is initially 11, can be adjusted to 1 if needed
  } else if (['K', 'Q', 'J'].includes(card.value)) {
    return 10;
  } else {
    return parseInt(card.value);
  }
}