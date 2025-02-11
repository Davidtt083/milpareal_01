const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const cardWidth = document.querySelector('.card').offsetWidth;
let currentPosition = 0;

nextButton.addEventListener('click', () => {
    moveCarousel(cardWidth);
});

prevButton.addEventListener('click', () => {
    moveCarousel(-cardWidth);
});

function moveCarousel(distance) {
    currentPosition += distance;
    if (currentPosition > carousel.scrollWidth - carousel.offsetWidth) {
        currentPosition = carousel.scrollWidth - carousel.offsetWidth;
    } else if (currentPosition < 0) {
        currentPosition = 0;
    }
    carousel.style.transform = `translateX(-${currentPosition}px)`;
}

// Soporte para gestos táctiles
let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let deltaX = e.touches[0].clientX - startX;

    // Si se desliza más de 50px, movemos el carrusel
    if (Math.abs(deltaX) > 50) {
        moveCarousel(deltaX > 0 ? -cardWidth : cardWidth);
        isDragging = false; // Evita múltiples desplazamientos en un solo deslizamiento
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});



// Script lottie, animación de confeti
var animation = lottie.loadAnimation({
    container: document.getElementById('confetti-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'json/confeti.json'
});

// Al finalizar la animación, espera 2 segundos y luego reiníciala
animation.addEventListener('complete', function () {
    setTimeout(function () {
        animation.goToAndPlay(0, true);
    }, 2000); // 2000 milisegundos = 2 segundos
});


gsap.from('#logo', {
    duration: 1,
    x: '-100%',
    y: '-100%',
    opacity: 0,
    ease: "ease-in-out",
    delay: 0.5
});



// Función para activar la animación letra por letra
function animateText(element) {
    const text = element.textContent;
    const letters = text.split("");
    element.textContent = ""; // Limpiar el texto original

    letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.display = "inline-block"; // Permite que el span acepte transformaciones
        span.style.opacity = 0; // Ocultar cada letra individualmente
        span.style.transform = "translateY(100%)"; // Posicionar las letras abajo

        element.appendChild(span);

        gsap.to(span, {
            opacity: 1,
            y: "0%", // Animar la posición hacia arriba
            duration: 0.3, // Puedes aumentar la duración para notar mejor la animación
            delay: index * 0.1, // Retraso entre letras
            ease: "power1.out" // Tipo de easing
        });
    });
}


// Función para verificar si un elemento está visible en la pantalla
function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight && rect.bottom >= 0
    );
}

// Función para manejar el evento scroll
function handleScroll() {
    const titles = document.querySelectorAll(".section-title");

    titles.forEach(title => {
        if (isVisible(title) && !title.classList.contains("animated")) {
            animateText(title);
            title.classList.add("animated"); // Marcar el título como animado
        }
    });
}

// Evento scroll
window.addEventListener("scroll", handleScroll);

// Inicializar la animación en los títulos visibles al cargar la página
window.addEventListener("DOMContentLoaded", handleScroll);

gsap.registerPlugin(ScrollTrigger);

// Configurar la animación para el contenedor
gsap.from(".rounded-container", {
    scrollTrigger: {
        trigger: ".rounded-container",    // Elemento que disparará la animación
        start: "top 80%",                   // La animación se inicia cuando el top del elemento alcanza el 80% de la altura de la ventana
        toggleActions: "play none none none" // Solo reproducir la animación una vez al entrar en pantalla
    },
    y: 100,              // El elemento inicia 100px más abajo de su posición final
    opacity: 0,         // Comienza invisible
    duration: 1.2,      // Duración total de la animación (en segundos)
    ease: "bounce.out"  // Easing con rebote al finalizar
});




