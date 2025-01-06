import { Download, Forward } from "lucide-react";
import React from "react";

const controllerData = [
  {
    icon: <Download />,
  },
  {
    icon: <Forward />,
  },
];

const ImageShareDownloadController = () => {
  return (
    <div
      id="controllerContainer"
      className="inline-flex gap-5 border shadow p-2 rounded-xl bg-white"
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

export default ImageShareDownloadController;
