import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

const EarthMesh = () => {
  const meshRef = useRef();

  const colorMap = useLoader(
    TextureLoader,
    "/src/images/earth/earth_daymap.jpg"
  );

  // Smooth continuous rotation (real globe rotation)
  useFrame(() => {
    meshRef.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Earth = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <EarthMesh />
    </Canvas>
  );
};

export default Earth;
