import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const Shirt = () => {
  const { scene } = useGLTF("/shirt_baked.glb");

  const shirtColor = "#ff0000";

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: shirtColor,
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={6.5} />;
};

export default Shirt;
