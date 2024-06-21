import Workplaces from './Workplaces/page';
import BusinessBoosters from './BusinessBoosters';
import Services from './Services';


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Formations from './Formations';

const tabs = [
  {
    title: 'Postes',
    value: 'workplaces',
    component: <Workplaces />,
  },
  {
    title: 'Business Boosters',
    value: 'business-boosters',
    component: <BusinessBoosters />,
  },
  {
    title: 'Services',
    value: 'services',
    component: <Services />,
  },
  {
    title: 'Formations',
    value: 'formations',
    component: <Formations />,
  }
];

export default function ShopTab() {
  return (
    <TabsContent value="shop" className="space-y-4">
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
