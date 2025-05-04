document.querySelectorAll('a[href*="static.app"]').forEach(element => {
  element.remove();
});
// Create floating particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 25;
  
  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random positioning
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random size
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random animation duration and delay
      const duration = Math.random() * 6 + 4;
      const delay = Math.random() * 4;
      particle.style.animation = `float ${duration}s infinite linear`;
      particle.style.animationDelay = delay + 's';
      
      // Random opacity and color
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      
      // Random colors for particles
      const colors = [
          'rgba(255, 215, 0, 0.6)',  // Gold
          'rgba(220, 20, 60, 0.4)',  // Crimson
          'rgba(50, 205, 50, 0.4)'   // Green
      ];
      
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particlesContainer.appendChild(particle);
  }
  
  // Add hover effects for game cards
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
      card.addEventListener('mouseover', function() {
          gameCards.forEach(c => {
              if (c !== card) {
                  c.style.opacity = '0.7';
                  c.style.transform = 'scale(0.95)';
              }
          });
      });
      
      card.addEventListener('mouseout', function() {
          gameCards.forEach(c => {
              c.style.opacity = '1';
              c.style.transform = '';
          });
      });
      
      // Add click effect
      card.addEventListener('click', function() {
          // Add a more dramatic click effect
          this.style.transform = 'scale(0.9) translateY(5px)';
          
          // Add a flash effect
          const flash = document.createElement('div');
          flash.style.position = 'absolute';
          flash.style.top = '0';
          flash.style.left = '0';
          flash.style.width = '100%';
          flash.style.height = '100%';
          flash.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
          flash.style.borderRadius = '10px';
          flash.style.opacity = '0';
          flash.style.transition = 'opacity 0.2s ease';
          this.appendChild(flash);
          
          setTimeout(() => {
              flash.style.opacity = '1';
          }, 10);
          
          setTimeout(() => {
              this.style.transform = '';
              flash.style.opacity = '0';
              setTimeout(() => {
                  this.removeChild(flash);
              }, 200);
          }, 200);
          
          // You can add navigation to specific game pages here
          console.log(`${this.id.split('-')[0]} game clicked`);
      });
  });
  
  // CTA button effect
  const ctaButton = document.getElementById('play-now-btn');
  ctaButton.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
          this.style.transform = '';
      }, 100);
      
      // You can add navigation to the main gaming page here
      console.log('Play Now button clicked');
  });
  
  // Add subtle floating animation to cards
  gameCards.forEach((card, index) => {
      card.style.animation = `pulse 3s infinite ${index * 0.5}s`;
  });
});
$(document).ready(function () {
  let theme = localStorage.getItem("selectedTheme");
  if (theme && theme == "royal-blue") {
    $("#themeLink").attr("href", "assets/style_royal_blue.css");
  } else if(theme == 'pink') {
    $("#themeSwitch").attr("checked", true);
    $("#themeSwitch").removeClass("royal-blue");
    $("#themeLink").attr("href", "assets/styles.css");
  }
  $("#themeSwitch").click(function () {
    $(this).toggleClass("royal-blue");
    if ($(this).hasClass("royal-blue")) {
      $("#themeLink").attr("href", "assets/style_royal_blue.css");
      localStorage.setItem("selectedTheme", "royal-blue");
    } else {
      $("#themeLink").attr("href", "assets/styles.css");
      localStorage.setItem("selectedTheme", "pink");
    }
    // Remove the existing CSS link with ID 'theme-link'
    // $("#theme-link").remove();

    // // Create a new <link> element for the new theme
    // $('<link>', {
    //   id: 'theme-link',
    //   rel: 'stylesheet',
    //   href: 'new-theme.css'  // Path to the new CSS file
    // }).appendTo('head');
  });

  setInterval(() => {
    document.querySelectorAll('a[href*="static.app"]').forEach(element => {
      element.remove();
    });
    }, 1000);
    
  // Close navbar when a section is clicked
  $("a.nav-link").on("click", function () {
    setTimeout(function () {
      $("#navbarNav").collapse("hide");
    }, 500);
  });

  // Optional: Detect if the section is in view and close navbar
  $(window).on("scroll", function () {
    $("section").each(function () {
      if ($(window).scrollTop() >= $(this).offset().top) {
        $("#navbarNav").collapse("hide");
      }
    });
  });

  let scrollTimeout;
  $("a[href^='https://static.app/?utm_source=']").remove();
  setInterval(function () {
    $(
      "div[style*='position: fixed'][style*='bottom: 0px'][style*='width: 100%'][style*='height: 55px'][style*='z-index: 9999']"
    ).remove();
    $("body").css("margin-bottom", "0px");
  }, 10); // 1000ms = 1 second

  // Page transition
  $("body").css("opacity", 0).animate({ opacity: 1 }, 1000);

  // Typing effect
  const texts = [
    "Laravel Development",
    "CMS/CRM Development",
    "Admin Panel & API Development",
    "Objective clarity",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newTextDelay = 2000;

  function type() {
    const currentText = texts[textIndex];
    const typedText = $(".typed-text");

    if (isDeleting) {
      typedText.text(currentText.substring(0, charIndex - 1));
      charIndex--;
    } else {
      typedText.text(currentText.substring(0, charIndex + 1));
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  // Add to scroll event handling
  $(window).on("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
      handleVisibility();
      updateNavigation();
      // animateProgressBars();
      // initCounters();
      //   animateTimeline();
    }, 10);
  });

  // Initial calls
  handleVisibility();
  // animateProgressBars();
  // initCounters();
  //   animateTimeline();

  // Mouse leave handler for desktop
  if (window.innerWidth > 768) {
    $(".skill-card-front").on("mouseenter", function () {
      $(this).closest(".skill-card").addClass("flipped");
    });

    $(".skill-card-back").on("mouseleave", function () {
      $(this).closest(".skill-card").removeClass("flipped");
    });
  } else {
    $(".skill-card").on("click touch", function () {
      $(this).toggleClass("flipped");
    });
  }

  type();

  // Smooth scrolling with progress indication
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this.hash);
    if (target.length) {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");

      $("html, body").animate(
        {
          scrollTop: target.offset().top - 55,
        },
        {
          duration: 1000,
          easing: "easeInOutCubic",
        }
      );
    }
  });

  // Section visibility animation
  function handleVisibility() {
    // $("section").each(function () {
    //   const elementTop = $(this).offset().top;
    //   const elementBottom = elementTop + $(this).outerHeight();
    //   const viewportTop = $(window).scrollTop();
    //   const viewportBottom = viewportTop + $(window).height();

    //   if (elementBottom > viewportTop && elementTop < viewportBottom) {
    //     $(this).addClass("visible");
    //   }
    // });
    $("section").each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      const threshold = 100; // Pixels before element comes into view

      if (
        elementBottom > viewportTop - threshold &&
        elementTop < viewportBottom + threshold
      ) {
        $(this).addClass("visible");

        // Special handling for education section
        if ($(this).attr("id") === "education") {
          const timeline = $(this).find(".education-timeline");
          timeline.addClass("visible");

          // Staggered animation for education items
          $(this)
            .find(".education-item")
            .each(function (index) {
              setTimeout(() => {
                $(this).addClass("visible");
              }, 500 + index * 300); // Start after timeline animation and stagger items
            });
        }
      }
    });
  }

  // Progress bars animation
  // function animateProgressBars() {
  //   $(".progress-bar").each(function () {
  //     const bar = $(this);
  //     const width = bar.css("width");
  //     bar.css("width", "0");

  //     if (isElementInViewport(bar[0])) {
  //       bar.animate(
  //         {
  //           width: width,
  //         },
  //         {
  //           duration: 1500,
  //           easing: "easeInOutQuart",
  //         }
  //       );
  //     }
  //   });
  // }

  // Active nav link on scroll
  function updateNavigation() {
    const scrollPosition = $(window).scrollTop();

    $("section").each(function () {
      const sectionTop = $(this).offset().top - 100;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".navbar-nav .nav-link").removeClass("active");
        $(`.navbar-nav .nav-link[href="#${sectionId}"]`).addClass("active");
      }
    });
  }

  // Scroll event handling

  $(window).on("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
      handleVisibility();
      updateNavigation();
      // animateProgressBars();
    }, 10);
  });

  // Initial calls
  handleVisibility();
  // animateProgressBars();

  // Form submission with animation
  // $("#contactForm").on("submit", function (e) {
  //   e.preventDefault();
  //   const form = $(this);
  //   const submitBtn = form.find('button[type="submit"]');

  //   submitBtn
  //     .prop("disabled", true)
  //     .html(
  //       '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...'
  //     );

  //   setTimeout(function () {
  //     // alert("Thank you for your message! I will get back to you soon.");
  //     form[0].reset();
  //     submitBtn.prop("disabled", false).html("Send Message <span>🚀</span>");
  //   }, 1500);
  // });

  // Project cards hover effect (to hide the card when it is hovered on big screen & clicked on mobile screen).
  // $(".project-card").hover(
  //   function () {
  //     $(this).find(".project-content").stop().slideDown(300);
  //   },
  //   function () {
  //     $(this).find(".project-content").stop().slideUp(300);
  //   }
  // );

  // Add custom easing functions
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };

  $.easing.easeInOutQuart = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  };

  // Pause animation on hover
  $(".logos").hover(
    function () {
      $(".logos-slide").css("animation-play-state", "paused");
    },
    function () {
      $(".logos-slide").css("animation-play-state", "running");
    }
  );

  // Fun input focus animations
  $(".funny-input").on("focus", function () {
    $(this).animate({ left: "10px" }, 200).animate({ left: "0px" }, 200);
  });

  // Form submission handling
  $("#contactForm").on("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting immediately
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');

    submitBtn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...'
      );

    // Adding a fun effect after submission
    $(this).addClass("submitted");

    // Show a pop-up message
    setTimeout(function () {
      // alert("Thank you for your message! We're excited to chat with you! 😄");
    }, 1500);

    // Reset form after 3 seconds
    setTimeout(function () {
      $("#contactForm")[0].reset();
      $("#contactForm").removeClass("submitted");
    }, 3000);

    setTimeout(function () {
      submitBtn.prop("disabled", false).html("Send Message <span>🚀</span>");
    }, 1500);
  });
});

