// Script para el funcionamiento del carrusel
document.addEventListener("DOMContentLoaded", function () {
    // Inicialización del carrusel héroe
    initHeroCarousel();
    
    // Inicialización del carrusel de productos
    initProductCarousel();
    
    // Creación de partículas para el fondo
    createParticles();
});

// Función para inicializar el carrusel del héroe
function initHeroCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Función para actualizar el carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Evento para botón anterior
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Evento para botón siguiente
    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Rotación automática
    setInterval(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 9000);

    // Inicializar carrusel
    updateCarousel();
}

// Función para inicializar el carrusel de productos
function initProductCarousel() {
    const productContainer = document.querySelector('.products-container');
    const prevBtn = document.querySelector('.products-section .product-nav-btn.prev');
    const nextBtn = document.querySelector('.products-section .product-nav-btn.next');

    if (prevBtn && nextBtn && productContainer) {
        // Ajuste del scroll para dispositivos móviles
        const isMobile = window.innerWidth < 768;
        // Cantidad a desplazar - más pequeña en móviles, una tarjeta en escritorio
        const scrollAmount = isMobile ? 180 : 270;

        prevBtn.addEventListener('click', function () {
            productContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', function () {
            productContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Añadir indicador visual de desplazamiento
        const updateScrollButtons = () => {
            const isAtStart = productContainer.scrollLeft <= 10;
            const isAtEnd = productContainer.scrollLeft >=
                (productContainer.scrollWidth - productContainer.clientWidth - 10);

            prevBtn.style.opacity = isAtStart ? "0.5" : "1";
            nextBtn.style.opacity = isAtEnd ? "0.5" : "1";
        };

        productContainer.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons(); // Inicializar estado
    }
}

// Función para crear partículas en el fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Función para manejar la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Eventos para los botones de "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        alert(`¡${productTitle} añadido al carrito!`);
        // Aquí se podría implementar la lógica real del carrito
    });
});

// Eventos para los botones de "Lista de deseos"
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
        
        // Si está activo, mostramos un mensaje
        if (this.classList.contains('active')) {
            // Cambiamos el color del SVG en lugar de usar el estilo
            console.log(`${productTitle} añadido a tu lista de deseos`);
        } else {
            console.log(`${productTitle} eliminado de tu lista de deseos`);
        }
    });
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para la barra de navegación
                behavior: 'smooth'
            });
        }
    });
});

// Añadir animaciones cuando los elementos entran en el viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que queremos animar al entrar en viewport
document.querySelectorAll('.product-card, .about-content, .section h2').forEach(element => {
    observer.observe(element);
});

// Manejar redimensión de ventana
window.addEventListener('resize', function() {
    // Reinicializar el carrusel de productos para ajustar el scroll
    initProductCarousel();
});