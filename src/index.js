import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

const threeFunc = function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 15, 30);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 텍스처 로더
    const textureLoader = new TextureLoader();
    const woodTexture = textureLoader.load('./src/textures/woodTexture.png'); // 나무 텍스처 경로 설정

    // 땅 생성
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B92, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    // 1층 집 바디

    const firstFloorGeometry = new THREE.BoxGeometry(10, 5, 10);
    const firstFloorMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
    const firstFloor = new THREE.Mesh(firstFloorGeometry, firstFloorMaterial);
    firstFloor.position.y = 2.5;
    scene.add(firstFloor);

    // 2층 집 바디
    const secondFloorGeometry = new THREE.BoxGeometry(8, 5, 8);
    const secondFloorMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
    const secondFloor = new THREE.Mesh(secondFloorGeometry, secondFloorMaterial);
    secondFloor.position.y = 7.5;
    scene.add(secondFloor);

    // 지붕
    const roofGeometry = new THREE.ConeGeometry(6, 3, 4);
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xA52A2A });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 11;
    roof.rotation.y = Math.PI / 4;
    scene.add(roof);

    // 문
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1, 5.05);
    scene.add(door);

    // 나무 추가
    const treeTrunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3);
    const treeTrunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
    treeTrunk.position.set(-10, 1.5, -10);
    scene.add(treeTrunk);

    const treeLeavesGeometry = new THREE.SphereGeometry(2);
    const treeLeavesMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const treeLeaves = new THREE.Mesh(treeLeavesGeometry, treeLeavesMaterial);
    treeLeaves.position.set(-10, 4, -10);
    scene.add(treeLeaves);

    // OrbitControls 생성
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 감속 효과
    controls.dampingFactor = 0.25; // 감속 비율
    controls.enableZoom = true; // 줌 기능

    // 화면이 새로고침될 때마다 렌더링
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
window.onload = threeFunc;
