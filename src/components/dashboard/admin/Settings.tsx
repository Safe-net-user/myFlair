import {
  General,
  Notifications,
  Security,
} from '@/components/dashboard/settingsAdmin';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
  {
    title: 'Général',
    value: 'general',
    component: <General />,
  },
  {
    title: 'Sécurité',
    value: 'security',
    component: <Security />,
  },
  {
    title: 'Notifications',
    value: 'notifications',
    component: <Notifications />,
  },
];

export default function SettingsTabs() {
  return (
    <TabsContent value="settings" className="space-y-4">
      <Tabs defaultValue={tabs[0].value}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => tab.component)}
      </Tabs>
    </TabsContent>
  );
}
