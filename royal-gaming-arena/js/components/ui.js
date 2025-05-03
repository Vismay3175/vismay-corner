/**
 * UI components and interactions
 */

// Initialize UI components
function initializeUI() {
  // Set up screen navigation
  const gameCards = document.querySelectorAll('.game-card');
  const backButtons = document.querySelectorAll('[data-action="back"]');
  
  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const game = card.dataset.game;
      navigateToScreen(`${game}-screen`);
    });
  });
  
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateToScreen('home-screen');
    });
  });
  
  // Set up sound toggle
  const soundButton = document.getElementById('toggle-sound');
  if (soundButton) {
    // Initialize sound button state
    const soundEnabled = isSoundEnabled();
    if (soundEnabled) {
      soundButton.classList.add('sound-on');
      soundButton.classList.remove('sound-off');
    } else {
      soundButton.classList.add('sound-off');
      soundButton.classList.remove('sound-on');
    }
    
    soundButton.addEventListener('click', () => {
      toggleSound();
    });
  }
  
  // Set up rules modal
  const rulesButton = document.getElementById('btn-rules');
  const rulesModal = document.getElementById('rules-modal');
  const closeRules = document.getElementById('close-rules');
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  if (rulesButton && rulesModal) {
    rulesButton.addEventListener('click', () => {
      rulesModal.classList.add('show');
    });
    
    closeRules.addEventListener('click', () => {
      rulesModal.classList.remove('show');
    });
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Hide all tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Show selected tab content
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Close modal when clicking outside
    rulesModal.addEventListener('click', event => {
      if (event.target === rulesModal) {
        rulesModal.classList.remove('show');
      }
    });
  }
  
  // Initialize player points display
  const pointsElement = document.getElementById('points-value');
  if (pointsElement) {
    pointsElement.textContent = formatPoints(getPlayerPoints());
  }
  
  // Update game history
  updateGameHistoryUI();
}

// Navigate to a screen
function navigateToScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  
  screens.forEach(screen => {
    if (screen.id === screenId) {
      // First make the new screen visible but with opacity 0
      screen.style.display = 'flex';
      screen.style.opacity = '0';
      
      // Trigger reflow
      void screen.offsetWidth;
      
      // Now animate in
      screen.classList.add('active');
      screen.style.opacity = '1';
      
      // Initialize game if navigating to a game screen
      if (screenId === 'blackjack-screen') {
        if (typeof initializeBlackjack === 'function') {
          initializeBlackjack();
        }
      } else if (screenId === 'mines-screen') {
        if (typeof initializeMines === 'function') {
          initializeMines();
        }
      }
    } else {
      screen.classList.remove('active');
      
      // After transition, set display to none
      setTimeout(() => {
        if (!screen.classList.contains('active')) {
          screen.style.display = 'none';
        }
      }, 300); // Match the CSS transition time
    }
  });
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.getElementById('notification');
  const messageElement = notification.querySelector('.notification-message');
  
  // Remove existing notification classes
  notification.classList.remove('show', 'hide', 'info', 'success', 'error', 'warning');
  
  // Set message and type
  messageElement.textContent = message;
  notification.classList.add(type);
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after duration
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // Remove hide class after animation completes
    setTimeout(() => {
      notification.classList.remove('hide');
    }, 300);
  }, duration);
}