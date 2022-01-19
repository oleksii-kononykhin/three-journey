import { MeshProps } from "@react-three/fiber";
import { BoxGeometry } from "three";
import { useGraveMaterial } from "../../hooks/materials";

const geometry = new BoxGeometry(0.6, 0.8, 0.2);
export function Grave(props: MeshProps) {
  const material = useGraveMaterial();
  return <mesh geometry={geometry} material={material} {...props} castShadow />;
}
