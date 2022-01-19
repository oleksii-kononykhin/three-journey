import { useTexture } from "@react-three/drei";

export function WallsMaterial() {
  const bricksTextures = useTexture({
    map: "/textures/bricks/color.jpg",
    aoMap: "/textures/bricks/ambientOcclusion.jpg",
    normalMap: "/textures/bricks/normal.jpg",
    roughnessMap: "/textures/bricks/roughness.jpg",
  });

  return <meshStandardMaterial {...bricksTextures} />;
}
