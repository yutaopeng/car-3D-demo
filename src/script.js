import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// init

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.z = 1;
// camera.rotation.y = (45 / 180) * Math.PI;
// camera.position.x = 800;
// camera.position.y = 100;
// camera.position.z = 1000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(0, 300, 500);
scene.add(light);
const light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(500, 100, 0);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 100, -500);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(-500, 300, 500);
scene.add(light4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const loader = new GLTFLoader();

loader.load(
  "car/audi.glb",
  function (gltf) {
    const car = gltf.scene.children[0];
    car.scale.set(0.03, 0.03, 0.03);
    scene.add(gltf.scene);
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// animation

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