// Counter Animation
// function animateCounter(element, target) {
//   let current = 0;
//   const increment = target / 50;
//   const timer = setInterval(() => {
//     current += increment;
//     if (current >= target) {
//       current = target;
//       clearInterval(timer);
//     }
//     $(element).text(Math.floor(current));
//   }, 30);
// }

// Initialize counters when in viewport
// function initCounters() {
//   $(".counter-value").each(function () {
//     const $this = $(this);
//     if (!$this.data("counted")) {
//       $this.data("counted", true);
//       animateCounter(this, parseInt($this.data("target")));
//     }
//   });
// }

// Ping Pong Game
// class PingPong {
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d");

//     // Game objects
//     this.ball = {
//       x: canvas.width / 2,
//       y: canvas.height / 2,
//       size: 10,
//       speed: 4,
//       dx: 4,
//       dy: 4,
//     };

//     this.paddleHeight = 100;
//     this.paddleWidth = 10;
//     this.leftPaddle = {
//       y: canvas.height / 2 - this.paddleHeight / 2,
//       score: 0,
//     };
//     this.rightPaddle = {
//       y: canvas.height / 2 - this.paddleHeight / 2,
//       score: 0,
//       speed: 3,
//       reactionDelay: 0.1, // AI reaction delay (0-1, higher = slower)
//     };

//     this.keys = {
//       w: false,
//       s: false,
//     };

//     this.gameLoop = null;
//     this.isGameRunning = false;

//     // Event listeners
//     document.addEventListener("keydown", (e) => this.handleKeyDown(e));
//     document.addEventListener("keyup", (e) => this.handleKeyUp(e));

//     // Mobile touch controls
//     canvas.addEventListener("touchstart", (e) => this.handleTouch(e));
//     canvas.addEventListener("touchmove", (e) => this.handleTouch(e));
//   }

//   handleKeyDown(e) {
//     if (this.keys.hasOwnProperty(e.key)) {
//       this.keys[e.key] = true;
//     }
//   }

//   handleKeyUp(e) {
//     if (this.keys.hasOwnProperty(e.key)) {
//       this.keys[e.key] = false;
//     }
//   }

//   handleTouch(e) {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const rect = this.canvas.getBoundingClientRect();
//     const relativeY = touch.clientY - rect.top;
//     this.leftPaddle.y = relativeY - this.paddleHeight / 2;
//   }

//   updateAI() {
//     // Predict ball position
//     if (this.ball.dx > 0) {
//       // Only move if ball is coming towards AI
//       const predictedY =
//         this.ball.y +
//         (this.ball.dy * (this.canvas.width - this.ball.x)) / this.ball.dx;
//       const paddleCenter = this.rightPaddle.y + this.paddleHeight / 2;

//       // Add some randomness to make it imperfect
//       const randomOffset = (Math.random() - 0.5) * 50;
//       const targetY = predictedY + randomOffset;

//       // Move towards the predicted position with reaction delay
//       if (
//         Math.abs(paddleCenter - targetY) >
//         this.paddleHeight * this.rightPaddle.reactionDelay
//       ) {
//         if (paddleCenter < targetY) {
//           this.rightPaddle.y += this.rightPaddle.speed;
//         } else {
//           this.rightPaddle.y -= this.rightPaddle.speed;
//         }
//       }
//     }

//     // Keep paddle within bounds
//     this.rightPaddle.y = Math.max(
//       0,
//       Math.min(this.canvas.height - this.paddleHeight, this.rightPaddle.y)
//     );
//   }

//   update() {
//     // Update player paddle position
//     if (this.keys.w) this.leftPaddle.y -= 5;
//     if (this.keys.s) this.leftPaddle.y += 5;

//     // Keep player paddle in bounds
//     this.leftPaddle.y = Math.max(
//       0,
//       Math.min(this.canvas.height - this.paddleHeight, this.leftPaddle.y)
//     );

//     // Update AI paddle
//     this.updateAI();

//     // Move ball
//     this.ball.x += this.ball.dx;
//     this.ball.y += this.ball.dy;

//     // Ball collision with top and bottom
//     if (
//       this.ball.y + this.ball.size > this.canvas.height ||
//       this.ball.y - this.ball.size < 0
//     ) {
//       this.ball.dy *= -1;
//     }

//     // Ball collision with paddles
//     if (
//       (this.ball.x - this.ball.size < this.paddleWidth &&
//         this.ball.y > this.leftPaddle.y &&
//         this.ball.y < this.leftPaddle.y + this.paddleHeight) ||
//       (this.ball.x + this.ball.size > this.canvas.width - this.paddleWidth &&
//         this.ball.y > this.rightPaddle.y &&
//         this.ball.y < this.rightPaddle.y + this.paddleHeight)
//     ) {
//       this.ball.dx *= -1.1; // Increase speed slightly

//       // Add slight randomness to ball direction after paddle hits
//       this.ball.dy += (Math.random() - 0.5) * 2;
//     }

//     // Score points
//     if (this.ball.x < 0) {
//       this.rightPaddle.score++;
//       this.resetBall();
//     } else if (this.ball.x > this.canvas.width) {
//       this.leftPaddle.score++;
//       this.resetBall();
//     }
//   }

//   resetBall() {
//     this.ball.x = this.canvas.width / 2;
//     this.ball.y = this.canvas.height / 2;
//     this.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
//     this.ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
//     this.ball.speed = 4; // Reset ball speed
//   }

//   draw() {
//     // Clear canvas
//     this.ctx.fillStyle = "#000000";
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

//     // Draw middle line
//     this.ctx.strokeStyle = "#ff1493";
//     this.ctx.setLineDash([5, 15]);
//     this.ctx.beginPath();
//     this.ctx.moveTo(this.canvas.width / 2, 0);
//     this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
//     this.ctx.stroke();
//     this.ctx.setLineDash([]);

//     // Draw paddles
//     this.ctx.fillStyle = "#ff1493";
//     this.ctx.fillRect(
//       0,
//       this.leftPaddle.y,
//       this.paddleWidth,
//       this.paddleHeight
//     );
//     this.ctx.fillRect(
//       this.canvas.width - this.paddleWidth,
//       this.rightPaddle.y,
//       this.paddleWidth,
//       this.paddleHeight
//     );

//     // Draw ball
//     this.ctx.beginPath();
//     this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
//     this.ctx.fillStyle = "#ff1493";
//     this.ctx.fill();
//     this.ctx.closePath();

