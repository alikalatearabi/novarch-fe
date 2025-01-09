import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/api";

const AddSheetsModal = ({ onClose, onAddSheet, projectId }) => {
  const [sheetFile, setSheetFile] = useState(null);
  const [sheetTitle, setSheetTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSheetUpload = async () => {
    if (!sheetFile || !sheetTitle) {
      setError("عنوان و فایل شیت نمی‌توانند خالی باشند");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", sheetFile);
      // formData.append("title", sheetTitle);
      formData.append("projectId", projectId);

      const { ok, data } = await api.sheets.post(formData)

      if (!ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "خطا در آپلود شیت");
      }

      onAddSheet({ title: sheetTitle, file: sheetFile }); 
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl mb-4">افزودن شیت</h2>
        <input
          type="text"
          placeholder="عنوان شیت"
          value={sheetTitle}
          onChange={(e) => setSheetTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="file"
          onChange={(e) => setSheetFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose} className="bg-gray-200 text-black">
            لغو
          </Button>
          <Button
            onClick={handleSheetUpload}
            disabled={loading}
            className={`${
              loading ? "bg-blue-300" : "bg-blue-500"
            } text-white`}
          >
            {loading ? "در حال آپلود..." : "آپلود"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSheetsModal;
