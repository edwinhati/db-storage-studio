import { Label } from "@/components/ui/label";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Label,
  title: "UI/Label",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Your email address",
    htmlFor: "email",
  },
};