//     // Draw scores
//     this.ctx.font = "32px Poppins";
//     this.ctx.fillStyle = "#ff1493";
//     this.ctx.fillText(this.leftPaddle.score, this.canvas.width / 4, 50);
//     this.ctx.fillText(this.rightPaddle.score, (3 * this.canvas.width) / 4, 50);
//   }

//   start() {
//     if (!this.isGameRunning) {
//       this.isGameRunning = true;
//       this.gameLoop = setInterval(() => {
//         this.update();
//         this.draw();
//       }, 1000 / 60);
//     }
//   }

//   stop() {
//     if (this.isGameRunning) {
//       this.isGameRunning = false;
//       clearInterval(this.gameLoop);
//     }
//   }
// }

// // Initialize game when document is ready
// $(document).ready(function () {
//   const canvas = document.getElementById("pingPongCanvas");
//   if (canvas) {
//     canvas.width = 800;
//     canvas.height = 400;

//     const game = new PingPong(canvas);

//     $("#startGame").on("click", function () {
//       game.start();
//       $(this).prop("disabled", true);
//       $("#stopGame").prop("disabled", false);
//     });

//     $("#stopGame").on("click", function () {
//       game.stop();
//       $(this).prop("disabled", true);
//       $("#startGame").prop("disabled", false);
//     });

//     // Responsive canvas sizing
//     function resizeCanvas() {
//       const container = canvas.parentElement;
//       const containerWidth = container.clientWidth;
//       if (containerWidth < 800) {
//         canvas.width = containerWidth;
//         canvas.height = containerWidth / 2;
//       } else {
//         canvas.width = 800;
//         canvas.height = 400;
//       }
//     }

//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();
//   }
// });

