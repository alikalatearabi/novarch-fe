'use client';

import { User } from "lucide-react";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const DashboardHeader = ({ projectName }) => {
  const auth = useAuth();

  return (
    <div id="headerContainer" className="h-[10vh] w-[100vw] flex shadow-sm">
      <div id="logo&routes" className="px-5 flex justify-start items-center gap-10 flex-1">
        <div id="logo">
          <Image src={Logo} width={50} height={96} alt="header" />
        </div>
        <div id="detail">
          <span id="captureName"></span>
          <span id="route" className="text-gray-600 text-[15px] mr-10">
            {projectName}
          </span>
        </div>
      </div>
      <div id="userProfile" className="flex-1 flex justify-end items-center gap-5 px-10 cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-5">
            <div id="userDetail" className="flex flex-col">
              <span>ali kalate</span>
              <span className="text-[12px] mt-1 text-gray-700">ali.kalate89@hotmail.com</span>
            </div>
            <div id="userAvatar" className="bg-gray-300 p-4 rounded-full">
              <User color="white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>پروفایل</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' onClick={auth.signout}>خروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
