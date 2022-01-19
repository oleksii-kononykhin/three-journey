export function Lights() {
  return (
    <>
      <ambientLight color={0xb9d5ff} intensity={0.3} />
      <directionalLight
        color={0xb9d5ff}
        position={[4, 5, -2]}
        intensity={0.12}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={15}
        castShadow
      />
    </>
  );
}
