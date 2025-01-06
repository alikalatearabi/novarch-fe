import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";
import PersianDatePicker from "@/utils/PersianDatePicker";
import SelectShadcn from "@/utils/SelectShadcn";
import { Button } from "@/components/ui/button";

const selectData = [
  {
    label: "شایان",
    value: 1,
  },
  {
    label: "امیر",
    value: 2,
  },
];

const ImageFilterDrop = () => {
  return (
    <div id="dropDownContainer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div id="share" className="cursor-pointer flex gap-2 items-center">
            <SlidersHorizontal className="w-5 h-5" />
            <span>فیلتر</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-100 h-[500px] overflow-y-auto p-4 space-y-4">
          <header className="flex justify-between">
            <Button
              className="text-[12px] px-4 text-red-800 hover:bg-red-100 hover:text-red-800"
              variant={"ghost"}
            >
              حذف
            </Button>
            <div id="filter" dir="rtl" className="flex flex-col gap-2 pb-2">
              <span className="text-[18px] font-semibold">فیلترها</span>
              <span className="text-[12px] text-gray-600">0 نتیجه</span>
            </div>
          </header>
          <hr />
          {/* searchType */}
          <div id="searchType" className="space-y-2 flex flex-col gap-2" dir="rtl">
            <h3 className="text-sm font-medium text-gray-500">نوع</h3>
            <div id="checkbox" className="flex flex-col gap-4 mr-3">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="ml-2 text-sm">نت برداری</span>
              </label>
              <label className="flex items-center  gap-2">
                <Checkbox />
                <span className="ml-2 text-sm flex gap-1">
                  <span> عکس</span>
                  <span>360°</span>
                </span>
              </label>
            </div>
          </div>
          {/* dates */}
          <div className="space-y-2 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-end text-gray-500">تاریخ</h3>
            <div id="dates" className="flex flex-col gap-2 space-y-1">
              <div id="fromDate" className="">
                <PersianDatePicker className="rounded-l-xl" />
                <span className="border p-2 bg-blue-100 rounded-r-xl text-sm text-gray-500">
                  از
                </span>
              </div>
              <div id="toDate">
                <PersianDatePicker className="rounded-l-xl" />
                <span className="border p-2 bg-blue-100 rounded-r-xl text-sm text-gray-500">
                  تا
                </span>
              </div>
            </div>
          </div>
          <hr />
          {/* feidNote */}
          <div className="space-y-2 flex flex-col gap-1">
            <h3 className="text-sm font-medium text-end text-gray-500">نت ها</h3>
            <SelectShadcn items={selectData} placeholder={"منطقه"} />
            <SelectShadcn items={selectData} placeholder={"برای من"} />
            <SelectShadcn items={selectData} placeholder={"امضا شده"} />
            <SelectShadcn items={selectData} placeholder={"سازنده"} />
            <SelectShadcn items={selectData} placeholder={"وضعیت"} />
            <SelectShadcn items={selectData} placeholder={"تگ ها"} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ImageFilterDrop;
