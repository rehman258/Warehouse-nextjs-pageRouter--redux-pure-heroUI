import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
export default function DasboardLayout({ children }:{children:React.ReactNode}) {
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
