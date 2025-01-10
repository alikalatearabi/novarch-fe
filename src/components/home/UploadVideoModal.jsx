import React, { useState } from "react";

const UploadVideoModal = ({ sheet, onClose }) => {
  const [videoFile, setVideoFile] = useState(null);

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

    try {
      const response = await fetch("/api/uploadVideo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      alert("ویدئو با موفقیت بارگذاری شد");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("بارگذاری ویدئو با مشکل مواجه شد");
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            بارگذاری
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoModal;
