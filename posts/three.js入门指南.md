---
title: "Three.js入门指南"
excerpt: "关于three.js的简易入门介绍"
date: "2024-07-06"
author: "Ryan"
category: "前端"
tags: ["three.js", "可视化"]
imageUrl: ""
---

Three.js 是一个强大的 JavaScript 库，它让我们能够轻松地在网页上创建和渲染复杂的三维场景。无论你是想构建3D游戏、数据可视化，还是交互式艺术作品，Three.js 都能帮助你快速上手。本篇文章将带你了解Three.js 的基础知识，并展示如何创建一个简单的3D场景。

### 什么是Three.js？
Three.js 是一个基于 WebGL 的开源 JavaScript 库，它为开发者提供了丰富的工具来创建3D对象、相机、光源等，并能在浏览器中高效渲染3D图形。由于WebGL 直接在 GPU 上运行，Three.js 的性能非常好，适合开发具有实时交互的应用。

### 搭建开发环境
要使用Three.js，我们首先需要搭建一个基本的开发环境。可以使用任何你喜欢的开发工具，这里我们使用 Vite 来快速搭建一个项目。

1. **安装 Vite** 如果你还没有安装 Vite，先安装它：
```javaScript
npm create vite@latest threejs-demo --template vanilla
cd threejs-demo
npm install
```

2. **安装 Three.js** 安装 Three.js 库：
```javaScript
npm install three --save
```

3. **创建基础场景**
创建一个基础的场景包含三个基本元素：
* **场景** (Scene): 存放3D对象、光源等。
* **相机** (Camera): 用于设置观察视角。
* **渲染器** (Renderer): 负责将3D场景渲染到页面。

### 项目示例
在 main.js 中编写以下代码：

```javaScript
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机 (透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 设置相机位置
camera.position.z = 5;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);

  // 让立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

**代码解析**
* **创建场景和相机：** 通过 THREE.Scene() 创建了一个空的3D场景。相机 THREE.PerspectiveCamera 是一个透视相机，它的参数包括视角、宽高比、近裁剪面和远裁剪面。
* **渲染器：** THREE.WebGLRenderer 用于将场景渲染到 HTML 页面上。通过 renderer.setSize 设置渲染器的大小，使其填充整个窗口。
* **创建立方体：** 使用 BoxGeometry 创建一个立方体模型，并通过 MeshBasicMaterial 设置它的材质。将这个立方体添加到场景中。
* **动画循环：** 通过 requestAnimationFrame 进行渲染循环，使立方体持续旋转，并在每帧更新场景。

**添加光照和材质**
为了让场景更逼真，可以添加光源和更复杂的材质。接下来，我们将在场景中加入一个光源，并给立方体添加一种反光的材质。

```javaScript
// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// 创建具有反光效果的材质
const reflectiveMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const reflectiveCube = new THREE.Mesh(geometry, reflectiveMaterial);
scene.add(reflectiveCube);
```

MeshStandardMaterial 是一种支持光照的材质，适合表现更真实的物体表面。PointLight 则是一个点光源，发光点周围的对象会受到照射。

**鼠标交互与控件**
要增加用户与3D场景的互动，可以使用 OrbitControls 插件来实现鼠标控制相机的旋转和缩放。
1. 安装 OrbitControls：
```javaScript
npm install three-orbitcontrols
```

2. 在项目中使用：
```javaScript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 添加阻尼效果，具有更真实的操作体验
controls.dampingFactor = 0.25;
controls.enableZoom = true; // 允许缩放

// 在 animate 函数中更新控制器
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 更新控制器
  renderer.render(scene, camera);
}
```

这样，用户可以通过鼠标轻松旋转、缩放和拖动3D场景，使得整个体验更加交互友好。

### 总结
通过这篇文章，我们从零搭建了一个简单的Three.js项目，了解了如何创建场景、渲染器、相机，并添加了一个旋转的立方体。在此基础上，你可以继续探索 Three.js，添加更多的3D对象、动画、光照效果，甚至是物理引擎等高级功能。下一步，你可以尝试构建更加复杂的项目，比如创建一个动态的3D模型展示页面，或结合 WebXR 实现虚拟现实体验。