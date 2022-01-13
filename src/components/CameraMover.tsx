import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const zero = new Vector3();

export function CameraMover() {
  useFrame((state) => {
    state.camera.position.x = 3 * Math.sin(state.clock.getElapsedTime());
    state.camera.position.z = 3 * Math.cos(state.clock.getElapsedTime());
    state.camera.lookAt(zero);
  });

  return null;
}
