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
import NewTableForm from "../forms/new-table";
import { Button } from "../ui/button";

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
      <SheetContent style={{ maxWidth: "60vw" }}>
        <SheetHeader>
          <SheetTitle>
            Create a new table under <Badge variant="outline">{schema}</Badge>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div>
          <NewTableForm />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full mt-2" variant="outline">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NewTableSheet;
