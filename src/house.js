import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threeFunc = function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 20);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 집 바디
    const houseGeometry = new THREE.BoxGeometry(5, 5, 5);
    const houseMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.y = 2.5;
    scene.add(house);

    // 지붕
    const roofGeometry = new THREE.ConeGeometry(4, 2, 4);
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xA52A2A });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 6;
    roof.rotation.y = Math.PI / 4;
    scene.add(roof);

    // 문
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1, 2.55);
    scene.add(door);

    // 나무 추가
    const treeTrunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3);
    const treeTrunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
    treeTrunk.position.set(-7, 1.5, -7);
    scene.add(treeTrunk);

    const treeLeavesGeometry = new THREE.SphereGeometry(2);
    const treeLeavesMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const treeLeaves = new THREE.Mesh(treeLeavesGeometry, treeLeavesMaterial);
    treeLeaves.position.set(-7, 4, -7);
    scene.add(treeLeaves);

    // OrbitControls 생성
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // 화면이 새로고침될 때마다 렌더링
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
window.onload = threeFunc;
