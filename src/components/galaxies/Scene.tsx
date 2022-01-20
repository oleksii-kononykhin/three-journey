import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useLayoutEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
} from "three";

export function GalaxiesScene() {
  const particleTexture = useTexture("/textures/particles/8.png");

  const geometryRef = useRef<BufferGeometry>(null!);
  const pointsRef = useRef<Points>(null!);

  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPow,
    insideColor,
    outsideColor,
  } = useControls({
    count: { value: 100_000, min: 100, max: 1_000_000, step: 10 },
    size: { value: 0.01, min: 0.001, max: 0.1, step: 0.001 },
    radius: { value: 5, min: 0.1, max: 20, step: 0.01 },
    branches: { value: 3, min: 2, max: 20, step: 1 },
    spin: { value: 1, min: -5, max: 5, step: 0.001 },
    randomness: { value: 0.2, min: 0, max: 2, step: 0.001 },
    randomnessPow: { value: 3, min: 1, max: 10, step: 0.001 },
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });

  useLayoutEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new Color(insideColor);
    const colorOutside = new Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const rad = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = (rad * spin) / 3;

      const randomX =
        randomness *
        Math.pow(Math.random(), randomnessPow) *
        (Math.random() < 0.5 ? -1 : 1) *
        rad;
      const randomY =
        randomness *
        Math.pow(Math.random(), randomnessPow) *
        (Math.random() < 0.5 ? -1 : 1) *
        rad;
      const randomZ =
        randomness *
        Math.pow(Math.random(), randomnessPow) *
        (Math.random() < 0.5 ? -1 : 1) *
        rad;

      positions[i3] = Math.cos(branchAngle + spinAngle) * rad + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * rad + randomZ;

      const vertexColor = colorInside.clone().lerp(colorOutside, rad / radius);
      colors[i3] = vertexColor.r;
      colors[i3 + 1] = vertexColor.g;
      colors[i3 + 2] = vertexColor.b;
    }

    geometryRef.current.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );
    geometryRef.current.setAttribute("color", new BufferAttribute(colors, 3));
  }, [
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPow,
    insideColor,
    outsideColor,
  ]);

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += (Math.PI / 32) * delta;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef} />
        <pointsMaterial
          alphaMap={particleTexture}
          size={size}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
          vertexColors
        />
      </points>
      <color args={["black"]} attach="background" />
    </>
  );
}
