import { Home } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from '@/components/navigations/sidebar';

const meta = {
  component: Sidebar,
  title: "Navigations/Sidebar",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigation: [
      {
        name: "Home",
        href: "#",
        icon: Home,
        current: true
      }
    ]
  }
};