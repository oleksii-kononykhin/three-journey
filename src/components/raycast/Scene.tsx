import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial, Raycaster, Vector3 } from "three";
import { Sphere } from "./Sphere";

export function RaycastScene() {
  const raycasterRef = useRef<Raycaster>(null!);
  const { scene } = useThree();

  const rcObjects = useThree(
    (state) =>
      [
        state.scene.getObjectByName("sphere1")!,
        state.scene.getObjectByName("sphere2")!,
        state.scene.getObjectByName("sphere3")!,
      ] as Mesh[]
  );

  useLayoutEffect(() => {
    const rayOrigin = new Vector3(-3, -0, 0);
    const rayDirection = new Vector3(10, -0, 0);
    rayDirection.normalize();
    raycasterRef.current.set(rayOrigin, rayDirection);
  }, [scene]);

  useFrame(() => {
    rcObjects.forEach((obj) =>
      (obj.material as MeshBasicMaterial).color.set("#ff0000")
    );
    raycasterRef.current
      .intersectObjects(rcObjects)
      .forEach((intersection) =>
        ((intersection.object as Mesh).material as MeshBasicMaterial).color.set(
          "#0000ff"
        )
      );
  });

  return (
    <>
      <color args={["black"]} attach="background" />

      <Sphere name="sphere1" position-x={-2} animationSpeed={0.3} />
      <Sphere name="sphere2" animationSpeed={0.8} />
      <Sphere name="sphere3" position-x={2} animationSpeed={1.4} />

      <raycaster ref={raycasterRef} />
    </>
  );
}
