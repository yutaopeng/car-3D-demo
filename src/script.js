import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// init

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 30);
// camera.position.z = 1;
// camera.rotation.y = (45 / 180) * Math.PI;
// camera.position.x = 800;
// camera.position.y = 100;
// camera.position.z = 1000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const hlight = new THREE.AmbientLight(0x404040, 1);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-50, 50, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

// const light = new THREE.PointLight(0xc4c4c4, 2);
// light.position.set(0, 300, 500);
// scene.add(light);
// const light2 = new THREE.PointLight(0xc4c4c4, 2);
// light2.position.set(500, 100, 0);
// scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4, 2);
light3.position.set(0, 100, -500);
scene.add(light3);
// const light4 = new THREE.PointLight(0xc4c4c4, 2);
// light4.position.set(-500, 300, 500);
// scene.add(light4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const loader = new GLTFLoader();

loader.load(
  "avatar/woman1.glb",
  function (gltf) {
    const obj0 = gltf.scene.children[0];
    obj0.scale.set(5, 5, 5);
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

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
