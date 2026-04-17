
export function initPlayground() {
  const canvas = document.getElementById('pong-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('start-game-btn');
  const stopBtn = document.getElementById('stop-game-btn');
  const overlay = document.getElementById('game-overlay');
  const countdownOverlay = document.getElementById('game-countdown');
  const countdownText = document.getElementById('countdown-text');
  const statusTitle = document.getElementById('game-status-title');
  const statusDesc = document.getElementById('game-status-desc');
  const modeRadios = document.getElementsByName('gameMode');

  if (!startBtn || !stopBtn || !overlay || !countdownOverlay || !countdownText) {
    console.error('Playground: Missing required DOM elements');
    return;
  }

  // Game Constants (Adjusted for mobile)
  const isMobile = window.innerWidth < 768;
  const PADDLE_WIDTH = isMobile ? 8 : 20;
  const PADDLE_HEIGHT = isMobile ? 50 : 120;
  const BALL_SIZE = isMobile ? 10 : 24;
  const INITIAL_BALL_SPEED = isMobile ? 2.5 : 4.5;
  const SPEED_INCREMENT = isMobile ? 0.3 : 0.5;
  const MAX_BALL_SPEED = isMobile ? 10 : 18;

  // Game State
  let gameState = {
    running: false,
    paused: true,
    countdown: false,
    mode: 'ai', // 'ai' or 'pvp'
    player1: { y: 0, score: 0 },
    player2: { y: 0, score: 0 },
    ball: { x: 0, y: 0, dx: 0, dy: 0, speed: INITIAL_BALL_SPEED },
    keys: {}
  };

  // Resize Canvas
  function resize() {
    const container = canvas.parentElement;
    if (!container) return;
    
    canvas.width = container.clientWidth || 800;
    canvas.height = container.clientHeight || 450;
    
    // Reset paddle positions to center
    gameState.player1.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    gameState.player2.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    
    if (!gameState.running) {
      resetBall();
      draw();
    }
  }

  window.addEventListener('resize', resize);
  // Initial resize with a small delay to ensure container dimensions are ready
  setTimeout(resize, 100);

  // Reset Ball
  function resetBall() {
    gameState.ball.x = canvas.width / 2;
    gameState.ball.y = canvas.height / 2;
    gameState.ball.speed = INITIAL_BALL_SPEED;
    
    // Random direction
    const angle = (Math.random() * Math.PI / 2) - Math.PI / 4; // -45 to 45 degrees
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    gameState.ball.dx = direction * Math.cos(angle) * gameState.ball.speed;
    gameState.ball.dy = Math.sin(angle) * gameState.ball.speed;
  }

  // Controls
  window.addEventListener('keydown', (e) => {
    if (e.key) {
      gameState.keys[e.key.toLowerCase()] = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key) {
      gameState.keys[e.key.toLowerCase()] = false;
    }
  });

  // Touch Controls
  canvas.addEventListener('touchstart', handleTouch, { passive: false });
  canvas.addEventListener('touchmove', handleTouch, { passive: false });

  function handleTouch(e) {
    if (!gameState.running || gameState.paused) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const touchY = touch.clientY - rect.top;
    
    // Scale touch coordinate to canvas internal coordinate system
    const scaleY = canvas.height / rect.height;
    const actualY = touchY * scaleY;
    
    // Move left paddle to touch position
    gameState.player1.y = actualY - PADDLE_HEIGHT / 2;
  }

  // Game Loop
  function update() {
    if (!gameState.running || gameState.paused || gameState.countdown) return;

    // Move Player 1 (W/S)
    if (gameState.keys['w'] && gameState.player1.y > 0) gameState.player1.y -= 8;
    if (gameState.keys['s'] && gameState.player1.y < canvas.height - PADDLE_HEIGHT) gameState.player1.y += 8;

    // Move Player 2 (AI or Arrow Keys)
    if (gameState.mode === 'ai') {
      // Dynamic AI speed based on ball speed
      const aiSpeed = Math.abs(gameState.ball.dx) * 0.7 + 2.5;
      const aiCenter = gameState.player2.y + PADDLE_HEIGHT / 2;
      const ballCenter = gameState.ball.y;
      if (aiCenter < ballCenter - 15) gameState.player2.y += aiSpeed;
      else if (aiCenter > ballCenter + 15) gameState.player2.y -= aiSpeed;
    } else {
      // PvP (Arrow keys for player 2)
      if (gameState.keys['arrowup'] && gameState.player2.y > 0) gameState.player2.y -= 8;
      if (gameState.keys['arrowdown'] && gameState.player2.y < canvas.height - PADDLE_HEIGHT) gameState.player2.y += 8;
    }

    // Constrain paddles
    gameState.player1.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, gameState.player1.y));
    gameState.player2.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, gameState.player2.y));

    // Move Ball
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;

    // Wall Bounce (Top/Bottom)
    if (gameState.ball.y <= BALL_SIZE / 2 || gameState.ball.y >= canvas.height - BALL_SIZE / 2) {
      gameState.ball.dy *= -1;
      // Correct position to prevent sticking
      if (gameState.ball.y <= BALL_SIZE / 2) gameState.ball.y = BALL_SIZE / 2;
      if (gameState.ball.y >= canvas.height - BALL_SIZE / 2) gameState.ball.y = canvas.height - BALL_SIZE / 2;
    }

    // Paddle Collision (Left)
    if (gameState.ball.dx < 0 && 
        gameState.ball.x <= PADDLE_WIDTH + BALL_SIZE / 2 && 
        gameState.ball.y >= gameState.player1.y && 
        gameState.ball.y <= gameState.player1.y + PADDLE_HEIGHT) {
      
      gameState.ball.dx = Math.abs(gameState.ball.dx) + SPEED_INCREMENT;
      gameState.ball.dx = Math.min(gameState.ball.dx, MAX_BALL_SPEED);
      
      // Add spin based on where it hit the paddle
      const hitPos = (gameState.ball.y) - (gameState.player1.y + PADDLE_HEIGHT / 2);
      gameState.ball.dy = hitPos * 0.2;
      
      // Correct position
      gameState.ball.x = PADDLE_WIDTH + BALL_SIZE / 2;
    }

    // Paddle Collision (Right)
    if (gameState.ball.dx > 0 && 
        gameState.ball.x >= canvas.width - PADDLE_WIDTH - BALL_SIZE / 2 && 
        gameState.ball.y >= gameState.player2.y && 
        gameState.ball.y <= gameState.player2.y + PADDLE_HEIGHT) {
      
      gameState.ball.dx = -(Math.abs(gameState.ball.dx) + SPEED_INCREMENT);
      gameState.ball.dx = Math.max(gameState.ball.dx, -MAX_BALL_SPEED);

      const hitPos = (gameState.ball.y) - (gameState.player2.y + PADDLE_HEIGHT / 2);
      gameState.ball.dy = hitPos * 0.2;

      // Correct position
      gameState.ball.x = canvas.width - PADDLE_WIDTH - BALL_SIZE / 2;
    }

    // Scoring
    if (gameState.ball.x < 0) {
      gameState.player2.score++;
      checkWin();
      resetBall();
    } else if (gameState.ball.x > canvas.width) {
      gameState.player1.score++;
      checkWin();
      resetBall();
    }
  }

  function checkWin() {
    if (gameState.player1.score >= 5 || gameState.player2.score >= 5) {
      gameState.running = false;
      gameState.paused = true;
      overlay.classList.remove('hidden');
      const winner = gameState.player1.score >= 5 ? 'Player 1' : (gameState.mode === 'ai' ? 'AI' : 'Player 2');
      statusTitle.textContent = `${winner} Wins!`;
      statusDesc.textContent = `Final Score: ${gameState.player1.score} - ${gameState.player2.score}`;
      startBtn.textContent = 'Restart Game';
      stopBtn.disabled = true;
      
      // Reset scores for next game
      gameState.player1.score = 0;
      gameState.player2.score = 0;
    }
  }

  function draw() {
    if (!ctx) return;
    // Clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center Line
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff4d6d'; // Secondary color glow
    ctx.fillRect(0, gameState.player1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(canvas.width - PADDLE_WIDTH, gameState.player2.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow for text
    ctx.shadowBlur = 0;

    // Scores
    ctx.font = 'bold 48px Inter';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.player1.score, canvas.width / 4, 60);
    ctx.fillText(gameState.player2.score, (canvas.width / 4) * 3, 60);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Start Loop
  loop();

  // Button Actions
  startBtn.addEventListener('click', () => {
    if (gameState.running && !gameState.paused) return;

    // Get mode
    modeRadios.forEach(r => {
      if (r.checked) gameState.mode = r.value;
    });

    startCountdown();
  });

  stopBtn.addEventListener('click', () => {
    gameState.running = false;
    gameState.paused = true;
    overlay.classList.remove('hidden');
    statusTitle.textContent = 'Game Stopped';
    statusDesc.textContent = 'Final Score: ' + gameState.player1.score + ' - ' + gameState.player2.score;
    startBtn.textContent = 'Restart Game';
    stopBtn.disabled = true;
  });

  function startCountdown() {
    gameState.countdown = true;
    gameState.paused = true;
    overlay.classList.add('hidden');
    countdownOverlay.classList.remove('hidden');
    
    let count = 3;
    countdownText.textContent = count;
    
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownText.textContent = count;
      } else {
        clearInterval(timer);
        countdownOverlay.classList.add('hidden');
        gameState.countdown = false;
        gameState.paused = false;
        gameState.running = true;
        stopBtn.disabled = false;
        startBtn.textContent = 'Resume Game';
      }
    }, 1000);
  }
}
