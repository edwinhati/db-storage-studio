import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsStory = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <Button>
        <Link
          target="_blank"
          href="https://ui.shadcn.com/docs/components/tabs"
        >
          Read the docs
        </Link>
      </Button>
    </div>
  );
};

const meta = {
  component: TabsStory,
  title: "UI/Tabs",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
