import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, SphereGeometry } from "three";

interface SphereProps extends Pick<MeshProps, "position" | "name"> {
  animationSpeed: number;
}
const geometry = new SphereGeometry(0.5, 32, 32);

export function Sphere({ animationSpeed, ...props }: SphereProps) {
  const ref = useRef<Mesh>(null!);

  useFrame((state) => {
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * animationSpeed) * 1.5;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      geometry={geometry}
      onPointerOver={(e) => console.log(e)}
    >
      <meshBasicMaterial color="red" />
    </mesh>
  );
}
