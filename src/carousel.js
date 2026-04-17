import { projects } from './projects-data.js';

const carouselData = projects.slice(0, 7); // Use the first 7 projects for the carousel

let currentIndex = 0;
let interval;
const slides = [];

function initCarousel() {
  const container = document.getElementById('carousel-container');
  const titleEl = document.getElementById('carousel-title');
  const descEl = document.getElementById('carousel-desc');
  const detailsBtn = document.getElementById('carousel-details-btn');
  const counterEl = document.getElementById('carousel-counter');
  const bgTitleEl = document.getElementById('carousel-bg-title');

  // Modal Elements
  const modal = document.getElementById('project-modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const closeModal = document.getElementById('close-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCounter = document.getElementById('modal-counter');
  const modalFeatures = document.getElementById('modal-features');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalSourceLink = document.getElementById('modal-source-link');

  function openProjectModal(e) {
    e.preventDefault();
    const data = carouselData[currentIndex];
    
    modalImage.src = data.image;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.description;
    modalCounter.innerText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(carouselData.length).padStart(2, '0')}`;
    modalLiveLink.href = data.liveUrl;
    modalSourceLink.href = data.sourceUrl;
    
    modalFeatures.innerHTML = data.features.map(f => `
      <li class="flex items-center gap-3 text-on-surface-variant opacity-70 text-sm">
        <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        ${f}
      </li>
    `).join('');

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('translate-y-10');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.add('translate-y-10');
    document.body.style.overflow = '';
  }

  if (detailsBtn) detailsBtn.addEventListener('click', openProjectModal);
  if (closeModal) closeModal.addEventListener('click', closeProjectModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

  // Create slides once
  carouselData.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'absolute w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-surface';
    slide.innerHTML = `
      <div class="w-full h-full p-6 ${item.bgColor} flex items-center justify-center transition-colors duration-500">
        <img src="${item.image}" class="w-full h-full object-contain" />
      </div>
      <svg class="absolute inset-0 w-full h-full -rotate-90 opacity-0" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#ff4d6d" stroke-width="2" stroke-dasharray="301.59" stroke-dashoffset="301.59" id="loader-circle-${i}" />
      </svg>
    `;
    container.appendChild(slide);
    slides.push(slide);
  });

  function render() {
    slides.forEach((slide, i) => {
      const diff = (i - currentIndex + carouselData.length) % carouselData.length;
      let x = 0, scale = 0, opacity = 0, zIndex = 0, blur = 10, shadow = "0 20px 40px rgba(0,0,0,0.4)";
      
      if (diff === 0) { 
        x = 0; scale = 1; opacity = 1; zIndex = 10; blur = 0; 
        shadow = "0 40px 80px rgba(255, 77, 109, 0.3)";
      }
      else if (diff === 1) { x = 250; scale = 0.6; opacity = 0.5; zIndex = 5; blur = 4; }
      else if (diff === carouselData.length - 1) { x = -250; scale = 0.6; opacity = 0.5; zIndex = 5; blur = 4; }
      
      if (typeof window.gsap === 'undefined') return;
      window.gsap.to(slide, {
        x: x,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        filter: `blur(${blur}px)`,
        boxShadow: shadow,
        duration: 0.8,
        ease: "power3.inOut"
      });

      const loader = slide.querySelector(`#loader-circle-${i}`);
      if (loader) {
        loader.parentElement.style.opacity = diff === 0 ? '1' : '0';
        if (diff === 0) {
          window.gsap.fromTo(loader, { strokeDashoffset: 301.59 }, { strokeDashoffset: 0, duration: 4, ease: "linear" });
        } else {
          window.gsap.killTweensOf(loader);
        }
      }
    });
    
    // Update text content
    titleEl.innerText = carouselData[currentIndex].title;
    descEl.innerText = carouselData[currentIndex].description;
    if (detailsBtn) {
      detailsBtn.href = carouselData[currentIndex].detailsUrl;
    }
    if (counterEl) {
      counterEl.innerText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(carouselData.length).padStart(2, '0')}`;
    }
    if (bgTitleEl) {
      bgTitleEl.innerText = carouselData[currentIndex].title;
    }

    // Animate text
    window.gsap.fromTo([counterEl, titleEl, descEl, detailsBtn], 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
    if (bgTitleEl) {
      window.gsap.fromTo(bgTitleEl, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % carouselData.length;
    render();
    resetInterval();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    render();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(next, 4000);
  }

  document.getElementById('next-btn').addEventListener('click', next);
  document.getElementById('prev-btn').addEventListener('click', prev);

  render();
  resetInterval();
}

document.addEventListener('DOMContentLoaded', initCarousel);
