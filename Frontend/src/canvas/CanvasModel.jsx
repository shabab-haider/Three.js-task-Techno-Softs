import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Shirt from "./Shirt";

const CanvasModel = ({ logoUrl }) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight />
        <directionalLight position={[2, 2, 5]} />

        <Suspense fallback={null}>
          <Shirt logoUrl={logoUrl} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          // X-axis (tilt limited)
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 1.9}
          // Y-axis (left/right limited)
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default CanvasModel;
