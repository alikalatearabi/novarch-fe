"use client";
import React, { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HardHat, LogOut, NotebookPen, ScanEye, Settings } from "lucide-react";
import SidebarButton from "./SidebarButton";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RsetCaptureActive, selectCaptureActive } from "@/slices/captureSlices";
import { useAuth } from "@/context/AuthContext";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "usehooks-ts";

import { sidebarItems } from "@/apiServices/data";

const Sidebar = (props) => {
  const auth = useAuth();
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < 576, [width]);

  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const captureActive = useSelector(selectCaptureActive);

  let isActive;
  const buttonClass = twMerge(
    'w-full flex justify-between gap-4 rounded-none hover:text-blue-500',
    false ? "bg-gradient-to-r bg-blue-200 text-black hover:bg-blue-200 " : ""
  )

  return (
    <aside
      className={twMerge('w-[200px] transition-all 0.2s max-w-xs h-[92vh] z-40 bg-white shadow', props.className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(true)}
      style={{ borderLeft: '1px solid #D8D8D8' }}
    >
      <div className="h-full relative">
        <div className={`${true ? "pt-10" : "pt-3"}`}>
          {true && (
            <div className="flex flex-col gap-3 w-full">
              {sidebarItems.links.map((item, index) => {
                isActive = item.href === '/' ? item.href === pathname : pathname.startsWith(item.href);
                return (
                  <Fragment key={index}>
                    {(index === 4 || index === 6) && <hr className="mx-2 mb-3" />}
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <SidebarButton icon={item.icon} className={buttonClass} iconActive={isActive}>
                          <span className={`${isExpanded ? "block opacity-100 transition-opacity 0.3s" : "transition-opacity 0.1s ease opacity-0 "}`}>
                            {item.label}
                          </span>
                        </SidebarButton>
                      </a>
                    ) : (
                      <Link href={item.href}>
                        <SidebarButton icon={item.icon} className={buttonClass} iconActive={isActive}>
                          <span className={`${isExpanded ? "block opacity-100 transition-opacity 0.3s" : "transition-opacity 0.1s ease opacity-0 "}`}>
                            {item.label}
                          </span>
                        </SidebarButton>
                      </Link>
                    )}
                  </Fragment>
                );
              })}

              <hr className="mx-2" />
              <div id="capture&FeildNote">
                <div
                  id="capture"
                  onClick={() => {
                    dispatch(RsetCaptureActive(true));
                  }}
                >
                  <SidebarButton
                    icon={ScanEye}
                    iconActive={captureActive}
                    className={`${buttonClass}`}
                  >
                    <div
                      className={`flex justify-start${isExpanded ? "block opacity-100 transition-opacity 0.5s" : "transition-opacity 0.3s ease opacity-0 "
                        }`}
                    >
                      <span> عکس برداری</span>
                    </div>
                  </SidebarButton>
                </div>
                <div id="feildNote">
                  <SidebarButton icon={NotebookPen} className={`${buttonClass} `} iconActive={false}>
                    <div
                      className={`flex justify-start${isExpanded ? "block opacity-100 transition-opacity 0.3s" : "transition-opacity 0.1s ease opacity-0 "
                        }`}
                    >
                      <span>نت برداری</span>
                    </div>
                  </SidebarButton>
                </div>
              </div>
            </div>
          )}

          <div className="absolute left-0 bottom-4 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Fragment>
                  <hr className="mx-2 mb-2" />
                  <Button variant="ghost" className="w-full justify-start flex gap-4 rounded-none hover:text-blue-500">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <HardHat />
                        <span
                          className={`${isExpanded ? "block opacity-100 transition-opacity 0.3s" : "transition-opacity 0.1s ease opacity-0 "
                            }`}
                        >
                          تیم
                        </span>
                      </div>
                    </div>
                  </Button>
                </Fragment>
              </PopoverTrigger>
              {/* <div className="mb-2 p-3 border bg-white m-2 rounded ">
                <div className="space-y-1">
                  <Link href="/">
                    <SidebarButton size="sm" icon={Settings} className="w-full" iconActive={isActive}>
                      تنظیمات
                    </SidebarButton>
                  </Link>
                  <Button size="sm" className="w-full bg-red-500 hover:bg-red-400" onClick={auth.signout}>
                    <span>
                      <LogOut />
                    </span>
                    <span>خروج</span>
                  </Button>
                </div>
              </div> */}
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
