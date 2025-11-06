import React from "react";
import Image from "next/image";
import Navigation from "../nav";
export default function Sidebar() {
  return (
    <aside className="h-[100vh] w-[17.5%] sticky top-[0px] shadow bg-gray-900">
      <h2 className="px-4 flex gap-2 border-b h-[65px] items-center">
        <Image
          alt="logo icon"
          className="bg-primary p-2 rounded-md"
          height={35}
          src={"/icons/logo-icon.svg"}
          width={35}
        />
        <p className="font-semibold text-lg text-white">
          {"WareFlow Pro"}
        </p>
      </h2>
      <Navigation/>
    </aside>
  );
}
