import { Sun, Waypoints } from "lucide-react";
import React from "react";
import ImageBrightnessDrop from "./brightnessDrop/ImageBrightnessDrop";
import ImageCapturePathDrop from "./capturePathDrop/ImageCapturePathDrop";

const controllerData = [
  {
    id: "brightness",
    icon: <ImageBrightnessDrop />,
  },
  {
    id: "capturePath",
    icon: <ImageCapturePathDrop />,
  },
];

const ImageBrightnessCapturePath = () => {
  return (
    <div
      id="controllerContainer"
      className="inline-flex flex-col gap-5 border shadow p-2 rounded-xl bg-white"
    >
      {controllerData.map((item, index) => {
        return (
          <div id="share" className="cursor-pointer hover:text-blue-400" key={index}>
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

export default ImageBrightnessCapturePath;
