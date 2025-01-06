"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Path, Waypoints } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetImageCapturePathVisibility,
  RsetImageCapturePathWidth,
  selectImageCapturePathVisibility,
  selectImageCapturepathWidth,
} from "@/slices/imageSlices";

const pathColorData = ["#3498db", "#e67e22", "#9b59b6", "#2ecc71"];

const ImageCapturePathDrop = () => {
  const dispatch = useDispatch();
  const [pathColor, setPathColor] = useState("#3498db");
  const imageCapturePathVisibility = useSelector(selectImageCapturePathVisibility);
  const imageCapturePathWidth = useSelector(selectImageCapturepathWidth);

  return (
    <div id="capturePathDropContainer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Waypoints />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-4 space-y-4 flex flex-col gap-4 mt-2">
          <header className="text-end font-semibold">مسیر کپچر شده</header>
          <div className="text-end">
            <label className="text-sm font-medium">وضوح</label>
            <Slider
              onValueChange={(value) => dispatch(RsetImageCapturePathVisibility(value[0]))}
              min={0}
              max={100}
              value={[imageCapturePathVisibility]}
              className="mt-2"
            />

            <div className="flex justify-between text-xs mt-2">
              <span>{imageCapturePathVisibility}</span>
              <span>100%</span>
            </div>
          </div>
          <div className="text-end">
            <label className="text-sm font-medium">عرض</label>
            <Slider
              onChange={(e) => dispatch(RsetImageCapturePathWidth(Number(e.target.value)))}
              min={0}
              max={100}
              defaultValue={[imageCapturePathWidth]}
              className="mt-2"
            />
            <div className="flex justify-between text-xs mt-2">
              <span>باریک</span>
              <span>عریض</span>
            </div>
          </div>
          <div className="text-end">
            <label className="text-sm font-medium">رنگ مسیر</label>
            <div className="flex space-x-2 mt-2 justify-center">
              {pathColorData.map((color, index) => (
                <div
                  key={index}
                  className={`${
                    color === pathColor
                      ? "w-12 h-12 rounded-full border-2 border-blue-500 p-1 transition-all "
                      : "w-12 h-12 rounded-full p-1"
                  }`}
                >
                  <button
                    key={index}
                    className={`w-full h-full rounded-full border-2`}
                    style={{ backgroundColor: color }}
                    onClick={() => setPathColor(color)}
                  >
                    <span className="flex justify-center">
                      {color === pathColor && (
                        <CheckIcon color="white" className="transition-all" />
                      )}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ImageCapturePathDrop;
