'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSheetsSize,
  selectSheetsView,
  RsetSheetsCurrent,
  RsetSheetsDetail,
  RsetSheetsView,
} from "@/slices/sheetsSlices";
import { api, getFileAccessUrl, GetSheetsOfProjectResponse } from "@/api";
import { useProject } from "@/context/projectContext";
import { sheetsData } from "@/utils/constants";
import { useRouter } from "next/navigation";

import SheetsController from "@/components/sheets/SheetsController";
import SheetsTimelineRoot from "@/components/sheets/SheetsTimelineRoot";
import { selectSheetsDetail } from "@/slices/sheetsSlices";
import { errorMessage } from "@/lib/toast";
import { twMerge } from "tailwind-merge";

const Page = () => {
  const sheetsDetail = useSelector(selectSheetsDetail);

  const [data, setData] = useState<GetSheetsOfProjectResponse['responseObject']>([]);

  const { projectId } = useProject();

  const dispatch = useDispatch();
  const sheetsView = useSelector(selectSheetsView);
  const sheetsSize = useSelector(selectSheetsSize);
  const router = useRouter();

  const fetchSheetsOfProject = async (projectId: number) => {
    if (!projectId) return;
    try {
        const { ok, data } = await api.sheets.get(projectId);
        if (ok) {
          setData(data.responseObject);
        }
    } catch (error) {
      errorMessage('خطا در بارگزاری تصاویر');
    }
  }

  useEffect(() => {
    fetchSheetsOfProject(projectId);
  }, [projectId]);
  
  return (
    <div>
      <div id="sheetsRootContainer">
        <div className="mx-5 relative">
          <div id="sheetsController" className="absolute bottom-1 left-1">
            <SheetsController />
          </div>
          <div id="sheetsCard&Detail">
            <div
              className={twMerge('h-[60vh] overflow-auto p-3', sheetsView === 0 ? "flex flex-wrap transition-transform gap-2" : "gap-1")}
            >
              {data.map((sheet, index) => {
                return (
                  <div className="flex flex-col gap-1" key={index}>
                    <div
                      onClick={() => {
                        dispatch(RsetSheetsCurrent({
                          id: sheet.id,
                          title: sheet.name,
                          plan: getFileAccessUrl(sheet.imagePath),
                        }));
                        dispatch(RsetSheetsDetail(true));
                        router.push(`/sheets/${sheet.id}`)
                      }}
                      id="sheetsContent"
                      className={twMerge('flex transition-all duration-500 overflow-hidden p-5 gap-5 rounded-lg border-2 shadow-sm cursor-pointer hover:border-black', sheetsView === 1 ? "flex-row h-[150px]" : "flex-col justify-center items-center")}
                    >
                      <header>{sheet.name}</header>
                      <div className="relative ml-auto mr-auto" style={{ height: '128px', width: `${sheetsView === 1 ? sheetsSize + 200 : sheetsSize + 125}px`}}>
                        <Image
                          src={getFileAccessUrl(sheet.imagePath)}
                          alt="plan"
                          fill
                          objectFit="cover"
                          className={twMerge('shadow-sm', sheetsView === 1 ? "transform transition-transform duration-500 orbiting" : "")}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="timeLine" className="mx-5 mt-5">
          <SheetsTimelineRoot />
        </div>
      </div>
    </div>
  );
};

export default Page;
