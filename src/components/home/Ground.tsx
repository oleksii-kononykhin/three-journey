import { useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { Float32BufferAttribute, PlaneGeometry, RepeatWrapping } from "three";

const doorGeometry = new PlaneGeometry(20, 20);
doorGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
);

export function Ground() {
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

  return (
    <mesh
      name="ground"
      geometry={doorGeometry}
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <meshStandardMaterial {...textures} />
    </mesh>
  );
}
