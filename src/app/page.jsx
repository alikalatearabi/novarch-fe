"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "@/components/home/Home";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="relative">
      <Home />
    </div>
  );
};

export default Page;
