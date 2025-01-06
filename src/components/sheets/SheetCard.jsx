"use client";

import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Plans from "../../../public/images/plansImage.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSheetsSize,
  selectSheetsView,
  RsetSheetsCurrent,
  RsetSheetsDetail,
  selectSheetsDetail,
  selectSheetsCurrent,
  RsetSheetsView,
} from "@/slices/sheetsSlices";

const sheetsData = [
  {
    title: "پشت بام",
    plan: Plans,
  },
  {
    title: "طبقه 1",
    plan: Plans,
  },
  {
    title: "طبقه 2",
    plan: Plans,
  },
  {
    title: "طبقه 3",
    plan: Plans,
  },
  {
    title: "طبقه 4",
    plan: Plans,
  },
];

const SheetCard = () => {
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();
  const sheetsView = useSelector(selectSheetsView);
  const sheetsSize = useSelector(selectSheetsSize);

  useEffect(() => {
    dispatch(RsetSheetsView(0));
  }, []);

  // sheetsView === 1 layer
  return (
    <div
      className={`${
        sheetsView === 0 ? "flex flex-wrap transition-transform" : ""
      } gap-1 h-[60vh] overflow-auto p-3`}
    >
      {sheetsData.map((sheets, index) => {
        return (
          <div className="flex flex-col gap-1 p-3" key={index}>
            <div
              onClick={() => {
                const sheet = {
                  title: sheets.title,
                  plan: sheets.plan,
                };
                dispatch(RsetSheetsCurrent(sheet));
                dispatch(RsetSheetsDetail(true));
              }}
              id="sheetsContent"
              className={`flex transition-all duration-500 ${
                sheetsView === 1 ? "flex-row" : "flex-col justify-center items-center"
              }  p-5 gap-5 rounded-lg border-2 shadow-sm cursor-pointer hover:border-black`}
            >
              <header>{sheets.title}</header>
              <div className="relative mx-auto">
                <Image
                  src={sheets.plan}
                  alt="plan"
                  width={sheetsView === 1 ? sheetsSize + 100 : sheetsSize + 250}
                  className={`shadow-sm ${
                    sheetsView === 1 ? "transform transition-transform  duration-500 orbiting " : ""
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SheetCard;
