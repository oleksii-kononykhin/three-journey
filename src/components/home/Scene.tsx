import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { Color, Fog } from "three";
import { Bush } from "./Bush";
import { Ghost } from "./Ghost";
import { Grave } from "./Grave";
import { Ground } from "./Ground";
import { House } from "./House";
import { Lights } from "./Lights";

export function HouseScene() {
  console.log("scene");

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  useLayoutEffect(() => {
    const house = scene.getObjectByName("house");
    if (house) {
      camera.position.set(0, 4, 12);
      camera.lookAt(house.position);
    }
  }, [camera, scene]);

  useLayoutEffect(() => {
    scene.fog = new Fog(0x262837, 2, 15);
    scene.background = new Color(0x262837);
  }, [scene]);

  const graves = useMemo(() => {
    return (
      <group name="graves">
        {[...Array(50)].map((_, index) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 5 + 4;
          const x = Math.sin(angle) * distance;
          const y = 0.2 + Math.random() * 0.1;
          const z = Math.cos(angle) * distance;

          const rotationY = (Math.random() - 0.5) * 0.4;
          const rotationZ = (Math.random() - 0.5) * 0.3;

          return (
            <Grave
              key={index}
              position={[x, y, z]}
              rotation={[0, rotationY, rotationZ]}
            />
          );
        })}
      </group>
    );
  }, []);

  return (
    <>
      <Lights />
      <Ground />
      <House />
      <group name="bushes">
        <Bush position={[0.8, 0.2, 2.2]} scale={0.5} />
        <Bush position={[1.4, 0.1, 2.1]} scale={0.25} />
        <Bush position={[-0.8, 0.1, 2.2]} scale={0.4} />
        <Bush position={[-1, 0.05, 2.6]} scale={0.15} />
      </group>
      {graves}
      <group name="ghosts">
        <Ghost
          color={0xff00ff}
          radius={3}
          speed={0.4}
          amplitude={1.2}
          offset={-Math.PI / 2}
        />
        <Ghost
          color={0x00ffff}
          radius={4.5}
          direction={-1}
          speed={0.5}
          amplitude={1.5}
        />
        <Ghost
          color={0xffff00}
          radius={6}
          speed={0.4}
          amplitude={1}
          offset={Math.PI / 2}
        />
      </group>
    </>
  );
}
