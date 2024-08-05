"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigations/header";
import Sidebar from "@/components/navigations/sidebar";
import type { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { Toaster } from "@/components/ui/toaster";

import { Home, Database } from "lucide-react";

interface NavigationProps {
  navigation: {
    name: string;
    href: string;
    current?: boolean;
    icon: ForwardRefExoticComponent<LucideProps>;
  }[];
}

const navigation: NavigationProps["navigation"] = [
  { name: "Project", href: "/project", icon: Home },
  { name: "Database", href: "/database/tables", icon: Database },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  navigation.map((item) => {
    item.current = pathname.toLowerCase().includes(item.name.toLowerCase());
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar navigation={navigation} />
      <div className="flex flex-col sm:py-3 sm:pl-14">
        <Header pathname={pathname} navigation={navigation} />
        <main className="py-2">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
