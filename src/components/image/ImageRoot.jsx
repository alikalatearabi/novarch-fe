"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VirtualTour from "./virtualTour";
import ImageSideControllerRoot from "./controllers/ImageSideControllerRoot";
import ImageFilterCaptureControllerRoot from "./controllers/ImageFilterCaptureControllerRoot";
import MiniMapRoot from "./miniMap/MiniMapRoot";

const ImageRoot = () => {
  const searchParams = useSearchParams();
  const sheetId = searchParams.get("sheetId");

  const [imageData, setImageData] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (!sheetId) return;

    async function fetchFrames() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/upload/frames/${sheetId}`);
        const result = await response.json();

        if (result.success) {
          const frames = result.responseObject.frames;
          const data = frames.reduce((acc, frame, index) => {
            acc[frame.name] = {
              imageUrl: `https://files.novaarchai.com/${frame.url}`,
              forward: index < frames.length - 1 ? { targetImage: frames[index + 1].name } : undefined,
              backward: index > 0 ? { targetImage: frames[index - 1].name } : undefined,
            };
            return acc;
          }, {});
          setImageData(data);
          setCurrentImage(data[frames[0].name]);
        } else {
          console.error("Failed to fetch frames:", result.message);
        }
      } catch (error) {
        console.error("Error fetching frames:", error);
      }
    }

    fetchFrames();
  }, [sheetId]);

  const navigate = (direction) => {
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

  return (
    <div id="imageContainer" className="relative h-[88vh]">
      <VirtualTour currentImage={currentImage} />
      <div id="sideController" className="absolute bottom-3 left-3 z-10">
        <ImageSideControllerRoot />
      </div>
      <div
        id="filterCaptureController"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ImageFilterCaptureControllerRoot navigate={navigate} />
      </div>
      <div id="miniMap" className="absolute top-3 left-3 z-10">
        <MiniMapRoot sheetId={sheetId} />
      </div>
    </div>
  );
};

export default ImageRoot;
