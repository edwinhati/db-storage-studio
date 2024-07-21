import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SheetStory = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Sheet>
        <SheetTrigger className="border rounded-md">Open</SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Button>
        <Link target="_blank" href="https://ui.shadcn.com/docs/components/sheet">
            Read the docs
        </Link>
      </Button>
    </div>
  );
};

const meta = {
  component: SheetStory,
  title: "UI/Sheet",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
