// ===== Configuration =====
// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const WHATSAPP_NUMBER = '918431813216';

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Form Validation =====
function validateForm(formData) {
    const errors = [];

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        errors.push('Please enter a valid 10-digit Indian phone number');
    }

    // Age validation
    if (!formData.age || formData.age < 1 || formData.age > 120) {
        errors.push('Please enter a valid age');
    }

    // Email validation (optional but if provided, must be valid)
    if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }
    }

    // Date validation
    if (!formData.date) {
        errors.push('Please select a preferred date');
    } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.push('Please select a future date');
        }
    }

    // Time validation
    if (!formData.time) {
        errors.push('Please select a preferred time');
    }

    // Service validation
    if (!formData.service) {
        errors.push('Please select a service');
    }

    return errors;
}

// ===== Google Sheets Integration =====
async function saveToGoogleSheets(formData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                age: formData.age,
                email: formData.email || 'N/A',
                date: formData.date,
                time: formData.time,
                service: formData.service,
                message: formData.message || 'N/A',
                timestamp: new Date().toISOString()
            })
        });

        // Note: With no-cors mode, we can't read the response
        // We'll assume success if no error is thrown
        return { success: true };
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        // Even if Google Sheets fails, we'll continue with WhatsApp
        return { success: false, error: error.message };
    }
}

// ===== WhatsApp Integration =====
function sendToWhatsApp(formData) {
    const message = `
🏥 *New Appointment Booking*

👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
🎂 *Age:* ${formData.age}
📧 *Email:* ${formData.email || 'Not provided'}

📅 *Preferred Date:* ${formData.date}
🕐 *Preferred Time:* ${formData.time}
🎯 *Service:* ${formData.service}

💬 *Additional Information:*
${formData.message || 'None'}

---
Sent from DebanjaleeDietClinic.com
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

// ===== Form Submission =====
const bookingForm = document.getElementById('bookingForm');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const successMessage = document.getElementById('successMessage');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        age: document.getElementById('age').value,
        email: document.getElementById('email').value.trim(),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    bookingForm.querySelector('.btn-submit').disabled = true;

    try {
        // Save to Google Sheets (if configured)
        if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            await saveToGoogleSheets(formData);
        }

        // Wait a moment for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Send to WhatsApp
        sendToWhatsApp(formData);

        // Show success message
        bookingForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your booking. Please try again or contact us directly via WhatsApp.');

        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        bookingForm.querySelector('.btn-submit').disabled = false;
    }
});

// ===== Reset Form =====
function resetForm() {
    bookingForm.reset();
    bookingForm.style.display = 'flex';
    successMessage.style.display = 'none';
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    bookingForm.querySelector('.btn-submit').disabled = false;
}

// Make resetForm available globally
window.resetForm = resetForm;

// ===== Set minimum date for booking =====
const dateInput = document.getElementById('date');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split('T')[0];
dateInput.setAttribute('min', minDate);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .info-card, .benefit-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== Dynamic Image Placeholders =====
// Generate gradient backgrounds for image placeholders
function generateGradient(seed) {
    const hue1 = (seed * 137.508) % 360;
    const hue2 = (hue1 + 60) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 50%) 100%)`;
}

// Apply gradients to image containers
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.getElementById('heroImageMain');
    const aboutImage = document.getElementById('aboutImageWrapper');

    if (heroImage) {
        heroImage.style.background = generateGradient(1);
    }

    if (aboutImage) {
        aboutImage.style.background = generateGradient(2);
    }
});

// ===== Console Welcome Message =====
console.log('%c🥗 Debanjalee Diet Clinic', 'color: #10b981; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to our website! For bookings, please use the form or contact us via WhatsApp.', 'color: #6b7280; font-size: 14px;');
console.log('%c📞 Phone: +91 84318 13216', 'color: #10b981; font-size: 14px;');

// ===== Performance Optimization =====
// Lazy load images if any are added later
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Service Worker Registration (Optional - for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
