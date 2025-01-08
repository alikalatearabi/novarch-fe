import TimelapsHeader from "@/components/timelaps/header/TimelapsHeader";
import TimelapsCard from "@/components/timelaps/TimelapsCard";
import React from "react";

const page = () => {
  return (
      <div id="rootContainer">
        <TimelapsHeader />
        <TimelapsCard />
      </div>
  );
};

export default page;
