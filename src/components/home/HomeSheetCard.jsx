import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2, FiUpload, FiEdit } from "react-icons/fi";
import { toJalaali } from "jalaali-js";
import UploadVideoModal from "./UploadVideoModal";
import { useRouter } from "next/navigation";
import "./HomeSheetCard.css"; 
import { IconButton } from "@radix-ui/themes";

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/sheets/${sheetId}`, {
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

  const handleVideoUpload = (sheetId) => {
    setSheets((prevSheets) =>
      prevSheets.map((sheet) =>
        sheet.id === sheetId ? { ...sheet, hasVideo: true } : sheet
      )
    );
  };

  const handleUploadClick = (sheet) => {
    setSelectedSheet(sheet);
  };

  const convertToPersianDigits = (input) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return input.replace(/\d/g, (digit) => persianDigits[digit]);
  };

  return (
    <>
      <div id="sheetsCardContainer" className="sheets-card-container">
        {sheets.map((sheet, index) => (
          <div
            key={index}
            className={`sheet-card ${sheet.hasVideo ? "has-video" : ""}`}
            onClick={() => {
              if (sheet.hasVideo) {
                router.push(`/images?sheetId=${sheet.id}`);
              }
            }}
          >
            {/* Icons on the left side */}
            <div className="sheet-card-icons">
              {/* Delete Icon */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(sheet.id);
                }}
                radius="full"
                size="3"
                className="bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
              >
                <FiTrash2  />
              </IconButton>

              {/* Upload/Edit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSheet(sheet);
                }}
                className={`icon-button upload-icon ${sheet.hasVideo ? "edit-mode" : "upload-mode"}`}
              >
                {sheet.hasVideo ? <FiEdit /> : <FiUpload />}
              </button>
            </div>

            {/* Main card content */}
            <div id="plansImage">
              <Image
                src={sheet.image}
                width={140}
                height={30}
                alt={sheet.title}
                className="sheet-image"
              />
            </div>
            <div id="plansDetail" className="sheet-details">
              <span className="sheet-title">{sheet.title}</span>
              <span className="sheet-date">
                {convertToPersianDigits(formatToJalali(sheet.createdAt))}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedSheet && (
        <UploadVideoModal
          sheet={selectedSheet}
          onClose={() => setSelectedSheet(null)}
          onVideoUpload={handleVideoUpload}
        />
      )}
    </>
  );
};

export default HomeSheetCard;
