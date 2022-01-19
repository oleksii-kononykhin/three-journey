import { MeshStandardMaterial } from "three";

const material = new MeshStandardMaterial({ color: 0xb2b6b1 });
export function useGraveMaterial() {
  return material;
}
