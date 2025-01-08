'use client'
import React from "react";
import SheetsController from "@/components/sheets/SheetsController";
import SheetDetail from "@/components/sheets/SheetDetail";
import SheetCard from "@/components/sheets/SheetCard";
import SheetsTimelineRoot from "@/components/sheets/SheetsTimelineRoot";
import { useSelector } from "react-redux";

const Page = () => {
  const sheetsDetail = useSelector(selectSheetsDetail);

  return (
    <div>
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
    </div>
  );
};

export default Page;
