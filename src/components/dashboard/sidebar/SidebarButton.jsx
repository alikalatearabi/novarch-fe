"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCaptureActive } from "@/slices/captureSlices";

const SidebarButton = ({ icon: Icon, className, children, iconActive, ...props }) => {
  const captureActive = useSelector(selectCaptureActive);
  const [showAccordion, setShowAccordion] = useState(false);

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        className={cn("flex justify-start", className)}
        {...props}
        onClick={() => {
          setShowAccordion(!showAccordion);
        }}
      >
        <div id="title" className="flex items-center gap-2">
          <span className={`p-2 ${iconActive ? "rounded-lg bg-gray-200" : ""}`}>
            {Icon && <Icon size={20} color={`${iconActive ? "blue" : "black"}`} />}
          </span>
          <span className="mr-3">{children}</span>
        </div>
      </Button>
      {/* <div id="subContainer" className="flex flex-col items-center">
        {/* fix the transition */}
      <div
        id="accordion"
        className={cn(
          "flex flex-col w-[80%] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          { show: showAccordion }
        )}
      >
        {/* {showAccordion &&
            subitems?.map((item, idx) => {
              return (
                <Link to={item.href} key={idx}>
                  <SideBarButton size="sm" className="w-full justify-start ">
                    {item.label}
                  </SideBarButton>
                </Link>
              );
            })} */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default SidebarButton;
