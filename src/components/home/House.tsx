import { useTexture } from "@react-three/drei";
import { Suspense } from "react";
import { BoxGeometry, Float32BufferAttribute, PlaneGeometry } from "three";
import { DoorMaterial } from "./DoorMaterial";
import { WallsMaterial } from "./WallsMaterial";

const width = 4;
const wallsHeight = 2.5;
const roofHeight = 1;
const doorHeight = 2;
const doorWidth = 2;

const doorGeometry = new PlaneGeometry(doorWidth, doorHeight, 100, 100);
doorGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
);

const wallsGeometry = new BoxGeometry(width, wallsHeight, width);
wallsGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallsGeometry.attributes.uv.array, 2)
);

export function House() {
  return (
    <group name="house">
      <mesh
        name="walls"
        geometry={wallsGeometry}
        position-y={wallsHeight / 2}
        castShadow
      >
        <Suspense fallback={<meshStandardMaterial color={0xac8e82} />}>
          <WallsMaterial />
        </Suspense>
      </mesh>
      <mesh
        name="roof"
        position-y={wallsHeight + roofHeight / 2}
        rotation-y={Math.PI / 4}
        castShadow
      >
        <coneGeometry args={[width - 0.5, roofHeight, 4]} />
        <meshStandardMaterial color={0xb35f45} />
      </mesh>
      <mesh
        name="door"
        geometry={doorGeometry}
        position={[0, doorHeight / 2 - 0.1, width / 2 + 0.01]}
      >
        <Suspense fallback={<meshStandardMaterial color={0xaa7b7b} />}>
          <DoorMaterial />
        </Suspense>
      </mesh>
      <pointLight
        color={0xff7d46}
        intensity={1}
        distance={7}
        position={[0, 2.2, 2.7]}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
        castShadow
      />
    </group>
  );
}
