import React, { Fragment } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import Plans from "../../../public/images/plansImage.jpg";
const captureData = [
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
  {
    username: "شایان گلستانی",
    captureLocation: "پشت بام",
    date: "1403/05/18",
    image: Plans,
  },
];

const LatesCapture = () => {
  return (
    <div className="inline-flex overflow-auto gap-5 p-5">
      {captureData.map((capture, index) => {
        return (
          <div
            key={index}
            id="captureCard"
            className="inline-flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow 0.6s p-5 rounded-lg w-[400px]"
          >
            <div id="captureImage">
              <Image src={Plans} alt="test" width={300}/>
            </div>
            <div id="user" className="flex gap-2 items-center">
              <span className=" border bg-gray-100 p-1 rounded-full">
                <User color="gray" width={15} height={15} />
              </span>
              <span className="text-[15px]">{capture.username}</span>
            </div>
            <div id="captureLocation" className="text-[15px]">
              کپچر شده در {capture.captureLocation}
            </div>
            <div id="date" className="text-[13px] text-gray-600">
              {capture.date}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LatesCapture;
