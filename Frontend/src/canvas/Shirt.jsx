import { useGLTF, useTexture, Decal } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Shirt = ({
  shirtColor = "#ff0000",
  logoUrl = "https://res.cloudinary.com/di9ljccil/image/upload/v1777815135/threejs_lww47e.png",
  logoPosition = { x: 0, y: 0.0, z: 0.2 },
  logoScale = 0.18,
  shirtScale = 6.5,
}) => {
  const { scene } = useGLTF("/shirt_baked.glb");
  const meshRef = useRef();

  const logo = useTexture(logoUrl);

  const minLogoScale = 0.15;
  const logoScaleRange = 0.25;
  const actualLogoScale =
    minLogoScale + Math.max(0, Math.min(1, logoScale)) * logoScaleRange;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: shirtColor,
        });

        // attach first mesh to ref (IMPORTANT)
        if (!meshRef.current) {
          meshRef.current = child;
        }
      }
    });
  }, [scene, shirtColor]);

  return (
    <primitive object={scene} scale={shirtScale}>
      {meshRef.current && (
        <mesh
          geometry={meshRef.current.geometry}
          material={meshRef.current.material}
        >
          <Decal
            position={[logoPosition.x, logoPosition.y, logoPosition.z]}
            rotation={[0, 0, 0]}
            scale={actualLogoScale}
            map={logo}
          />
        </mesh>
      )}
    </primitive>
  );
};

export default Shirt;
