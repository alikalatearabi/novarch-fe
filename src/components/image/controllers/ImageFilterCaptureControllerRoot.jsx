"use client";
import React from "react";
import ImageFilterController from "./filterAndCaptureController/ImageFilterController";
import ImagePlayTimeMoreController from "./filterAndCaptureController/ImagePlayTimeMoreController";
import ImageDateController from "./filterAndCaptureController/ImageDateController";
import { useSelector } from "react-redux";
import { selectImageSplitView } from "@/slices/imageSlices";

const ImageFilterCaptureControllerRoot = ({ navigate, uploadedAt }) => {
  const imageSplitView = useSelector(selectImageSplitView);

  return (
    <div id="controllerContainer" className="flex gap-2">
      {!imageSplitView && <ImageFilterController />}
      <ImagePlayTimeMoreController navigate={navigate} uploadedAt={uploadedAt} />
      <ImageDateController uploadedAt={uploadedAt}/>
    </div>
  );
};

export default ImageFilterCaptureControllerRoot;
