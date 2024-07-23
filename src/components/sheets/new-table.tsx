import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function NewTableSheet({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: string | undefined;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Create a new table under <Badge variant="outline">{schema}</Badge>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NewTableSheet;
