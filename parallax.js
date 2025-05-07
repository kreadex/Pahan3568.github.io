const container = document.querySelector('.parallax-container');
const layers = document.querySelectorAll('.parallax-layer');

const speeds = [0.2, 0.1, 0.05]; // Увеличенные скорости для каждого слоя
const depths = [0, 200, 400]; // Увеличенная глубина для каждого слоя (в пикселях)

let lastX = 0;
let lastY = 0;
let isMouseInside = false;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function animate() {
    const targetX = isMouseInside ? window.innerWidth / 2 - lastX : 0;
    const targetY = isMouseInside ? window.innerHeight / 2 - lastY : 0;

    layers.forEach((layer, index) => {
        const speed = speeds[index];
        const depth = depths[index];
        const x = lerp(layer._x || 0, -targetX * speed, 0.1);
        const y = lerp(layer._y || 0, -targetY * speed, 0.1);

        layer._x = x;
        layer._y = y;

        const scale = 1 + (depth / 1000);
        const translateZ = -depth; // Отрицательное значение для эффекта "вглубь"
        const rotateY = targetX * 0.02 * speed;
        const rotateX = -targetY * 0.02 * speed;

        layer.style.transform = `translate3d(${x}px, ${y}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    });

    requestAnimationFrame(animate);
}

container.addEventListener('mousemove', (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!isMouseInside) {
        isMouseInside = true;
    }
});

container.addEventListener('mouseleave', () => {
    isMouseInside = false;
});

animate();