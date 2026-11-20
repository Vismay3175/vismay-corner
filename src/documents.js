
// Weaker quiz/bootcamp certificates were removed from the showcase; their images stay in /public/documents.
const certificates = [
  {
    title: "Laravel Public Skills Test",
    issuer: "TestDome",
    img: "/documents/Vismay-Oza-Laravel-TestDome-Certificate.webp",
    desc: "TestDome public skills test for the Laravel framework."
  },
  {
    title: "Google Cloud AI Workshop – ADK, A2A, MCP & RAG",
    issuer: "Google Developer Groups",
    img: "/documents/Vismay-Oza-GDG-Gandhinagar-Workshop.webp",
    desc: "Google Developer Groups Gandhinagar workshop on ADK, A2A, MCP and RAG on Google Cloud."
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM",
    img: "/documents/data-analysis-using-python.webp",
    desc: "Data analysis techniques using Python libraries."
  },
  {
    title: "Explore Emerging Tech",
    issuer: "IBM",
    img: "/documents/explore-emerging-tech.webp",
    desc: "Exploration of emerging technologies and their applications."
  }
];

const DOCS = {
  resume: {
    file: '/pdf_files/Vismay-Oza-Resume.pdf',
    name: 'resume',
    desc: 'My experience, projects and skills on a single page. Start here if you only have a minute.',
    inside: ['Summary', 'Skills', 'Experience', 'Key projects', 'Education'],
  },
  cv: {
    file: '/pdf_files/Vismay-Oza-CV.pdf',
    name: 'CV',
    desc: 'Every project I have worked on, what I built in each one and how it turned out. Worth a read before a technical interview.',
    inside: ['Career highlights', 'Full skill map', 'Responsibilities', 'Key projects', 'My contributions'],
  },
};

// Resume / CV picker: swaps the front paper, details and links.
function initDocDesk() {
  const stage = document.getElementById('doc-stage');
  const options = document.querySelectorAll('.doc-option');
  if (!stage || !options.length) return;

  const desc = document.getElementById('doc-desc');
  const inside = document.getElementById('doc-inside');
  const view = document.getElementById('doc-view');
  const download = document.getElementById('doc-download');
  const downloadName = document.getElementById('doc-download-name');
  const detail = document.getElementById('doc-detail');

  const select = (key) => {
    const doc = DOCS[key];
    if (!doc || stage.dataset.active === key) return;
    stage.dataset.active = key;
    options.forEach((o) => o.setAttribute('aria-pressed', String(o.dataset.doc === key)));
    detail?.classList.remove('is-swapping');
    void detail?.offsetWidth; // restart fade animation
    detail?.classList.add('is-swapping');
    if (desc) desc.textContent = doc.desc;
    if (inside) inside.innerHTML = doc.inside.map((i) => `<li>${i}</li>`).join('');
    if (view) view.href = doc.file;
    if (download) download.href = doc.file;
    if (downloadName) downloadName.textContent = doc.name;
  };

  options.forEach((o) => o.addEventListener('click', () => select(o.dataset.doc)));
}

export function initDocuments() {
  initDocDesk();

  // Certificate Slider Injection
  const wrapper = document.getElementById('certificate-wrapper');
  if (wrapper) {
    // Use the certificates array directly
    // Duplicate the short list so Swiper loop mode has enough slides
    const loopedCertificates = [...certificates, ...certificates];
    
    loopedCertificates.forEach((cert, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="certificate-slide-item" data-index="${index % certificates.length}">
          <img src="${cert.img}" alt="${cert.title}" referrerPolicy="no-referrer">
          <div class="cert-overlay">
            <p class="text-white text-xs font-black uppercase tracking-widest mb-1 opacity-80">${cert.issuer}</p>
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
