// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff1493, 2, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Katana with Glow
const katanaGeometry = new THREE.BoxGeometry(0.1, 0.1, 5);
const katanaMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xff1493, shininess: 150 });
const katana = new THREE.Mesh(katanaGeometry, katanaMaterial);
scene.add(katana);

// Energy Orb (Anime Power Core)
const orbGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const orbMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
const orb = new THREE.Mesh(orbGeometry, orbMaterial);
orb.position.set(0, 1, 0);
scene.add(orb);

// Sakura Petals with Intensity
const particles = new THREE.Group();
const particleCount = 200;
const particleGeometry = new THREE.TetrahedronGeometry(0.1, 0);
const particleMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4, emissive: 0xff1493 });

for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
    );
    particle.rotation.set(Math.random(), Math.random(), Math.random());
    particles.add(particle);
}
scene.add(particles);

camera.position.z = 7;

// Animation Loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    // Katana Spin
    katana.rotation.x += 0.02;
    katana.rotation.y += 0.03;

    // Orb Pulse
    orb.scale.set(1 + Math.sin(time) * 0.2, 1 + Math.sin(time) * 0.2, 1 + Math.sin(time) * 0.2);

    // Particles (Sakura Storm)
    particles.children.forEach(particle => {
        particle.position.y -= 0.05;
        particle.position.x += Math.sin(time + particle.position.z) * 0.02;
        if (particle.position.y < -15) particle.position.y = 15;
        particle.rotation.x += 0.02;
        particle.rotation.z += 0.02;
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
    alert("Code ka shogun bolta hai: Duniya meri mutthi mein!");
    // Add portfolio link or next step here
});
