// Theme toggling functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Function to set theme
function setTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('darkMode', isDark);
    
    // Update meta theme color
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        isDark ? '#0f172a' : '#ffffff'
    );
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    setTheme(isDark);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    // Add meta theme color tag if it doesn't exist
    if (!document.querySelector('meta[name="theme-color"]')) {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#0f172a'; // Dark mode color
        document.head.appendChild(meta);
    }

    // Set dark mode as default if no theme is saved
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === null) {
        setTheme(true); // Force dark mode
    } else {
        setTheme(savedTheme === 'true');
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
        setTheme(e.matches);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Enhanced intersection observer with different animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add specific animations for different sections
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
            
            if (entry.target.classList.contains('stat-item')) {
                const countElement = entry.target.querySelector('h3');
                const targetNumber = parseInt(countElement.textContent);
                animateNumber(countElement, targetNumber);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section, .skill-card, .project-card, .stat-item').forEach(element => {
    observer.observe(element);
});

// Number animation function
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// Mobile menu toggle
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
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

// Apply typing animation to hero subtitle
const heroSubtitle = document.querySelector('.hero-content h2');
typeWriter(heroSubtitle, 'Frontend Developer');

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Skill cards animation
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            entry.target.style.animationDelay = `${index * 100}ms`;
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe each skill card
skillCards.forEach(card => {
    skillObserver.observe(card);
});

// Enhanced hover effect for skill icons
skillCards.forEach(card => {
    const icon = card.querySelector('i');
    
    card.addEventListener('mouseenter', () => {
        icon.style.animation = 'none'; // Reset animation
        requestAnimationFrame(() => {
            icon.style.animation = 'iconBounce 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.animation = 'none';
    });
});

// Add animation delay for service tags
document.querySelectorAll('.service-features').forEach(list => {
    list.querySelectorAll('li').forEach((tag, index) => {
        tag.style.setProperty('--tag-index', index);
    });
}); 