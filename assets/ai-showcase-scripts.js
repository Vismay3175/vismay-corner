// AI Showcase Section Script
document.addEventListener('DOMContentLoaded', function() {
    initAIShowcaseSection();
});

function initAIShowcaseSection() {
    const aiSection = document.getElementById('ai-projects');
    const introOverlay = document.getElementById('aiIntroOverlay');
    const projectsContent = document.getElementById('aiProjectsContent');
    
    // Check if elements exist before proceeding
    if (!aiSection || !introOverlay || !projectsContent) {
        console.warn('AI Showcase elements not found');
        return;
    }
    
    // Create intersection observer for the AI section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animation-triggered')) {
                entry.target.classList.add('animation-triggered');
                startAIIntroAnimation();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sectionObserver.observe(aiSection);
    
    function startAIIntroAnimation() {
        // Show intro overlay
        introOverlay.classList.add('active');
        
        // Initialize intro animation effects
        initIntroEffects();
        
        // Auto-transition to projects after 4 seconds
        setTimeout(() => {
            transitionToProjects();
        }, 4000);
    }
    
    function initIntroEffects() {
        const loadingStatus = document.querySelector('.ai-loading-status');
        
        // Check if loading status element exists
        if (!loadingStatus) {
            console.warn('Loading status element not found');
            return;
        }
        
        // Update loading status text
        const statusMessages = [
            'Initializing Neural Networks...',
            'Loading AI Models...',
            'Connecting to Data Sources...',
            'Ready to Showcase!'
        ];
        
        let messageIndex = 0;
        const statusInterval = setInterval(() => {
            if (messageIndex < statusMessages.length - 1) {
                loadingStatus.textContent = statusMessages[messageIndex];
                messageIndex++;
            } else {
                loadingStatus.textContent = statusMessages[messageIndex];
                clearInterval(statusInterval);
            }
        }, 1000);
        
        // Add interactive hover effects to brain
        const brainCore = document.querySelector('.ai-brain-core');
        const brainContainer = document.querySelector('.ai-brain-wrapper');
        
        if (brainContainer && brainCore) {
            brainContainer.addEventListener('mouseenter', function() {
                brainCore.style.animationDuration = '1s';
                document.querySelectorAll('.ai-neural-pulse').forEach(pulse => {
                    pulse.style.animationDuration = '0.5s';
                });
            });
            
            brainContainer.addEventListener('mouseleave', function() {
                brainCore.style.animationDuration = '4s';
                document.querySelectorAll('.ai-neural-pulse').forEach(pulse => {
                    pulse.style.animationDuration = '2s';
                });
            });
        }
        
        // Add mouse tracking for enhanced interactivity (only on desktop)
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        
        // Add dynamic particle generation
        createDynamicParticles();
    }
    
    function handleMouseMove(e) {
        if (introOverlay.classList.contains('active') && !introOverlay.classList.contains('fade-out')) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle parallax effect for grid lines
            const gridLines = document.querySelectorAll('.ai-grid-line');
            gridLines.forEach((line, index) => {
                const speed = (index % 2 === 0) ? 0.5 : -0.5;
                const translateX = (mouseX - 0.5) * speed * 10;
                const translateY = (mouseY - 0.5) * speed * 10;
                line.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
            
            // Interactive brain rotation
            const brainContainer = document.querySelector('.ai-brain-wrapper');
            if (brainContainer) {
                const rotateX = (mouseY - 0.5) * 10;
                const rotateY = (mouseX - 0.5) * 10;
                brainContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        }
    }
    
    function transitionToProjects() {
        // Fade out intro
        introOverlay.classList.add('fade-out');
        
        // Show projects content after transition
        setTimeout(() => {
            introOverlay.classList.remove('active');
            projectsContent.classList.add('show');
            
            // Animate project cards with staggered delays
            animateProjectCards();
            
            // Remove mouse move listener for intro
            if (window.innerWidth > 768) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
            
        }, 1500);
    }
    
    function animateProjectCards() {
        const cards = document.querySelectorAll('.ai-project-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
                
                // Add enhanced hover effects (only on desktop)
                if (window.innerWidth > 768) {
                    card.addEventListener('mouseenter', function() {
                        this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    });
                }
                
            }, index * 200);
        });
    }
    
    // Add dynamic particle generation
    function createDynamicParticles() {
        const particlesContainer = document.querySelector('.ai-code-particles');
        if (!particlesContainer) return;
        
        const particles = ['⚡', '🔥', '✨', '💫', '🌟', '⭐', '💎', '🚀'];
        
        const particleInterval = setInterval(() => {
            if (introOverlay.classList.contains('active') && !introOverlay.classList.contains('fade-out')) {
                const particle = document.createElement('span');
                particle.className = 'dynamic-particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 10 + 10}px;
                    opacity: 0;
                    animation: ai-particleFade 3s ease-out forwards;
                    pointer-events: none;
                `;
                
                particlesContainer.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 3000);
            } else {
                clearInterval(particleInterval);
            }
        }, window.innerWidth > 768 ? 2000 : 4000); // Less frequent on mobile
    }
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            if (introOverlay.classList.contains('active') && !introOverlay.classList.contains('fade-out')) {
                e.preventDefault();
                transitionToProjects();
            }
        }
    });
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate positions if needed
            const brainWrapper = document.querySelector('.ai-brain-wrapper');
            if (brainWrapper) {
                brainWrapper.style.transform = '';
            }
        }, 100);
    });
}

// Add CSS for dynamic particles
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
    @keyframes ai-particleFade {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(dynamicStyle);

// Performance optimization for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
    const reducedMotionStyle = document.createElement('style');
    reducedMotionStyle.textContent = `
        .reduced-motion * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
        }
        .reduced-motion .ai-glitch-text,
        .reduced-motion .ai-glitch-text::before,
        .reduced-motion .ai-glitch-text::after {
            animation: none !important;
        }
    `;
    document.head.appendChild(reducedMotionStyle);
}

// Smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Optimize performance on mobile
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const mobileOptimizationStyle = document.createElement('style');
    mobileOptimizationStyle.textContent = `
        .ai-code-particle {
            animation-duration: 12s !important;
        }
        .ai-neural-pulse {
            animation-duration: 3s !important;
        }
        .ai-ring {
            animation-duration: 15s !important;
        }
    `;
    document.head.appendChild(mobileOptimizationStyle);
}