import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ImageDateController = () => {
  return (
    <div className="flex items-center gap-5 border shadow py-2 px-4 rounded-xl bg-white hover:text-blue-400 min-w-max">
      {/* when finish make it disable */}
      <ArrowRight className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
      {/* can pick the date must fixed */}
      <span className="text-sm text-gray-900 font-medium">Aug 31, 2023</span>
      <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
    </div>
  );
};

export default ImageDateController;
