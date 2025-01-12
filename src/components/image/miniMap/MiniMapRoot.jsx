"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MiniMapDetailController from "./MiniMapDetailController";
import { useSelector } from "react-redux";
import { selectImageExpandMinimap } from "@/slices/imageSlices";
import { api } from "@/api";

const MiniMapRoot = ({ sheetId }) => {
  const imageExpandMinimap = useSelector(selectImageExpandMinimap);
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    const fetchSheet = async () => {

      if (!sheetId) return;
      try {
        const response = await api.sheets.getById(sheetId);

        if (!response.ok) {
          throw new Error("Failed to fetch sheets");
        }

        const { data } = response;
        console.log(data.success)
        if (data.success) {
          setSheetData(data);
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheet();
  }, [sheetId]);

  useEffect(() =>{
    console.log(sheetData)
  }, [sheetData])

  return (
    <div
      id="miniMapRootContainer"
      className={`${imageExpandMinimap ? "w-[600px] h-[300px]" : "w-[250px] h-[150px]"
        } bg-white shadow-lg transition-all 0.9s ease-out`}
    >
      <MiniMapDetailController />
      <div id="planImage" className="h-full flex items-center justify-center border">
        {sheetData ? (
          <Image
            src={`http://87.248.156.130:9000/${sheetData.responseObject.imagePath}`}
            alt={sheetData.name || "MiniMap"}
            className="my-auto cursor-pointer"
            width={imageExpandMinimap ? 600 : 250}
            height={imageExpandMinimap ? 300 : 150}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MiniMapRoot;
