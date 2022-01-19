import { useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { RepeatWrapping } from "three";

export function GrassMaterial() {
  const textures = useTexture({
    map: "/textures/grass/color.jpg",
    aoMap: "/textures/grass/ambientOcclusion.jpg",
    normalMap: "/textures/grass/normal.jpg",
    roughnessMap: "/textures/grass/roughness.jpg",
  });

  useLayoutEffect(() => {
    Object.values(textures).forEach((texture) => {
      texture.repeat.set(8, 8);
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
    });
  }, [textures]);

  return <meshStandardMaterial {...textures} />;
}
