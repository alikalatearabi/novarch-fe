"use client";
import React from "react";
import ImageFilterController from "./filterAndCaptureController/ImageFilterController";
import ImagePlayTimeMoreController from "./filterAndCaptureController/ImagePlayTimeMoreController";
import ImageDateController from "./filterAndCaptureController/ImageDateController";
import { useSelector } from "react-redux";
import { selectImageSplitView } from "@/slices/imageSlices";

const ImageFilterCaptureControllerRoot = ({ navigate }) => {
  const imageSplitView = useSelector(selectImageSplitView);

  return (
    <div id="controllerContainer" className="flex gap-2">
      {!imageSplitView && <ImageFilterController />}
      <ImagePlayTimeMoreController navigate={navigate} />
      <ImageDateController />
    </div>
  );
};

export default ImageFilterCaptureControllerRoot;
