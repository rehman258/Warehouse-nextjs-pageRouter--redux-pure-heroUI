import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navigation() {
  const navLinks = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon:"dashboard"
    },
    {
      title: "Intertory",
      path: "invertory",
      icon:"invertory"
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
    <nav className="h-[calc(100%-56px)] bg-[#fafafa]">
      <ul className="flex flex-col h-[100%]">
        {
          navLinks.map((navItem)=>(
            <li key={navItem.title}>
              <Link className="body-regular flex p-2 px-4 gap-2" href={`/${navItem.path}`}>
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
          <Link className="body-regular  flex p-2 gap-2" href={"/settings"}>
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
