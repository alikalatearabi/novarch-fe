import React, { Fragment } from "react";
import groupPic from "../../../public/images/openspace sample/Group 8736.png";
import Image from "next/image";
import { EllipsisVertical, Lock, MapPin, Unlock } from "lucide-react";

const timelapsData = [
  {
    imageUrl: "/images/openspace sample/Group 8736.png",
    privacy: "Private",
    title: "طبقه اول",
    planName: "FFfthi23499...openSpace.ai",
    tag: "Fixed",
    dateCreated: "Jun 24 - Aug 31, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8737.png",
    privacy: "Public",
    title: "طبقه دوم",
    planName: "XYZ123...openSpace.ai",
    tag: "Fixed",
    dateCreated: "Jul 01 - Sep 15, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8738.png",
    privacy: "Private",
    title: "طبقه سوم",
    planName: "ABC987...openSpace.ai",
    tag: "Flexible",
    dateCreated: "Aug 01 - Sep 30, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8739.png",
    privacy: "Public",
    title: "طبقه چهارم",
    planName: "LMN456...openSpace.ai",
    tag: "Fixed",
    dateCreated: "Jul 15 - Oct 01, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8740.png",
    privacy: "Private",
    title: "طبقه پنجم",
    planName: "PQR789...openSpace.ai",
    tag: "Flexible",
    dateCreated: "Aug 10 - Sep 20, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8741.png",
    privacy: "Public",
    title: "طبقه ششم",
    planName: "GHJ234...openSpace.ai",
    tag: "Fixed",
    dateCreated: "Jul 20 - Sep 10, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8742.png",
    privacy: "Private",
    title: "طبقه هفتم",
    planName: "JKL123...openSpace.ai",
    tag: "Fixed",
    dateCreated: "Aug 15 - Oct 05, 2024",
  },
  {
    imageUrl: "/images/openspace sample/Group 8743.png",
    privacy: "Public",
    title: "طبقه هشتم",
    planName: "DEF789...openSpace.ai",
    tag: "Flexible",
    dateCreated: "Jul 05 - Sep 25, 2024",
  },
];

const TimelapsCard = () => {
  return (
    <div id="container" className="mr-4 mt-5 flex flex-wrap gap-10 p-3 rounded-2xl cursor-pointer">
      {timelapsData.map((item, index) => {
        return (
          <div key={index} id="cardContainer" className="hover:shadow-md  p-3 rounded-2xl cursor-pointer">
            <div id="imageContainer" className="relative">
              <Image
                src={item.imageUrl}
                width={350}
                height={350}
                alt="picCard"
                className="rounded-2xl"
              />
              <div
                id="tag"
                className="absolute bottom-1 left-1 flex gap-1 text-[12px] p-2 bg-white rounded-2xl"
              >
                <span id="privacy">{item.privacy}</span>
                <span>
                  {item.privacy === "Private" ? (
                    <Lock className="w-3 h-4" />
                  ) : (
                    <Unlock className="w-3 h-4" />
                  )}
                </span>
              </div>
            </div>
            <div id="cardDetail">
              <header className="flex justify-between mt-3">
                <span>{item.title}</span>
                <span className="hover:bg-gray-100 p-1 rounded-2xl cursor-pointer">
                  <EllipsisVertical />
                </span>
              </header>
              <div id="name&level" className="mt-2 flex gap-3 items-center">
                <span
                  id="tagF5"
                  className="px-2 py-1 rounded-full bg-green-100 text-[12px] bg-opacity-75 text-green-900 font-bold"
                >
                  F5
                </span>
                <span id="nameOfPlan" className="text-gray-600">
                  {item.planName}
                </span>
                <div id="location&nameFloor" className="flex gap-1">
                  <MapPin color="gray" className="w-4 h-4" />
                  <span className="text-[12px]">پشت بام</span>
                </div>
              </div>
            </div>
            <div id="date&tagContainer" className="flex items-center gap-2 mt-3">
              <div className="bg-gray-100 p-1 text-[12px] rounded-md">{item.tag}</div>
              <div id="date" className="text-gray-600">
                {item.dateCreated}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelapsCard;
