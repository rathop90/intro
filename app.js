const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Background Gradient
scene.background = new THREE.Color(0x0d1b2a);

// Lighting
const pointLight = new THREE.PointLight(0x00bfff, 3, 100);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0x1e90ff, 0.3);
const directionalLight = new THREE.DirectionalLight(0x00bfff, 0.5);
directionalLight.position.set(-10, 10, 10);
scene.add(pointLight, ambientLight, directionalLight);

// 3D Icy Sphere with Texture
const textureLoader = new THREE.TextureLoader();
const sphereGeometry = new THREE.SphereGeometry(12, 64, 64);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x00bfff,
    shininess: 150,
    transparent: true,
    opacity: 0.9,
    wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-25, 15, -30);
scene.add(sphere);

// Rotating Cube with Edges
const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff, shininess: 100 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(25, -15, -25);
scene.add(cube);
const edges = new THREE.EdgesGeometry(cubeGeometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00bfff });
const cubeEdges = new THREE.LineSegments(edges, lineMaterial);
cube.add(cubeEdges);

// Particle System (Snow/Ice Effect)
const particleCount = 2000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 300;
    positions[i + 1] = (Math.random() - 0.5) * 300;
    positions[i + 2] = (Math.random() - 0.5) * 300;
    velocities[i] = 0;
    velocities[i + 1] = -Math.random() * 0.2;
    velocities[i + 2] = 0;
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0x00bfff,
    size: 0.6,
    transparent: true,
    opacity: 0.7,
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Floating Icy Crystals
const crystalGeometry = new THREE.OctahedronGeometry(3, 0);
const crystalMaterial = new THREE.MeshPhongMaterial({
    color: 0x00bfff,
    shininess: 200,
    transparent: true,
    opacity: 0.8,
});
const crystals = [];
for (let i = 0; i < 10; i++) {
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
    crystal.userData = { speed: Math.random() * 0.02 + 0.01 };
    crystals.push(crystal);
    scene.add(crystal);
}

// Camera Movement
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Sphere Animation
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // Cube Animation
    cube.rotation.x += 0.015;
    cube.rotation.y += 0.015;

    // Particle Animation
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += velocities[i + 1];
        if (positions[i + 1] < -150) positions[i + 1] = 150;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Crystal Animation
    crystals.forEach(crystal => {
        crystal.rotation.x += crystal.userData.speed;
        crystal.rotation.y += crystal.userData.speed;
        crystal.position.y += Math.sin(time + crystal.position.x) * 0.05;
    });

    // Camera Movement
    camera.position.x = Math.sin(time * 0.1) * 50;
    camera.position.z = Math.cos(time * 0.1) * 50;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse Interaction
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    sphere.position.x = mouseX * 10 - 25;
    sphere.position.y = mouseY * 10 + 15;
});

animate();
