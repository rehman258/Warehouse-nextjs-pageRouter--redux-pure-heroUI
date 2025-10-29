"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function Navigation() {
  const pathName = usePathname();
  const navLinks = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon:"dashboard"
    },
    {
      title: "inventory",
      path: "inventory",
      icon:"inventory"
    },
    {
      title: "Orders",
      path: "orders",
      icon:"orders"
    },
    {
      title: "Reports",
      path: "reports",
      icon:"reports"
    },
  ];
  return (
    <nav className="h-[calc(100%-56px)]">
      <ul className="flex flex-col h-[100%]">
        {
          navLinks.map((navItem)=>(
            <li key={navItem.title}>
              <Link className={`body-regular hover:bg-neutral-100 flex p-3 px-4 gap-2 border-s-4 
              ${pathName === `/${navItem.path}` ? "border-neutral-400" : " border-white" }`}
              href={`/${navItem.path}`}
              >
                <Image 
                  alt="sidebar link logo"
                  height={20}
                  src={`/icons/${navItem.path}.svg`}
                  width={20}
                />
                {navItem.title}
              </Link>
            </li>
          ))
        }
        <li className="mt-auto">
          <Link className="body-regular hover:bg-neutral-100 flex p-3 py-4 gap-2" href={"/settings"}>
            <Image 
              alt="sidebar link logo"
              height={20}
              src={"/icons/settings.svg"}
              width={20}
            />
            {"Settings"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
