"use client";
import React from "react";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RsetCaptureActive, selectCaptureActive } from "@/slices/captureSlices";
import CaptureFilter from "./CaptureFilter";
import CaptureCard from "./CaptureCard";

const CaptureContainer = () => {
  const dispatch = useDispatch();
  const captureActive = useSelector(selectCaptureActive);

  console.log(captureActive);
  return (
    <div
      id="headerContainer"
      className={` ${
        captureActive ? "w-[600px] border px-5 h-[10vh]" : "w-[0px]"
      }  bg-white transition-all`}
    >
      {captureActive && (
        <>
          <header className="flex items-center justify-between mt-3">
            <div className="flex gap-5">
              <Image src={Logo} alt="logoOnCapture" width={50} height={96} />
              <div id="title" className="flex flex-col gap-1 mt-2">
                <span className="text-[15px]">کپچر شده ها</span>
                <span className="text-[12px]">8 کپچر شده</span>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(RsetCaptureActive(false));
              }}
            >
              <X />
            </div>
          </header>
          <div className="w-full bg-white border-l border-b mr-5 mt-4 pr-9 pl-2 py-4">
            <CaptureFilter />
          </div>
          <div
            id="capturesCards"
            className="h-[90vh] w-full bg-gray-100 border-l border-b mr-5 pr-9 pl-2 py-4 "
          >
            <CaptureCard />
          </div>
        </>
      )}
    </div>
  );
};

export default CaptureContainer;
