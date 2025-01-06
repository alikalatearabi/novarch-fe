"use client";
import React, { useEffect } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectImageZoomLevel, RsetImageZoomLevel } from "@/slices/imageSlices";

const zoomIcon = [
  {
    icon: <ZoomIn />,
  },
  {
    icon: <ZoomOut />,
  },
];

// must add scroll zoom and zomm out

const ImageZoomInOutController = () => {
  const dispatch = useDispatch();
  const ImageZoomLevel = useSelector(selectImageZoomLevel);

  const handleZoomIn = () => {
    dispatch(RsetImageZoomLevel(Math.min(ImageZoomLevel + 0.1, 3)));
  };

  const handleZoomOut = () => {
    dispatch(RsetImageZoomLevel(Math.max(ImageZoomLevel - 0.1, 1)));
  };

 

  return (
    <div id="zoom" className="inline-flex flex-col gap-3 border shadow p-2 rounded-xl bg-white">
      <span className="cursor-pointer hover:text-blue-400" onClick={handleZoomIn}>
        <ZoomIn />
      </span>
      <span className="cursor-pointer hover:text-blue-400" onClick={handleZoomOut}>
        <ZoomOut />
      </span>
    </div>
  );
};

export default ImageZoomInOutController;
