import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { HouseScene } from "./components/home/Scene";

import { initDevtools } from "./utils";

function App() {
  const containerRef = useRef<HTMLDivElement>(null!);

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
    <div ref={containerRef} className="container">
      <Canvas
        gl={{ antialias: false }}
        camera={{ fov: 75, position: [0, 0, 3] }}
        onCreated={(state) => {
          initDevtools(state.scene, state.gl);
        }}
        dpr={window.devicePixelRatio}
        linear
        flat
        shadows
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <HouseScene />
        </Suspense>
        <color attach="background" args={[0x262837]} />
        <Stats />
        {/* <axesHelper args={[3]} /> */}
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
