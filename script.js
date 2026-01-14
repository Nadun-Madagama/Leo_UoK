// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Gallery Modal
    setupGalleryModal();

    // Form submissions
    setupFormSubmissions();
});

// Gallery Modal Functionality
function setupGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!modal) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            if (img) {
                modalImage.src = img.src || img.getAttribute('data-src') || '';
                modalImage.alt = img.alt || '';
                modalCaption.textContent = img.alt || '';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Form Submissions
function setupFormSubmissions() {
    // Join Form
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Store in localStorage (in a real scenario, this would be sent to a server)
            const applications = JSON.parse(localStorage.getItem('joinApplications') || '[]');
            applications.push({
                ...data,
                date: new Date().toISOString()
            });
            localStorage.setItem('joinApplications', JSON.stringify(applications));

            // Show success message
            const messageDiv = document.getElementById('formMessage');
            if (messageDiv) {
                messageDiv.textContent = 'Thank you for your interest! We will contact you soon.';
                messageDiv.className = 'form-message success';
                joinForm.reset();
                
                setTimeout(() => {
                    messageDiv.className = 'form-message';
                }, 5000);
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Store in localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                ...data,
                date: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            const messageDiv = document.getElementById('contactFormMessage');
            if (messageDiv) {
                messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
                messageDiv.className = 'form-message success';
                contactForm.reset();
                
                setTimeout(() => {
                    messageDiv.className = 'form-message';
                }, 5000);
            }
        });
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.avenue-card, .board-card, .project-card, .benefit-card, .quick-link-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
