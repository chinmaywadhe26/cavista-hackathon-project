


"use client";

import {
  Inbox,
  ChartNoAxesCombined,
  UserRoundPen,
  CalendarCheck2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Profile",
    url: "/patient",
    icon: UserRoundPen,
  },
  {
    title: "Analytics",
    url: "/patient/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Appointments",
    url: "/patient/appointments",
    icon: CalendarCheck2,
  },
  {
    title: "Chat",
    url: "/patient/chat",
    icon: Inbox,
  },

];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Patient</SidebarGroupLabel>

          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                          isActive
                            ? "bg-blue-500 text-white font-semibold hover:bg-blue-500 hover:text-white"
                            : "hover:border hover:border-blue-500"
                        }`}>
                        <item.icon
                          className={`w-5 h-5 transition-colors ${
                            isActive
                              ? "text-white hover:text-white"
                              : "text-gray-600"
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}