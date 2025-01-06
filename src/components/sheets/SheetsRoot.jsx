"use client";
import React from "react";
import SheetCard from "./SheetCard";
import SheetsController from "./SheetsController";
import SheetsTimeline from "./SheetsTimeline";
import SheetsTimelineRoot from "./SheetsTimelineRoot";
import { selectSheetsDetail } from "@/slices/sheetsSlices";
import { useSelector } from "react-redux";
import SheetDetail from "./SheetDetail";
import { Button } from "../ui/button";
import SheetsFilterModal from "./SheetsFilterModal";

const SheetsRoot = () => {
  const sheetsDetail = useSelector(selectSheetsDetail);
  return (
    <div id="sheetsRootContainer">
      <div className="mx-5 relative">
        {!sheetsDetail && (
          <div id="sheetsController" className="absolute bottom-1 left-1">
            <SheetsController />
          </div>
        )}
        <div id="sheetsCard&Detail">{sheetsDetail ? <SheetDetail /> : <SheetCard />}</div>
      </div>
      <div id="timeLine" className="mx-5 mt-5">
        <SheetsTimelineRoot />
      </div>
    </div>
  );
};

export default SheetsRoot;
