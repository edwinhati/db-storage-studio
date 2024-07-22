import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const DialogStory = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button>
        <Link target="_blank" href="https://ui.shadcn.com/docs/components/dialog">
          Read the docs
        </Link>
      </Button>
    </div>
  );
};

const meta = {
  component: DialogStory,
  title: "UI/Dialog",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
