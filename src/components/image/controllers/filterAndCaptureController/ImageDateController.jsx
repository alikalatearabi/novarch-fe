import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ImageDateController = ({ uploadedAt }) => {
  // Format the uploadedAt timestamp into a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "No date available";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-5 border shadow py-2 px-4 rounded-xl bg-white hover:text-blue-400 min-w-max">
      {/* Navigation arrows for date */}
      <ArrowRight className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
      {/* Display the formatted upload date */}
      <span className="text-sm text-gray-900 font-medium">
        {formatDate(uploadedAt)}
      </span>
      <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer hover:text-blue-400" />
    </div>
  );
};

export default ImageDateController;
