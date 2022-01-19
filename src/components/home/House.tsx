import { useTexture } from "@react-three/drei";
import { BoxGeometry, Float32BufferAttribute, PlaneGeometry } from "three";

const width = 4;
const wallsHeight = 2.5;
const roofHeight = 1;
const doorHeight = 2;
const doorWidth = 2;

const doorGeometry = new PlaneGeometry(doorWidth, doorHeight, 100, 100);
doorGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
);

const wallsGeometry = new BoxGeometry(width, wallsHeight, width);
wallsGeometry.setAttribute(
  "uv2",
  new Float32BufferAttribute(wallsGeometry.attributes.uv.array, 2)
);

export function House() {
  const doorTextures = useTexture({
    map: "/textures/door/color.jpg",
    alphaMap: "/textures/door/alpha.jpg",
    aoMap: "/textures/door/ambientOcclusion.jpg",
    displacementMap: "/textures/door/height.jpg",
    normalMap: "/textures/door/normal.jpg",
    metalnessMap: "/textures/door/metalness.jpg",
    roughnessMap: "/textures/door/roughness.jpg",
  });

  const bricksTextures = useTexture({
    map: "/textures/bricks/color.jpg",
    aoMap: "/textures/bricks/ambientOcclusion.jpg",
    normalMap: "/textures/bricks/normal.jpg",
    roughnessMap: "/textures/bricks/roughness.jpg",
  });

  return (
    <group name="house">
      <mesh
        name="walls"
        geometry={wallsGeometry}
        position-y={wallsHeight / 2}
        castShadow
      >
        <meshStandardMaterial {...bricksTextures} />
      </mesh>
      <mesh
        name="roof"
        position-y={wallsHeight + roofHeight / 2}
        rotation-y={Math.PI / 4}
        castShadow
      >
        <coneGeometry args={[width - 0.5, roofHeight, 4]} />
        <meshStandardMaterial color={0xb35f45} />
      </mesh>
      <mesh
        name="door"
        geometry={doorGeometry}
        position={[0, doorHeight / 2 - 0.1, width / 2 + 0.01]}
      >
        <meshStandardMaterial
          {...doorTextures}
          transparent
          displacementScale={0.1}
        />
      </mesh>
      <pointLight
        color={0xff7d46}
        intensity={1}
        distance={7}
        position={[0, 2.2, 2.7]}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
        castShadow
      />
    </group>
  );
}
