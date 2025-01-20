"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Expand, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./MiniMap.css";
import { api } from "@/api";

const MiniMapRoot = ({ sheetId, setCurrentImage, imageData }) => {
  const [sheetData, setSheetData] = useState(null);
  const [dots, setDots] = useState([]); // Start with an empty array
  const [activeDot, setActiveDot] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [imageExpandMinimap, setImageExpandMinimap] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    naturalWidth: 1, // Prevent division by 0
    naturalHeight: 1,
    renderedWidth: 250,
    renderedHeight: 150,
  });

  const imageRef = useRef(null);

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

          // Process the coordinates field into an array of dots
          const coordinates = data.responseObject.coordinates || {};
          const formattedDots = Object.entries(coordinates).map(([frame, coord]) => ({
            frame: `${sheetId}/${frame}.jpg`,
            x: coord.x,
            y: coord.y,
          }));

          // Set the dots and log them for verification
          setDots(formattedDots);
          console.log("Formatted Dots:", formattedDots);
        }
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheet();
  }, [sheetId]);

  useEffect(() => {
    if (imageData && activeDot !== null && imageData[activeDot]) {
      setCurrentImage(imageData[activeDot]);
    }
  }, [activeDot, imageData, setCurrentImage]);

  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      console.log(imageRef.current)
      const renderedWidth = imageExpandMinimap ? 600 : 250;
      const renderedHeight = imageExpandMinimap ? 300 : 150;
      setImageDimensions({ naturalWidth, naturalHeight, renderedWidth, renderedHeight });
    }
  }, [imageExpandMinimap]);

  const handleDotClick = (frame) => {
    setActiveDot(frame);
  };

  useEffect(() => {console.log(imageRef)}, [imageRef])

  return (
    <div
      id="miniMapRootContainer"
      className={`bg-white shadow-lg transition-all 0.9s ease-out relative`}
    >
      {/* Header with Dropdown and Buttons */}
      <div id="container" className="flex border-b items-center gap-2">
        <div id="selectSheets">
          <Select dir="rtl" onValueChange={setSelectedSheet}>
            <SelectTrigger className={`${imageExpandMinimap ? "w-[450px]" : "w-[150px]"} rounded-none`}>
              <SelectValue placeholder="Sheets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roof">پشت بام</SelectItem>
              <SelectItem value="floor1">طبقه اول</SelectItem>
              <SelectItem value="floor2">طبقه دوم</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div id="expandContainer" className="flex justify-around w-full">
          <Button
            id="expand"
            className="cursor-pointer bg-transparent hover:bg-transparent"
            onClick={() => setImageExpandMinimap(true)} // Update local state
            disabled={imageExpandMinimap}
          >
            <Expand className="w-4 h-4" color="black" />
          </Button>
          <Button
            id="minimize"
            className="cursor-pointer bg-transparent hover:bg-transparent"
            onClick={() => setImageExpandMinimap(false)} // Update local state
            disabled={!imageExpandMinimap}
          >
            <Minimize className="w-4 h-4" color="black" />
          </Button>
        </div>
      </div>

      {/* Image and Dots */}
      <div id="planImage" className="h-full flex items-center justify-center border relative">
        {sheetData ? (
          <>
            <Image
              src={`https://files.novaarchai.com/${sheetData.responseObject.imagePath}`}
              alt={sheetData.name || "MiniMap"}
              className="my-auto cursor-pointer"
              width={imageDimensions.renderedWidth}
              height={imageDimensions.renderedHeight}
              ref={imageRef}
              onLoad={(e) => {
                const img = e.target;
                setImageDimensions((prev) => ({
                  ...prev,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                }));
              }}
            />
            {dots.map((dot, index) => {
              const scaledX =
                (dot.x / 2100) * imageDimensions.renderedWidth;
              const scaledY =
                (dot.y / (imageExpandMinimap ? 1050 : 1200)) * imageDimensions.renderedHeight;

              return (
                <div
                  key={index}
                  className={`absolute rounded-full transition-all duration-300 ${
                    activeDot === dot.frame ? "bg-blue-600" : "bg-blue-400"
                  }`}
                  style={{
                    width: imageExpandMinimap ? (activeDot === dot.frame ? "50px" : "15px") : activeDot === dot.frame ? "30px" : "8px",
                    height: imageExpandMinimap ? (activeDot === dot.frame ? "50px" : "15px") : activeDot === dot.frame ? "30px" : "8px",
                    top: `${scaledY}px`,
                    left: `${scaledX}px`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDotClick(dot.frame)}
                ></div>
              );
            })}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MiniMapRoot;
