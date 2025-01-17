"use client";

import React, { useEffect, useState } from "react";
import HomeSheetCard from "@/components/home/HomeSheetCard";
import AddSheetsModal from "@/components/dashboard/AddSheetsModal";
import { api } from "@/api";
import { useProject } from "@/context/projectContext";
import RecentSheetCard from "@/components/home/RecentSheetCard";
import { useSheet } from "@/context/sheetContext";

import "./page.css";

const Page = () => {
  const { projectName, projectId, setProjectId } = useProject();
  const { setLastSheetId } = useSheet();

  const [sheets, setSheets] = useState([]);
  const [recentSheets, setRecentSheets] = useState([]);
  const [showAddSheetModal, setShowAddSheetModal] = useState(false);

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
            image: `https://files.novaarchai.com/${sheet.imagePath}`,
            createdAt: sheet.createdAt,
            hasVideo: sheet.hasVideo,
          }));
          setSheets(formattedSheets);

          if (formattedSheets.length > 0) {
            setLastSheetId(formattedSheets[0].id);
          }

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
  }, [projectId, setLastSheetId]);

  useEffect(() => {
    setRecentSheets(
      sheets
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    );
  }, [sheets]);

  const handleAddSheet = (newSheet) => {
    const sheetData = {
      id: newSheet.id,
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

    setLastSheetId(sheetData.id);
  };

  return (
    <div id="homeContainer" className="h-full">
      <header
        id="projectTitle"
        className="mt-5 flex justify-between items-center bg-white pb-5"
      >
        <div id="projectName&Address" className="flex flex-col gap-3">
          <span className="text-[25px]" style={{ fontWeight: "bold" }}>
            {projectName || "هیچ پروژه‌ای وجود ندارد"}
          </span>
        </div>
        <div className="flex items-center gap-4" style={{ paddingLeft: "20px" }}>
          {projectId && (
            <button
              onClick={() => setShowAddSheetModal(true)}
              className="action-button add-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              افزودن شیت
            </button>
          )}
          <button
            onClick={() => setProjectId(null)}
            className="action-button back-button"
          >
            بازگشت
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </header>

      <div id="overFlow" className="overflow-y-auto h-[75vh]">
        {sheets.length > 0 ? (
          <>
            <div id="plansSection" className="mt-10 mr-10 bg-white">
              <header className="flex justify-between">
                <span className="text-[17px]" style={{ fontWeight: "bold" }}>
                  نقشه‌های فعال
                </span>
              </header>
              <div id="plans" className="plans-container">
                <HomeSheetCard sheets={sheets} setSheets={setSheets} />
              </div>
            </div>

            <div id="recentPlansSection" className="mt-10 mr-10 bg-white">
              <header className="flex justify-between">
                <span className="text-[17px]" style={{ fontWeight: "bold" }}>
                  نقشه‌های اخیر
                </span>
              </header>
              <div id="recentPlans" className="plans-container">
                <RecentSheetCard sheets={recentSheets} setSheets={setSheets} />
              </div>
            </div>

            <div
              id="notesSection"
              className="mt-10 px-10 z-10 bg-gray-100 p-5 rounded-lg shadow-md"
            >
              <header className="flex items-center gap-2">
                <span className="text-[20px]">یادداشت‌ها</span>
              </header>
              <div className="no-notes">
                <p>هیچ یادداشتی وجود ندارد</p>
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
  );
};

export default Page;
