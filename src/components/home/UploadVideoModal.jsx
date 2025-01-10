import React, { useState } from "react";

const UploadVideoModal = ({ sheet, onClose }) => {
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
      const response = await fetch("http://localhost:8000/api/upload/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const result = await response.json();

      if (result.success) {
        console.log(result.success)
        alert(
          `ویدئو با موفقیت بارگذاری شد! تعداد فریم‌ها: ${result.responseObject.frameCount}`
        );
        onClose(); // Close the modal
      } else {
        alert("بارگذاری ویدئو ناموفق بود");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("بارگذاری ویدئو با مشکل مواجه شد");
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
