

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Client from './Client';
import Publication from './Publication';
import Category from './Category';
import Comments from './Comments';

const tabs = [
{
  title:'Clients',
  value:'clientList',
  component:<Client/>,
},
{
  title:'Publications',
  value:'publication',
  component:<Publication/>,
},
{
  title:'Categories',
  value:'category',
  component:<Category/>,
},
{
  title:'Avis',
  value:'comment',
  component:<Comments/>,
},
];

export default function ClientAreaTab() {
  return (
    <TabsContent value="clientArea" className="space-y-4">
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
