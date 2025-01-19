import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const VirtualTour = ({ currentImage }) => {
  const [texture, setTexture] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (currentImage) {
      // Extract the image name from the URL
      const imageUrlParts = currentImage.imageUrl.split("/");
      const name = imageUrlParts[imageUrlParts.length - 1]; // Extract last part of the URL
      setImageName(name);

      // Load the texture
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
      {/* Display the image name as an overlay */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "210px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          zIndex: 2,
        }}
      >
        {imageName}
      </div>

      {/* Panorama rendering */}
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
