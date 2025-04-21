// js/modules/scroll-effects.js
import ScrollReveal from 'scrollreveal';

export function initScrollEffects() {
    // Configuração base
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });
    
    // Elementos específicos
    sr.reveal('.section-title', { 
        origin: 'top',
        delay: 300
    });
    
    sr.reveal('.product-card', { 
        interval: 200,
        scale: 0.9
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
            header.classList.add('scrolled-down');
            header.classList.remove('scrolled-up');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
            header.classList.remove('scrolled-down');
            header.classList.add('scrolled-up');
        }
        
        lastScroll = currentScroll;
    });
}