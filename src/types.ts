import { Material } from "three";

export interface SimpleMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  material: Material;
  onClick?(): void;
}
