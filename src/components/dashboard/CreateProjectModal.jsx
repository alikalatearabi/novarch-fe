import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!projectName.trim()) {
      setError("نام پروژه نمی‌تواند خالی باشد");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "خطا در ایجاد پروژه");
      }

      const data = await response.json();

      onCreate(data.responseObject);

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
        <h2 className="text-xl mb-4">ایجاد پروژه جدید</h2>
        <input
          type="text"
          placeholder="نام پروژه"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose} className="bg-gray-200 text-black">
            لغو
          </Button>
          <Button
            onClick={handleCreate}
            disabled={loading}
            className={`${
              loading ? "bg-blue-300" : "bg-blue-500"
            } text-white`}
          >
            {loading ? "در حال ایجاد..." : "ایجاد"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
