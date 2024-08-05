import clsx from "clsx";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Navigation } from "../../types/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Header({ navigation }: { navigation: Navigation[] }) {
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
          <nav className="grid gap-2 text-md font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-md font-semibold"
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
        <h1 className="text-md font-semibold md:text-2xl">
          {navigation.find((item) => item.current)?.name}
        </h1>
      </div>
    </header>
  );
}

export default Header;
