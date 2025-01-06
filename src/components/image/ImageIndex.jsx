"use client";
import React from "react";
import ImageRoot from "./ImageRoot";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImageSplitView,
  selectImageSplitViewLock,
  RsetImageSplitViewLock,
} from "@/slices/imageSlices";
import { Button } from "../ui/button";
import { Lock, Unlock } from "lucide-react";


const ImageIndex = () => {
  const dispatch = useDispatch();
  const imageSplitView = useSelector(selectImageSplitView);
  const imageSplitViewLock = useSelector(selectImageSplitViewLock);

  return (
    <div id="container" className="relative">
      {!imageSplitView ? (
        <ImageRoot/>
      ) : (
        <div className="flex gap-2 transition-all">
          <ImageRoot />
         
        </div>
      )}
      {imageSplitView && (
        <Button
          className={`absolute top-1/2 left-1/2 px-1.5 transform -translate-x-1/2 -translate-y-1/2 ${
            !imageSplitViewLock ? "bg-white hover:bg-gray-100" : "bg-blue-500 hover:bg-blue-400"
          }`}
          onClick={() => {
            dispatch(RsetImageSplitViewLock(!imageSplitViewLock));
          }}
        >
          {imageSplitViewLock ? <Lock /> : <Unlock color="black" />}
        </Button>
      )}
    </div>
  );
};

export default ImageIndex;
