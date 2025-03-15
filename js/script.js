    let espessuraAtual = 5; // Espessura inicial do traço
document.addEventListener("DOMContentLoaded", function () {
    const ovo = document.getElementById("ovo");
    const popup = document.getElementById("popup");
    let fecharTimeout;

    ovo.addEventListener("animationend", function () {
        popup.style.display = "block";
        popup.style.opacity = "1";

        // Inicia o temporizador para fechar após 60 segundos
        fecharTimeout = setTimeout(() => fecharPopup(), 60000);
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

document.addEventListener("DOMContentLoaded", function () {
    // ----------------- COLORIR COM SONS ----------------- //
    const canvas = document.getElementById("canvas");
    const ctx = canvas?.getContext("2d");
    const imgElement = document.getElementById("desenhoAnimal");
    let desenhando = false;
    let corAtual = "#ff0000";
    let historicoDesenho = []; // Histórico para desfazer

    // Lista de desenhos com sons
    const desenhos = [
        { img: "img/galinha_pintos.png", som: "sounds/galinha_pintos.mp3" },
        { img: "img/pato.png", som: "sounds/pato.mp3" },
        { img: "img/cabra.png", som: "sounds/cabra.mp3" },
        { img: "img/porco.png", som: "sounds/porco.mp3" }
    ];

    let desenhoAtual = 0;
    let audioElement = new Audio();
    let somTocando = false;

    function carregarImagem() {
        imgElement.src = desenhos[desenhoAtual].img;
        audioElement.src = desenhos[desenhoAtual].som;
    
        imgElement.onload = function () {
            // **Ajusta automaticamente o tamanho do canvas ao tamanho da imagem**
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
    
            // Limpa o canvas antes de desenhar a nova imagem
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // Ajusta a imagem ao centro do canvas, mantendo a proporção correta
            let proporcao = Math.min(canvas.width / imgElement.width, canvas.height / imgElement.height);
            let novaLargura = imgElement.width * proporcao;
            let novaAltura = imgElement.height * proporcao;
            let x = (canvas.width - novaLargura) / 2;
            let y = (canvas.height - novaAltura) / 2;
    
            // Desenha a imagem ajustada no canvas
            ctx.drawImage(imgElement, x, y, novaLargura, novaAltura);
    
            // Limpa o histórico de desenho ao mudar de imagem
            historicoDesenho = [];
        };
    }
    
    function selecionarCor(cor) {
        corAtual = cor;
        document.getElementById("corSelecionada").value = cor; // Atualiza o seletor de cor
        console.log("Cor selecionada:", corAtual); // Para debug
    }
    
    window.selecionarCor = selecionarCor; // Expõe a função globalmente

    function guardarDesenho() {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png"); // Converte o desenho em PNG
        link.download = "meu_desenho.png"; // Nome do ficheiro
        link.click(); // Simula o clique para descarregar
    }
    window.guardarDesenho = guardarDesenho; // Expõe a função globalmente

    function mudarDesenho(direcao) {
        desenhoAtual = (desenhoAtual + direcao + desenhos.length) % desenhos.length;
        carregarImagem();
    }

    function tocarSom() {
        if (somTocando) {
            audioElement.pause();
            audioElement.currentTime = 0;
            somTocando = false;
        } else {
            audioElement.loop = true;
            audioElement.play();
            somTocando = true;
        }
    }

    document.getElementById("corSelecionada").addEventListener("input", (e) => {
        corAtual = e.target.value;
    });

    document.getElementById("espessura").addEventListener("input", (e) => {
        espessuraAtual = parseInt(e.target.value, 10);
        console.log("Nova espessura:", espessuraAtual); // Para debug
    });
    

    // Guardar o estado antes de pintar
    canvas.addEventListener("mousedown", () => {
        desenhando = true;
        historicoDesenho.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Salva o estado atual antes de pintar
    });

    canvas.addEventListener("mouseup", () => desenhando = false);
    canvas.addEventListener("mousemove", desenhar);

    document.getElementById("espessura").addEventListener("input", (e) => {
        espessuraAtual = e.target.value;
    });

    function desenhar(event) {
        if (!desenhando) return;
    
        ctx.globalAlpha = 0.8; // Torna a cor menos opaca para evitar escurecimento
        ctx.globalCompositeOperation = "multiply"; // Mantém as linhas pretas visíveis
        ctx.fillStyle = corAtual;
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, espessuraAtual / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1.0; // Restaura a opacidade normal
        ctx.globalCompositeOperation = "source-over"; // Volta ao normal após a pintura
    }

    function desfazer() {
        if (historicoDesenho.length > 0) {
            console.log("Desfazendo última ação...");
            ctx.putImageData(historicoDesenho.pop(), 0, 0);
        } else {
            console.log("Nada para desfazer!");
        }
    }

    function limparDesenho() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        carregarImagem();
    }

    window.onload = carregarImagem;
    window.mudarDesenho = mudarDesenho;
    window.tocarSom = tocarSom;
    window.limparDesenho = limparDesenho;
    window.desfazer = desfazer;
});

