"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AlignLeft, CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SqlEditorPage() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <div className="h-[90%]">
      <ResizablePanelGroup direction="vertical" className="rounded-lg border">
        <ResizablePanel className="!overflow-y-auto dark:bg-[#1E1E1E]">
          <Editor
            height="100%"
            className="!rounded-t-lg mt-2"
            defaultLanguage="sql"
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            defaultValue="SELECT * FROM table"
            theme={theme === "dark" ? "vs-dark" : "vs"}
            onChange={(value = "") => setQuery(value)}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="p-2">
          <Tabs defaultValue="result">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="result">Result</TabsTrigger>
                <TabsTrigger value="chart">Chart</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Prettify SQL</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <span className="sr-only sm:not-sr-only">Run</span>
                  <CornerDownLeft className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <TabsContent value="result"></TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
