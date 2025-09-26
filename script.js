// Espera carregar o DOM
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------
    // 1️⃣ Animação inicial do header
    // ------------------------------
    const headerInfo = document.querySelector(".header-info");
    setTimeout(() => headerInfo.classList.add("visible"), 500);

    // -------------------------------------
    // 2️⃣ Intersection Observer para fade
    // -------------------------------------
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    const animElements = document.querySelectorAll(".fade-in, .fade-up, .slide-left, .slide-right");
    animElements.forEach(el => observer.observe(el));

    // ------------------------------
    // 3️⃣ Carrossel
    // ------------------------------
    const carrosselWrapper = document.querySelector('.carrossel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let slideIndex = 0;
    let intervalId; // ID do autoplay

    function moveCarrossel() {
        if (carrosselWrapper) {
            carrosselWrapper.style.transform = `translateX(${-slideIndex * 100}%)`;
        }
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % carrosselWrapper.children.length;
        moveCarrossel();
    }

    function startAutoplay() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 3000);
    }

    function pauseAutoplay() {
        clearInterval(intervalId);
    }

    if (carrosselWrapper) {
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pauseAutoplay();
                slideIndex = (slideIndex + 1) % carrosselWrapper.children.length;
                moveCarrossel();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pauseAutoplay();
                slideIndex = (slideIndex - 1 + carrosselWrapper.children.length) % carrosselWrapper.children.length;
                moveCarrossel();
                startAutoplay();
            });
        }

        carrosselWrapper.addEventListener('mouseenter', pauseAutoplay);
        carrosselWrapper.addEventListener('mouseleave', startAutoplay);

        moveCarrossel();
        startAutoplay();
    }

    // ------------------------------
    // 4️⃣ Aura que segue o mouse
    // ------------------------------
    const header = document.querySelector('.main-header');
    const aura = document.querySelector('.mouse-aura');

    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        aura.style.transform = `translate(${x - aura.offsetWidth / 2}px, ${y - aura.offsetHeight / 2}px)`;
    });

    header.addEventListener('mouseenter', () => { aura.style.opacity = 1; });
    header.addEventListener('mouseleave', () => { aura.style.opacity = 0; });

    // ------------------------------
    // 5️⃣ Animação sequencial dos fatos
    // ------------------------------
    const fatosImagens = [
        document.getElementById('fato-img-1'),
        document.getElementById('fato-img-2'),
        document.getElementById('fato-img-3'),
        document.getElementById('fato-img-4')
    ];

    const delayFato = 600;

    fatosImagens.forEach((fato, index) => {
        if (fato) {
            setTimeout(() => {
                fato.classList.remove('hidden');
                fato.classList.add('visible');
            }, delayFato * (index + 1));
        }
    });

    // ------------------------------
    // 6️⃣ Responsividade dos fatos
    // ------------------------------
    function handleFatosResponsividade() {
        const fatosContainerOriginal = document.querySelector('.fatos-imagens-container');
        const fatosMobileBottom = document.querySelector('.fatos-mobile-bottom');

        const fatoImg3 = document.getElementById('fato-img-3');
        const fatoImg4 = document.getElementById('fato-img-4');

        const isMobile = window.innerWidth <= 900;

        if (isMobile) {
            if (fatoImg3 && !fatosMobileBottom.contains(fatoImg3)) {
                fatosMobileBottom.appendChild(fatoImg3);
            }
            if (fatoImg4 && !fatosMobileBottom.contains(fatoImg4)) {
                fatosMobileBottom.appendChild(fatoImg4);
            }
        } else {
            if (fatoImg3 && !fatosContainerOriginal.contains(fatoImg3)) {
                fatosContainerOriginal.appendChild(fatoImg3);
            }
            if (fatoImg4 && !fatosContainerOriginal.contains(fatoImg4)) {
                fatosContainerOriginal.appendChild(fatoImg4);
            }
        }
    }
    handleFatosResponsividade();
    window.addEventListener('resize', 
    handleFatosResponsividade);

});
