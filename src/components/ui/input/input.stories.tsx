import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Input,
  title: "UI/Input",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
