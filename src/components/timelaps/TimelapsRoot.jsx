import React from "react";
import TimelapsHeader from "./header/TimelapsHeader";
import TimelapsCard from "./TimelapsCard";

const TimelapsRoot = () => {
  return (
    <div id="rootContainer">
      <TimelapsHeader />
      <TimelapsCard />
    </div>
  );
};

export default TimelapsRoot;
