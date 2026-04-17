// Import libraries locally
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '@lottiefiles/lottie-player';

// Expose to window for other scripts
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.ScrollToPlugin = ScrollToPlugin;
window.Lenis = Lenis;
window.Swiper = Swiper;

import { initChat } from './chat.js';
import { initDocuments } from './documents.js';
import { initPlayground } from './playground.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }

  const lenis = initSmoothScroll();
  window.lenis = lenis; // Expose globally
  if (!lenis) return;
  
  // Initialize Chat Assistant
  if (typeof initChat === 'function') initChat();
  
  // Start Loader
  initLoader(() => {
    if (typeof initCustomCursor === 'function') initCustomCursor();
    if (typeof initTextSplitting === 'function') initTextSplitting();
    if (typeof initHeroAnimations === 'function') initHeroAnimations();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initParallaxEffects === 'function') initParallaxEffects();
    if (typeof init3DEffects === 'function') init3DEffects();
    if (typeof initImageReveals === 'function') initImageReveals();
    if (typeof initTypingEffect === 'function') initTypingEffect();
    if (typeof initOdysseyAnimations === 'function') initOdysseyAnimations();
    if (typeof initDocuments === 'function') initDocuments();
    if (typeof initPlayground === 'function') initPlayground();
    if (typeof init3DScroll === 'function') init3DScroll();
    if (typeof initFooterYear === 'function') initFooterYear();
    if (typeof initHeaderSync === 'function') initHeaderSync();
    if (typeof initProjectOverlay === 'function') initProjectOverlay();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initHeroInteractive === 'function') initHeroInteractive();
  });

  // Update ScrollTrigger on Lenis scroll
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);
});

function initLoader(callback) {
  const loader = document.querySelector('.loader');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderText = document.querySelector('.loader-text');
  
  if (!loader || !loaderText) {
    if (callback) callback();
    return;
  }

  // Split loader text
  const text = loaderText.textContent;
  loaderText.innerHTML = text.split('').map(char => `<span class="split-char">${char}</span>`).join('');
  const chars = loaderText.querySelectorAll('.split-char');

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          callback();
        }
      });
    }
  });

  const ganesha = document.querySelector('.loader-ganesha');
  if (ganesha) {
    tl.to(ganesha, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  }

  tl.from(chars, {
    y: 50,
    opacity: 0,
    stagger: 0.03,
    duration: 0.8,
    ease: 'power4.out'
  })
  .to(loaderBar, {
    width: '100%',
    duration: 1,
    ease: 'power2.inOut'
  }, '-=0.4')
  .to(chars, {
    y: -50,
    opacity: 0,
    stagger: 0.01,
    duration: 0.4,
    ease: 'power4.in'
  });
}

function initTypingEffect() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const words = ["Scalable Backend Architectures", "High-Performance Data Systems", "Laravel Enterprise Solutions", "Strategic AI Implementations"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.error('Lenis is not loaded');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  return lenis;
}

function init3DScroll() {
  // Standard scroll without fade/scale for "connected" feel
  // Parallax for blobs based on scroll
  const blobs = gsap.utils.toArray('.blob-parallax');
  if (blobs.length === 0) return;

  blobs.forEach(blob => {
    gsap.to(blob, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: true
      }
    });
  });
}

function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (!cursor || !follower) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
    
    gsap.to(follower, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  // Hover effects
  const links = document.querySelectorAll('a, button, .playground-card, .project-item');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
      gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });
}

function initTextSplitting() {
  const titles = document.querySelectorAll('.font-headline');
  titles.forEach(title => {
    if (title.classList.contains('hero-reveal')) return;
    const text = title.textContent;
    title.innerHTML = text.split(' ').map(word => 
      `<span class="split-word"><span class="split-char-wrapper">${word}</span></span>`
    ).join(' ');
  });
}

