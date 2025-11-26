// Ativa ano atual no rodapé
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

// Alternância do menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Suaviza o scroll para âncoras internas
navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('open');
    }
});

// Alternar tema claro/escuro simples
const themeToggle = document.getElementById('theme-toggle');
let darkMode = true;

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('light', !darkMode);
    themeToggle.innerHTML = darkMode ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
});

// Efeito de digitação no texto principal
const typingEl = document.querySelector('.typing');
const typingTexts = JSON.parse(typingEl.dataset.text);
let currentText = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const fullText = typingTexts[currentText];
    const displayed = isDeleting
        ? fullText.substring(0, charIndex - 1)
        : fullText.substring(0, charIndex + 1);

    typingEl.textContent = displayed;

    const typingSpeed = isDeleting ? 60 : 100;
    const pauseTime = 1200;

    if (!isDeleting && displayed === fullText) {
        setTimeout(() => (isDeleting = true), pauseTime);
    } else if (isDeleting && displayed === '') {
        isDeleting = false;
        currentText = (currentText + 1) % typingTexts.length;
    }

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    setTimeout(type, typingSpeed);
}

// Animação de barras de habilidade quando visíveis
const skillBars = document.querySelectorAll('.skill-bar span');
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('section')) {
                    skillBars.forEach((bar) => {
                        const level = bar.dataset.level;
                        bar.style.width = `${level}%`;
                    });
                }
            }
        });
    },
    { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

// Inicia animações após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    type();
});
