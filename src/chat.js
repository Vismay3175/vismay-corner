import { getLocalResponse } from './knowledge-base.js';

export function initChat() {
  const chatContainer = document.getElementById('chat-container');
  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatContainer || !chatToggle || !chatClose || !chatForm || !chatInput || !chatMessages) {
    return;
  }

  let lastMessageTime = 0;
  const COOLDOWN_MS = 1000; // Reduced cooldown for local bot

  // Toggle Chat with GSAP Animation
  chatToggle.addEventListener('click', () => {
    if (typeof gsap === 'undefined') {
      chatContainer.classList.toggle('hidden');
      chatContainer.classList.toggle('flex');
      return;
    }
    const isHidden = chatContainer.classList.contains('hidden');
    
    if (isHidden) {
      chatContainer.classList.remove('hidden');
      chatContainer.classList.add('flex');
      
      // Hide the toggle button
      gsap.to(chatToggle, { opacity: 0, scale: 0, duration: 0.3, pointerEvents: 'none' });
      
      // 3D Pop-in Animation
      gsap.fromTo(chatContainer, 
        { 
          opacity: 0, 
          scale: 0.5, 
          y: 100, 
          rotateX: -30,
          transformOrigin: 'bottom right'
        }, 
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.6, 
          ease: 'back.out(1.7)' 
        }
      );

      chatInput.focus();
      if (chatMessages.children.length <= 1) { // Only if empty (notice is child 0)
        startNewSession();
      }
    } else {
      closeChat();
    }
  });

  function closeChat() {
    if (typeof gsap === 'undefined') {
      chatContainer.classList.add('hidden');
      chatContainer.classList.remove('flex');
      return;
    }
    gsap.to(chatContainer, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        chatContainer.classList.add('hidden');
        chatContainer.classList.remove('flex');
      }
    });

    // Show the toggle button again earlier for a smoother feel
    gsap.to(chatToggle, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.5, 
      delay: 0.1,
      ease: 'back.out(1.7)',
      pointerEvents: 'auto' 
    });
  }

  chatClose.addEventListener('click', closeChat);

  // 3D Tilt Effect for Chat Window
  chatContainer.addEventListener('mousemove', (e) => {
    if (typeof gsap === 'undefined') return;
    const rect = chatContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 25;
    const rotateY = (x - centerX) / 25;

    gsap.to(chatContainer, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  // Prevent scroll propagation
  chatContainer.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });

  chatContainer.addEventListener('mouseleave', () => {
    if (typeof gsap === 'undefined') return;
    gsap.to(chatContainer, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  });

  function startNewSession() {
    chatMessages.innerHTML = `
      <div class="p-4 mb-6 bg-surface-container rounded-2xl border border-secondary/10">
        <p class="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Authenticated Professional Assistant</p>
        <p class="text-[11px] text-on-surface-variant leading-relaxed opacity-80">
          I am engineered to provide definitive insights into Vismay Oza's technical architecture, production impact, and elite engineering mastery.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-3 mb-6" id="predefined-questions">
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="Summarize Vismay's key excellence">📋 Executive Summary of Core Mastery</button>
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="What are Vismay's high-impact projects?">🚀 Analyze Production-Level Architectures</button>
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="Tell me about his role at Devstree">💼 Lead Initiatives at Devstree IT Services</button>
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="Write a strategic interview intro">📧 Strategic Professional Introduction</button>
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="Explain his technical vision">💻 Architectural Philosophy & AI Strategy</button>
        <button class="text-left p-3 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm" data-question="How can I connect with Vismay?">📞 Direct Professional Liaison</button>
      </div>
    `;
    
    // Add event listeners to pre-defined questions
    const questionButtons = chatMessages.querySelectorAll('#predefined-questions button');
    questionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const question = button.getAttribute('data-question');
        chatInput.value = question;
        chatForm.dispatchEvent(new Event('submit'));
      });
    });
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Basic Rate Limiting
    const now = Date.now();
    if (now - lastMessageTime < COOLDOWN_MS) {
      return;
    }
    lastMessageTime = now;

    // Input length check
    if (message.length > 500) {
      addMessage("Your message is too long. Please keep it under 500 characters.", 'bot');
      return;
    }

    // Add user message to UI
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingId = addTypingIndicator();

    // Simulate "scanning" delay
    setTimeout(() => {
      removeTypingIndicator(typingId);
      const response = getLocalResponse(message);
      addMessage(response, 'bot');
    }, 1000);
  }

  chatForm.addEventListener('submit', handleSendMessage);

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-5 opacity-0 translate-y-4`;
    
    const innerDiv = document.createElement('div');
    innerDiv.className = `max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
      sender === 'user' 
        ? 'bg-rose-500 text-white rounded-tr-none shadow-rose-500/20' 
        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
    }`;
    
    // Clean text: Remove markdown characters like ** and *
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    messageDiv.appendChild(innerDiv);
    chatMessages.appendChild(messageDiv);
    
    // Animate message entry
    if (typeof gsap !== 'undefined') {
      gsap.to(messageDiv, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }

    if (sender === 'bot') {
      // ChatGPT-like typing effect
      let charIndex = 0;
      innerDiv.innerHTML = '';
      
      function typeChar() {
        if (charIndex < cleanText.length) {
          const char = cleanText.charAt(charIndex);
          if (char === '\n') {
            innerDiv.innerHTML += '<br>';
          } else {
            innerDiv.innerHTML += char;
          }
          charIndex++;
          chatMessages.scrollTop = chatMessages.scrollHeight;
          setTimeout(typeChar, Math.random() * 15 + 5); // Randomized for realism
        }
      }
      typeChar();
    } else {
      innerDiv.innerHTML = cleanText.replace(/\n/g, '<br>');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'flex justify-start mb-4';
    typingDiv.innerHTML = `
      <div class="bg-white text-on-surface px-4 py-3 rounded-2xl rounded-tl-none flex items-center shadow-sm border border-outline-variant/30">
        <div class="flex gap-1.5">
          <span class="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce"></span>
          <span class="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span class="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }
}
