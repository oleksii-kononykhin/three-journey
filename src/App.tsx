import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Mesh } from "three";
import { Cube } from "./components";

import { initDevtools } from "./utils";

function App() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    const listener = () => {
      // if (!document.fullscreenElement) {
      //   containerRef.current.querySelector("canvas")?.requestFullscreen();
      // } else {
      //   document.exitFullscreen();
      // }
    };

    window.addEventListener("dblclick", listener);
    return () => {
      window.removeEventListener("dblclick", listener);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <div ref={containerRef} className="container">
        <Canvas
          camera={{ fov: 75, position: [0, 0, 3] }}
          onCreated={(state) => {
            initDevtools(state.scene, state.gl);
          }}
          dpr={window.devicePixelRatio}
        >
          <OrbitControls />
          <Cube />
          <color attach="background" args={["black"]} />
          <Stats />

          {/* <axesHelper args={[3]} /> */}
        </Canvas>
      </div>
    </Suspense>
  );
}

export default App;
