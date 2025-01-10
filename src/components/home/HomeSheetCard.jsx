import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { toJalaali } from "jalaali-js";
import UploadVideoModal from "./UploadVideoModal";
import { useRouter } from "next/navigation";

const HomeSheetCard = ({ sheets, setSheets }) => {
  const [selectedSheet, setSelectedSheet] = useState(null);
  const router = useRouter();

  const formatToJalali = (dateString) => {
    const date = new Date(dateString);
    const { jy, jm, jd } = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return `${jy}/${jm}/${jd}`;
  };

  const handleDelete = async (sheetId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/sheets/${sheetId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the sheet");
      }

      setSheets((prevSheets) => prevSheets.filter((sheet) => sheet.id !== sheetId));
    } catch (error) {
      console.error("Error deleting sheet:", error);
      alert("حذف شیت با مشکل مواجه شد");
    }
  };

  const handleViewVirtualTour = (e, sheetId) => {
    e.stopPropagation(); // Prevent card click event
    router.push(`/images?sheetId=${sheetId}`);
  };

  const handleUploadClick = (sheet) => {
    setSelectedSheet(sheet);
  };

  return (
    <>
      <div id="sheetsCardContainer" className="inline-flex gap-5 flex-wrap">
        {sheets.map((sheet, index) => (
          <div
            key={index}
            className="flex gap-5 hover:shadow-md w-[400px] items-center p-4 rounded-lg border border-gray-200 bg-white transition-shadow cursor-pointer"
            onClick={() => handleUploadClick(sheet)}
          >
            <div id="plansImage">
              <Image
                src={sheet.image}
                width={100}
                height={20}
                alt={sheet.title}
                className="rounded-md"
              />
            </div>
            <div id="plansDetail" className="flex flex-col gap-2 flex-grow">
              <span className="text-[15px] font-medium">{sheet.title}</span>
              <span className="text-[12px] text-gray-500">{formatToJalali(sheet.createdAt)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(sheet)
                  // handleDelete(sheet.id);
                }}
                className="flex justify-center items-center gap-2 px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-md shadow-sm hover:bg-red-200 hover:shadow-md"
              >
                <FiTrash2 className="w-5 h-5" />
                حذف
              </button>
              <button
                onClick={(e) => handleViewVirtualTour(e, sheet.id)}
                disabled={!sheet.hasVideo}
                className={`px-4 py-2 text-white text-sm font-small rounded-md shadow-sm ${
                  sheet.hasVideo
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                مشاهده تور مجازی
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSheet && (
        <UploadVideoModal sheet={selectedSheet} onClose={() => setSelectedSheet(null)} />
      )}
    </>
  );
};

export default HomeSheetCard;
