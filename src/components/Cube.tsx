import { useDetectGPU } from "@react-three/drei";
import { useFrame, Vector3 } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import { useRef, useState } from "react";
import { Mesh } from "three";
import { button, useControls } from "leva";

interface CubeProps {
  position?: [number, number, number];
}

export function Cube({ position = [0, 0, 0] }: CubeProps) {
  const meshRef = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);
  const { rotationY } = useSpring({ rotationY: 0 });

  // const {} = useControls("Cube", {});

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += (Math.PI / 4) * delta;
    // meshRef.current.rotation.y += (Math.PI / 4) * delta;
    // meshRef.current.rotation.z += (Math.PI / 4) * delta;
  });

  return (
    <animated.mesh ref={meshRef} position={position} rotation-y={rotationY}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={"#ff0000"} />
    </animated.mesh>
  );
}
