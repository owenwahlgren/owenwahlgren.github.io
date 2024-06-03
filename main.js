import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 128;
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#FFF';
context.font = 'Bold 60px Arial';
context.textAlign = 'center';
// context.fillText('Under Construction...', canvas.width / 2, canvas.height / 2);

const texture = new THREE.CanvasTexture(canvas);
const textMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
const textGeometry = new THREE.PlaneGeometry(10, 1.25);
const textMesh = new THREE.Mesh(textGeometry, textMaterial);

// storage
const objects = [];
const numObjects = 50;
const spread = 5;

// random objects
for (let i = 0; i < numObjects; i++) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (Math.random() - 0.5) * spread;
    mesh.position.y = (Math.random() - 0.5) * spread;
    mesh.position.z = (Math.random() - 0.5) * spread * numObjects;

    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 0.5;

    scene.add(mesh);
    objects.push(mesh);
}

camera.position.z = numObjects * spread / 2;

const animate = () => {
    requestAnimationFrame(animate);

    // move each object towards the camera and reset its position if it gets too close
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.position.z += 0.1;
        object.rotation.x += 0.005;
        object.rotation.y += 0.005;

        // reset the position of the object
        if (object.position.z > camera.position.z) {
            object.position.z -= spread * numObjects;
        }
    }

    renderer.render(scene, camera);
};

animate();
