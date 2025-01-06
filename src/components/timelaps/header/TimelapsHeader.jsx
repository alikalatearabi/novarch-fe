"use client";
import React from "react";
import SelectShadcn from "@/utils/SelectShadcn";
import { SortAsc, SortDesc, SortDescIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RsetTimelapsSortAsc, selectTimelapsSortAsc } from "@/slices/timelapsSlices";
import { Button } from "@/components/ui/button";

const selectSortData = [
  {
    label: "تاریخ ایجاد",
    value: 1,
  },
  {
    label: "عنوان",
    value: 2,
  },
  {
    label: "قابل شمارش",
    value: 3,
  },
];

const TimelapsHeader = () => {
  const dispatch = useDispatch();
  const timelapsSortAsc = useSelector(selectTimelapsSortAsc);
  console.log(timelapsSortAsc);

  return (
    <div id="headerContainer" className="px-6 py-5">
      <div id="title" className="flex flex-col gap-2">
        <span className="text-[18px]">ویدیو های تایم لپس</span>
        <span className="text-gray-500 text-[12px]"> 19 ویدیو ایجاد شده </span>
      </div>
      <div id="sortContainer" className="flex items-center mt-5 gap-2">
        <div id="sortSelect" className="w-[20%] ">
          <SelectShadcn
            label={"مرتب کردن با :"}
            items={selectSortData}
            placeholder={selectSortData[0].label}
          />
        </div>
        <Button
          className="border rounded-lg p-2 cursor-pointer transition-all bg-white hover:bg-gray-100"
          onClick={() => {
            dispatch(RsetTimelapsSortAsc(!timelapsSortAsc));
            console.log(timelapsSortAsc);
          }}
        >
          {timelapsSortAsc ? <SortAsc color="black" /> : <SortDesc color="black" />}
        </Button>
      </div>
    </div>
  );
};

export default TimelapsHeader;
