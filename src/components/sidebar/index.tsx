import React from "react";
import Image from "next/image";
import Navigation from "../nav";
export default function Sidebar() {
  return (
    <aside className="h-[100vh] w-[17.5%] sticky top-[0px] shadow bg-[#fff]">
      <h2 className="px-4 flex gap-2 border-b h-[65px] items-center">
        <Image
          alt="logo icon "
          height={28}
          src={"/icons/logo-icon.svg"}
          width={28}
        />
        {"Warehouse Manager"}
      </h2>
      <Navigation/>
    </aside>
  );
}
