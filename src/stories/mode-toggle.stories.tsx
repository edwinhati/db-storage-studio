import { ModeToggle } from "@/components/utils/mode-toggle";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ModeToggle,
  title: "Utils/Mode Toggle",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
