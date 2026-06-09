"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Warehouse, X } from "lucide-react";
import { Icon } from "../Icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSidebar } from "@/store/slices/uiSlice";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Dashboard", href: "/dashboard", match: "/dashboard", icon: "LayoutDashboard" },
  { label: "Inventory", href: "/inventory/items", match: "/inventory", icon: "Package" },
  { label: "Orders", href: "/orders", match: "/orders", icon: "ShoppingCart" },
  { label: "Suppliers", href: "/suppliers", match: "/suppliers", icon: "Truck" },
  { label: "Categories", href: "/categories", match: "/categories", icon: "Tags" },
  { label: "Reports", href: "/reports", match: "/reports", icon: "ChartColumnBig" },
  { label: "Settings", href: "/settings", match: "/settings", icon: "Settings" },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-slate-900 text-slate-200">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Warehouse className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold text-white">WareFlow Pro</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.match);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-slate-400">
        WareFlow Pro v1.0
      </div>
    </div>
  );
}

export function Sidebar() {
  const open = useAppSelector((s) => s.ui.sidebarOpen);
  const dispatch = useAppDispatch();
  const close = () => dispatch(setSidebar(false));

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
        <NavContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={close} />
          <div className="absolute top-0 left-0 h-full w-64">
            <button
              onClick={close}
              aria-label="Close menu"
              className="absolute top-4 right-4 z-10 text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <NavContent onNavigate={close} />
          </div>
        </div>
      )}
    </>
  );
}
