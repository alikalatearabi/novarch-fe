import { SlidersHorizontal } from "lucide-react";
import React from "react";
import ImageFilterDrop from "./filterDrop/ImageFilterDrop";

const ImageFilterController = () => {
  return (
    <div
      id="controllerContainer"
      className="inline-flex gap-5 border shadow py-2 px-6 rounded-xl bg-white hover:text-blue-400"
    >
      <ImageFilterDrop />
    </div>
  );
};

export default ImageFilterController;
