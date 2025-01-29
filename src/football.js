import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.136/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky color

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('footballCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Football field
const fieldGeometry = new THREE.PlaneGeometry(10, 6);
const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI / 2;
scene.add(field);

// Players
function createPlayer(color, x) {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({ color }));
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), new THREE.MeshBasicMaterial({ color: 0xffe0bd }));
    head.position.y = 0.8;
    const player = new THREE.Group();
    player.add(body);
    player.add(head);
    player.position.set(x, 0.5, 0);
    return player;
}

const player1 = createPlayer(0xff0000, -2); // Red Player
const player2 = createPlayer(0x0000ff, 2);  // Blue Player
scene.add(player1, player2);

// Football
const ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
ball.position.set(0, 0.2, 0);
scene.add(ball);

// Animation
function animate() {
    requestAnimationFrame(animate);
    ball.position.x += 0.02 * Math.sin(Date.now() * 0.002);
    ball.position.z += 0.02 * Math.cos(Date.now() * 0.002);
    renderer.render(scene, camera);
}

animate();

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
