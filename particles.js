const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const stickerVideo = document.createElement('video');

stickerVideo.src = 'sticker.webm';
stickerVideo.loop = true;
stickerVideo.muted = true;
stickerVideo.play();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 20; // Размер стикеров
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.x = Math.random() * canvas.width;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.drawImage(stickerVideo, this.x, this.y, this.size, this.size);
    }
}

function initParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Wait for the video to load metadata, then start animation
stickerVideo.addEventListener('loadeddata', () => {
    initParticles();
    animateParticles();
});