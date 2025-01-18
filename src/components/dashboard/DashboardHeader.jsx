'use client';

import { User } from "lucide-react";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.jpg";
import { usePathname } from 'next/navigation';
import Breadcrumb from "./Breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const DashboardHeader = () => {
  const pathname = usePathname(); // Get the current pathname
  const auth = useAuth();

  // Translation mapping for breadcrumb items
  const translations = {
    projects: "پروژه‌ها",
    images: "تصاویر",
    sheets: "شیت‌ها",
    dashboard: "داشبورد",
    // Add more translations as needed
  };

  // Generate breadcrumb items based on the current pathname
  const pathnames = pathname.split('/').filter((x) => x);

  // Prepend "Project" (پروژه‌ها) to the breadcrumb items
  const breadcrumbItems = [
    { label: translations.projects || "پروژه‌ها", href: "/" }, // Default to "پروژه‌ها" if translation is missing
    ...pathnames.map((path, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      return {
        label: translations[path] || path.charAt(0).toUpperCase() + path.slice(1), // Use translation or fallback to the path
        href: index < pathnames.length - 1 ? href : undefined,
      };
    }),
  ];

  return (
    <div id="headerContainer" className="h-[8vh] flex" style={{ borderBottom: '1px solid #D8D8D8' }}>
      <div id="logo&routes" className="px-5 flex justify-start items-center gap-10 flex-1">
        <div id="logo">
          <Image src={Logo} width={150} height={80} alt="header" style={{ borderRadius: '10px' }} />
        </div>
        <div id="detail">
          <span id="captureName"></span>
          <span id="route" className="text-[20px]">
            <Breadcrumb items={breadcrumbItems} />
          </span>
        </div>
      </div>
      <div id="userProfile" className="flex-1 flex justify-end items-center gap-5 px-10 cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-5">
            <div id="userAvatar" className="bg-gray-300 p-2 rounded-full">
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