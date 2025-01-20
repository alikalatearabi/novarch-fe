import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2, FiUpload, FiEdit } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { toJalaali } from "jalaali-js";
import UploadVideoModal from "./UploadVideoModal";
import "./RecentSheetCard.css";

const RecentSheetCard = ({ sheets, setSheets }) => {
    const [selectedSheet, setSelectedSheet] = useState(null);

    const formatToJalali = (dateString) => {
        const date = new Date(dateString);
        const { jy, jm, jd } = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return `${jy}/${jm}/${jd}`;
    };

    const convertToPersianDigits = (input) => {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return input.replace(/\d/g, (digit) => persianDigits[digit]);
    };

    const handleDelete = async (sheetId) => {
        try {
            // Delete logic
            setSheets((prevSheets) => prevSheets.filter((sheet) => sheet.id !== sheetId));
        } catch (error) {
            console.error("Error deleting sheet:", error);
        }
    };

    const handleUploadClick = (sheet) => {
        setSelectedSheet(sheet);
    };

    return (
        <>
            <div className="recent-sheets-container">
                {sheets.map((sheet, index) => (
                    <div key={index} className="recent-sheet-card">
                        {/* Image */}
                        <div className="sheet-image-container">
                            <Image
                                src={sheet.image}
                                width={300}
                                height={150}
                                alt={sheet.title}
                                className="recent-sheet-image"
                            />
                        </div>

                        {/* User Avatar, Name, and Date */}
                        <div className="sheet-header">
                            <div className="sheet-user-info">
                                <div className="user-avatar">
                                    <FaUser />
                                </div>
                                <span className="user-name">پیمان نوری</span>
                            </div>
                            <div className="sheet-date">
                                {convertToPersianDigits(formatToJalali(sheet.createdAt))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="recent-sheet-actions">
                            <button
                                className="icon-button delete-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(sheet.id);
                                }}
                            >
                                <FiTrash2 />
                            </button>
                            <button
                                className={`icon-button upload-icon ${sheet.hasVideo ? "edit-mode" : "upload-mode"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUploadClick(sheet);
                                }}
                            >
                                {sheet.hasVideo ? <FiEdit /> : <FiUpload />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedSheet && (
                <UploadVideoModal
                    sheet={selectedSheet}
                    onClose={() => setSelectedSheet(null)}
                    onVideoUpload={(sheetId) => {
                        setSheets((prevSheets) =>
                            prevSheets.map((sheet) =>
                                sheet.id === sheetId ? { ...sheet, hasVideo: true } : sheet
                            )
                        );
                    }}
                />
            )}
        </>
    );
};

export default RecentSheetCard;
