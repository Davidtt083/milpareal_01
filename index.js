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


let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let deltaX = e.touches[0].clientX - startX;

    
    if (Math.abs(deltaX) > 50) {
        moveCarousel(deltaX > 0 ? -cardWidth : cardWidth);
        isDragging = false; 
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});




var animation = lottie.loadAnimation({
    container: document.getElementById('confetti-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'json/confeti.json'
});


animation.addEventListener('complete', function () {
    setTimeout(function () {
        animation.goToAndPlay(0, true);
    }, 2000); 
});


gsap.from('#logo', {
    duration: 1,
    x: '-100%',
    y: '-100%',
    opacity: 0,
    ease: "ease-in-out",
    delay: 0.5
});




function animateText(element) {
    const text = element.textContent;
    element.textContent = ""; 

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;

        if (char === " ") {
            span.style.whiteSpace = "pre"; 
        } else {
            span.style.display = "inline-block"; 
            span.style.opacity = 0;
            span.style.transform = "translateY(100%)";
        }

        element.appendChild(span);

        gsap.to(span, {
            opacity: 1,
            y: "0%", 
            duration: 0.3, 
            delay: index * 0.1, 
            ease: "power1.out"
        });
    });
}




function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight && rect.bottom >= 0
    );
}


function handleScroll() {
    const titles = document.querySelectorAll(".section-title");

    titles.forEach(title => {
        if (isVisible(title) && !title.classList.contains("animated")) {
            animateText(title);
            title.classList.add("animated"); 
        }
    });
}


window.addEventListener("scroll", handleScroll);


window.addEventListener("DOMContentLoaded", handleScroll);

gsap.registerPlugin(ScrollTrigger);


gsap.from(".rounded-container", {
    scrollTrigger: {
        trigger: ".rounded-container",    
        start: "top 80%",                   
        toggleActions: "play none none none" 
    },
    y: 100,              
    opacity: 0,         
    duration: 1.2,      
    ease: "bounce.out"  
});


document.querySelector('.llamado_accion').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});

