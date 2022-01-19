import { useTexture } from "@react-three/drei";

export function DoorMaterial() {
  const doorTextures = useTexture({
    map: "/textures/door/color.jpg",
    alphaMap: "/textures/door/alpha.jpg",
    aoMap: "/textures/door/ambientOcclusion.jpg",
    displacementMap: "/textures/door/height.jpg",
    normalMap: "/textures/door/normal.jpg",
    metalnessMap: "/textures/door/metalness.jpg",
    roughnessMap: "/textures/door/roughness.jpg",
  });

  return (
    <meshStandardMaterial
      {...doorTextures}
      transparent
      displacementScale={0.1}
    />
  );
}
