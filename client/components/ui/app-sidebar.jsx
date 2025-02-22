import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
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

// Menu items.
const items = [
  {
    title: "Home",

    url: "/patient",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/patient/profile",
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
<<<<<<< HEAD

  { url: "/caretaker", icon: Home },
=======
  
>>>>>>> 7297241a3109db9264049ba30f441bf04d40d6f8
  //   {
  //     title: "Inbox",
  //     url: "#",
  //     icon: Inbox,
  //   },

  //   {
  //     title: "Calendar",
  //     url: "#",
  //     icon: Calendar,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: Search,
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings,
  //   },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Patient</SidebarGroupLabel>

          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>

                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
