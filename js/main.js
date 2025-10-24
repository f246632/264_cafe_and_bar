// ========================================
// KAFFEE.BAR - Main JavaScript
// Modern, Performant, Accessible
// ========================================

(function() {
    'use strict';

    // Utility Functions
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // ========================================
    // NAVIGATION
    // ========================================
    class Navigation {
        constructor() {
            this.navbar = $('#navbar');
            this.mobileToggle = $('.mobile-menu-toggle');
            this.navMenu = $('.nav-menu');
            this.navLinks = $$('.nav-link');

            this.init();
        }

        init() {
            this.setupScrollEffect();
            this.setupMobileMenu();
            this.setupSmoothScroll();
            this.setupActiveLinks();
        }

        setupScrollEffect() {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                // Add shadow on scroll
                if (currentScroll > 100) {
                    this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                } else {
                    this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }

                lastScroll = currentScroll;
            }, { passive: true });
        }

        setupMobileMenu() {
            this.mobileToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.mobileToggle.classList.toggle('active');
                document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    this.navMenu.classList.remove('active');
                    this.mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        setupSmoothScroll() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = $(targetId);

                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        setupActiveLinks() {
            const sections = $$('section[id]');

            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset + 150;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        this.navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { passive: true });
        }
    }

    // ========================================
    // ANIMATIONS ON SCROLL
    // ========================================
    class ScrollAnimations {
        constructor() {
            this.observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.setupObserver();
            }
        }

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, this.observerOptions);

            // Animate elements
            const animateElements = $$('.menu-item, .feature-item, .review-card, .gallery-item');
            animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(el);
            });
        }
    }

    // ========================================
    // CONTACT FORM
    // ========================================
    class ContactForm {
        constructor() {
            this.form = $('#contactForm');
            this.formMessage = $('#formMessage');

            if (this.form) {
                this.init();
            }
        }

        init() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        handleSubmit() {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Validate
            if (!this.validate(data)) {
                this.showMessage('Bitte fülle alle erforderlichen Felder aus.', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            this.showMessage('Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.', 'success');
            this.form.reset();

            // In production, you would send this to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     this.showMessage('Nachricht erfolgreich gesendet!', 'success');
            //     this.form.reset();
            // })
            // .catch(error => {
            //     this.showMessage('Fehler beim Senden. Bitte versuche es später erneut.', 'error');
            // });
        }

        validate(data) {
            return data.name && data.email && data.message && this.isValidEmail(data.email);
        }

        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        showMessage(message, type) {
            this.formMessage.textContent = message;
            this.formMessage.className = `form-message ${type}`;

            setTimeout(() => {
                this.formMessage.className = 'form-message';
            }, 5000);
        }
    }

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    class LazyLoader {
        constructor() {
            this.images = $$('img[loading="lazy"]');
            this.init();
        }

        init() {
            if ('loading' in HTMLImageElement.prototype) {
                // Browser supports native lazy loading
                return;
            }

            // Fallback for browsers without native lazy loading
            if ('IntersectionObserver' in window) {
                this.setupObserver();
            } else {
                this.loadAllImages();
            }
        }

        setupObserver() {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }

        loadAllImages() {
            this.images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }

    // ========================================
    // SCROLL TO TOP
    // ========================================
    class ScrollToTop {
        constructor() {
            this.createButton();
        }

        createButton() {
            const button = document.createElement('button');
            button.innerHTML = '↑';
            button.className = 'scroll-to-top';
            button.setAttribute('aria-label', 'Scroll to top');

            // Styles
            Object.assign(button.style, {
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                opacity: '0',
                visibility: 'hidden',
                transition: 'all 0.3s ease',
                zIndex: '999',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
            });

            document.body.appendChild(button);

            // Show/hide on scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                }
            }, { passive: true });

            // Click handler
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Hover effect
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = 'var(--secondary-color)';
                button.style.transform = 'translateY(-3px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'var(--primary-color)';
                button.style.transform = 'translateY(0)';
            });
        }
    }

    // ========================================
    // PERFORMANCE MONITORING
    // ========================================
    class Performance {
        static monitor() {
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = window.performance.timing;
                        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                        console.log(`Page Load Time: ${pageLoadTime}ms`);
                    }, 0);
                });
            }
        }
    }

    // ========================================
    // ACCESSIBILITY
    // ========================================
    class Accessibility {
        static init() {
            // Keyboard navigation for interactive elements
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close mobile menu
                    const navMenu = $('.nav-menu');
                    const mobileToggle = $('.mobile-menu-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    // Close lightbox
                    const lightbox = $('#lightbox');
                    if (lightbox && lightbox.classList.contains('active')) {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });

            // Focus visible for keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all modules
        new Navigation();
        new ScrollAnimations();
        new ContactForm();
        new LazyLoader();
        new ScrollToTop();

        // Initialize utilities
        Performance.monitor();
        Accessibility.init();

        // Loading complete
        document.body.classList.add('loaded');

        console.log('🎨 KAFFEE.BAR website loaded successfully!');
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden
            console.log('Page hidden');
        } else {
            // Page is visible
            console.log('Page visible');
        }
    });

})();