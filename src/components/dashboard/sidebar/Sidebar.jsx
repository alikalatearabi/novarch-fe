import React from "react";
import SidebarDesktop from "@/components/dashboard/sidebar/SidebarDesktop";
import SideBarMobile from "@/components/dashboard/sidebar/SidebarMobile";
// import { useMediaQuery } from "usehooks";
import { sidebarItems } from "@/apiServices/data";

const SideBar = () => {
  //   const isDesktop = useMediaQuery("(min-width: 1034px)");
  const isDesktop = true;

  return (
    <>
      {isDesktop ? (
        <SidebarDesktop sidebarItems={sidebarItems} />
      ) : (
        <SideBarMobile sidebarItems={sidebarItems} />
      )}
    </>
  );
};

export default SideBar;
