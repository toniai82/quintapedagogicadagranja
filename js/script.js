document.addEventListener("DOMContentLoaded", function () {
    const ovo = document.getElementById("ovo");
    const popup = document.getElementById("popup");
    let fecharTimeout;

    ovo.addEventListener("animationend", function () {
        popup.style.display = "block";
        popup.style.opacity = "1";

        // Inicia o temporizador para fechar após 15 segundos
        fecharTimeout = setTimeout(() => fecharPopup(), 15000);
    });

    // Função para redirecionar
    function irParaPagina() {
        clearTimeout(fecharTimeout); // Cancela o temporizador ao clicar no botão
        window.location.href = "pagina-destino.html"; // Substitui pelo teu link
    }

    // Função para fechar o pop-up
    function fecharPopup() {
        popup.style.opacity = "0";
        setTimeout(() => popup.style.display = "none", 300); // Esconde após a animação
    }

    // Expondo funções para o HTML
    window.irParaPagina = irParaPagina;
    window.fecharPopup = fecharPopup;
});


let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const overlayTexts = document.querySelectorAll(".overlay-text");

// Função para mostrar o slide atual
function mostrarSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = "none"; // Oculta todos os slides
        overlayTexts[i].style.display = "none"; // Oculta o texto de todos os slides
        if (i === index) {
            slide.style.display = "block"; // Mostra apenas o slide atual
            overlayTexts[i].style.display = "block"; // Mostra o texto sobre o slide atual
        }
    });
}

// Função para avançar ou recuar slides
function mudarSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    mostrarSlide(slideIndex);
}

// Slideshow automático
function iniciarSlideshow() {
    setInterval(() => mudarSlide(1), 4000); // Troca o slide a cada 4 segundos
}

// Event Listeners para os botões de navegação
if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => mudarSlide(-1));
    nextButton.addEventListener("click", () => mudarSlide(1));
}

// Iniciar slideshow ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    mostrarSlide(slideIndex); // Mostra o primeiro slide
    iniciarSlideshow();       // Inicia a troca automática de slides
});

// Menu Responsivo (Mobile)
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// ------------------ CORRIGIDO: Pintura sem cobrir linhas pretas ------------------
const canvas = document.getElementById("canvas");
const ctx = canvas?.getContext("2d");
const img = document.getElementById("desenhoAnimal");
let desenhando = false;
let corAtual = "#ff0000";

// Garantir que o canvas e imagem existem antes de executar o código
if (canvas && ctx && img) {
    // Carregar a imagem no canvas
    function carregarImagem() {
        if (img.complete) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    }
    window.onload = carregarImagem;

    // Alterar cor
    document.getElementById("corSelecionada").addEventListener("input", (e) => {
        corAtual = e.target.value;
    });

    // Controlar desenho
    canvas.addEventListener("mousedown", () => desenhando = true);
    canvas.addEventListener("mouseup", () => desenhando = false);
    canvas.addEventListener("mousemove", desenhar);

    function desenhar(event) {
        if (!desenhando) return;

        ctx.globalCompositeOperation = "multiply"; // Mantém as linhas visíveis
        ctx.fillStyle = corAtual;
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over"; // Volta ao normal após a pintura
    }

    // Apagar desenho mantendo a imagem original
    function limparDesenho() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        carregarImagem(); // Redesenha a imagem original
    }
}

// ------------------ CORRIGIDO: Som em loop e botão para parar ------------------
let audio = null;
let isPlaying = false;

function tocarSom(animal) {
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
    } else {
        audio = new Audio(`sounds/${animal}.mp3`);
        audio.loop = true;
        audio.play();
        isPlaying = true;
    }
}
/*--------------------------------------------------------------------------------*/

<script>
    // Função que alterna a visibilidade do conteúdo
    function toggleContent(activity) {
        const content = document.querySelector(`.${activity}-info`);
        const currentDisplay = content.style.display;

        // Alternar entre mostrar e ocultar
        if (currentDisplay === 'none' || currentDisplay === '') {
            content.style.display = 'block';  // Exibe o conteúdo
        } else {
            content.style.display = 'none';   // Oculta o conteúdo
        }
    }

    // Aplica a função de "abrir/fechar" ao título
    document.querySelectorAll('h2').forEach(title => {
        title.addEventListener('click', function() {
            toggleContent(this.id);
        });
    });
</script>
