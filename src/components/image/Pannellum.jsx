import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const VirtualTour = () => {
  const [imageData, setImageData] = useState({});
  const [currentImage, setCurrentImage] = useState(null);
  const [texture, setTexture] = useState(null);

  // Fetch and load images
  useEffect(() => {
    async function fetchImages() {
      const images = await loadImagesFromFolder(); // Fetch image URLs dynamically
      const imageKeys = Object.keys(images); // Sort images by filename
      const data = imageKeys.reduce((acc, key, index) => {
        acc[key] = {
          imageUrl: images[key],
          hotspots: [], // Add hotspots if needed
          forward: index < imageKeys.length - 1 ? { targetImage: imageKeys[index + 1] } : undefined,
          backward: index > 0 ? { targetImage: imageKeys[index - 1] } : undefined,
        };
        return acc;
      }, {});

      setImageData(data);
      setCurrentImage(data[imageKeys[0]]); // Set the first image as the initial image
    }

    fetchImages();
  }, []);

  // Load texture for the current image
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

  // Handle navigation
  const handleNavigation = (direction) => {
    if (currentImage) {
      const target =
        direction === "forward"
          ? currentImage.forward?.targetImage
          : currentImage.backward?.targetImage;
      if (target) {
        setCurrentImage(imageData[target]);
      }
    }
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* 3D Canvas */}
      <Canvas style={{ height: "100vh" }}>
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
            <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
          </mesh>
        )}
      </Canvas>

      {/* Navigation Buttons */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => handleNavigation("forward")}
          style={{
            pointerEvents: "auto",
            cursor: "pointer",
            background: "rgba(0, 0, 0, 0.3)",
            color: "white",
            textAlign: "center",
            fontSize: "24px",
            padding: "20px",
          }}
        >
          Forward
        </div>
        <div
          onClick={() => handleNavigation("backward")}
          style={{
            pointerEvents: "auto",
            cursor: "pointer",
            background: "rgba(0, 0, 0, 0.3)",
            color: "white",
            textAlign: "center",
            fontSize: "24px",
            padding: "20px",
          }}
        >
          Backward
        </div>
      </div>
    </div>
  );
};

// Helper function to load images
async function loadImagesFromFolder() {
  const response = await fetch("/api/list-image");
  const images = await response.json(); 

  const imageMap = images.reduce((acc, url, index) => {
    const key = `image${index + 1}`;
    acc[key] = url;
    return acc;
  }, {});

  return imageMap;
}

export default VirtualTour;
