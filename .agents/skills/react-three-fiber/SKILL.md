---
name: react-three-fiber
description: >-
  Comprehensive guide and reference for React Three Fiber (R3F / @react-three/fiber).
  Use this skill when building, configuring, debugging, or optimizing 3D web applications,
  R3F Canvas components, Three.js meshes, shaders, animation loops (useFrame), R3F context (useThree),
  asset loading (useLoader, useGLTF), and Drei ecosystem helpers (@react-three/drei).
---

# React Three Fiber (R3F) Skill

React Three Fiber (`@react-three/fiber`) is a React renderer for Three.js. It allows building 3D scene graphs declaratively with re-usable, self-contained components that react to state and user interaction.

---

## 🚀 Golden Rules of React Three Fiber

1. **R3F Hooks inside Canvas only**
   Hooks like `useFrame`, `useThree`, and `useLoader` **MUST** be used in components rendered inside the `<Canvas>` tree. They fail if called outside `<Canvas>`.

2. **Direct Mutation in Animation Loops**
   Inside `useFrame`, mutate Three.js objects directly via ref properties (`ref.current.rotation.y += delta`). **Do NOT call React `useState` setters inside `useFrame`** as re-rendering 60+ times per second causes severe performance bottlenecks.

3. **JSX Map to Three.js Instantiation**
   Any JSX element (e.g. `<mesh>`, `<perspectiveCamera>`, `<directionalLight>`) translates directly to a `THREE.*` instance (e.g. `new THREE.Mesh()`).
   - Constructor args: `args={[param1, param2]}`
   - Nested elements: Sub-objects attach automatically (e.g. `<boxGeometry />` attaches to parent `<mesh>`).
   - Attach property: Use `attach="material"` or nested properties `attach="geometry"` when implicit attachment isn't enough.

4. **Always Wrap Async Loaders in `<Suspense>`**
   R3F loaders rely on React Suspense. Always wrap components that load GLTF models, textures, or audio in `<Suspense fallback={...}>`.

---

## 🛠 Core Components & Hooks Quick Reference

### 1. The `<Canvas>` Container
The root component that sets up WebGLRenderer, Scene, Camera, and render loop.

```jsx
import { Canvas } from '@react-three/fiber';

<Canvas
  camera={{ position: [0, 2, 5], fov: 60 }}
  shadows
  dpr={[1, 2]} // Dynamic pixel ratio capping for high-DPI displays
  gl={{ antialias: true, alpha: true }}
>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <My3DScene />
</Canvas>
```

### 2. Animation Loop: `useFrame`
Executes code on every frame of the render loop (typically 60fps / 120fps).

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function RotatingCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // state contains clock, camera, scene, gl, etc.
    // delta is time elapsed since last frame in seconds
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
```

### 3. Accessing Scene & Camera: `useThree`
Access the R3F internal state (camera, scene, renderer `gl`, viewport sizes, raycaster).

```jsx
import { useThree } from '@react-three/fiber';

function CameraController() {
  const { camera, gl, viewport, invalidate } = useThree();
  
  // Viewport dimensions in 3D units at current depth
  console.log(viewport.width, viewport.height);

  return null;
}
```

### 4. Asset Loading: `useLoader` & `@react-three/drei`
Load 3D models (GLTF/GLB), textures, and audio declaratively.

```jsx
import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

function Model({ url }) {
  const gltf = useGLTF(url); // or useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} />;
}
```

---

## 📚 Deep Dive References

For specialized techniques and detailed API specifications, refer to:
- [Hooks Reference](./references/hooks.md) - Complete reference for `useFrame`, `useThree`, `useLoader`, `createPortal`.
- [Canvas & Event Handling](./references/canvas_and_events.md) - Canvas configuration, raycasting, raycaster events, pointer events.
- [Performance & Drei Best Practices](./references/performance_and_drei.md) - Instanced meshes, frameloop demand mode, memoization, `@react-three/drei` utilities.
