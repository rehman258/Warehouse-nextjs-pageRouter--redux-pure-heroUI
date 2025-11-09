"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
// import { Listbox, ListItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
export default function Navigation() {
  // const pathName = usePathname();
  // first design is about version 9 
  const [listOpen,setListOpen] = useState<string | undefined>(undefined);
  const openMenuHandler = (currentList:string)=>{
    setListOpen((prevState)=>{
      return prevState===currentList ? undefined : currentList;
    });
  };
  const navLinks = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon: "dashboard"
    },
    {
      title: "Inventory",
      icon: "inventory",
      children: [
        {
          title: "Items & Stock",
          path: "items-stock",
          icon: "cube",
          description: "Manage inventory items and stock levels"
        },
        {
          title: "Categories & Brands",
          path: "categories-brands",
          icon: "categories",
          description: "Organize products by categories and brands"
        },
        {
          title: "Batch and Serial Tracking",
          path: "batch-serial",
          icon: "batch-serial",
          description: "Track items by batch numbers and serial numbers"
        },
        {
          title: "Stock Operations",
          path: "stock-operations",
          icon: "stock-operations",
          description: "Adjustment, transfer, cycle count",
          features: ["adjustment", "transfer", "cycle count"]
        }
      ]
    },
    {
      title: "Orders",
      icon: "orders",
      children: [
        {
          title: "All Orders",
          path: "all",
          icon: "order-list",
          description: "View and manage all orders"
        },
        {
          title: "Inbound & Outbound",
          path: "inbound-outbound",
          icon: "inbound-outbound",
          description: "Track inbound and outbound shipments",
          features: ["tracking", "history filter"]
        },
        {
          title: "Returns & Refunds",
          path: "returns-refunds",
          icon: "download",
          description: "Process returns and refund requests"
        },
        {
          title: "Back orders",
          path: "backorders",
          icon: "calendar",
          description: "Manage items on backorder"
        }
      ]
    },
    {
      title: "Warehouse",
      icon: "logo-icon",
      children: [
        {
          title: "Locations",
          path: "locations",
          icon: "location",
          description: "Manage warehouse locations and zones"
        },
        {
          title: "Receiving & Putaway",
          path: "receiving-putaway",
          icon: "download",
          description: "Receive goods and organize storage"
        },
        {
          title: "Picking & Packing",
          path: "picking-packing",
          icon: "inventory",
          description: "Order fulfillment and packing operations"
        },
        {
          title: "Equipment & Maintenance",
          path: "equipment-maintenance",
          icon: "settings",
          description: "Manage warehouse equipment and schedules"
        },
        {
          title: "Capacity Planning",
          path: "capacity-planning",
          icon: "warehouse-capacity",
          description: "Optimize warehouse space utilization"
        }
      ]
    },
    {
      title: "Logistics",
      icon: "logistics",
      children: [
        {
          title: "Carriers & Routes",
          path: "carriers-routes",
          icon: "carriers",
          description: "Manage shipping carriers and delivery routes"
        }
      ]
    },
    {
      title: "Suppliers",
      icon: "suppliers",
      children: [
        {
          title: "Suppliers List",
          path: "list",
          icon: "order-list",
          description: "View and manage supplier information"
        },
        {
          title: "Purchase Orders",
          path: "purchase-orders",
          icon: "basket",
          description: "Create and track purchase orders",
          features: ["calendar filter", "search history"]
        }
      ]
    },
    {
      title: "Customers",
      icon: "customers",
      children: [
        {
          title: "Customers List",
          path: "list",
          icon: "order-list",
          description: "Manage customer database"
        },
        {
          title: "Customer Orders History",
          path: "orders",
          icon: "order-list",
          description: "View customer order history",
          features: ["calendar filter", "search history"]
        }
      ]
    },
    {
      title: "Reports",
      path: "reports",
      icon: "reports"
    },
    {
      title: "Settings",
      icon: "settings",
      children: [
        {
          title: "Users & Permissions",
          path: "users-permissions",
          icon: "shield",
          description: "Manage user access and permissions"
        },
        {
          title: "System Configurations",
          path: "system-config",
          icon: "settings",
          description: "Configure system settings"
        },
        {
          title: "Backup & Data",
          path: "backup-data",
          icon: "batch-serial",
          description: "Backup and restore system data"
        }
      ]
    }
  ];
  return (
    <nav className="h-[calc(100%-56px)]">
      <ul className="flex flex-col h-[100%] px-1 gap-[1] overflow-y-scroll 
        [&::-webkit-scrollbar]:w-0
        [&::-webkit-scrollbar-track]:bg-red-100
        [&::-webkit-scrollbar-thumb]:bg-green-200
      ">
        {
          navLinks.map((navItem)=>(
            <li key={navItem.title} onClick={()=>openMenuHandler(navItem.title)}>
              <Link className={`max-h-[50px] body-regular text-white hover:bg-neutral-600 bg-opacity-5
              flex p-3 px-4 gap-2 rounded-sm justify-between
              `}
              href={`${navItem.children ? "" : navItem.path}`}
              >
                <div className="flex gap-2">
                  <Image 
                    alt="sidebar link logo"
                    height={20}
                    src={`/icons/${navItem.icon}.svg`}
                    width={20}
                  />
                  {navItem.title}
                </div>
                {
                  navItem.children && 
                  <Image
                    alt="right arrow icon"
                    className={`justify-self-end  ${navItem.title === listOpen && "rotate-[90deg]"}`}
                    height={18}
                    src={"/icons/rightArrow.svg"}
                    width={18}
                  />
                }
              </Link>
              <ul className={`overflow-hidden transition-all duration-200 ms-[25px] 
              border-s border-neutral-500 ps-[5px]`} 
              style={{
                height: `${navItem.children?.length && navItem.title === listOpen ? 
                  navItem.children?.length * 50 : "0"}px`
              }}>
                {
                  navItem.children?.length &&
                  navItem.children.map((childItem)=>(
                    <li key={childItem.path} className="border-s-danger">
                      <Link  
                        className={`body-regular text-white hover:bg-neutral-600 bg-opacity-5
                        flex p-3 px-4 gap-2 rounded-sm justify-between`}
                        href={`/${navItem.path}`}
                      >
                        <div className="flex gap-2 text-sm">
                          <Image 
                            alt="sidebar link logo"
                            height={15}
                            src={`/icons/${childItem.icon}.svg`}
                            width={15}
                          />
                          {childItem.title}
                        </div>
                      
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}
