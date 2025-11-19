const footerImg = document.getElementById("footer-img");

let targetX = 0;
let currentX = 0;

// Tamaño imagen desktop
let imgWidth = 2569;               
let viewWidth = window.innerWidth;

// Máximo desplazamiento sin generar scroll
let maxMove = (imgWidth - viewWidth) / 25;

// Recalcular si cambia el tamaño de pantalla
window.addEventListener("resize", () => {
    viewWidth = window.innerWidth;
    maxMove = (imgWidth - viewWidth) / 25;
});

function animate() {
    currentX += (targetX - currentX) * 0.1;  // suavizado
    footerImg.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(animate);
}

animate();


// ------------------------------------------------
// 🖱 DESKTOP – Movimiento con el mouse
// ------------------------------------------------
window.addEventListener("mousemove", (e) => {
    const center = window.innerWidth / 2;
    const distance = e.clientX - center;

    // Convertimos la distancia en porcentaje
    targetX = (distance / center) * maxMove;
});


// ------------------------------------------------
// 📱 MOBILE – Movimiento con el giroscopio
// ------------------------------------------------
window.addEventListener("deviceorientation", (e) => {
    if (window.innerWidth > 1024) return; // solo móvil/tablet

    const gamma = e.gamma; // inclinación izquierda/derecha (-45 a 45)

    // Normalizamos gamma a un rango entre -1 y 1
    const normalized = gamma / 45;

    // Lo convertimos a desplazamiento
    targetX = normalized * maxMove;
});


// ------------------------------------------------
// ⚠️ Solicitar permiso en iOS para usar giroscopio
// ------------------------------------------------
if (typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function") {

    // El usuario debe tocar la pantalla para permitirlo
    document.body.addEventListener("click", () => {
        DeviceOrientationEvent.requestPermission().catch(console.error);
    });
}