document.querySelectorAll('a[href*="static.app"]').forEach(element => {
  element.remove();
});
// Create floating particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return; // Add a check in case the element doesn't exist
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
  if (ctaButton) {
      ctaButton.addEventListener('click', function() {
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
              this.style.transform = '';
          }, 100);
          
          // You can add navigation to the main gaming page here
          console.log('Play Now button clicked');
      });
  }
  
  // Add subtle floating animation to cards
  gameCards.forEach((card, index) => {
      card.style.animation = `pulse 3s infinite ${index * 0.5}s`;
  });
});

// Professional Hero Section JavaScript

// Typing Animation for Role
function initTypingAnimation() {
  const roles = ["Laravel Development",
    "CMS/CRM Development",
    "Admin Panel & API Development",
    "Objective clarity"]
  const typedRoleElement = document.getElementById("typedRole")
  if (!typedRoleElement) return;

  let currentRoleIndex = 0
  let currentCharIndex = 0
  let isDeleting = false

  function typeRole() {
    const currentRole = roles[currentRoleIndex]

    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1)
      currentCharIndex--
    } else {
      typedRoleElement.textContent = currentRole.substring(0, currentCharIndex + 1)
      currentCharIndex++
    }

    let typeSpeed = isDeleting ? 100 : 150

    if (!isDeleting && currentCharIndex === currentRole.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false
      currentRoleIndex = (currentRoleIndex + 1) % roles.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeRole, typeSpeed)
  }

  typeRole()
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".achievement-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Particle Animation
function createParticles() {
  const particlesContainer = document.getElementById("heroParticles")
  if (!particlesContainer) return

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: ${Math.random() > 0.5 ? "#ff1493" : "#ff6b6b"};
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      left: ${Math.random() * 100}%;
      animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `

    particlesContainer.appendChild(particle)

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 25000)
  }

  // Create particles periodically
  setInterval(createParticle, 2000)

  // Create initial particles
  for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200)
  }
}

// Smooth Scroll for CTA buttons
function initSmoothScroll() {
  const ctaButton = document.querySelector('.btn-primary-hero[href="#projects"]')
  const scrollIndicator = document.querySelector(".scroll-indicator")

  function smoothScrollTo(target) {
    const targetElement = document.querySelector(target)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault()
      smoothScrollTo("#projects")
    })
  }

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      smoothScrollTo("#skills")
    })
  }
}

// Skill Tags Hover Effect
function initSkillTagsEffect() {
  const skillTags = document.querySelectorAll(".skill-tag")

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "translateY(-2px) scale(1.05)"
    })

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("achievement-number")) {
          animateCounters()
        }
      }
    })
  }, observerOptions)

  // Observe achievement numbers
  const achievementNumbers = document.querySelectorAll(".achievement-number")
  achievementNumbers.forEach((number) => observer.observe(number))
}

// Social Links Analytics (Optional)
function initSocialTracking() {
  const socialLinks = document.querySelectorAll(".social-link")

  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const platform = link.href.includes("github")
        ? "GitHub"
        : link.href.includes("linkedin")
          ? "LinkedIn"
          : "Instagram"

      // Add visual feedback
      link.style.transform = "scale(0.95)"
      setTimeout(() => {
        link.style.transform = ""
      }, 150)

      // You can add analytics tracking here
      console.log(`Social link clicked: ${platform}`)
    })
  })
}

// Initialize all hero functionality
function initProfessionalHero() {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTypingAnimation()
      createParticles()
      initSmoothScroll()
      initSkillTagsEffect()
      initScrollAnimations()
      initSocialTracking()
    })
  } else {
    initTypingAnimation()
    createParticles()
    initSmoothScroll()
    initSkillTagsEffect()
    initScrollAnimations()
    initSocialTracking()
  }
}

// Start the professional hero
initProfessionalHero()

// Add CSS animation keyframes dynamically
const style = document.createElement("style")
style.textContent = `
  @keyframes floatParticle {
    0% {
      transform: translateY(100vh) translateX(0px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(100px);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)


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
  }, 10);

  // Page transition
  $("body").css("opacity", 0).animate({ opacity: 1 }, 1000);

  // Add to scroll event handling
  $(window).on("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
      handleVisibility();
      updateNavigation();
    }, 10);
  });

  // Initial calls
  handleVisibility();

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

  // =================================================================
