# Canvas Configuration & Pointer Events in R3F

This reference covers setting up `<Canvas>` and handling interactive events (clicks, hovers, raycasting).

---

## 1. Canvas Props Reference

| Prop | Type | Description |
| :--- | :--- | :--- |
| `camera` | `Object` | Perspective or Orthographic camera config (e.g. `{ position: [0,0,5], fov: 75 }`) |
| `orthographic` | `boolean` | Swapping default perspective camera to orthographic |
| `shadows` | `boolean \| string` | Enables shadow map (`shadows={true}` or `shadows="soft"`) |
| `dpr` | `number \| [min, max]` | Device pixel ratio (capping `[1, 2]` saves performance on high-DPI retina screens) |
| `frameloop` | `'always' \| 'demand' \| 'never'` | Controls loop behavior: `'always'` (continuous 60fps), `'demand'` (renders only on state/prop change), `'never'` (manual rendering) |
| `gl` | `Object \| fn` | Options passed directly to `THREE.WebGLRenderer` (e.g. `{ antialias: true, alpha: true }`) |
| `onCreated` | `fn(state)` | Callback invoked right after WebGL context & scene setup completes |

---

## 2. Event Handling System

R3F includes a built-in pointer event system based on raycasting. Event handlers can be added directly to any object in the 3D scene (meshes, groups, etc.).

### Standard Pointer Events

```jsx
<mesh
  onClick={(event) => console.log('Clicked mesh', event)}
  onContextMenu={(e) => console.log('Right clicked')}
  onDoubleClick={(e) => console.log('Double clicked')}
  onPointerOver={(e) => console.log('Hover start')}
  onPointerOut={(e) => console.log('Hover end')}
  onPointerMove={(e) => console.log('Pointer moved over mesh')}
  onPointerDown={(e) => console.log('Pointer pressed down')}
  onPointerUp={(e) => console.log('Pointer released')}
>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>
```

### Event Object Properties

The `event` parameter passed to event handlers contains rich picking details:

- `event.distance`: Distance from camera to raycast intersection point.
- `event.point`: `THREE.Vector3` position in 3D world space of the intersection.
- `event.uv`: `THREE.Vector2` UV coordinate on mesh surface.
- `event.object`: The intersected `THREE.Object3D`.
- `event.eventObject`: The component element that caught the event.
- `event.face`: Intersected triangle face properties.
- `event.stopPropagation()`: Prevents raycast event from bubbling through behind objects!

### Stopping Propagation Example

```jsx
<mesh onClick={(e) => {
  e.stopPropagation(); // Stops raycast from triggering clicks on objects behind this mesh
  setActive(true);
}}>
```
