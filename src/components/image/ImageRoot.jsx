"use client";
import React, { useEffect, useState } from "react";
import VirtualTour from "./virtualTour";
import ImageSideControllerRoot from "./controllers/ImageSideControllerRoot";
import ImageFilterCaptureControllerRoot from "./controllers/ImageFilterCaptureControllerRoot";
import MiniMapRoot from "./miniMap/MiniMapRoot";
import {
  selectImageExpandMinimap,
  RsetImageExpandMinimap,
  selectImageSplitView,
  RsetImageSplitView,
} from "@/slices/imageSlices";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const ImageRoot = () => {
  const dispatch = useDispatch();
  const imageExpandMinimap = useSelector(selectImageExpandMinimap);
  const imageSplitView = useSelector(selectImageSplitView);

  const [imageData, setImageData] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const images = await loadImagesFromFolder();
      const imageKeys = Object.keys(images);
      const data = imageKeys.reduce((acc, key, index) => {
        acc[key] = {
          imageUrl: images[key],
          forward: index < imageKeys.length - 1 ? { targetImage: imageKeys[index + 1] } : undefined,
          backward: index > 0 ? { targetImage: imageKeys[index - 1] } : undefined,
        };
        return acc;
      }, {});

      setImageData(data);
      setCurrentImage(data[imageKeys[0]]);
    }

    fetchImages();
  }, []);

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
      {/* Controllers and UI Elements */}
      <div id="sideController" className="absolute bottom-3 left-3 z-10">
        <ImageSideControllerRoot />
      </div>
      <div
        id="filterCaptureController"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ImageFilterCaptureControllerRoot navigate={navigate} />
      </div>
      <div
        id="miniMap"
        className={`absolute z-10 ${
          imageExpandMinimap
            ? "top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : "top-3 left-3"
        }`}
      >
        <MiniMapRoot />
      </div>
      {imageSplitView && (
        <div id="cancelSplitView" className="absolute top-3 right-3 z-10">
          <Button
            className="bg-white hover:bg-gray-100"
            onClick={() => {
              dispatch(RsetImageSplitView(false));
            }}
          >
            <X color="black" />
          </Button>
        </div>
      )}
    </div>
  );
};

async function loadImagesFromFolder() {
  const response = await fetch("/api/image");
  const images = await response.json();

  const imageMap = images.reduce((acc, url, index) => {
    const key = `image${index + 1}`;
    acc[key] = url;
    return acc;
  }, {});

  return imageMap;
}

export default ImageRoot;