// START: ROBUST 3D PARALLAX STARFIELD BACKGROUND FOR RELAX ZONE
// =================================================================
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('relaxZoneCanvas');
    if (!canvas) {
        console.error('Starfield Error: Canvas element #relaxZoneCanvas not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    let width, height, stars = [];
    const starCount = 1000;
    const speed = 20;

    // Star constructor
    function Star() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.pz = this.z;
    }

    Star.prototype.update = function() {
        this.z -= speed;
        if (this.z < 1) {
            this.z = width + Math.random() * 100; // Reset farther back
            this.x = (Math.random() - 0.5) * width;
            this.y = (Math.random() - 0.5) * height;
            this.pz = this.z;
        }
    };

    Star.prototype.draw = function() {
        const sx = (this.x / this.z) * width / 2 + width / 2;
        const sy = (this.y / this.z) * height / 2 + height / 2;
        
        if (sx < 0 || sx > width || sy < 0 || sy > height) {
             return; // Don't draw if it's off-screen
        }

        const r = Math.max(0.1, (1 - this.z / width) * 2.5);
        const px = (this.x / this.pz) * width / 2 + width / 2;
        const py = (this.y / this.pz) * height / 2 + height / 2;
        
        this.pz = this.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = "rgba(0, 217, 255, 0.4)";
        ctx.lineWidth = r * 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
    };

    function setup() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(9, 10, 15, 0.4)'; // Use the dark background color
        ctx.fillRect(0, 0, width, height);
        
        for (let star of stars) {
            star.update();
            star.draw();
        }

        requestAnimationFrame(animate);
    }

    // Initialize and run
    setup();
    requestAnimationFrame(animate); // Start animation loop
    window.addEventListener('resize', setup); // Add resize listener
});
// =================================================================
// END: ROBUST 3D PARALLAX STARFIELD BACKGROUND
// =================================================================

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

  const overlay = $("<div>").attr("id", "imageOverlay").css({
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    display: "none",
    overflow: "auto",
  });

  const overlayImage = $("<img>").css({
    maxWidth: "100%",
    maxHeight: "100%",
    width: "95%",
    height: "95%",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  });

  const closeOverlay = $("<button>").text("✕").css({
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    color: "white",
    border: "none",
    fontSize: "25px",
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

  // =================================================================
  // START: NEW ENHANCED IMAGE MODAL LOGIC FOR CERTIFICATES
  // =================================================================

  const modal = document.getElementById('imageModal');
    if (!modal) return; // Exit if modal not found

    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalDownload = document.getElementById('modalDownload');
    
    // Get the new rotation controls
    const modalRotateLeft = document.getElementById('modalRotateLeft');
    const modalRotateRight = document.getElementById('modalRotateRight');
    // const modalFlipVertical = document.getElementById('modalFlipVertical');
    
    const galleryImages = document.querySelectorAll('#documents .swiper-slide img');
    let currentImageIndex;

    // --- State variables for transformations ---
    let currentRotation = 0;
    let currentScaleY = 1; // 1 for normal, -1 for flipped

    // --- Function to apply the current transformations to the image ---
    const applyTransform = () => {
        modalImage.style.transform = `rotate(${currentRotation}deg) scaleY(${currentScaleY})`;
    };

    const openModal = (index) => {
        if (index < 0 || index >= galleryImages.length) return;
        currentImageIndex = index;
        
        // --- Reset transformations for each new image ---
        currentRotation = 0;
        currentScaleY = 1;
        applyTransform(); // Apply the reset state

        const imgElement = galleryImages[index];
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modalCaption.textContent = imgElement.dataset.title || 'Certificate';
        modalDownload.href = imgElement.src;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        modalPrev.style.display = (index === 0) ? 'none' : 'block';
        modalNext.style.display = (index === galleryImages.length - 1) ? 'none' : 'block';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openModal(index));
    });

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => openModal(currentImageIndex - 1));
    modalNext.addEventListener('click', () => openModal(currentImageIndex + 1));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Event Listeners for new rotation controls ---
    modalRotateLeft.addEventListener('click', () => {
        currentRotation -= 90;
        applyTransform();
    });

    modalRotateRight.addEventListener('click', () => {
        currentRotation += 90;
        applyTransform();
    });

    // modalFlipVertical.addEventListener('click', () => {
    //     currentScaleY *= -1; // Toggles between 1 and -1
    //     applyTransform();
    // });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' && modalNext.style.display !== 'none') openModal(currentImageIndex + 1);
        if (e.key === 'ArrowLeft' && modalPrev.style.display !== 'none') openModal(currentImageIndex - 1);
    });
  // =================================================================
  // END: NEW ENHANCED IMAGE MODAL LOGIC
  // =================================================================
});


// Ping Pong Game Class (unchanged)
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

// Initialize Ping Pong Game
$(document).ready(function () {
  let countdownInterval;
  let countdownTime = 3; 
  const canvas = document.getElementById("pingPongCanvas");
  if (canvas) {
    canvas.width = 800;
    canvas.height = 400;

    const game = new PingPong(canvas);

    $("#singlePlayerMode, #twoPlayerMode").on("change", function () {
      const isTwoPlayer = $("#twoPlayerMode").is(":checked");
      game.setGameMode(isTwoPlayer);

      if (isTwoPlayer) {
        $(".single-player-instructions").hide();
        $(".two-player-instructions").show();
      } else {
        $(".single-player-instructions").show();
        $(".two-player-instructions").hide();
      }
    });

    $("#startGame").on("click", function () {
      $("#countdownTimer").show();
      countdownTime = 3; 
      $("#countdownNumber").text(countdownTime);

      countdownInterval = setInterval(function () {
        countdownTime--;
        $("#countdownNumber").text(countdownTime);

        if (countdownTime === 0) {
          clearInterval(countdownInterval);
          $("#countdownTimer").hide();
          game.start();
        }
      }, 1000);

      $(this).prop("disabled", true);
      $("#stopGame").prop("disabled", false);
      $(".game-mode-selection").prop("disabled", true);
    });

    $("#stopGame").on("click", function () {
      game.stop();
      $(this).prop("disabled", true);
      $("#startGame").prop("disabled", false);
      $(".game-mode-selection").prop("disabled", false);
    });

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
    $(".two-player-instructions").hide();
  }
});


// Counter Animation Logic
$(document).ready(function() {
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
});