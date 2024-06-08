'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  TabsContent as PrimitiveTabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Tabs = ({
  tabs,
}: Readonly<{
  tabs: Record<string, any>[];
}>) => {
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <TabsPrimitive.Root className="space-y-4" defaultValue={tabs[0].value}>
          <ScrollArea>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  disabled={tab?.disabled}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {tabs.map((tab) => tab.component)}
        </TabsPrimitive.Root>
      </div>
    </div>
  );
};
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsContent = ({
  children,
  title,
  value,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  value: string;
}>) => {
  return (
    <PrimitiveTabsContent
      className="mt-2 space-y-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      value={value}
    >
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <ScrollArea>
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </PrimitiveTabsContent>
  );
};
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent };
