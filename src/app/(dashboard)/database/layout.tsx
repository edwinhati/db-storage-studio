"use client";

import { usePathname } from "next/navigation";
import { Table, SquareTerminal } from "lucide-react";
import Header from "@/features/database/components/navigations/header";
import Sidebar from "@/features/database/components/navigations/sidebar";
import type { Navigation } from "@/features/database/types/navigation";

const navigation: Navigation[] = [
  {
    name: "Tables",
    href: "/database/tables",
    icon: Table,
  },
  {
    name: "SQL Editor",
    href: "/database/sql",
    icon: SquareTerminal,
  },
];

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  navigation.map((item) => {
    if (item.href === "/database/sql") {
      item.current = pathname === item.href;
    } else {
      item.current = pathname.toLowerCase().includes(item.href.toLowerCase());
    }
  });
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navigation={navigation} />
      <div className="flex flex-col">
        <Header navigation={navigation} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
