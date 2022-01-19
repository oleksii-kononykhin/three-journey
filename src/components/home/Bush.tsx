import { MeshProps } from "@react-three/fiber";
import { SphereGeometry } from "three";
import { useBushMaterial } from "../../hooks/materials";

const geometry = new SphereGeometry(1, 16, 16);
export function Bush(props: MeshProps) {
  const material = useBushMaterial();
  return <mesh geometry={geometry} material={material} {...props} castShadow />;
}
