import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const TooltipStory = () => {
  return (
    <div className="flex flex-col space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="border rounded-md p-2">
            Hover
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button>
        <Link
          target="_blank"
          href="https://ui.shadcn.com/docs/components/tooltip"
        >
          Read the docs
        </Link>
      </Button>
    </div>
  );
};

const meta = {
  component: TooltipStory,
  title: "UI/Tooltip",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
