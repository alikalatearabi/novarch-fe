import Image from "next/image";
import React from "react";
import { Video } from "lucide-react";
import "./CaptureCard.css";

const CaptureCard = ({ image, date, location, hasVideo }) => {
  return (
    <div id="cardContainer" className="capture-card-container">
      <div id="imageCard" className="capture-card-image">
        <Image
          src={image}
          layout="responsive"
          width={100}
          height={100} 
          className="capture-card-image-element"
          alt="capture"
        />
      </div>
      <div id="captureDetail" className="capture-card-details">
        <div id="date" className="capture-card-date">{date}</div>
        <div id="location" className="capture-card-location">{location}</div>
        <div id="captureType" className="capture-card-type">
          <div
            className={`capture-card-type-badge ${hasVideo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}
          >
            
            <span className="capture-card-type-text">{hasVideo ? "360 video" : "No video"}</span>
            <Video
              className={`capture-card-type-icon ${hasVideo ? "text-green-700" : "text-gray-500"
                }`}
            />
          </div>
          <hr className="capture-card-separator" />
        </div>
      </div>
    </div>
  );
};

export default CaptureCard;
