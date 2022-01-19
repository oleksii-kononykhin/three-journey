import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PointLight } from "three";

interface GhostProps extends Pick<MeshProps, "position"> {
  color: number;
  radius: number;
  offset?: number;
  amplitude: number;
  direction?: 1 | -1;
  speed: number;
}
export function Ghost({
  radius,
  direction = 1,
  speed,
  amplitude,
  offset = 0,
  ...props
}: GhostProps) {
  const ref = useRef<PointLight>(null!);

  useFrame((state) => {
    const angle = state.clock.elapsedTime * speed * direction + offset;
    ref.current.position.x =
      Math.cos(angle) * (radius + Math.sin(state.clock.elapsedTime * 0.32));
    ref.current.position.y = Math.abs(Math.sin(angle * 3) * amplitude);
    ref.current.position.z =
      Math.sin(angle) * (radius + Math.sin(state.clock.elapsedTime * 0.5));
  });

  return (
    <pointLight
      ref={ref}
      {...props}
      intensity={2}
      distance={3}
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
      shadow-camera-far={7}
      castShadow
    />
  );
}
