"use client";

import Header from "@/components/navigations/header";
import Sidebar from "@/components/navigations/sidebar";

import { Home, Package, Database } from "lucide-react";

const navigation = [
  { name: "Project", href: "/project", icon: Home },
  { name: "Database", href: "/database", icon: Database },
  { name: "Storage", href: "/storage", icon: Package },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar navigation={navigation} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header navigation={navigation} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  );
}
