"use client";

import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import useCommonServices from "@/hooks/useCommonServices";

export default function DasboardLayout({ children }:{children:React.ReactNode}) {
  useCommonServices();

  return (
    <>
      <Sidebar/>
      <div className="w-[82.5%]">
        <Header/>
        <main className="p-6">
          {children}
        </main>
      </div>
    </>
  );
}
