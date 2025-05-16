
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables and elements
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    
    // Header scroll effect
    function handleScroll() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('menu-open');
      } else {
        mobileMenu.classList.add('open');
        mobileMenuBtn.classList.add('menu-open');
      }
    }
    
    // Close mobile menu when clicking a link
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      mobileMenuBtn.classList.remove('menu-open');
    }
    
    // Form submission
    function handleFormSubmit(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const formEntries = Object.fromEntries(formData.entries());
      
      // Simulate form submission
      setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.classList.remove('hidden');
        
        // Optional: Log form data
        console.log('Form submitted with data:', formEntries);
      }, 1000);
    }
    
    // Reset form after success
    function resetForm() {
      contactForm.reset();
      contactForm.style.display = 'grid';
      formSuccess.classList.add('hidden');
    }
    
    // Show toast notification
    function showToast(message, type = 'info', duration = 3000) {
      toastMessage.textContent = message;
      toast.className = 'toast';
      
      if (type) {
        toast.classList.add(type);
      }
      
      toast.classList.remove('hidden');
      
      setTimeout(() => {
        toast.classList.add('hidden');
      }, duration);
    }
    
    // Add fade-in animations to elements when they come into view
    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-element');
          observer.unobserve(entry.target);
        }
      });
    }
    
    // Set up intersection observer for animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Target elements for animations
    const animateElements = document.querySelectorAll('.section-header, .about-text, .step-card, .feature-card, .student-image-container, .benefit-card');
    
    animateElements.forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', resetForm);
    }
    
    // Initialize with current scroll position
    handleScroll();
    
    // Custom CSS animation class
    const fadeInElementStyle = document.createElement('style');
    fadeInElementStyle.textContent = `
      .opacity-0 {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .fade-in-element {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(fadeInElementStyle);
  });