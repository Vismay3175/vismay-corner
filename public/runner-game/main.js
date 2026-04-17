class Game {
    constructor() {
      this.score = 0x0;
      this.coins = 0x0;
      this.isGameRunning = false;
      this.speed = 0.2;
      this.speedIncreaseInterval = 0x1388;
      this.lastSpeedIncrease = 0x0;
      this.touchStartX = 0x0;
      this.touchStartY = 0x0;
      this.minSwipeDistance = 0x32;
      this.lastLaneChange = 0x0;
      this.laneChangeDelay = 0xc8;
      this.startScreen = document.getElementById('start-screen');
      this.gameScreen = document.getElementById("game-screen");
      this.gameOverScreen = document.getElementById("game-over-screen");
      this.startButton = document.getElementById("start-button");
      this.restartButton = document.getElementById("restart-button");
      this.scoreElement = document.getElementById("score");
      this.coinsElement = document.getElementById('coins');
      this.finalScoreElement = document.getElementById("final-score");
      this.finalCoinsElement = document.getElementById('final-coins');
      this.startButton.addEventListener("click", () => this.startGame());
      this.restartButton.addEventListener("click", () => this.restartGame());
      window.addEventListener('keydown', _0x2c9e82 => this.handleKeyDown(_0x2c9e82));
      window.addEventListener('resize', () => this.onWindowResize());
      document.addEventListener('touchstart', _0x49ea66 => this.handleTouchStart(_0x49ea66), {
        'passive': false
      });
      document.addEventListener("touchmove", _0x7bc7a6 => this.handleTouchMove(_0x7bc7a6), {
        'passive': false
      });
      document.addEventListener("click", _0x24601a => this.handleClick(_0x24601a));
      this.initThree();
      this.player = new Player(this.scene);
      this.obstacleManager = new ObstacleManager(this.scene);
      this.environment = new Environment(this.scene);
      this.audio = new GameAudio();
      this.camera.position.set(0x0, 0x8, 0xc);
      this.camera.lookAt(0x0, 0x0, -0xa);
      this.addWatermark();
      this.clock = new THREE.Clock();
      this.frameTime = 0.016666666666666666;
      this.accumulator = 0x0;
      window.game = this;
      this.animate();
    }
    ['initThree']() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0x0, 0x14, 0x64);
      this.camera = new THREE.PerspectiveCamera(0x4b, window.innerWidth / window.innerHeight, 0.1, 0x3e8);
      this.renderer = new THREE.WebGLRenderer({
        'canvas': document.getElementById("game-canvas"),
        'antialias': true,
        'alpha': true,
        'powerPreference': "high-performance"
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0x2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      const _0x161ea0 = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(_0x161ea0);
      const _0x285b19 = new THREE.DirectionalLight(0xffffff, 1.2);
      _0x285b19.position.set(0x5, 0xa, 0x7);
      _0x285b19.castShadow = true;
      _0x285b19.shadow.mapSize.width = 0x400;
      _0x285b19.shadow.mapSize.height = 0x400;
      _0x285b19.shadow.camera.near = 0.1;
      _0x285b19.shadow.camera.far = 0x1f4;
      _0x285b19.shadow.camera.right = 0xf;
      _0x285b19.shadow.camera.left = -0xf;
      _0x285b19.shadow.camera.top = 0xf;
      _0x285b19.shadow.camera.bottom = -0xf;
      this.scene.add(_0x285b19);
    }
    ["addWatermark"]() {
      const _0x1d5a71 = new THREE.PlaneGeometry(0xa, 0x2);
      const _0x10c215 = this.createWatermarkTexture();
      const _0x28452c = new THREE.MeshBasicMaterial({
        'map': _0x10c215,
        'transparent': true,
        'opacity': 0.2,
        'side': THREE.DoubleSide
      });
      this.watermarkMesh = new THREE.Mesh(_0x1d5a71, _0x28452c);
      this.watermarkMesh.position.set(0x0, 0xa, -0x14);
      this.watermarkMesh.rotation.x = -Math.PI / 0x6;
      this.scene.add(this.watermarkMesh);
    }
    ['createWatermarkTexture']() {
      const _0x8ecdad = document.createElement("canvas");
      const _0x82a57f = _0x8ecdad.getContext('2d');
      _0x8ecdad.width = 0x200;
      _0x8ecdad.height = 0x80;
      const _0x29fbda = _0x82a57f.createLinearGradient(0x0, 0x0, _0x8ecdad.width, 0x0);
      _0x29fbda.addColorStop(0x0, "#ff8a00");
      _0x29fbda.addColorStop(0x1, "#da1b60");
      _0x82a57f.fillStyle = _0x29fbda;
      _0x82a57f.fillRect(0x0, 0x0, _0x8ecdad.width, _0x8ecdad.height);
      _0x82a57f.shadowColor = "rgba(0, 0, 0, 0.5)";
      _0x82a57f.shadowBlur = 0x4;
      _0x82a57f.shadowOffsetX = 0x2;
      _0x82a57f.shadowOffsetY = 0x2;
      _0x82a57f.font = "bold 72px Arial";
      _0x82a57f.fillStyle = "#ffffff";
      _0x82a57f.textAlign = 'center';
      _0x82a57f.textBaseline = 'middle';
      _0x82a57f.fillText("VISMAY", _0x8ecdad.width / 0x2, _0x8ecdad.height / 0x2);
      const _0x2f8ca2 = new THREE.CanvasTexture(_0x8ecdad);
      _0x2f8ca2.needsUpdate = true;
      return _0x2f8ca2;
    }
    ['startGame']() {
      this.startScreen.classList.add("d-none");
      this.gameScreen.classList.remove("d-none");
      this.gameOverScreen.classList.add("d-none");
      this.isGameRunning = true;
      this.score = 0x0;
      this.coins = 0x0;
      this.speed = 0.2;
      this.lastSpeedIncrease = 0x0;
      this.updateScore();
      this.updateCoins();
      this.player.reset();
      this.obstacleManager.reset();
      this.environment.reset();
      this.audio.playBackgroundMusic();
    }
    ["gameOver"]() {
      this.isGameRunning = false;
      this.gameScreen.classList.add("d-none");
      this.gameOverScreen.classList.remove("d-none");
      this.finalScoreElement.textContent = this.score;
      this.finalCoinsElement.textContent = this.coins;
      this.audio.stopBackgroundMusic();
      this.audio.playGameOverSound();
    }
    ["restartGame"]() {
      this.startGame();
    }
    ["updateScore"]() {
      this.scoreElement.textContent = this.score;
    }
    ['updateCoins']() {
      this.coinsElement.textContent = this.coins;
    }
    ['handleKeyDown'](_0x40943c) {
      if (!this.isGameRunning) {
        return;
      }
      const _0x59d1fa = Date.now();
      switch (_0x40943c.key) {
        case 'ArrowLeft':
          if (_0x59d1fa - this.lastLaneChange >= this.laneChangeDelay) {
            this.player.moveLeft();
            this.lastLaneChange = _0x59d1fa;
          }
          break;
        case "ArrowRight":
          if (_0x59d1fa - this.lastLaneChange >= this.laneChangeDelay) {
            this.player.moveRight();
            this.lastLaneChange = _0x59d1fa;
          }
          break;
        case 'ArrowUp':
          this.player.jump();
          this.audio.playJumpSound();
          break;
        case "ArrowDown":
          this.player.roll();
          break;
      }
    }
    ['handleClick'](_0x2e5c28) {
      if (!this.isGameRunning) {
        return;
      }
      const _0x5e1620 = this.renderer.domElement.getBoundingClientRect();
      const _0x2aec2c = _0x2e5c28.clientX - _0x5e1620.left;
      const _0x4a01d1 = _0x2aec2c / _0x5e1620.width;
      const _0x25cd68 = Date.now();
      if (_0x25cd68 - this.lastLaneChange >= this.laneChangeDelay) {
        if (_0x4a01d1 < 0.33) {
          this.player.moveLeft();
          this.lastLaneChange = _0x25cd68;
        } else if (_0x4a01d1 > 0.66) {
          this.player.moveRight();
          this.lastLaneChange = _0x25cd68;
        } else {
          this.player.jump();
          this.audio.playJumpSound();
        }
      }
    }
    ["handleTouchStart"](_0x38b708) {
      _0x38b708.preventDefault();
      this.touchStartX = _0x38b708.touches[0x0].clientX;
      this.touchStartY = _0x38b708.touches[0x0].clientY;
    }
    ["handleTouchMove"](_0x305d5c) {
      if (!this.isGameRunning) {
        return;
      }
      _0x305d5c.preventDefault();
      const _0x5355f9 = _0x305d5c.touches[0x0].clientX;
      const _0x2efbdc = _0x305d5c.touches[0x0].clientY;
      const _0x14abe6 = this.touchStartX - _0x5355f9;
      const _0x5ee901 = this.touchStartY - _0x2efbdc;
      const _0x557cdb = Date.now();
      if (Math.abs(_0x14abe6) > this.minSwipeDistance || Math.abs(_0x5ee901) > this.minSwipeDistance) {
        if (Math.abs(_0x14abe6) > Math.abs(_0x5ee901)) {
          if (_0x557cdb - this.lastLaneChange >= this.laneChangeDelay) {
            if (_0x14abe6 > this.minSwipeDistance) {
              this.player.moveLeft();
              this.lastLaneChange = _0x557cdb;
            } else if (_0x14abe6 < -this.minSwipeDistance) {
              this.player.moveRight();
              this.lastLaneChange = _0x557cdb;
            }
            this.touchStartX = _0x5355f9;
          }
        } else {
          if (_0x5ee901 > this.minSwipeDistance) {
            this.player.jump();
            this.audio.playJumpSound();
          } else if (_0x5ee901 < -this.minSwipeDistance) {
            this.player.roll();
          }
          this.touchStartY = _0x2efbdc;
        }
      }
    }
    ["onWindowResize"]() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    ['checkCollisions']() {
      const _0x1d6c5c = this.obstacleManager.checkCollision(this.player.getPosition(), this.player.isRolling);
      if (_0x1d6c5c.hit) {
        this.audio.playCrashSound();
        this.gameOver();
        return;
      }
      if (_0x1d6c5c.coin) {
        this.coins++;
        this.updateCoins();
        this.audio.playCoinSound();
      }
    }
    ["update"](_0x2f4468) {
      if (!this.isGameRunning) {
        return;
      }
      const _0x11055e = Date.now();
      if (_0x11055e - this.lastSpeedIncrease > this.speedIncreaseInterval) {
        this.speed += 0.01;
        this.lastSpeedIncrease = _0x11055e;
      }
      this.score += Math.floor(this.speed * 0xa);
      this.updateScore();
      if (this.score < 0x7d0) {
        this.updateGuidance();
      } else {
        this.hideAllGuidance();
      }
      this.player.update(_0x2f4468);
      this.obstacleManager.update(_0x2f4468, this.speed);
      this.environment.update(_0x2f4468, this.speed);
      if (this.watermarkMesh) {
        this.watermarkMesh.rotation.z = Math.sin(_0x11055e * 0.0005) * 0.1;
        this.watermarkMesh.material.opacity = 0.1 + Math.sin(_0x11055e * 0.001) * 0.05;
      }
      this.checkCollisions();
    }
    ["updateGuidance"]() {
      const _0x156b18 = {
        'left': document.getElementById("arrow-left"),
        'right': document.getElementById("arrow-right"),
        'up': document.getElementById("arrow-up"),
        'down': document.getElementById("arrow-down")
      };
      const _0xaa9595 = document.getElementById("guidance-text");
      this.hideAllGuidance();
      for (const _0x2cb42c of this.obstacleManager.obstacles) {
        if (_0x2cb42c.mesh.position.z < -0x5 && _0x2cb42c.mesh.position.z > -0x14) {
          const _0x11642d = this.player.position.lane;
          if (_0x2cb42c.lane === _0x11642d) {
            if (_0x2cb42c.type === "barrier-low") {
              _0x156b18.up.classList.add("visible");
              _0xaa9595.textContent = "Jump over the low barrier!";
              _0xaa9595.classList.add("visible");
            } else if (_0x2cb42c.lane < 0x2) {
              _0x156b18.right.classList.add("visible");
              _0xaa9595.textContent = "Move right to avoid obstacle!";
            } else {
              _0x156b18.left.classList.add("visible");
              _0xaa9595.textContent = "Move left to avoid obstacle!";
            }
            _0xaa9595.classList.add("visible");
          }
        }
      }
    }
    ['hideAllGuidance']() {
      const _0x515808 = document.querySelectorAll(".guidance-arrow, .guidance-text");
      _0x515808.forEach(_0x2dbe1d => _0x2dbe1d.classList.remove('visible'));
    }
    ['animate']() {
      const _0xff9b45 = () => {
        requestAnimationFrame(_0xff9b45);
        const _0x17d0e1 = Math.min(this.clock.getDelta(), 0.1);
        this.accumulator += _0x17d0e1;
        while (this.accumulator >= this.frameTime) {
          this.update(this.frameTime);
          this.accumulator -= this.frameTime;
        }
        this.renderer.render(this.scene, this.camera);
      };
      _0xff9b45();
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    new Game();
  });