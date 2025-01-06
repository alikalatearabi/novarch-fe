import React, { Fragment } from "react";
import {
  Rewind,
  FastForward,
  Play,
  Pause,
  MoreHorizontal,
  ChevronLast,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectImageSplitView } from "@/slices/imageSlices";

const playerData = [
  {
    icon: <ChevronLast className="w-3 h-3  " />,
  },
  {
    icon: <ChevronRight className="w-3 h-3 " />,
  },
  {
    icon: <Play className="w-3 h-3 " />,
  },
  {
    icon: <ChevronLeft className="w-3 h-3 " />,
  },
  {
    icon: <ChevronFirst className="w-3 h-3 " />,
  },
];

const ImagePlayTimeMoreController = () => {
  const imageSplitView = useSelector(selectImageSplitView);
  return (
    <div
      id="controllerContainer"
      className="flex w-full items-center gap-5 border shadow py-2 px-4 rounded-xl bg-white min-w-max"
    >
      <div id="player" className="flex gap-1">
        {playerData.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              {imageSplitView && (index === 0 || index === 2 || index === 4) ? null : (
                <div
                  key={index}
                  className="border-2 rounded-full border-black p-1 hover:border-blue-400 cursor-pointer hover:text-blue-400"
                >
                  {item.icon}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div id="captureTime">
        <span className="text-sm text-gray-700">1:38 ب.ظ</span>
      </div>
      <div id="more">
        {/* when clicked open dropdown menu */}
        <MoreHorizontal className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default ImagePlayTimeMoreController;
