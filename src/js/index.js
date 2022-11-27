import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import faculty from "../bundle/begula.jpg";

const canvas = document.querySelector("#canvas");
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera_settings = {
  fov: 75,
  near: 0.1,
  far: 1000,
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  camera_settings.fov,
  size.width / size.height,
  camera_settings.near,
  camera_settings.far
);
camera.position.set(0, -10, 0);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = true;
controls.update();

const loader = new THREE.TextureLoader();
const texture = loader.load(faculty);

const geomety = new THREE.BoxGeometry(5, 5, 5);
const material = [
  new THREE.MeshStandardMaterial({}),
  new THREE.MeshStandardMaterial({}),
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshStandardMaterial({}),
  new THREE.MeshStandardMaterial({}),
  new THREE.MeshStandardMaterial({}),
];

const box = new THREE.Mesh(geomety, material);
scene.add(box);

const lights = new THREE.PointLight("white", 100, 100, 0.1);
lights.position.set(0, 10, 0);
lights.lookAt(box);
scene.add(lights);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));
renderer.render(scene, camera);

const tick = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", (event) => {
  size.height = window.innerHeight;
  size.width = window.innerWidth;

  renderer.setSize(size.width, size.height);
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
});
