"use client";
import React from "react";
import ImageCard from "./ImageCard";
import ImageShareDownloadController from "./controllers/ImageShareDownloadController";
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

  return (
    <div id="imageContainer" className="relative h-[88vh]">
      <ImageCard />
      {/* <div id="download&share" className="absolute top-3 right-[50%]">
        <ImageShareDownloadController />
      </div> */}
      <div id="sideController" className="absolute bottom-3 left-3">
        <ImageSideControllerRoot />
      </div>
      <div
        id="filterCaptureController"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
      >
        <ImageFilterCaptureControllerRoot />
      </div>
      <div
        id="miniMap"
        className={`absolute  ${
          imageExpandMinimap
            ? "top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : "top-3 left-3"
        } `}
      >
        <MiniMapRoot />
      </div>
      {imageSplitView && (
        <div id="cancelSplitView" className="absolute top-3 right-3">
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

export default ImageRoot;
