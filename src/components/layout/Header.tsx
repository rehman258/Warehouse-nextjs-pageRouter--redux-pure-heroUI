"use client";

import {
  Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Input, Popover, PopoverContent, PopoverTrigger,
} from "@heroui/react";
import { Bell, LogOut, Menu, Search, Settings as SettingsIcon, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../Icon";
import { ThemeToggle } from "./ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { markAllNotificationsRead, toggleSidebar } from "@/store/slices/uiSlice";
import { cn } from "@/lib/cn";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/orders": "Orders",
  "/suppliers": "Suppliers",
  "/categories": "Categories",
  "/reports": "Reports",
  "/settings": "Settings",
};

function pageTitle(pathname: string): string {
  const key = Object.keys(TITLES).find((k) => pathname.startsWith(k));
  return (key && TITLES[key]) || "WareFlow Pro";
}

export function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const notifications = useAppSelector((s) => s.ui.notifications);
  const unread = notifications.filter((n) => n.unread).length;
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/inventory/items?q=${encodeURIComponent(q)}` : "/inventory/items");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-default-200 bg-content1 px-4 sm:px-6">
      <Button
        isIconOnly
        variant="light"
        className="lg:hidden"
        aria-label="Open menu"
        onPress={() => dispatch(toggleSidebar())}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h1 className="text-lg font-semibold">{pageTitle(pathname)}</h1>

      <form onSubmit={submit} className="ml-auto hidden md:block">
        <Input
          aria-label="Search inventory"
          size="sm"
          radius="full"
          value={query}
          onValueChange={setQuery}
          placeholder="Search inventory..."
          startContent={<Search className="h-4 w-4 text-default-400" />}
          className="w-56"
        />
      </form>

      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <ThemeToggle />

        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button isIconOnly variant="light" radius="full" aria-label="Notifications">
              <Badge content={unread} color="danger" size="sm" isInvisible={unread === 0}>
                <Bell className="h-5 w-5" />
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
              <span className="font-semibold">Notifications</span>
              {unread > 0 && (
                <button
                  className="text-xs font-medium text-primary"
                  onClick={() => dispatch(markAllNotificationsRead())}
                >
                  Mark all read
                </button>
              )}
            </div>
            <ul className="max-h-80 w-full overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3",
                    n.unread && "bg-primary-50/60",
                  )}
                >
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", n.iconBg)}>
                    <Icon name={n.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-default-500">{n.detail}</p>
                    <p className="mt-0.5 text-[11px] text-default-400">{n.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button aria-label="Account menu" className="rounded-full outline-none">
              <Avatar name="Alex Morgan" size="sm" className="bg-blue-600 text-white" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account actions">
            <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100" textValue="Signed in">
              <p className="text-sm font-semibold">Alex Morgan</p>
              <p className="text-xs text-default-500">Warehouse Manager</p>
            </DropdownItem>
            <DropdownItem key="account" startContent={<User className="h-4 w-4" />}>
              My Account
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<SettingsIcon className="h-4 w-4" />}
              onPress={() => router.push("/settings")}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<LogOut className="h-4 w-4" />}
              onPress={() => router.push("/login")}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
