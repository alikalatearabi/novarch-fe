import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SortAsc } from "lucide-react";
import SelectShadcn from "@/utils/SelectShadcn";

const filterBySheetsData = [
  {
    label: "پشت بام",
    value: 1,
  },
  {
    label: "طبقه اول",
    value: 2,
  },
];
const filterByCaptureType = [
  {
    label: "360 videos",
    value: 1,
  },
  {
    label: "360 photos",
    value: 2,
  },
  {
    label: "3D scans",
    value: 3,
  },
];

const CaptureFilter = () => {
  return (
    <div id="filterContainer">
      <div id="filterInput" className="flex gap-2">
        <Input placeholder="جستجو" />
        <Button variant="ghost">
          <SortAsc />
        </Button>
      </div>
      <div id="filterSelect" className="mt-3 flex gap-2">
        <SelectShadcn items={filterBySheetsData} placeholder={"فیلتر براساس نقشه ها"} />
        <SelectShadcn items={filterByCaptureType} placeholder={" فیلتر براساس نوع کپچر "} />
      </div>
    </div>
  );
};
export default CaptureFilter;
