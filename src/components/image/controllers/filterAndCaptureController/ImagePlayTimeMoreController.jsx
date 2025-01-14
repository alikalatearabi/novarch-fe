import React from "react";
import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { selectImageSplitView } from "@/slices/imageSlices";

const ImagePlayTimeMoreController = ({ navigate, uploadedAt }) => {
  const imageSplitView = useSelector(selectImageSplitView);

  // Format uploadedAt to a readable time (e.g., 1:38 PM)
  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      id="controllerContainer"
      className="flex w-full items-center gap-5 border shadow py-2 px-4 rounded-xl bg-white min-w-max"
    >
      <div id="player" className="flex gap-1">
        <div
          className="border-2 rounded-full border-black p-1 hover:border-blue-400 cursor-pointer hover:text-blue-400"
          onClick={() => navigate("forward")}
        >
          <ChevronRight className="w-3 h-3" />
        </div>
        <div
          className="border-2 rounded-full border-black p-1 hover:border-blue-400 cursor-pointer hover:text-blue-400"
          onClick={() => navigate("backward")}
        >
          <ChevronLeft className="w-3 h-3" />
        </div>
      </div>
      <div id="captureTime">
        <span className="text-sm text-gray-700">{formatTime(uploadedAt)}</span>
      </div>
      <div id="more">
        <MoreHorizontal className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default ImagePlayTimeMoreController;
