"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RsetCaptureActive, selectCaptureActive } from "@/slices/captureSlices";
import CaptureFilter from "./CaptureFilter";
import CaptureCard from "./CaptureCard";
import { api } from "@/api";
import { useProject } from "@/context/projectContext";

import "./CaptureContainer.css";

const CaptureContainer = () => {
  const { project } = useProject();
  const dispatch = useDispatch();
  const captureActive = useSelector(selectCaptureActive);

  const [sheets, setSheets] = useState([]);

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
            date: new Date(sheet.createdAt).toLocaleDateString("fa-IR"), // Format date
            image: sheet.imagePath, // Sheet image URL
            location: sheet.location || "نامشخص", // Add location if available
            hasVideo: sheet.hasVideo,
          }));
          setSheets(formattedSheets);
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheets();
  }, [project.id]);

  return (
    <div
      id="headerContainer"
      className={`capture-container ${captureActive ? "capture-active" : ""}`}
    >
      {captureActive && (
        <>
          <header className="capture-header">
            <div className="capture-logo-title">
              <div id="title" className="capture-title">
                <span className="capture-title-main">کپچر شده ها</span>
                <span className="capture-title-sub">{sheets.length} کپچر شده</span>
              </div>
            </div>
            <div
              className="capture-close-icon"
              onClick={() => {
                dispatch(RsetCaptureActive(false));
              }}
            >
              <X />
            </div>
          </header>
          <div className="capture-filter">
            <CaptureFilter />
          </div>
          <div id="capturesCards" className="capture-cards">
            {sheets.map((sheet) => (
              <CaptureCard
                key={sheet.id}
                image={sheet.image}
                date={sheet.date}
                location={sheet.title}
                hasVideo={sheet.hasVideo}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CaptureContainer;
