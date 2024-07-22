import { Badge } from "@/components/ui/badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Badge,
  title: "UI/Badge",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Badge",
    },
};
