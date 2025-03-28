// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0x202020, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff0000, 3, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Katana with Dark Glow
const katanaGeometry = new THREE.BoxGeometry(0.15, 0.15, 6);
const katanaMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, emissive: 0xff0000, shininess: 200 });
const katana = new THREE.Mesh(katanaGeometry, katanaMaterial);
scene.add(katana);

// Energy Core (Stark Reactor Vibes)
const coreGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500, wireframe: true });
const core = new THREE.Mesh(coreGeometry, coreMaterial);
core.position.set(0, 1.5, 0);
scene.add(core);

// HUD Lines (Anime x Stark Tech)
const hudGeometry = new THREE.RingGeometry(2, 2.1, 32);
const hudMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
const hud = new THREE.Mesh(hudGeometry, hudMaterial);
hud.rotation.x = Math.PI / 2;
scene.add(hud);

// Particles (Energy Sparks)
const particles = new THREE.Group();
const particleCount = 300;
const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });

for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
    );
    particles.add(particle);
}
scene.add(particles);

camera.position.z = 8;

// Animation Loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.03;

    // Katana Spin
    katana.rotation.x += 0.02;
    katana.rotation.y += 0.04;

    // Core Pulse
    core.rotation.z += 0.05;
    core.scale.set(1 + Math.sin(time) * 0.3, 1 + Math.sin(time) * 0.3, 1);

    // HUD Rotation
    hud.rotation.z += 0.01;

    // Particles (Energy Storm)
    particles.children.forEach(particle => {
        particle.position.y -= 0.1;
        particle.position.x += Math.sin(time + particle.position.z) * 0.05;
        if (particle.position.y < -20) particle.position.y = 20;
    });

    renderer.render(scene, camera);
}
animate();

// Responsive Resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Button Interaction
document.querySelector('.explore-btn').addEventListener('click', () => {
    alert("JARVIS, boot up the system—Satrkyy’s in the house!");
    // Add portfolio link or next step here
});
