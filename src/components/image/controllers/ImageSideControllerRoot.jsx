"use client";
import React from "react";
import ImageBimSpliteController from "./sideControllers/ImageBimSpliteController";
import ImageBrightnessCapturePath from "./sideControllers/ImageBrightnessCapturePath";
import ImageZoomInOutController from "./sideControllers/ImageZoomInOutController";
import { useSelector, useDispatch } from "react-redux";
import { selectImageSplitView } from "@/slices/imageSlices";

const ImageSideControllerRoot = () => {
  const dispatch = useDispatch();
  const imageSplitView = useSelector(selectImageSplitView);

  return (
    <div id="sideControllerContainer" className="flex flex-col gap-3">
      <ImageBrightnessCapturePath />
      {!imageSplitView && <ImageBimSpliteController />}
      <ImageZoomInOutController />
    </div>
  );
};

export default ImageSideControllerRoot;
