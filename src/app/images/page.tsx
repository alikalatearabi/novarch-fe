'use client';

import { Button } from "@/components/ui/button";
import React from "react";
import ImageRoot from "@/components/image/ImageRoot";
import {
  selectImageSplitView,
  selectImageSplitViewLock,
  RsetImageSplitViewLock,
} from "@/slices/imageSlices";
import { useDispatch, useSelector } from "react-redux";
import { Lock, Unlock } from "lucide-react";

const Page = () => {
  const dispatch = useDispatch();
  const imageSplitView = useSelector(selectImageSplitView);
  const imageSplitViewLock = useSelector(selectImageSplitViewLock);

  return (
    <div id="container" className="relative">
      {!imageSplitView ? (
        <ImageRoot />
      ) : (
        <div className="flex gap-2 transition-all">
          <ImageRoot />
         
        </div>
      )}
      {imageSplitView && (
        // @ts-ignore
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

export default Page;
