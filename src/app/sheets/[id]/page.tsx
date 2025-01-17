"use client";
import { RsetSheetsDetail, selectSheetsCurrent, selectSheetsDetail } from "@/slices/sheetsSlices";
import React, { createRef, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import SheetsController from "@/components/sheets/SheetsController";
import SheetsTimelineRoot from "@/components/sheets/SheetsTimelineRoot";
import { Button } from "@/components/ui/button";
import { sheetsData } from "@/utils/constants";

import "yet-another-react-lightbox/styles.css";

const Page = ({ params }) => {
    const route = useRouter();

    const dispatch = useDispatch();
    const sheetsCurrent = useSelector(selectSheetsCurrent);
    // const sheetsCurrent = useMemo(() => {
    //     const id = parseInt(params.id);
    //     return sheetsData[id];
    // }, [params]);

    return (
        <div>
            <div id="sheetsRootContainer">
                <div className="mx-5 relative">
                    <div id="sheetsCard&Detail">
                        <div id="sheetsDetailContainer" className="h-[60vh] p-10">
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
                                        }}
                                    >
                                        <X color="black" />
                                    </Button>
                                </div>
                            </header>
                            <div id="sheet" onClick={() => route.push(`/images?sheetId=${sheetsCurrent.id}`)} className="flex justify-center mt-5 max-w-[600px] relative">
                                <Lightbox
                                    open={true}
                                    slides={[{ src: sheetsCurrent.plan, alt: sheetsCurrent.title, width: 500 }]}
                                    plugins={[Zoom, Inline]}
                                    inline={{
                                        style: { width: "100%", maxWidth: "500px", aspectRatio: "3 / 2" },
                                    }}
                                    render={{
                                        buttonPrev: () => null,
                                        buttonNext: () => null,
                                        buttonZoom: () => null
                                    }}
                                    zoom={{
                                        scrollToZoom: true,
                                        maxZoomPixelRatio: 3
                                    }}
                                    styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
                                    className="border shadow-lg p-5 rounded-lg"
                                />
                            </div>

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
