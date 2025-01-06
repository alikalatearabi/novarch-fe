"use client";
import React from "react";
import Image from "next/image";
import MiniMapDetailController from "./MiniMapDetailController";
import MinimapImage from "../../../../public/images/minimapimage.png";
import { useSelector, useDispatch } from "react-redux";
import { selectImageExpandMinimap } from "@/slices/imageSlices";

const MiniMapRoot = () => {
  const dispatch = useDispatch();
  const imageExpandMinimap = useSelector(selectImageExpandMinimap);

  return (
    <div
      id="miniMapRootContainer"
      className={`${
        imageExpandMinimap ? "w-[600px] h-[300px] " : "w-[250px] h-[150px] "
      }  bg-white shadow-lg transition-all 0.9s ease-out`}
    >
      <MiniMapDetailController />
      <div id="planImage" className="h-full flex items-center justify-center border">
        <Image src={MinimapImage} alt="minimap" className="my-auto cursor-pointer" />
      </div>
    </div>
  );
};

export default MiniMapRoot;
