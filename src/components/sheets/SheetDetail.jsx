"use client";
import { RsetSheetsDetail, selectSheetsCurrent, selectSheetsDetail } from "@/slices/sheetsSlices";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const SheetDetail = () => {
  const dispatch = useDispatch();
  const sheetsDetail = useSelector(selectSheetsDetail);
  const sheetsCurrent = useSelector(selectSheetsCurrent);

  return (
    <div id="sheetsDetailContainer" className="h-[60vh] p-10">
      <header className="flex justify-between">
        <div id="sheetsTitle" className="text-[30px]">
          {" "}
          {sheetsCurrent.title}
        </div>
        <div id="closeBtn">
          <Button
            className="bg-transparent border hover:bg-gray-100"
            onClick={() => {
              dispatch(RsetSheetsDetail(false));
            }}
          >
            <X color="black" />
          </Button>
        </div>
      </header>
      <div id="sheet" className="flex justify-center mt-5">
        <Image
          src={sheetsCurrent.plan}
          alt={sheetsCurrent.title}
          width={600}
          className="border shadow-lg p-5 rounded-lg"
        />
      </div>
    </div>
  );
};

export default SheetDetail;
