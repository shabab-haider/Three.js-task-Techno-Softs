import { Clone, Decal, useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function paintShirt(scene, color) {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ color });
    }
  });
}

/**
 * Renders the GLB shirt, applies `shirtColor`, and projects `logoUrl` as a decal
 * on the first mesh drei's Clone walks (the main body for this asset).
 */
export default function Shirt({
  logoUrl,
  shirtColor = "#ef4444",
  logoPosition = { x: 0, y: 0, z: 0.2 },
  logoScale = 0.18,
  shirtScale = 6.5,
}) {
  const { scene } = useGLTF("/shirt_baked.glb");
  const logoMap = useTexture(logoUrl);
  const decalHostUuid = useRef(null);

  useLayoutEffect(() => {
    paintShirt(scene, shirtColor);
  }, [scene, shirtColor]);

  useEffect(() => {
    return () => {
      decalHostUuid.current = null;
    };
  }, []);

  const decalScale = 0.15 + Math.max(0, Math.min(1, logoScale)) * 0.25;

  return (
    <Clone
      object={scene}
      scale={shirtScale}
      inject={(node) => {
        if (!node.isMesh) return null;
        if (decalHostUuid.current == null) decalHostUuid.current = node.uuid;
        if (node.uuid !== decalHostUuid.current) return null;
        return (
          <Decal
            map={logoMap}
            position={[logoPosition.x, logoPosition.y, logoPosition.z]}
            rotation={[0, 0, 0]}
            scale={decalScale}
          />
        );
      }}
    />
  );
}
