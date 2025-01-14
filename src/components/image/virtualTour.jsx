import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const VirtualTour = ({ currentImage }) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (currentImage) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(currentImage.imageUrl, (loadedTexture) => {
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.repeat.x = -1;
        setTexture(loadedTexture);
      });
    }
  }, [currentImage]);

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "92vh",
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Canvas style={{ height: "100vh", pointerEvents: "auto" }}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
          minDistance={50}
          maxDistance={100}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {texture && (
          <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
          </mesh>
        )}
      </Canvas>
    </div>
  );
};

export default VirtualTour;
