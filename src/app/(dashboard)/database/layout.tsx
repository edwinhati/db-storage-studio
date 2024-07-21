"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Table, Database, SquareTerminal } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";

interface NavigationProps {
  name: string;
  href: string;
  current?: boolean;
  icon: React.ElementType;
}

const navigation: NavigationProps[] = [
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
          <div className="flex justify-center rounded-lg border border-dashed shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function Header({ navigation }: { navigation: NavigationProps[] }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">Database</span>
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                  {
                    "bg-muted text-foreground": item.current,
                    "text-muted-foreground ": !item.current,
                  }
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          {/* <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div> */}
        </SheetContent>
      </Sheet>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {navigation.find((item) => item.current)?.name}
        </h1>
      </div>
    </header>
  );
}

function Sidebar({ navigation }: { navigation: NavigationProps[] }) {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Database className="h-6 w-6" />
            <span className="">Database</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  item.current && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full"></Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
