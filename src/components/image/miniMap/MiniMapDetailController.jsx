"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expand, Minimize } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectImageExpandMinimap, RsetImageExpandMinimap } from "@/slices/imageSlices";
import { Button } from "@/components/ui/button";

const MiniMapDetailController = () => {
  const dispatch = useDispatch();
  const imageExpandMinimap = useSelector(selectImageExpandMinimap);

  return (
    <div id="container" className="flex border-b items-center gap-2">
      <div id="selectSheets">
        <Select dir="rtl">
          <SelectTrigger
            className={`${imageExpandMinimap ? "w-[450px]" : "w-[150px]"} rounded-none`}
          >
            <SelectValue placeholder="sheets" />
          </SelectTrigger>
          <SelectContent>
            {/* edit the selectItems for the sheets and the name  */}
            <SelectItem value="light">پشت بام</SelectItem>
            <SelectItem value="dark">طبقه اول</SelectItem>
            <SelectItem value="system">طبقه دوم</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div id="expandContainer" className="flex justify-around w-full">
        <Button
          id="expand"
          className="cursor-pointer bg-transparent hover:bg-transparent"
          onClick={() => {
            dispatch(RsetImageExpandMinimap(true));
          }}
          disabled={imageExpandMinimap}
        >
          <Expand className="w-4 h-4" color="black" />
        </Button>
        <Button
          id="minimize"
          className="cursor-pointer bg-transparent hover:bg-transparent"
          onClick={() => {
            dispatch(RsetImageExpandMinimap(false));
          }}
          disabled={!imageExpandMinimap}
        >
          <Minimize className="w-4 h-4" color="black" />
        </Button>
      </div>
    </div>
  );
};

export default MiniMapDetailController;
