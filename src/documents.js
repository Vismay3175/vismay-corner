
const certificates = [
  {
    title: "C & C++ Language Certificate",
    issuer: "KRIS COMPUTER",
    img: "/documents/Vismay-Oza-CC-certificate.jpg",
    desc: "Certified proficiency in C and C++ programming languages."
  },
  {
    title: "Google Cloud Certification",
    issuer: "Google Developer Groups",
    img: "/documents/Vismay-Oza-GDG-Gandhinagar-Workshop.jpeg",
    desc: "Successful completion of ADK, A2A, MCP & RAG on Google Cloud workshop."
  },
  {
    title: "Data Analysis using Python",
    issuer: "IBM Skills Network",
    img: "/documents/data-analysis-using-python.webp",
    desc: "Comprehensive data analysis techniques using Python libraries."
  },
  {
    title: "Explore Emerging Tech",
    issuer: "IBM",
    img: "/documents/explore-emerging-tech.webp",
    desc: "Exploration of emerging technologies and their applications."
  },
  {
    title: "Laravel Framework Expert",
    issuer: "TestDome",
    img: "/documents/Vismay-Oza-Laravel-TestDome-Certificate.webp",
    desc: "Advanced backend development with Laravel ecosystem."
  },
  {
    title: "JavaScript LU Certificate",
    issuer: "LetsUpgrade",
    img: "/documents/Vismay Oza JS LU Certificate.jpg",
    desc: "Certification for JavaScript proficiency."
  },
  {
    title: "PHP LU Certificate",
    issuer: "LetsUpgrade",
    img: "/documents/Vismay-Oza-PHP-LU-Certifcate.jpg",
    desc: "Certification for PHP proficiency."
  },
  {
    title: "Python LU Certificate",
    issuer: "LetsUpgrade",
    img: "/documents/Vismay-Oza-Python-LU-Certificate.jpg",
    desc: "Certification for Python proficiency."
  },
  {
    title: "SQL LU Certificate",
    issuer: "LetsUpgrade",
    img: "/documents/Vismay-Oza-SQL-LU-Certificate.jpg",
    desc: "Certification for SQL proficiency."
  },
  {
    title: "Laravel Basic Quiz",
    issuer: "CareerNinja LearnTube",
    img: "/documents/Vismay-Oza-Laravel-Basic-Quiz-CareerNinjaLearnTube-Certificate.jpg",
    desc: "Basic Laravel proficiency quiz certification."
  },
  {
    title: "PHP Basic Quiz",
    issuer: "CareerNinja LearnTube",
    img: "/documents/Vismay-Basic-PHP-Basic-Quiz-CareerNinjaLearnTube-Certificate.jpg",
    desc: "Basic PHP proficiency quiz certification."
  }
];

export function initDocuments() {
  // Resume/CV Toggle
  const showResumeBtn = document.getElementById('show-resume');
  const showCvBtn = document.getElementById('show-cv');
  const docCard = document.getElementById('doc-card');

  if (showResumeBtn && showCvBtn && docCard) {
    showResumeBtn.addEventListener('click', () => {
      docCard.classList.remove('is-flipped');
      showResumeBtn.classList.add('bg-secondary', 'text-white', 'shadow-lg', 'shadow-secondary/20');
      showResumeBtn.classList.remove('text-on-surface-variant', 'hover:bg-white/50');
      showCvBtn.classList.remove('bg-secondary', 'text-white', 'shadow-lg', 'shadow-secondary/20');
      showCvBtn.classList.add('text-on-surface-variant', 'hover:bg-white/50');
    });

    showCvBtn.addEventListener('click', () => {
      docCard.classList.add('is-flipped');
      showCvBtn.classList.add('bg-secondary', 'text-white', 'shadow-lg', 'shadow-secondary/20');
      showCvBtn.classList.remove('text-on-surface-variant', 'hover:bg-white/50');
      showResumeBtn.classList.remove('bg-secondary', 'text-white', 'shadow-lg', 'shadow-secondary/20');
      showResumeBtn.classList.add('text-on-surface-variant', 'hover:bg-white/50');
    });
  }

  // Certificate Slider Injection
  const wrapper = document.getElementById('certificate-wrapper');
  if (wrapper) {
    // Use the certificates array directly
    const loopedCertificates = [...certificates];
    
    loopedCertificates.forEach((cert, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="certificate-slide-item" data-index="${index % certificates.length}">
          <img src="${cert.img}" alt="${cert.title}" referrerPolicy="no-referrer">
          <div class="cert-overlay">
            <p class="text-white text-xs font-black uppercase tracking-widest mb-1 opacity-60">${cert.issuer}</p>
            <h4 class="text-white text-lg font-bold leading-tight">${cert.title}</h4>
          </div>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    // Initialize Swiper
    if (typeof Swiper === 'undefined') {
      console.error('Swiper is not loaded');
      return;
    }
    const certSwiper = new Swiper('.certificate-swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 800,
      watchSlidesProgress: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: '.cert-next',
        prevEl: '.cert-prev',
      },
    });

    // Modal Logic
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalDownload = document.getElementById('modal-download');
    const closeBtn = document.getElementById('close-cert-modal');
    const rotateCw = document.getElementById('rotate-cw');
    const rotateCcw = document.getElementById('rotate-ccw');

    let currentRotation = 0;

    const openModal = (index) => {
      const cert = certificates[index];
      if (!cert) {
        console.error('Certificate not found at index:', index);
        return;
      }
      
      // Reset rotation
      currentRotation = 0;
      modalImg.style.transform = `rotate(${currentRotation}deg)`;
      
      // Set content
      modalImg.src = cert.img;
      modalCaption.textContent = cert.title;
      modalDownload.href = cert.img;
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Use event delegation on the wrapper to handle clicks even on Swiper's cloned slides
    wrapper.addEventListener('click', (e) => {
      const item = e.target.closest('.certificate-slide-item');
      if (item) {
        const index = item.getAttribute('data-index');
        openModal(parseInt(index));
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (rotateCw) {
      rotateCw.addEventListener('click', () => {
        currentRotation += 90;
        modalImg.style.transform = `rotate(${currentRotation}deg)`;
      });
    }

    if (rotateCcw) {
      rotateCcw.addEventListener('click', () => {
        currentRotation -= 90;
        modalImg.style.transform = `rotate(${currentRotation}deg)`;
      });
    }
  }
}
