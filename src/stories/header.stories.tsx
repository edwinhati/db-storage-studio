import { Home } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/navigations/header';

const meta = {
  component: Header,
  title: "Navigations/Header",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pathname: "/project",
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