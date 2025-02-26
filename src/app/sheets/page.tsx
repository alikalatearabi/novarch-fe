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
import { api, GetSheetsOfProjectResponse } from "@/api";
import { useProject } from "@/context/projectContext";
import { sheetsData } from "@/utils/constants";
import { useRouter } from "next/navigation";

import SheetsController from "@/components/sheets/SheetsController";
import SheetsTimelineRoot from "@/components/sheets/SheetsTimelineRoot";
import { selectSheetsDetail } from "@/slices/sheetsSlices";
import { errorMessage } from "@/lib/toast";
import { twMerge } from "tailwind-merge";
import { useQuery } from "react-query";
import { Flex, Spinner } from "@radix-ui/themes";
import MotionDiv from "@/components/transitions/MotionDiv";
import ListComponent from "@/components/List";
import { ImageComponent } from "@/components/Image";

const Page = () => {
  const sheetsDetail = useSelector(selectSheetsDetail);
  const { project } = useProject();

  const { data, isLoading } = useQuery({
    queryKey: ['fetchSheetsOfProject', project.id],
    queryFn: async () => {
      const { ok, data } = await api.sheets.get(project.id);
      return data;
    }
  });

  const dispatch = useDispatch();
  const sheetsView = useSelector(selectSheetsView);
  const sheetsSize = useSelector(selectSheetsSize);
  const router = useRouter();

  return (
    <div>
      <div id="sheetsRootContainer">
        <div className="relative">
          <div id="sheetsController" className="absolute bottom-1 left-1">
            <SheetsController />
          </div>
          <div id="sheetsCard&Detail">
            <ListComponent
              loading={isLoading}
              dataSource={data?.responseObject}
              className={twMerge('h-[60vh] overflow-auto p-3', sheetsView === 0 ? "transition-transform gap-2" : "gap-1 block")}
              renderItem={(sheet) => (
                <div className="flex flex-col gap-1 w-full">
                  <div
                    onClick={() => {
                      dispatch(RsetSheetsCurrent({
                        id: sheet.id,
                        title: sheet.name,
                        plan: sheet.imagePath,
                      }));
                      dispatch(RsetSheetsDetail(true));
                      router.push(`/sheets/${sheet.id}`)
                    }}
                    id="sheetsContent"
                    className={twMerge('flex transition-all duration-500 overflow-hidden p-5 gap-5 rounded-lg border-2 shadow-sm cursor-pointer hover:border-black', sheetsView === 1 ? "flex-row h-[150px]" : "flex-col justify-center items-center")}
                  >
                    <header>{sheet.name}</header>
                    <div className="relative ml-auto mr-auto" style={{ height: '128px', width: `${sheetsView === 1 ? sheetsSize + 200 : sheetsSize + 125}px` }}>
                      <ImageComponent
                        isSecured
                        src={sheet.imagePath}
                        alt="plan"
                        fill
                        objectFit="cover"
                        className={twMerge('-z-10', sheetsView === 1 ? "transform transition-transform duration-500 orbiting" : "")}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div id="timeLine" className="mt-5 -ms-4">
          <SheetsTimelineRoot />
        </div>
      </div>
    </div>
  );
};

export default Page;