function initHeroAnimations() {
  if (document.querySelectorAll('.hero-reveal').length === 0) return;
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero-reveal', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.5,
    stagger: 0.15,
    delay: 0.3,
    ease: 'expo.out'
  });

  gsap.to('#hero-blob-1', {
    x: '+=100',
    y: '+=80',
    rotation: 360,
    duration: 25,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('#hero-blob-2', {
    x: '-=120',
    y: '-=60',
    rotation: -360,
    duration: 30,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

function initHeroInteractive() {
  const stage = document.querySelector('.hero-3d-stage');
  const container = document.querySelector('.image-parallax-container');
  const spotlight = document.getElementById('hero-spotlight');
  
  if (!stage || !container) return;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = stage.getBoundingClientRect();
    
    // Calculate rotation (V. subtle: -5 to 5 degrees)
    const xRotation = ((clientY - top) / height - 0.5) * -8;
    const yRotation = ((clientX - left) / width - 0.5) * 8;
    
    gsap.to(container, {
      rotationX: xRotation,
      rotationY: yRotation,
      duration: 1.5,
      ease: 'power2.out',
      overwrite: true
    });

    if (spotlight) {
      const relX = clientX - left;
      const relY = clientY - top;
      
      gsap.to(spotlight, { 
        left: relX, 
        top: relY,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Integrated subtle glare effect
      const moveX = (relX / width - 0.5) * 40;
      const moveY = (relY / height - 0.5) * 40;
      
      gsap.to('.image-parallax-container img', {
        x: moveX * 0.2,
        y: moveY * 0.2,
        duration: 1.2,
        ease: 'power1.out'
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(container, {
      rotationX: 0,
      rotationY: 0,
      duration: 2.5,
      ease: 'elastic.out(1, 0.75)',
      overwrite: true
    });

    gsap.to('.image-parallax-container img', {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    });

    if (spotlight) {
      gsap.to(spotlight, { opacity: 0, duration: 0.5 });
    }
  };

  stage.addEventListener('mousemove', handleMouseMove);
  stage.addEventListener('mouseleave', handleMouseLeave);
}

function initScrollAnimations() {
  // Timeline items reveal
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      opacity: 0,
      x: 50,
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // Expertise section reveal
  const revealLine = document.querySelector('.reveal-line');
  if (revealLine) {
    gsap.to(revealLine, {
      scrollTrigger: {
        trigger: revealLine,
        start: 'top 90%',
      },
      width: 128,
      duration: 2,
      ease: 'expo.inOut'
    });
  }

  // Skill cards reveal
  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      opacity: 0,
      y: 60,
      duration: 1,
      delay: i * 0.1,
      ease: 'power4.out',
      onComplete: () => {
        const progress = card.querySelector('.skill-progress');
        if (progress) {
          gsap.to(progress, {
            width: progress.dataset.progress,
            duration: 2,
            ease: 'expo.out'
          });
        }
      }
    });
  });

  // Project items reveal
  gsap.utils.toArray('.project-item').forEach((item, i) => {
    const isEven = i % 2 === 0;
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      opacity: 0,
      x: isEven ? -100 : 100,
      duration: 1.5,
      ease: 'expo.out'
    });
  });
}

function initParallaxEffects() {
  // Image parallax in Hero section
  const parallaxContainer = document.querySelector('.image-parallax-container');
  const parallaxImage = document.querySelector('.image-parallax');
  
  if (parallaxContainer && parallaxImage) {
    gsap.to(parallaxImage, {
      scrollTrigger: {
        trigger: parallaxContainer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -50,
      ease: 'none'
    });
  }

  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => {
      gsap.to(navbar, { 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)',
        duration: 0.5 
      });
      navbar.classList.add('nav-scrolled');
    },
    onLeaveBack: () => {
      gsap.to(navbar, { 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)',
        duration: 0.5 
      });
      navbar.classList.remove('nav-scrolled');
    }
  });
}

function init3DEffects() {
  const blob1 = document.getElementById('hero-blob-1');
  const blob2 = document.getElementById('hero-blob-2');
  
  if (!blob1 && !blob2) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 60;
    const yPos = (clientY / window.innerHeight - 0.5) * 60;

    if (blob1) {
      gsap.to(blob1, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out'
      });
    }

    if (blob2) {
      gsap.to(blob2, {
        x: -xPos * 2,
        y: -yPos * 2,
        duration: 1.8,
        ease: 'power2.out'
      });
    }
  });
}

