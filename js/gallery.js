// ========================================
// KAFFEE.BAR - Gallery & Lightbox
// Beautiful Image Gallery with Lightbox
// ========================================

(function() {
    'use strict';

    class Gallery {
        constructor() {
            this.galleryItems = document.querySelectorAll('.gallery-item');
            this.lightbox = document.getElementById('lightbox');
            this.lightboxImg = this.lightbox ? this.lightbox.querySelector('img') : null;
            this.closeBtn = document.querySelector('.lightbox-close');
            this.prevBtn = document.querySelector('.lightbox-prev');
            this.nextBtn = document.querySelector('.lightbox-next');
            this.currentIndex = 0;
            this.images = [];

            this.init();
        }

        init() {
            if (!this.lightbox) return;

            this.collectImages();
            this.setupEventListeners();
            this.setupKeyboardNavigation();
            this.setupTouchGestures();
        }

        collectImages() {
            this.galleryItems.forEach((item, index) => {
                const img = item.querySelector('img');
                if (img) {
                    this.images.push({
                        src: img.src,
                        alt: img.alt,
                        index: index
                    });
                }
            });
        }

        setupEventListeners() {
            // Gallery item clicks
            this.galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.openLightbox(index);
                });

                // Add keyboard support for gallery items
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openLightbox(index);
                    }
                });
            });

            // Lightbox controls
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeLightbox());
            }

            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevImage());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextImage());
            }

            // Click outside to close
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;

                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            });
        }

        setupTouchGestures() {
            let touchStartX = 0;
            let touchEndX = 0;

            this.lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.lightbox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });
        }

        handleSwipe(startX, endX) {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    this.nextImage();
                } else {
                    // Swipe right - previous image
                    this.prevImage();
                }
            }
        }

        openLightbox(index) {
            this.currentIndex = index;
            this.updateLightboxImage();
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Preload adjacent images
            this.preloadAdjacentImages();

            // Focus close button for accessibility
            setTimeout(() => {
                if (this.closeBtn) {
                    this.closeBtn.focus();
                }
            }, 100);
        }

        closeLightbox() {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';

            // Return focus to the gallery item
            const currentItem = this.galleryItems[this.currentIndex];
            if (currentItem) {
                currentItem.focus();
            }
        }

        updateLightboxImage() {
            if (!this.lightboxImg) return;

            const currentImage = this.images[this.currentIndex];

            // Fade out
            this.lightboxImg.style.opacity = '0';

            setTimeout(() => {
                this.lightboxImg.src = currentImage.src;
                this.lightboxImg.alt = currentImage.alt;

                // Fade in
                this.lightboxImg.style.transition = 'opacity 0.3s ease';
                this.lightboxImg.style.opacity = '1';
            }, 150);

            // Update navigation button states
            this.updateNavigationState();
        }

        updateNavigationState() {
            // Disable/enable navigation buttons based on position
            if (this.prevBtn) {
                this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
                this.prevBtn.style.cursor = this.currentIndex === 0 ? 'default' : 'pointer';
            }

            if (this.nextBtn) {
                const isLast = this.currentIndex === this.images.length - 1;
                this.nextBtn.style.opacity = isLast ? '0.5' : '1';
                this.nextBtn.style.cursor = isLast ? 'default' : 'pointer';
            }
        }

        prevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateLightboxImage();
            }
        }

        nextImage() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
                this.updateLightboxImage();
            }
        }

        preloadAdjacentImages() {
            // Preload previous image
            if (this.currentIndex > 0) {
                const prevImg = new Image();
                prevImg.src = this.images[this.currentIndex - 1].src;
            }

            // Preload next image
            if (this.currentIndex < this.images.length - 1) {
                const nextImg = new Image();
                nextImg.src = this.images[this.currentIndex + 1].src;
            }
        }
    }

    // ========================================
    // IMAGE LOADING
    // ========================================
    class ImageLoader {
        static init() {
            const images = document.querySelectorAll('.gallery-item img');

            images.forEach(img => {
                if (img.complete) {
                    img.parentElement.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => {
                        img.parentElement.classList.add('loaded');
                    });

                    img.addEventListener('error', () => {
                        img.parentElement.classList.add('error');
                        console.error(`Failed to load image: ${img.src}`);
                    });
                }
            });
        }
    }

    // ========================================
    // GALLERY ANIMATIONS
    // ========================================
    class GalleryAnimations {
        static init() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'scale(1)';
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
                    observer.observe(item);
                });
            }
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        new Gallery();
        ImageLoader.init();
        GalleryAnimations.init();

        console.log('📸 Gallery initialized successfully!');
    });

})();