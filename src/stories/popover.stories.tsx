import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PopoverStory = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>

      <Button>
        <Link target="_blank" href="https://ui.shadcn.com/docs/components/popover">
          Read the docs
        </Link>
      </Button>
    </div>
  );
};

const meta = {
  component: PopoverStory,
  title: "UI/Popover",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
