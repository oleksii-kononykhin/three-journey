import { useTexture } from "@react-three/drei";
import {
  SphereGeometry,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
} from "three";

// const particlesGeometry = new SphereGeometry(1, 32, 32);
const geometry = new BufferGeometry();
const count = 20000;
const vertices = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}
geometry.setAttribute("position", new BufferAttribute(vertices, 3));
geometry.setAttribute("color", new BufferAttribute(colors, 3));

export function Particles() {
  const particleTexture = useTexture("/textures/particles/8.png");
  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.1}
        alphaMap={particleTexture}
        // alphaTest={0.001}
        // depthTest={false}
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
        transparent
        sizeAttenuation
      />
    </points>
  );
}
