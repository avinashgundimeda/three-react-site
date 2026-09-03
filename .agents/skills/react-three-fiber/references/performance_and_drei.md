# Performance Optimization & Drei Ecosystem Helpers

This reference covers performance techniques for large 3D scenes and essential utilities provided by `@react-three/drei`.

---

## 1. Performance Best Practices

### A. Frameloop Demand Mode (`frameloop="demand"`)
For static or semi-static 3D scenes (like product configurators or architectural viewers), set `frameloop="demand"`. R3F will only render frames when props change or when `invalidate()` is explicitly called, dramatically reducing GPU/CPU battery usage.

```jsx
<Canvas frameloop="demand">
  {/* Scenes only render when interactive controls move or props change */}
</Canvas>
```

### B. Instanced Rendering (`<instancedMesh>`)
Rendering thousands of identical objects (trees, particles, debris, bricks) using individual `<mesh>` nodes will bottleneck draw calls. Use `<instancedMesh>` instead.

```jsx
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Forest({ count = 1000 }) {
  const meshRef = useRef();
  const dummy = new THREE.Object3D();

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 100,
        0,
        (Math.random() - 0.5) * 100
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <coneGeometry args={[0.5, 2, 8]} />
      <meshStandardMaterial color="forestgreen" />
    </instancedMesh>
  );
}
```

### C. Resource Disposal & Re-use
- Share geometries and materials across meshes when possible using React `useMemo`.
- R3F automatically disposes of unused geometries/materials when components unmount unless `dispose={null}` is explicitly set.

---

## 2. Essential `@react-three/drei` Helpers

`@react-three/drei` is the official helper library for R3F, offering pre-built components for controls, environment, models, HTML overlays, and staging.

### A. Orbit & Camera Controls
```jsx
import { OrbitControls, PresentationControls } from '@react-three/drei';

<Canvas>
  <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
</Canvas>
```

### B. Environment & Lighting
```jsx
import { Environment, ContactShadows, Sky, Float } from '@react-three/drei';

<Canvas>
  {/* HDRI Environment lighting */}
  <Environment preset="city" background />
  
  {/* Soft grounding shadows without expensive shadow maps */}
  <ContactShadows position={[0, -1, 0]} opacity={0.75} scale={10} blur={25} />
  
  {/* Gentle floating animation */}
  <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
    <MyModel />
  </Float>
</Canvas>
```

### C. HTML Overlays inside 3D (`<Html>`)
Embed interactive HTML elements directly positioned in 3D world space.

```jsx
import { Html } from '@react-three/drei';

function AnnotatedMesh() {
  return (
    <mesh position={[0, 1, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
      <Html distanceFactor={10} position={[0, 1.2, 0]} center>
        <div style={{ background: 'black', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
          Interactive Label
        </div>
      </Html>
    </mesh>
  );
}
```
