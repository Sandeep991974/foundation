// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');

// ===== Theme Toggle =====
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    if (isDarkMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// ===== Mobile Menu Toggle =====
let isMenuOpen = false;

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('active', isMenuOpen);
    
    if (isMenuOpen) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// ===== Smooth Scroll =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Navbar Background on Scroll =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== Form Submissions =====
const volunteerForm = document.getElementById('volunteerForm');
const volunteerSuccess = document.getElementById('volunteerSuccess');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

function showSuccess(form, successMessage) {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    setTimeout(() => {
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
        form.reset();
    }, 3000);
}

// Volunteer Form Submission
volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('volName').value;
    const email = document.getElementById('volEmail').value;
    const phone = document.getElementById('volPhone').value;
    
    // Simple validation
    if (name && email && phone) {
        showSuccess(volunteerForm, volunteerSuccess);
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // Simple validation
    if (name && email && message) {
        showSuccess(contactForm, contactSuccess);
    }
});

// ===== Close Mobile Menu on Outside Click =====
document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu();
    }
});

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.program-card, .info-card, .contact-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal elements
function initRevealElements() {
    const reveals = document.querySelectorAll('.program-card, .info-card, .contact-card');
    
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadThemePreference();
    initRevealElements();
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ===== Smooth Scroll for Hero Button =====
const heroBtn = document.querySelector('.btn-primary');
if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('volunteer');
    });
}

// ===== Typing Effect for Hero Title (Optional) =====
function typeEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when in view
function animateStatsOnScroll() {
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        const statPosition = statNumber.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statPosition < windowHeight - 100 && !statNumber.dataset.animated) {
            statNumber.dataset.animated = 'true';
            animateCounter(statNumber, 500);
        }
    }
}

window.addEventListener('scroll', animateStatsOnScroll);

// ===== Form Input Animation =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ===== Back to Top Button (Optional Enhancement) =====
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTop();

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
});

// ===== Console Welcome Message =====
console.log('%c🪶 NayePankh Foundation', 'font-size: 24px; font-weight: bold; color: #14b8a6;');
console.log('%cEmpowering Lives Through Education', 'font-size: 14px; color: #64748b;');
const hero = document.querySelector('.hero');

const heroImages = [
    'images/slide1.jpeg',
    'images/slide2.jpeg',
    'images/slide3.jpeg',
    
];

let currentSlide = 0;

function changeHeroBackground() {

    hero.style.setProperty(
        '--hero-bg',
        `url(${heroImages[currentSlide]})`
    );

    hero.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),
        url(${heroImages[currentSlide]})`;

    currentSlide++;

    if(currentSlide >= heroImages.length){
        currentSlide = 0;
    }
}

changeHeroBackground();

setInterval(changeHeroBackground,4000);