import React, { useState } from "react";
import axios from "axios";
import './modal.css'

const UploadVideoModal = ({ sheet, onClose, onVideoUpload }) => {
  console.log(sheet)
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    setIsUploading(true);

    try {
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_API_ADDRESS}/api/upload/upload-video`,
        formData,
        {
          timeout: 600000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        alert(
          `ویدئو با موفقیت بارگذاری شد! تعداد فریم‌ها: ${response.data.responseObject.frameCount}`
        );
        onVideoUpload(sheet.id);
        onClose();
      } else {
        alert("بارگذاری ویدئو ناموفق بود");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        alert("بارگذاری ویدئو به دلیل تایم اوت متوقف شد");
      } else {
        alert("بارگذاری ویدئو با مشکل مواجه شد");
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          بارگذاری ویدئو برای {sheet.title}
        </h3>
        <div className="mb-4">
          <label
            htmlFor="video-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            انتخاب ویدئو:
          </label>
          <input
            type="file"
            accept="video/*"
            id="video-upload"
            onChange={handleFileChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {isUploading && (
          <div className="mb-4">
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{uploadProgress}% بارگذاری</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleUpload}
            className={`px-4 py-2 rounded-md text-white ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
