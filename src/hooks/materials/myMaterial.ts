import { useCubeTexture, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
} from "three";

export function useMyMaterial() {
  const [
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorColorTexture,
    doorHeigthTexture,
    doorMetalnessTexture,
    doorNormalTexture,
    doorRoughnessTexture,
  ] = useTexture([
    "/textures/door/alpha.jpg",
    "/textures/door/ambientOcclusion.jpg",
    "/textures/door/color.jpg",
    "/textures/door/height.jpg",
    "/textures/door/metalness.jpg",
    "/textures/door/normal.jpg",
    "/textures/door/roughness.jpg",
  ]);
  const [matcapTexture, gradientTexture] = useTexture([
    "/textures/matcaps/8.png",
    "/textures/gradients/5.jpg",
  ]);

  const envMap = useCubeTexture(
    ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    { path: "/textures/environmentMaps/3/" }
  );

  const materialRef = useRef(
    // new MeshStandardMaterial({
    //   alphaMap: doorAlphaTexture,
    //   map: doorColorTexture,
    //   aoMap: doorAmbientOcclusionTexture,
    //   displacementMap: doorHeigthTexture,
    //   metalnessMap: doorMetalnessTexture,
    //   roughnessMap: doorRoughnessTexture,
    //   normalMap: doorNormalTexture,
    //   transparent: true,
    //   envMap,
    // })
    // new MeshMatcapMaterial({ matcap: matcapTexture })
    // new MeshNormalMaterial()
    new MeshStandardMaterial()
  );

  const { metalness, roughness } = useControls({
    metalness: {
      min: 0,
      max: 1,
      value: 0,
      step: 0.01,
    },
    roughness: {
      min: 0,
      max: 1,
      value: 0.7,
      step: 0.01,
    },
  });

  useLayoutEffect(() => {
    const material = materialRef.current;
    material.roughness = roughness;
    material.metalness = metalness;
  }, [metalness, roughness]);

  return materialRef.current;
}
