import React, { useRef, useState } from "react";
import VirtualTour from "./virtualTour";

const ImageCard = () => {
  const [isFullScreen, setIsFullScreen] = useState(false); // State to track full-screen mode
  const containerRef = useRef(null);

  const handleCardClick = () => {
    setIsFullScreen(true); // Open full-screen mode
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false); // Exit full-screen mode
  };

  return (
    <>
      {!isFullScreen && (
        <div
          id="image-card"
          ref={containerRef}
          style={{
            margin: "10px",
            width: "300px",
            height: "200px",
            overflow: "hidden",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleCardClick}
        >
          {/* Card Preview */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VirtualTour />
          </div>
        </div>
      )}

      {isFullScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VirtualTour />
          <button
            onClick={handleCloseFullScreen}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(255, 255, 255, 0.8)",
              border: "none",
              borderRadius: "5px",
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default ImageCard;
