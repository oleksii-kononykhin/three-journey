import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components";

import { initDevtools } from "./utils";

function App() {
  return (
    <>
      <div className="container">
        <Canvas
          gl={{ antialias: false, alpha: true }}
          camera={{ fov: 35, position: [0, 0, 6], near: 0.01, far: 10000 }}
          onCreated={(state) => {
            initDevtools(state.scene, state.gl);
          }}
          dpr={window.devicePixelRatio}
          linear
          flat
          shadows
        >
          <OrbitControls />
          <Scene />
          <Stats />
          {/* <axesHelper args={[3]} /> */}
        </Canvas>
      </div>
    </>
  );
}

export default App;
