"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HomeSheetCard from "@/components/home/HomeSheetCard";
import AddSheetsModal from "@/components/dashboard/AddSheetsModal";
import { api } from "@/api";
import { useProject } from "@/context/projectContext";

const Page = () => {
  const { projectName, projectId, setProjectId } = useProject();
  const [sheets, setSheets] = useState([]);
  const [recentSheets, setRecentSheets] = useState([]);
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
            hasVideo: sheet.hasVideo,
          }));
          setSheets(formattedSheets);
          setRecentSheets(
            formattedSheets
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
          );
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
    setRecentSheets((prevSheets) =>
      [sheetData, ...prevSheets]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    );
  };

  return (
    <div className="relative">
      <div id="homeContainer" className="px-10 h-[100%]">
        <header id="projectTitle" className="mt-10 flex justify-between items-center bg-white pb-5">
          <div id="projectName&Address" className="flex flex-col gap-3">
            <span className="text-[25px]">{projectName || "هیچ پروژه‌ای وجود ندارد"}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setProjectId(null)}
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

        <div id="overFlow" className="overflow-y-auto h-[75vh]">
          {sheets.length > 0 ? (
            <>
              <div id="plansSection" className="mt-10 px-10 z-10 bg-white">
                <header className="flex justify-between">
                  <span className="text-[20px]">نقشه‌های فعال</span>
                </header>
                <div id="plans" className="mt-5 mr-10 cursor-pointer overflow-auto p-5">
                  <HomeSheetCard sheets={sheets} setSheets={setSheets} />
                </div>
              </div>

              <div id="recentPlansSection" className="mt-10 px-10 z-10 bg-white">
                <header className="flex justify-between">
                  <span className="text-[20px]">نقشه‌های اخیر</span>
                </header>
                <div id="recentPlans" className="mt-5 mr-10 cursor-pointer overflow-auto p-5">
                  <HomeSheetCard sheets={recentSheets} setSheets={setSheets} />
                </div>
              </div>

              {/* Notes Section */}
              <div
                id="notesSection"
                className="mt-10 px-10 z-10 bg-gray-100 p-5 rounded-lg shadow-md"
              >
                <header className="flex justify-between items-center">
                  <span className="text-[20px] flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    یادداشت‌ها
                  </span>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">افزودن یادداشت</Button>
                </header>
                <div className="mt-5 space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      📝
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">یادداشت ۱</h4>
                      <p className="text-sm text-gray-600">
                        این یادداشت برای شیت شماره ۱ است.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                      📌
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">یادداشت ۲</h4>
                      <p className="text-sm text-gray-600">
                        این یادداشت برای شیت شماره ۲ است.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center mt-10">هیچ شیتی وجود ندارد</div>
          )}
        </div>

        {showAddSheetModal && (
          <AddSheetsModal
            onClose={() => setShowAddSheetModal(false)}
            onAddSheet={handleAddSheet}
            projectId={projectId}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