function initFooterYear() {
  const yearElements = document.querySelectorAll('.dynamic-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

function initHeaderSync() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.classList.remove('text-on-surface');
          link.classList.add('text-on-surface/60');
          
          const href = link.getAttribute('href');
          if (href === `#${id}` || href === `/#${id}`) {
            link.classList.add('active');
            link.classList.add('text-on-surface');
            link.classList.remove('text-on-surface/60');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

function initOdysseyAnimations() {
  const track = document.querySelector('.odyssey-track');
  if (!track) return;

  // Drag to scroll functionality
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let rafId = null;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    cancelAnimationFrame(rafId);
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
    applyInertia();
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2.5;
    const prevScrollLeft = track.scrollLeft;
    track.scrollLeft = scrollLeft - walk;
    velocity = track.scrollLeft - prevScrollLeft;
  });

  function applyInertia() {
    if (Math.abs(velocity) < 0.1) return;
    track.scrollLeft += velocity;
    velocity *= 0.95; // Friction
    rafId = requestAnimationFrame(applyInertia);
  }

  // Navigation Arrows
  const prevBtn = document.getElementById('odyssey-prev');
  const nextBtn = document.getElementById('odyssey-next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -400, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }

  // Odyssey stops reveal
  const stops = gsap.utils.toArray('.odyssey-stop');
  if (stops.length === 0) return;

  const odysseyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#odyssey',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  stops.forEach((stop, i) => {
    const card = stop.querySelector('.odyssey-card');
    const dot = stop.querySelector('.timeline-dot');
    const connector = stop.querySelector('.timeline-connector');
    const arrow = stop.querySelector('.timeline-arrow');

    if (arrow) {
      odysseyTl.from(arrow, {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out'
      }, i * 0.2);
    }

    if (dot) {
      odysseyTl.from(dot, {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)'
      }, `-=${0.6}`);

      // Add pulse animation to dot
      gsap.to(dot, {
        boxShadow: '0 0 20px rgba(255, 77, 109, 0.4)',
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    if (connector) {
      odysseyTl.from(connector, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, `-=${0.4}`);
    }

    if (card) {
      gsap.set(card, { opacity: 0 }); // Ensure it's hidden before animation starts
      odysseyTl.fromTo(card, 
        {
          y: card.classList.contains('top') ? 60 : -60,
          scale: 0.9,
          opacity: 0
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out'
        }, 
        i * 0.15 + 0.3 // Faster staggered start
      );
    }
  });
}

function initImageReveals() {
  gsap.utils.toArray('.reveal-container').forEach(container => {
    const overlay = container.querySelector('.reveal-overlay');
    const img = container.querySelector('img');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      }
    });

    tl.to(overlay, {
      scaleX: 1,
      duration: 0.8,
      ease: 'expo.inOut'
    })
    .set(img, { opacity: 1 })
    .to(overlay, {
      scaleX: 0,
      transformOrigin: 'right',
      duration: 0.8,
      ease: 'expo.inOut'
    })
    .from(img, {
      scale: 1.5,
      duration: 1.5,
      ease: 'expo.out',
      delay: -0.8
    });
  });
}

import { projects, aiLabProjects } from './projects-data.js';

