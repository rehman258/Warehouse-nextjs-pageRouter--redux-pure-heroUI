import React from "react";
import Sidebar from "@/components/sidebar";
export default function DasboardLayout({ children }:{children:React.ReactNode}) {
  return (
    <>
      <Sidebar/>
      <main className="">
        {children}
      </main>
    </>
  );
}
