import React from "react";
import Image from "next/image";
import { 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem ,
} from "@heroui/react";
export default function UserMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent rounded-full">
          <Image
            alt="notification icon"
            height={20}
            src={"/icons/user.svg"}
            width={20}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
        <DropdownItem
          key="new"
          description="Create a new file"
          shortcut="⌘N"
        >
          {"New file"}
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
          shortcut="⌘C"
        >
          {"Copy link"}
        </DropdownItem>
        <DropdownItem
          key="edit"
          showDivider
          description="Allows you to edit the file"
          shortcut="⌘⇧E"
        >
          {"Edit file"}
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
        >
          {"Delete file"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
