"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HomeSheetCard from "@/components/home/HomeSheetCard";
import AddSheetsModal from "@/components/dashboard/AddSheetsModal";
import { api } from "@/api";
import { useProject } from "@/context/projectContext";

const Page = () => {
  const { projectName, projectId, setProjectId } = useProject(); // Access setProjectId to reset it
  const [sheets, setSheets] = useState([]);
  const [showAddSheetModal, setShowAddSheetModal] = useState(false);

  // Fetch sheets for the active project
  useEffect(() => {
    const fetchSheets = async () => {
      if (!projectId) return;
      try {
        const response = await api.sheets.get(projectId);

        if (!response.ok) {
          throw new Error("Failed to fetch sheets");
        }

        const { data } = response;
        if (data.success) {
          const formattedSheets = data.responseObject.map((sheet) => ({
            id: sheet.id,
            title: sheet.name,
            date: new Date().toLocaleDateString("fa-IR"),
            image: `http://87.248.156.130:9000/${sheet.imagePath}`,
            createdAt: sheet.createdAt,
            hasVideo: sheet.hasVideo
          }));
          console.log(formattedSheets)
          setSheets(formattedSheets);
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheets();
  }, [projectId]);

  const handleAddSheet = (newSheet) => {
    const sheetData = {
      id: new Date().getTime(), 
      title: newSheet.title || `شیت جدید`,
      date: new Date().toLocaleDateString("fa-IR"),
      image: URL.createObjectURL(newSheet.file),
      createdAt: new Date().toISOString(), 
      hasVideo: false, 
    };
    setSheets((prevSheets) => [...prevSheets, sheetData]);
  };

  return (
    <div className="relative">
      <div id="homeContainer" className="px-10 h-[100%]">
        <header id="projectTitle" className="mt-10 flex justify-between items-center bg-white pb-5">
          <div id="projectName&Address" className="flex flex-col gap-3">
            <span className="text-[25px]">{projectName || "هیچ پروژه‌ای وجود ندارد"}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Button
              onClick={() => setProjectId(null)} // Reset projectId to return to the dashboard view
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              بازگشت
            </Button>
            {projectId && (
              <Button
                onClick={() => setShowAddSheetModal(true)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                افزودن شیت
              </Button>
            )}
          </div>
        </header>

        <div id="overFlow" className="overflow-y-auto h-[90vh]">
          {sheets.length > 0 ? (
            <div id="plansSection" className="mt-10 px-10 z-10 bg-white">
              <header className="flex justify-between">
                <span className="text-[20px]">نقشه‌های فعال</span>
              </header>
              <div id="plans" className="mt-5 mr-10 cursor-pointer overflow-auto p-5">
                <HomeSheetCard sheets={sheets} setSheets={setSheets} />
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-10">هیچ شیتی وجود ندارد</div>
          )}
        </div>

        {showAddSheetModal && (
          <AddSheetsModal
            onClose={() => setShowAddSheetModal(false)}
            onAddSheet={handleAddSheet}
            projectId={projectId} // Pass projectId for API requests
          />
        )}
      </div>
    </div>
  );
};

export default Page;
