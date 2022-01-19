import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";

export function useRotateRef<T extends Object3D>(
  x: number = 0,
  y: number = 0,
  z: number = 0
) {
  const ref = useRef<T>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += x * delta;
    ref.current.rotation.y += y * delta;
    ref.current.rotation.z += z * delta;
  });

  return ref;
}
