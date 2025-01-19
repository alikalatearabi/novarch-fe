"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MiniMapDetailController from "./MiniMapDetailController";
import { useSelector } from "react-redux";
import { selectImageExpandMinimap } from "@/slices/imageSlices";
import { api } from "@/api";
import './MiniMap.css';

const MiniMapRoot = ({ sheetId, setCurrentImage, imageData }) => {
  const imageExpandMinimap = useSelector(selectImageExpandMinimap);
  const [sheetData, setSheetData] = useState(null);

  // Mock dots data
  const [dots, setDots] = useState([
    { x: 20, y: 30, frame: "47/frame_0001.jpg" },
    { x: 50, y: 60, frame: "47/frame_0002.jpg" },
    { x: 80, y: 90, frame: "47/frame_0003.jpg" },
  ]);

  useEffect(() => {
    const fetchSheet = async () => {
      if (!sheetId) return;
      try {
        const response = await api.sheets.getById(sheetId);

        if (!response.ok) {
          throw new Error("Failed to fetch sheets");
        }

        const { data } = response;
        if (data.success) {
          setSheetData(data);
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheet();
  }, [sheetId]);

  const handleDotClick = (frame) => {
    const targetImage = imageData[frame];
    if (targetImage) {
      setCurrentImage(targetImage);
    }
  };

  return (
    <div
      id="miniMapRootContainer"
      className={`${
        imageExpandMinimap ? "w-[600px] h-[300px]" : "w-[250px] h-[150px]"
      } bg-white shadow-lg transition-all 0.9s ease-out relative`}
    >
      <MiniMapDetailController />
      <div id="planImage" className="h-full flex items-center justify-center border relative">
        {sheetData ? (
          <>
            <Image
              src={`https://files.novaarchai.com/${sheetData.responseObject.imagePath}`}
              alt={sheetData.name || "MiniMap"}
              className="my-auto cursor-pointer"
              width={imageExpandMinimap ? 600 : 250}
              height={imageExpandMinimap ? 300 : 150}
            />
            {/* Render dots */}
            {dots.map((dot, index) => (
              <div
                key={index}
                className="absolute bg-red-500 rounded-full"
                style={{
                  width: imageExpandMinimap ? "15px" : "8px",
                  height: imageExpandMinimap ? "15px" : "8px",
                  top: `${dot.y}%`,
                  left: `${dot.x}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => handleDotClick(dot.frame)}
              ></div>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MiniMapRoot;