function initProjectOverlay() {
  const overlay = document.getElementById('project-overlay');
  const content = document.getElementById('project-overlay-content');
  const closeBtn = document.getElementById('close-project-overlay');

  if (!overlay || !content || !closeBtn) return;

  let overlayLenis = null;

  const openOverlay = (projectId, type = 'prod') => {
    const project = type === 'ai' ? aiLabProjects[projectId] : projects[projectId];
    if (!project) return;

    // Render content
    content.innerHTML = `
      <header class="relative overflow-hidden bg-surface-container-high rounded-[2rem] p-12 md:p-16 border border-outline-variant/20">
          <div class="absolute inset-0 bg-repeat-x opacity-[0.1] pointer-events-none" 
               style="background-image: url('${project.image}'); background-size: contain; background-position: center;"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-surface-container-high/80 to-surface/20 pointer-events-none"></div>
          
          <div class="relative z-10 space-y-6">
              <div class="flex items-center gap-4">
                <h1 class="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tight">${project.title}</h1>
                ${project.status === 'Offline' ? `
                  <span class="px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full backdrop-blur-sm shadow-sm">
                    Offline
                  </span>
                ` : ''}
              </div>
              <p class="text-on-surface-variant text-xl leading-relaxed opacity-80 max-w-3xl">${project.description}</p>
              
              <div class="flex flex-wrap gap-4 pt-4">
                  <div class="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-outline-variant/20">
                      <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span class="text-sm font-label text-on-surface">2023 - Present</span>
                  </div>
                  <div class="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-outline-variant/20">
                      <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      <span class="text-sm font-label text-on-surface">Full Stack Developer</span>
                  </div>
              </div>
          </div>
      </header>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div class="lg:col-span-2 space-y-12">
              <div class="space-y-6">
                  <h2 class="font-headline text-3xl font-bold text-secondary">Project Overview</h2>
                  <p class="text-on-surface-variant text-lg leading-relaxed opacity-80">
                      ${project.longDescription || project.description}
                  </p>
              </div>

              <div class="space-y-6">
                  <h2 class="font-headline text-3xl font-bold text-secondary">Key Features & Contributions</h2>
                  <ul class="grid grid-cols-1 gap-4">
                      ${project.features.map(f => `
                          <li class="flex items-start gap-3 text-on-surface-variant opacity-90">
                              <div class="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5"></div>
                              <span>${f}</span>
                          </li>
                      `).join('')}
                  </ul>
              </div>
          </div>

          <aside class="space-y-8">
              <div class="p-8 bg-surface-container-high rounded-3xl border border-outline-variant/20 space-y-6">
                  <h4 class="font-label text-[10px] uppercase tracking-widest font-black text-on-surface/50">Tech Stack</h4>
                  <div class="flex flex-wrap gap-2">
                      ${(project.techStack || project.features).map(f => `<span class="px-4 py-2 bg-surface text-secondary text-xs font-bold rounded-full border border-secondary/20">${f}</span>`).join('')}
                  </div>
              </div>

              <div class="flex flex-col gap-4">
                  ${project.status === 'Offline' ? `
                    <button disabled class="px-8 py-4 bg-gray-200 text-gray-400 rounded-full font-label text-xs font-black uppercase tracking-widest cursor-not-allowed border border-gray-300">Project Currently Offline</button>
                  ` : (project.liveUrls ? project.liveUrls.map(link => `
                    <a href="${link.url}" target="_blank" class="px-8 py-4 bg-secondary text-white rounded-full font-label text-xs font-black uppercase tracking-widest hover:bg-secondary-dim transition-all shadow-lg shadow-secondary/20 text-center">${link.label} →</a>
                  `).join('') : `
                    <a href="${project.liveUrl}" target="_blank" class="px-8 py-4 bg-secondary text-white rounded-full font-label text-xs font-black uppercase tracking-widest hover:bg-secondary-dim transition-all shadow-lg shadow-secondary/20 text-center">Visit Live Project →</a>
                  `)}
              </div>
          </aside>
      </section>
    `;

    // Animate in
    gsap.to(overlay, {
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      onComplete: () => {
        // Initialize Lenis for overlay if not already done
        if (!overlayLenis && typeof Lenis !== 'undefined') {
          overlayLenis = new Lenis({
            wrapper: overlay,
            content: overlay.querySelector('.container'),
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
          });

          function raf(time) {
            if (overlayLenis) {
              overlayLenis.raf(time);
              requestAnimationFrame(raf);
            }
          }
          requestAnimationFrame(raf);
        }
        
        if (overlayLenis) {
          overlayLenis.start();
          overlayLenis.scrollTo(0, { immediate: true });
        }
      }
    });

    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    
    if (!overlayLenis) {
      overlay.scrollTop = 0;
    }
  };

  const closeOverlay = () => {
    if (overlayLenis) overlayLenis.stop();
    
    gsap.to(overlay, {
      y: '100%',
      duration: 0.6,
      ease: 'expo.in'
    });
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  };

  // Use event delegation for dynamic links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="project-detail.html"]');
    if (link) {
      e.preventDefault();
      const url = new URL(link.href, window.location.origin);
      const id = url.searchParams.get('id');
      const type = url.searchParams.get('type') || 'prod';
      openOverlay(id, type);
    }
  });

  closeBtn.addEventListener('click', closeOverlay);
  
  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const close = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');
  const menuLinks = document.querySelectorAll('.mobile-nav-link span:last-child');

  if (!toggle || !menu || !close) return;

  const openMenu = () => {
    menu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    
    // Hide chat toggle when menu is open to prevent overlap
    const chatToggle = document.getElementById('chat-toggle-wrapper');
    if (chatToggle) gsap.to(chatToggle, { opacity: 0, pointerEvents: 'none', duration: 0.3 });

    // Animate links in
    gsap.to(menuLinks, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'expo.out',
      delay: 0.2
    });
  };

  const closeMenu = () => {
    menu.classList.add('translate-x-full');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();

    // Show chat toggle back
    const chatToggle = document.getElementById('chat-toggle-wrapper');
    if (chatToggle) gsap.to(chatToggle, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });

    // Reset links
    gsap.set(menuLinks, { y: 40, opacity: 0 });
  };

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