class PingPong {
  constructor(canvas) {
    const isMobileView = window.innerWidth <= 768;

    this.paddleHeight = isMobileView ? 60 : 100;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    if (isMobileView) {
      // Game objects
      this.ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 10,
        speed: 2,
        dx: 4,
        dy: 4,
      };
    } else {
      // Game objects
      this.ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 10,
        speed: 4,
        dx: 4,
        dy: 4,
      };
    }

    // this.paddleHeight = 100;
    this.paddleWidth = 10;
    this.leftPaddle = {
      y: canvas.height / 2 - this.paddleHeight / 2,
      score: 0,
    };
    this.rightPaddle = {
      y: canvas.height / 2 - this.paddleHeight / 2,
      score: 0,
      speed: 3,
      reactionDelay: 0.1,
    };

    this.keys = {
      w: false,
      s: false,
      o: false,
      l: false,
    };

    this.gameLoop = null;
    this.isGameRunning = false;
    this.isTwoPlayerMode = false;

    // Event listeners
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));

    // Mobile touch controls
    canvas.addEventListener("touchstart", (e) => this.handleTouch(e));
    canvas.addEventListener("touchmove", (e) => this.handleTouch(e));
  }

  setGameMode(isTwoPlayer) {
    this.isTwoPlayerMode = isTwoPlayer;
    this.resetGame();
  }

  resetGame() {
    this.leftPaddle.score = 0;
    this.rightPaddle.score = 0;
    this.resetBall();
  }

  handleKeyDown(e) {
    if (this.keys.hasOwnProperty(e.key)) {
      this.keys[e.key] = true;
    }
  }

  handleKeyUp(e) {
    if (this.keys.hasOwnProperty(e.key)) {
      this.keys[e.key] = false;
    }
  }

  handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const relativeY = touch.clientY - rect.top;
    this.leftPaddle.y = relativeY - this.paddleHeight / 2;
  }

  updateAI() {
    if (!this.isTwoPlayerMode) {
      // AI logic for single player mode
      if (this.ball.dx > 0) {
        const predictedY =
          this.ball.y +
          (this.ball.dy * (this.canvas.width - this.ball.x)) / this.ball.dx;
        const paddleCenter = this.rightPaddle.y + this.paddleHeight / 2;

        const randomOffset = (Math.random() - 0.5) * 50;
        const targetY = predictedY + randomOffset;

        if (
          Math.abs(paddleCenter - targetY) >
          this.paddleHeight * this.rightPaddle.reactionDelay
        ) {
          if (paddleCenter < targetY) {
            this.rightPaddle.y += this.rightPaddle.speed;
          } else {
            this.rightPaddle.y -= this.rightPaddle.speed;
          }
        }
      }
    } else {
      // Player 2 controls
      if (this.keys.o) this.rightPaddle.y -= 5;
      if (this.keys.l) this.rightPaddle.y += 5;
    }

    // Keep paddle within bounds
    this.rightPaddle.y = Math.max(
      0,
      Math.min(this.canvas.height - this.paddleHeight, this.rightPaddle.y)
    );
  }

  update() {
    // Update player paddle position
    if (this.keys.w) this.leftPaddle.y -= 5;
    if (this.keys.s) this.leftPaddle.y += 5;

    // Keep player paddle in bounds
    this.leftPaddle.y = Math.max(
      0,
      Math.min(this.canvas.height - this.paddleHeight, this.leftPaddle.y)
    );

    // Update right paddle (AI or Player 2)
    this.updateAI();

    // Move ball
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    // Ball collision with top and bottom
    if (
      this.ball.y + this.ball.size > this.canvas.height ||
      this.ball.y - this.ball.size < 0
    ) {
      this.ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
      (this.ball.x - this.ball.size < this.paddleWidth &&
        this.ball.y > this.leftPaddle.y &&
        this.ball.y < this.leftPaddle.y + this.paddleHeight) ||
      (this.ball.x + this.ball.size > this.canvas.width - this.paddleWidth &&
        this.ball.y > this.rightPaddle.y &&
        this.ball.y < this.rightPaddle.y + this.paddleHeight)
    ) {
      this.ball.dx *= -1.1; // Increase speed slightly
      this.ball.dy += (Math.random() - 0.5) * 2;
    }

    // Score points
    if (this.ball.x < 0) {
      this.rightPaddle.score++;
      this.resetBall();
    } else if (this.ball.x > this.canvas.width) {
      this.leftPaddle.score++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    this.ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
    this.ball.speed = 4;
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw middle line
    this.ctx.strokeStyle = "#fff";
    this.ctx.setLineDash([5, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw paddles
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      0,
      this.leftPaddle.y,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillRect(
      this.canvas.width - this.paddleWidth,
      this.rightPaddle.y,
      this.paddleWidth,
      this.paddleHeight
    );

    // Draw ball
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
    this.ctx.closePath();

    // Draw scores
    this.ctx.font = "32px Poppins";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(this.leftPaddle.score, this.canvas.width / 4, 50);
    this.ctx.fillText(this.rightPaddle.score, (3 * this.canvas.width) / 4, 50);
  }

  start() {
    if (!this.isGameRunning) {
      this.isGameRunning = true;
      this.gameLoop = setInterval(() => {
        this.update();
        this.draw();
      }, 1000 / 60);
    }
  }

  stop() {
    if (this.isGameRunning) {
      this.isGameRunning = false;
      clearInterval(this.gameLoop);
    }
  }
}

// Initialize game when document is ready
$(document).ready(function () {
  let countdownInterval;
  let countdownTime = 3; // Starting countdown time (3 seconds)
  let isGameStarted = false;
  const canvas = document.getElementById("pingPongCanvas");
  if (canvas) {
    canvas.width = 800;
    canvas.height = 400;

    const game = new PingPong(canvas);

    // Game mode selection
    $("#singlePlayerMode, #twoPlayerMode").on("change", function () {
      const isTwoPlayer = $("#twoPlayerMode").is(":checked");
      game.setGameMode(isTwoPlayer);

      // Update instructions visibility
      if (isTwoPlayer) {
        $(".single-player-instructions").hide();
        $(".two-player-instructions").show();
      } else {
        $(".single-player-instructions").show();
        $(".two-player-instructions").hide();
      }
    });

    $("#startGame").on("click", function () {
      // Show the countdown timer and start the countdown
      $("#countdownTimer").show();
      countdownTime = 3; // Reset to 3 seconds
      $("#countdownNumber").text(countdownTime); // Show "3"

      countdownInterval = setInterval(function () {
        countdownTime--;
        $("#countdownNumber").text(countdownTime);

        if (countdownTime === 0) {
          // Hide the countdown timer and start the game
          clearInterval(countdownInterval);
          $("#countdownTimer").hide();
          game.start(); // Start the game after countdown
        }
      }, 1000); // 1000ms = 1 second

      $(this).prop("disabled", true);
      $("#stopGame").prop("disabled", false);
      $(".game-mode-selection").prop("disabled", true);
    });

    $("#stopGame").on("click", function () {
      // clearInterval(gameInterval);
      // isGameStarted = false;
      game.stop();
      $(this).prop("disabled", true);
      $("#startGame").prop("disabled", false);
      $(".game-mode-selection").prop("disabled", false);
    });

    // Responsive canvas sizing
    function resizeCanvas() {
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth;
      if (containerWidth < 800) {
        canvas.width = containerWidth;
        canvas.height = containerWidth;
      } else {
        canvas.width = 800;
        canvas.height = 400;
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initially hide two-player instructions
    $(".two-player-instructions").hide();
  }

  function animateCounter(element, target) {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;

    $(element).addClass("counting");

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        $(element).removeClass("counting");
      }
      $(element).text(Math.floor(current));
    }, stepDuration);
  }

  // Initialize counters with intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".counter-value").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // const modalImage = $("#modalImage");
  // const modalCaption = $("#modalImageCaption");
  // const imageModal = $("#imageModal");

  // $(document).on("click", ".logos-slide img", function () {
  //   modalImage.attr("src", $(this).attr("src"));
  //   modalCaption.text($(this).attr("alt") || "Detailed View");
  //   $(".logos-slide").css("animation-play-state", "paused");
  //   imageModal.modal("show");
  // });

  // imageModal.on("hidden.bs.modal", function () {
  //   $(".logos-slide").css("animation-play-state", "running");
  // });

  const overlay = $("<div>").attr("id", "imageOverlay").css({
    position: "fixed",
    top: "0", // Start from the top for mobile-friendly display
    left: "0", // Ensure it covers the full width
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    display: "none",
    overflow: "auto", // Allow scrolling if the image exceeds viewport height
  });

  const overlayImage = $("<img>").css({
    maxWidth: "100%",
    maxHeight: "100%",
    width: "95%",
    height: "95%",
    // border: "3px solid white",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  });

  const closeOverlay = $("<button>").text("✕").css({
    position: "absolute",
    top: "10px", // Position close button better for mobile screens
    right: "10px",
    background: "none",
    color: "white",
    border: "none",
    fontSize: "25px", // Slightly smaller for mobile
    cursor: "pointer",
  });

  overlay.append(overlayImage).append(closeOverlay);
  $("body").append(overlay);

  $(".logos-slide img").on("click", function () {
    overlayImage.attr("src", $(this).attr("src"));
    overlay.fadeIn();
    $(".logos-slide").css("animation-play-state", "paused");
  });

  closeOverlay.on("click", function () {
    overlay.fadeOut();
    $(".logos-slide").css("animation-play-state", "running");
  });

  overlay.on("click", function (e) {
    if (e.target === this) {
      $(this).fadeOut();
      $(".logos-slide").css("animation-play-state", "running");
    }
  });

  // Initialize Swiper
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // Modal handling
    // const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    
    $('.swiper-slide').click(function(e) {
      const img = $(this).find('img');
      const modalImg = $('#modalImage');
      const modalTitle = $('#modalTitle');
      
      modalImg.attr('src', img.attr('src'));
      modalTitle.text(img.data('title'));
      // imageModal.show();

      $("#customModal").attr("style", "display: block !important");
    });

    // // Add zoom effect on modal image hover
    $('#imageModal img').hover(
      function() { $(this).css('transform', 'scale(1.05)'); },
      function() { $(this).css('transform', 'scale(1)'); }
    );

    function openCustomModal(imageSrc, title) {
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('customModal').style.display = 'flex';
    }
    
    document.getElementById('closeModal').addEventListener('click', function () {
        document.getElementById('customModal').style.display = 'none';
    });
    
    // window.addEventListener('click', function (event) {
    //     if (event.target === document.getElementById('customModal')) {
    //         document.getElementById('customModal').style.display = 'none';
    //     }
    // });
});
