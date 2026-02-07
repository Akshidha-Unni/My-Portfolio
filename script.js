// ========================================
// Portfolio Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initProjectFilters();
    initProjectDetails();
    initAccordion();
    initContactForm();
    initAnimations();
    initStatCounters();
});

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    const backToTop = document.querySelector('.back-to-top');

    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Project Filters
// ========================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// Project Details (Expand/Collapse)
// ========================================
function initProjectDetails() {
    const toggleButtons = document.querySelectorAll('.details-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = button.nextElementSibling;
            const isOpen = content.classList.contains('open');

            // Close all other open details
            document.querySelectorAll('.details-content.open').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('open');
                    openContent.previousElementSibling.classList.remove('active');
                    openContent.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            content.classList.toggle('open');
            button.classList.toggle('active');
            button.setAttribute('aria-expanded', !isOpen);
        });
    });
}

// ========================================
// Accordion (What I Do)
// ========================================
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.accordion-item.active').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('active');
                    openItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('active');
            header.setAttribute('aria-expanded', !isActive);
        });
    });
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Notification helper
function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease'
    });
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ========================================
// Scroll Animations
// ========================================
function initAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .story-block, .timeline-item, ' +
        '.experience-card, .project-card, .achievement-card, .contact-item, .contact-form'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Stat Counters
// ========================================
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed
    const duration = 1500; // ms
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ========================================
// Typing Effect (Optional Enhancement)
// ========================================
function initTypingEffect() {
    const titles = ['Software Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new title
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Uncomment to enable typing effect
    // type();
}

// ========================================
// Dark Mode Toggle (Optional)
// ========================================
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) return;
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// ========================================
// Preloader (Optional)
// ========================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// ========================================
// Parallax Effect (Optional)
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.5;
            const yPos = -(window.scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Console Easter Egg
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cWant to connect? Reach out!', 'font-size: 14px; color: #64748b;');
