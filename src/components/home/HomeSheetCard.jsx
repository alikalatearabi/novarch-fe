import React, { useState, useEffect } from "react";
import Image from "next/image";

const HomeSheetCard = ({ sheets }) => {
  return (
    <div id="sheetsCardContainer" className="inline-flex gap-5">
      {sheets.map((sheet, index) => (
        <div
          key={index}
          className="flex gap-5 hover:shadow w-[400px] items-center p-4 rounded-lg"
        >
          <div id="plansImage">
            <Image src={sheet.image} width={150} height={50} alt={sheet.title} />
          </div>
          <div id="plansDetail" className="flex flex-col gap-4">
            <span className="text-[15px]">{sheet.title}</span>
            <span className="text-[12px] text-gray-500">{sheet.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSheetCard;
