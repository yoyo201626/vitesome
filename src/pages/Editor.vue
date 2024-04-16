<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

let cameraOrtho: THREE.OrthographicCamera, currentCamera: THREE.OrthographicCamera;
let scene: THREE.Scene, renderer: THREE.WebGLRenderer, control: TransformControls, orbit: OrbitControls;

init();
render();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = window.innerWidth / window.innerHeight;

  const frustumSize = 5;

  cameraOrtho = new THREE.OrthographicCamera(
    -frustumSize * aspect,
    frustumSize * aspect,
    frustumSize,
    -frustumSize,
    0.1,
    100,
  );
  currentCamera = cameraOrtho;

  currentCamera.position.set(0, 0, 5);

  scene = new THREE.Scene();
  scene.background = new THREE.Color('while')
  const gridHelper = new THREE.GridHelper(5, 10, 0x888888, 0x444444)
  gridHelper.translateZ(-5)
  gridHelper.rotateX(90)
  scene.add(gridHelper);


  // 定义矩形的宽度和高度
  const width = 1;
  const height = 1;
  // 创建矩形的BufferGeometry
  const geometry = new THREE.BufferGeometry();
  
  // 定义顶点位置
  const vertices = new Float32Array([
      -width/2, -height/2, 0,   // 左下
      width/2, -height/2, 0, // 右下
      width/2, height/2, 0, // 右上
      -width/2, height/2, 0,  // 左上
      -width/2, -height/2, 0,
  ]);
  
  // 将顶点位置数据添加到geometry
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  // 创建线材质
  const material = new THREE.LineBasicMaterial({ color: 'red', linewidth: 2 });
  
  // 创建线对象
  const rectangle = new THREE.Line(geometry, material);

  const mesh = rectangle
  scene.add(mesh);

  orbit = new OrbitControls(currentCamera, renderer.domElement);
  orbit.enableRotate = false
  orbit.update();
  orbit.addEventListener('change', render);


  // 创建圆形几何体
  const geometryCircle = new THREE.CircleGeometry(0.1, 32); // 半径为5，分段数为32
  
  // 创建材质
  const materialCircle = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // 绿色材质，两面可见
  
  // 创建网格对象
  const circle = new THREE.Mesh(geometryCircle, materialCircle);

  rectangle.add(circle)

  // control = new TransformControls(currentCamera, renderer.domElement);
  // control.addEventListener('change', render);

  // control.addEventListener('dragging-changed', function (event) {
  //   orbit.enabled = !event.value;
  // });

  // control.attach(mesh);
  // control.setMode('scale');
  // control.showZ = false
  // control.space = 'local'
  // scene.add(control);

  const controls2 = new DragControls( [circle], currentCamera, renderer.domElement )
  controls2.rotateSpeed = 2;
  controls2.addEventListener( 'drag', render );


  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  cameraOrtho.left = cameraOrtho.bottom * aspect;
  cameraOrtho.right = cameraOrtho.top * aspect;
  cameraOrtho.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, currentCamera);
}
</script>

<template></template>