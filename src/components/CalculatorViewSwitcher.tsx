"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatorPrompt from "./CalculatorPrompt";
import CalculatorLibrary from "./CalculatorLibrary";

const CalculatorViewSwitcher = () => {
  return (
    <Tabs defaultValue="generate" className="w-full max-w-4xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="generate">Generate New Calculator</TabsTrigger>
        <TabsTrigger value="library">Calculator Library</TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <CalculatorPrompt />
      </TabsContent>
      <TabsContent value="library">
        <CalculatorLibrary />
      </TabsContent>
    </Tabs>
  );
};

export default CalculatorViewSwitcher;