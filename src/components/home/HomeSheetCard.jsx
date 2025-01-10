import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { toJalaali } from "jalaali-js"; // Import the toJalaali function
import UploadVideoModal from "./UploadVideoModal"; // Modal component for video upload

const HomeSheetCard = ({ sheets, setSheets }) => {
  const [selectedSheet, setSelectedSheet] = useState(null); // Track selected sheet for video upload

  const formatToJalali = (dateString) => {
    const date = new Date(dateString);
    const { jy, jm, jd } = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return `${jy}/${jm}/${jd}`;
  };

  const handleDelete = async (sheetId) => {
    try {
      // Call the delete API
      const response = await fetch(`http://localhost:8000/api/sheets/${sheetId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the sheet");
      }

      // Update the sheets state to remove the deleted sheet
      setSheets((prevSheets) => prevSheets.filter((sheet) => sheet.id !== sheetId));
    } catch (error) {
      console.error("Error deleting sheet:", error);
      alert("حذف شیت با مشکل مواجه شد");
    }
  };

  const handleUploadClick = (sheet) => {
    setSelectedSheet(sheet); // Set the clicked sheet for video upload
  };

  const handleModalClose = () => {
    setSelectedSheet(null); // Close the modal
  };

  return (
    <>
      <div id="sheetsCardContainer" className="inline-flex gap-5 flex-wrap">
        {sheets.map((sheet, index) => (
          <div
            key={index}
            className="flex gap-5 hover:shadow-md w-[400px] items-center p-4 rounded-lg border border-gray-200 bg-white transition-shadow cursor-pointer"
            onClick={() => handleUploadClick(sheet)} // Open modal on click
          >
            <div id="plansImage">
              <Image
                src={sheet.image}
                width={150}
                height={50}
                alt={sheet.title}
                className="rounded-md"
              />
            </div>
            <div id="plansDetail" className="flex flex-col gap-2 flex-grow">
              <span className="text-[15px] font-medium">{sheet.title}</span>
              {/* Display createdAt in Jalali format */}
              <span className="text-[12px] text-gray-500">
                {formatToJalali(sheet.createdAt)}
              </span>
            </div>
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event bubbling to the card
                handleDelete(sheet.id);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-md shadow-sm hover:bg-red-200 hover:shadow-md transition-all"
            >
              <FiTrash2 className="w-5 h-5" />
              حذف
            </button>
          </div>
        ))}
      </div>

      {selectedSheet && (
        <UploadVideoModal
          sheet={selectedSheet}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default HomeSheetCard;
