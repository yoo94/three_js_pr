import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threeFunc = function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 하트 모양 생성 함수
    function createHeartShape() {
        const x = 0, y = 0;
        const heartShape = new THREE.Shape();

        heartShape.moveTo(x + 5, y + 5);
        heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y + 10, x, y + 10);
        heartShape.bezierCurveTo(x - 6, y + 10, x - 6, y + 3, x - 6, y + 3);
        heartShape.bezierCurveTo(x - 6, y - 1, x - 3, y - 5.4, x + 5, y - 9);
        heartShape.bezierCurveTo(x + 12, y - 5.4, x + 16, y - 1, x + 16, y + 3);
        heartShape.bezierCurveTo(x + 16, y + 3, x + 16, y + 10, x + 10, y + 10);
        heartShape.bezierCurveTo(x + 7, y + 10, x + 5, y + 5, x + 5, y + 5);

        return heartShape;
    }

    // 기하학 생성
    const heartShape = createHeartShape();
    const extrudeSettings = {
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 3
    };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // Material 생성
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // 하트 만들고 Scene에 추가
    const heart = new THREE.Mesh(geometry, material);
    scene.add(heart);

    // OrbitControls 생성
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 감속 효과
    controls.dampingFactor = 0.25; // 감속 비율
    controls.enableZoom = true; // 줌 기능

    // 화면이 새로고침될 때마다 렌더링
    function animate() {
        requestAnimationFrame(animate);
        heart.rotation.x += 0.01; // 회전 애니메이션 추가
        heart.rotation.y += 0.01;
        controls.update(); // 애니메이션 루프에서 업데이트 필요
        renderer.render(scene, camera);
    }

    animate();
}
window.onload = threeFunc;
