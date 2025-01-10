import React, { useState } from "react";
import axios from "axios";

const UploadVideoModal = ({ sheet, onClose, onVideoUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload status

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("لطفا یک فایل انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("sheetId", sheet.id);

    setIsUploading(true); // Set uploading state

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/upload-video",
        formData,
        {
          timeout: 600000, // Set timeout to 10 seconds
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper headers
          },
        }
      );

      if (response.data.success) {
        alert(
          `ویدئو با موفقیت بارگذاری شد! تعداد فریم‌ها: ${response.data.responseObject.frameCount}`
        );
        onVideoUpload(sheet.id); // Notify parent about the successful upload
        onClose(); // Close the modal
      } else {
        alert("بارگذاری ویدئو ناموفق بود");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request canceled:", error.message);
      } else if (error.code === "ECONNABORTED") {
        alert("بارگذاری ویدئو به دلیل تایم اوت متوقف شد");
      } else {
        console.error("Error uploading video:", error);
        alert("بارگذاری ویدئو با مشکل مواجه شد");
      }
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h3 className="text-lg font-medium mb-4">بارگذاری ویدئو برای {sheet.title}</h3>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={handleUpload}
            className={`px-4 py-2 rounded-md text-white ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isUploading}
          >
            {isUploading ? "در حال بارگذاری..." : "بارگذاری"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            disabled={isUploading}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoModal;

