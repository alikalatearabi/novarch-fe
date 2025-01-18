"use client";

import React, { useEffect, useState } from "react";
import HomeSheetCard from "@/components/home/HomeSheetCard";
import AddSheetsModal from "@/components/dashboard/AddSheetsModal";
import { api } from "@/api";
import { useProject } from "@/context/projectContext";
import RecentSheetCard from "@/components/home/RecentSheetCard";
import { useSheet } from "@/context/sheetContext";

import "./page.css";
import PageTransition from "@/components/transitions/PageTransition";
import { ChevronLeft, HardHat, Plus } from "lucide-react";
import { Flex, IconButton, Popover, Tooltip } from "@radix-ui/themes";

const Page = () => {
  const { project, setProject } = useProject();
  const { setLastSheetId } = useSheet();

  const [sheets, setSheets] = useState([]);
  const [recentSheets, setRecentSheets] = useState([]);
  const [showAddSheetModal, setShowAddSheetModal] = useState(false);

  useEffect(() => {
    const fetchSheets = async () => {
      if (!project.id) return;
      try {
        const response = await api.sheets.get(project.id);

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
  }, [project.id, setLastSheetId]);

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
    <PageTransition id="homeContainer" className="h-full">
      <header
        id="projectTitle"
        className="mt-5 flex justify-end items-center bg-white pb-5"
      >
        {/* <div id="projectName&Address" className="flex flex-col gap-3">
          <span className="text-[25px]" style={{ fontWeight: "bold" }}>
            {projectName || "هیچ پروژه‌ای وجود ندارد"}
          </span>
        </div> */}
        <div className="flex items-center gap-4" style={{ paddingLeft: "20px" }}>
          {project.id && (
            <button
              onClick={() => setShowAddSheetModal(true)}
              className="action-button add-button"
            >
              افزودن شیت
              <Plus />
            </button>
          )}
          <button
            onClick={() => setProject({ id: null, name: "" })}
            className="action-button back-button"
          >
            بازگشت
            <ChevronLeft />
          </button>
        </div>
      </header>

      <Flex className="w-full" direction="row" gap="2" justify="between" align="center">
        <div>
          <div className="text-[25px]" style={{ fontWeight: "bold" }}>
              {project.name || "هیچ پروژه‌ای وجود ندارد"}
          </div>
          <div className="text-sm text-gray-500">
            {project.address}
          </div>
        </div>
        <Tooltip content="تیم">
          <IconButton variant="ghost" className="p-2 me-5" >
            <HardHat size="20" />
          </IconButton>
        </Tooltip >
      </Flex>

      <div id="overFlow" className="overflow-y-auto">
        {sheets.length > 0 ? (
          <>
            <div id="plansSection" className="mt-12 bg-white">
              <header className="flex justify-between items-center">
                <span className="text-[17px] font-bold">
                  نقشه‌های فعال
                </span>
                <button
                  className="view-all-button"
                  onClick={() => {
                    alert("مشاهده همه شیت‌ها clicked!");
                  }}
                >
                  مشاهده همه شیت‌ها
                </button>
              </header>
              <div id="plans" className="plans-container">
                <HomeSheetCard sheets={sheets} setSheets={setSheets} />
              </div>
            </div>
            <div id="recentPlansSection" className="mt-10 bg-white">
              <header className="flex justify-between items-center">
                <span className="text-[17px] font-bold">
                  آخرین تصویر برداری ها
                </span>
                <button
                  className="view-all-button"
                  onClick={() => {
                    // Placeholder for view all action
                    alert("مشاهده همه تصویربرداری ها");
                  }}
                >
                  مشاهده همه تصویربرداری ها
                </button>
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
          projectId={project.id}
        />
      )}
    </PageTransition>
  );
};

export default Page;
