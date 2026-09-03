# R3F Hooks Reference

This guide details the core React Three Fiber hooks and their advanced parameters.

---

## 1. `useFrame(callback, renderPriority?)`

Executes a callback on every frame of the R3F animation loop.

### Parameters & Signature
```ts
useFrame((state: RootState, delta: number, frame?: XRFrame) => void, renderPriority?: number)
```

- **`state`**: Object containing full state tree (`camera`, `scene`, `gl`, `pointer`, `clock`, `viewport`, `size`, `raycaster`).
- **`delta`**: Time in seconds between current and previous frame. Use this to keep movement frame-rate independent!
- **`renderPriority`**: (Optional) Number indicating frame execution order. If set to non-zero, automatic scene rendering is disabled, and you assume manual control over `state.gl.render(state.scene, state.camera)`.

### Examples

#### Basic Animation with Delta
```jsx
useFrame((state, delta) => {
  meshRef.current.rotation.y += delta * 0.5;
});
```

#### Time-Based Sinusoidal Animation
```jsx
useFrame((state) => {
  const elapsedTime = state.clock.getElapsedTime();
  meshRef.current.position.y = Math.sin(elapsedTime) * 0.5;
});
```

---

## 2. `useThree(selector?)`

Gives access to R3F internal state variables, functions, and reactively subscribes to state changes.

### State Properties Available
- `gl`: Three.js `WebGLRenderer` instance.
- `scene`: Root `THREE.Scene`.
- `camera`: Active camera (`THREE.PerspectiveCamera` or `THREE.OrthographicCamera`).
- `raycaster`: `THREE.Raycaster` used for event picking.
- `pointer`: Normalized mouse coordinates `Vector2` (x: -1 to 1, y: -1 to 1).
- `size`: Screen bounding box `{ width, height, top, left }` in pixels.
- `viewport`: Calculated viewport bounds in 3D scene units `{ width, height, factor, distance, aspect }`.
- `clock`: `THREE.Clock` instance.
- `invalidate()`: Triggers a single frame re-render when `frameloop="demand"`.
- `set(state)`: Function to dynamically swap camera, scene, or renderer.

### Usage
```jsx
// Direct access to state properties
const { gl, camera, scene, viewport } = useThree();

// Selector pattern (only re-renders component when camera changes)
const camera = useThree((state) => state.camera);
```

---

## 3. `useLoader(Loader, url, extensions?, onProgress?)`

Loads assets asynchronously (GLTF, OBJ, FBX, Textures, Audio) integrated with React Suspense.

### Key Characteristics
- Results are automatically cached globally by URL.
- Must be wrapped inside `<Suspense fallback={...}>`.

### Example: Texture Loading
```jsx
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function TexturedBox() {
  const colorMap = useLoader(THREE.TextureLoader, '/textures/brick.jpg');
  
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}
```

### Example: GLTF Model Loading
```jsx
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/robot.glb');
  return <primitive object={gltf.scene} />;
}
```
