"use client";

import React from "react";
import Image from "next/image";
import { 
  Button,
  Input,
} from "@heroui/react";
import Notifications from "../notifications";
import UserMenu from "../userMenu";
export default function Header() {
  // const [headerIsShown, setHeaderIsShown] = useState(true);
  // document.addEventListener("scroll",()=>{
  //   console.log(window.scrollY);
  //   let prevScroll = 0;
  //   setHeaderIsShown(prevScroll > window.scrollY); 
  //   prevScroll = window.scrollY;
  // });
  // ${headerIsShown ? "opacity-[1]" :"opacity-[0]"}`}
  return (
    <header className="relative flex px-3 py-4 sticky top-[0px] h-[65px] bg-white shadow z-2">
      <div className="w-[50%] flex justify-between">
        <Button
          isIconOnly
          className="cursor-pointer bg-transparent"
        >
          <Image
            alt="toggle menu icon"
            height={25}
            src={"/icons/toggle-sidebar.svg"}
            width={25}
          />
        </Button>
      </div>
      <div className="w-[50%] flex jsutify-end gap-[20px] items-center">
        <Input
          classNames={{
            inputWrapper: "rounded-md",
          }}
          labelPlacement="outside"
          placeholder="Search Warehouse"
          size ="sm"
          startContent={
            <Image
              alt="search icon"
              height={15}
              src={"/icons/search.svg"}
              width={15}
            />
          }
          type="text"
        />
        <Notifications/>
        <UserMenu/>
      </div>
    </header>
  );
}
