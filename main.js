/* ============================
   GRUPO AMAL — Lógica y Animaciones
   ============================ */

// 1. Navbar: transparente → blanco al hacer scroll
const navbar = document.getElementById('navbar');
// Cachear el botón "Contactar" (último a[href="#contacto"] del nav, no el enlace de texto)
const navContactLinks = navbar.querySelectorAll('a[href="#contacto"]');
const contactBtn = navContactLinks[navContactLinks.length - 1];

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.remove('bg-transparent', 'text-white', 'py-5');
        navbar.classList.add('bg-white', 'text-black', 'py-3', 'shadow-sm', 'border-gray-200');
        if (contactBtn) {
            contactBtn.classList.remove('bg-white', 'text-black', 'border-white');
            contactBtn.classList.add('bg-black', 'text-white', 'border-black');
        }
    } else {
        navbar.classList.add('bg-transparent', 'text-white', 'py-5');
        navbar.classList.remove('bg-white', 'text-black', 'py-3', 'shadow-sm', 'border-gray-200');
        if (contactBtn) {
            contactBtn.classList.remove('bg-black', 'text-white', 'border-black');
            contactBtn.classList.add('bg-white', 'text-black', 'border-white');
        }
    }
}, { passive: true });

// 2. Menú Móvil
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const menuIcon = mobileBtn.querySelector('i');

mobileBtn.addEventListener('click', () => {
    const isOpening = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');

    // Alternar icono hamburguesa ↔ X
    menuIcon.className = isOpening ? 'ph ph-x text-2xl' : 'ph ph-list text-2xl';

    // Corregir color del logo cuando está en la parte superior
    if (window.scrollY <= 50) {
        if (isOpening) {
            navbar.classList.remove('text-white');
            navbar.classList.add('bg-white', 'text-black');
        } else {
            navbar.classList.remove('bg-white', 'text-black');
            navbar.classList.add('text-white');
        }
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.className = 'ph ph-list text-2xl';
        // Restaurar colores del navbar si está en el top
        if (window.scrollY <= 50) {
            navbar.classList.remove('bg-white', 'text-black');
            navbar.classList.add('text-white');
        }
    });
});

// 3. Animaciones de Scroll con Intersection Observer
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// 4. Stagger automático en tarjetas del grid de servicios
document.querySelectorAll('#servicios .group').forEach((card, i) => {
    const baseDelay = (i % 3) * 120;
    const rowDelay  = Math.floor(i / 3) * 60;
    card.style.transitionDelay = `${baseDelay + rowDelay}ms`;
});

// 5. Parallax sutil en imagen del Hero
const heroImg = document.getElementById('hero-img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const offset = window.scrollY;
        if (offset < window.innerHeight * 1.2) {
            heroImg.style.transform = `translateY(${offset * 0.12}px)`;
        }
    }, { passive: true });
}

// 6. Feedback del Formulario
function showSuccessMessage() {
    const msg = document.getElementById('success-msg');
    msg.classList.remove('hidden');
    setTimeout(() => {
        msg.classList.add('hidden');
        document.querySelector('form').reset();
    }, 5000);
}

// Exponer al scope global para el onsubmit inline
window.showSuccessMessage = showSuccessMessage;
