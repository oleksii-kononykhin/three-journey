import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { useSpring } from "react-spring";
import { Color, Object3D } from "three";
import { Particles } from "./Particles";

export function ParticlesScene() {
  const { rotationY, positionZ } = useSpring({
    loop: true,
    from: { rotationY: 0, positionZ: 1000 },
    to: [
      { rotationY: 0, positionZ: -300, config: { duration: 3000 } },
      { rotationY: Math.PI, positionZ: -1000, config: { duration: 500 } },
      { rotationY: Math.PI, positionZ: 300, config: { duration: 3000 } },
      { rotationY: 0, positionZ: 1000, config: { duration: 500 } },
    ],
  });

  const { scene, camera } = useThree((state) => ({
    scene: state.scene,
    camera: state.camera,
  }));

  useLayoutEffect(() => {
    scene.background = new Color(0x000000);
  }, [scene]);

  //   useFrame(() => {
  //     camera.position.z = positionZ.get();
  //     camera.rotation.y = rotationY.get();
  //   });

  return (
    <>
      <Particles />
    </>
  );
}
