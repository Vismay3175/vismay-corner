/**
 * Utility functions for the casino games
 */

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format number as currency
function formatPoints(points) {
  return points.toLocaleString();
}

// Random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add commas to numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Create and return a DOM element with properties
function createElement(tag, properties = {}, children = []) {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(properties)) {
    if (key === 'classList' && Array.isArray(value)) {
      element.classList.add(...value);
    } else if (key === 'dataset' && typeof value === 'object') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        element.dataset[dataKey] = dataValue;
      }
    } else if (key === 'textContent' || key === 'innerText') {
      element[key] = value;
    } else if (key === 'style' && typeof value === 'object') {
      for (const [styleKey, styleValue] of Object.entries(value)) {
        element.style[styleKey] = styleValue;
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  }
  
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      }
    });
  } else if (typeof children === 'string') {
    element.appendChild(document.createTextNode(children));
  }
  
  return element;
}

// Calculates a win or loss result with appropriate message
function calculateGameResult(gameName, won, amount, multiplier = 1) {
  const result = {
    game: gameName,
    won: won,
    amount: Math.abs(amount),
    timestamp: new Date().toISOString(),
    multiplier: multiplier
  };
  
  if (won) {
    result.message = `Won ${formatPoints(result.amount)} points`;
  } else {
    result.message = `Lost ${formatPoints(result.amount)} points`;
  }
  
  return result;
}

// Deep clone an object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Sleep for ms milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}