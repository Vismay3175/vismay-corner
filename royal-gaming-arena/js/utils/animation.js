/**
 * Animation utilities for the casino games
 */

// Add a CSS class for a set duration, then remove it
function animateElementWithClass(element, className, duration = 1000) {
  return new Promise(resolve => {
    element.classList.add(className);
    
    setTimeout(() => {
      element.classList.remove(className);
      resolve();
    }, duration);
  });
}

// Fade in an element
function fadeIn(element, duration = 300) {
  return new Promise(resolve => {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Fade out an element
function fadeOut(element, duration = 300) {
  return new Promise(resolve => {
    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(initialOpacity - (progress / duration), 0);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Slide in from bottom
function slideInUp(element, duration = 300, distance = 20) {
  return new Promise(resolve => {
    element.style.opacity = 0;
    element.style.transform = `translateY(${distance}px)`;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      element.style.opacity = percent;
      element.style.transform = `translateY(${distance * (1 - percent)}px)`;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = '';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Slide out to bottom
function slideOutDown(element, duration = 300, distance = 20) {
  return new Promise(resolve => {
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      element.style.opacity = initialOpacity * (1 - percent);
      element.style.transform = `translateY(${distance * percent}px)`;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        element.style.transform = '';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Animate card dealing in blackjack
function animateDealCard(cardElement, delay = 0, duration = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(-200px) translateX(100px) rotateY(180deg) scale(0.5)';
      cardElement.style.display = 'block';
      
      let start = null;
      
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        
        cardElement.style.opacity = percent;
        cardElement.style.transform = `
          translateY(${-200 * (1 - percent)}px) 
          translateX(${100 * (1 - percent)}px) 
          rotateY(${180 * (1 - percent)}deg) 
          scale(${0.5 + (0.5 * percent)})
        `;
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          cardElement.style.transform = '';
          resolve();
        }
      }
      
      requestAnimationFrame(animate);
    }, delay);
  });
}

// Animate flipping a card
function animateFlipCard(cardElement, faceUp, duration = 500) {
  return new Promise(resolve => {
    const frontFace = cardElement.querySelector('.card-front');
    const backFace = cardElement.querySelector('.card-back');
    
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      // First half of animation: hide current face
      if (percent < 0.5) {
        const currentRotation = faceUp ? 0 : 180;
        const targetRotation = faceUp ? 90 : 90;
        const rotation = currentRotation + (targetRotation - currentRotation) * (percent * 2);
        
        cardElement.style.transform = `rotateY(${rotation}deg)`;
      } 
      // Second half of animation: show new face
      else {
        const currentRotation = 90;
        const targetRotation = faceUp ? 180 : 0;
        const rotation = currentRotation + (targetRotation - currentRotation) * ((percent - 0.5) * 2);
        
        cardElement.style.transform = `rotateY(${rotation}deg)`;
        
        // Update visibility at midpoint
        if (backFace.style.transform !== (faceUp ? 'rotateY(0)' : 'rotateY(180deg)')) {
          backFace.style.transform = faceUp ? 'rotateY(0)' : 'rotateY(180deg)';
          frontFace.style.transform = faceUp ? 'rotateY(180deg)' : 'rotateY(0)';
        }
      }
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        cardElement.style.transform = '';
        if (faceUp) {
          cardElement.classList.add('flipped');
        } else {
          cardElement.classList.remove('flipped');
        }
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Animate revealing a mines tile
function animateRevealTile(tileElement, isGem, duration = 500) {
  return new Promise(resolve => {
    let start = null;
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      if (percent < 0.5) {
        // First half: rotate to middle
        tileElement.style.transform = `rotateY(${percent * 2 * 90}deg)`;
      } else {
        // Second half: continue rotation to flipped state
        tileElement.style.transform = `rotateY(${90 + (percent - 0.5) * 2 * 90}deg)`;
        
        // At the midpoint, update the back face
        if (percent >= 0.5 && !tileElement.classList.contains('updated')) {
          const backFace = tileElement.querySelector('.mines-tile-back');
          
          if (isGem) {
            backFace.classList.add('gem');
            backFace.textContent = '💎';
          } else {
            backFace.classList.add('mine');
            backFace.textContent = '💣';
          }
          
          tileElement.classList.add('updated');
        }
      }
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        tileElement.classList.add('flipped');
        tileElement.style.transform = '';
        
        if (isGem) {
          animateElementWithClass(tileElement, 'tileWin', 1000);
        } else {
          animateElementWithClass(tileElement, 'tileLose', 1000);
        }
        
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// Show a message with animation
function showMessage(element, message, duration = 3000) {
  return new Promise(resolve => {
    element.textContent = message;
    element.classList.add('show');
    
    setTimeout(() => {
      element.classList.remove('show');
      setTimeout(() => resolve(), 300); // Allow fade out animation to complete
    }, duration);
  });
}

// Update number with counting animation
function animateNumber(element, start, end, duration = 1000) {
  return new Promise(resolve => {
    let startTime = null;
    
    const formatValue = typeof start === 'number' ? 
      (val) => Math.round(val).toLocaleString() : 
      (val) => parseFloat(val).toFixed(2);
    
    function updateNumber(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        // Easing function: cubic ease out
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (end - start) * easedProgress;
        element.textContent = formatValue(currentValue);
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = formatValue(end);
        resolve();
      }
    }
    
    requestAnimationFrame(updateNumber);
  });
}