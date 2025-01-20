"use client";
import { RsetSheetsDetail, selectSheetsCurrent, selectSheetsDetail } from "@/slices/sheetsSlices";
import React, { createRef, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import SheetsController from "@/components/sheets/SheetsController";
import SheetsTimelineRoot from "@/components/sheets/SheetsTimelineRoot";
import { Button } from "@/components/ui/button";
import { sheetsData } from "@/utils/constants";

import ThreeScene from "@/components/ThreeScene";
import { useQuery } from "react-query";
import { api } from "@/api";

const Page = ({ params }) => {
    const route = useRouter();

    const { data } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const { data } = await api.sheets.getById(params.id);
            return data?.responseObject;
        }
    });

    const dispatch = useDispatch();
    const sheetsCurrent = useSelector(selectSheetsCurrent);
    // const sheetsCurrent = useMemo(() => {
    //     const id = parseInt(params.id);
    //     return sheetsData[id];
    // }, [params]);

    return (
        <div>
            <div id="sheetsRootContainer">
                <div className="relative">
                    <div id="sheetsCard&Detail">
                        <div id="sheetsDetailContainer" className="h-[60vh] p-4">
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
                                            route.push('/sheets');
                                        }}
                                    >
                                        <X color="black" />
                                    </Button>
                                </div>
                            </header>
                            <div id="sheet" onClick={() => route.push(`/images?sheetId=${sheetsCurrent.id}`)} className="flex justify-center mt-5 w-full relative">
                                <ThreeScene imagePath={sheetsCurrent.plan} points={Object.values(data?.coordinates || {})} />
                            </div>

                        </div>
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
