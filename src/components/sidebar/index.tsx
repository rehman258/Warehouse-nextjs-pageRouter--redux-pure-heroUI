import React from "react";
import Image from "next/image";
import Navigation from "../nav";
export default function Sidebar() {
  return (
    <aside className="h-[100vh]">
      <h2 className="p-4 flex gap-2 border-b">
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
