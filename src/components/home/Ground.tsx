import { Suspense } from "react";
import { Float32BufferAttribute, PlaneGeometry } from "three";
import { GrassMaterial } from "./GrassMaterial";

const doorGeometry = new PlaneGeometry(20, 20);
doorGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
);

export function Ground() {
  return (
    <mesh
      name="ground"
      geometry={doorGeometry}
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <Suspense fallback={<meshStandardMaterial color={0xa9c388} />}>
        <GrassMaterial />
      </Suspense>
    </mesh>
  );
}
