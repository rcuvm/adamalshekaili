// script.js
class RomanticExperience {
  constructor() {
    this.messages = [
      "On a path filled with uncertainty, you stood beside me — not only as my love, but as my strength.",
      "You believed in me when I was full of doubt. You gave me the courage to switch paths...",
      "This choice wasn't easy… But you made it worth every step.",
      "This website is a simple gift, but behind every word is a heart forever grateful."
    ];
    this.currentMessage = 0;
    this.audio = document.getElementById('background-audio');
    this.heart = document.querySelector('.heart');
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.typewriterEffect();
    this.setupAudio();
    this.addHeartInteraction();
    this.setSpecialDate();
    this.addParallaxEffect();
    this.registerServiceWorker();
    this.setupVisibilityChange();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('h1, p, .heart').forEach(el => {
      observer.observe(el);
    });
  }

  typewriterEffect() {
    const element = document.getElementById('main-message');
    const fullText = this.messages.join('<br><br>');
    let i = 0;
    
    const type = () => {
      if (i < fullText.length) {
        element.innerHTML = fullText.substring(0, i + 1);
        i++;
        const speed = Math.random() * 50 + 50; // Variable typing speed
        setTimeout(type, speed);
      } else {
        this.startMessageCycling();
      }
    };
    
    type();
  }

  startMessageCycling() {
    setInterval(() => {
      this.currentMessage = (this.currentMessage + 1) % this.messages.length;
      this.animateTextChange();
    }, 8000);
  }

  animateTextChange() {
    const element = document.getElementById('main-message');
    element.style.animation = 'fadeOut 0.5s forwards';
    
    setTimeout(() => {
      element.innerHTML = this.messages[this.currentMessage];
      element.style.animation = 'fadeIn 0.5s forwards';
    }, 500);
  }

  setupAudio() {
    // Enable audio on first interaction (compliance with autoplay policies)
    document.body.addEventListener('click', () => {
      if (this.audio.paused) {
        this.audio.play().catch(e => console.log('Audio play prevented:', e));
      }
    }, { once: true });

    // Volume control
    this.audio.volume = 0.3;
  }

  addHeartInteraction() {
    let clickCount = 0;
    
    this.heart.addEventListener('click', () => {
      clickCount++;
      
      // Create floating hearts
      if (clickCount % 3 === 0) {
        this.createFloatingHearts();
      }
      
      // Heart animation
      this.heart.style.transform = 'scale(1.3)';
      setTimeout(() => {
        this.heart.style.transform = 'scale(1)';
      }, 300);
      
      // Change color on every click
      const hue = Math.random() * 60 + 330; // Pink/purple range
      this.heart.style.color = `hsl(${hue}, 100%, 70%)`;
    });
  }

  createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤';
      heart.classList.add('floating-heart');
      
      // Random properties
      const size = Math.random() * 20 + 10;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      const xPos = Math.random() * 100;
      
      heart.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${xPos}%;
        top: 80%;
        opacity: ${Math.random() * 0.5 + 0.5};
        animation: float-up ${duration}s ease-in ${delay}s forwards;
        color: hsl(${Math.random() * 60 + 330}, 100%, 70%);
      `;
      
      document.body.appendChild(heart);
      
      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, (duration + delay) * 1000);
    }
  }

  setSpecialDate() {
    const dateElement = document.getElementById('special-date');
    const eventDate = new Date('2025-08-24');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = eventDate.toLocaleDateString('en-US', options);
    
    // Update with days count
    setInterval(() => {
      const now = new Date();
      const diff = now - eventDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      dateElement.textContent = `${eventDate.toLocaleDateString('en-US', options)} • ${days} days together`;
    }, 1000 * 60 * 60); // Update hourly
  }

  addParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.querySelector('.overlay').style.backgroundPositionY = `${scrollY * 0.5}px`;
    });
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  setupVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.audio.pause();
      } else {
        this.audio.play().catch(e => console.log('Audio resume prevented:', e));
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RomanticExperience();
  
  // Add CSS for dynamic animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
    @keyframes float-up {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    .animate {
      animation: fadeIn 1s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
});
