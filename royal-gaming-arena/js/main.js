/**
 * Main entry point for the casino games
 */

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the UI
  initializeUI();
  
  // Initialize points display
  const pointsElement = document.getElementById('points-value');
  if (pointsElement) {
    pointsElement.textContent = formatPoints(getPlayerPoints());
  }
  
  // Set up sound toggle
  const soundButton = document.getElementById('toggle-sound');
  if (soundButton) {
    soundButton.addEventListener('click', () => {
      toggleSound();
    });
    
    // Initialize sound button state
    if (isSoundEnabled()) {
      soundButton.classList.add('sound-on');
      soundButton.classList.remove('sound-off');
    } else {
      soundButton.classList.add('sound-off');
      soundButton.classList.remove('sound-on');
    }
  }
  
  // Show welcome message
  setTimeout(() => {
    notifyInfo('Welcome to Royal Games! Choose a game to play.');
  }, 500);
});