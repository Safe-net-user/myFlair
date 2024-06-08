import { getAllAdditionalServices } from '@/data/services';

import { Button } from '@/components/ui/button';


import { TabsContent } from '@/components/ui/tabs';

export default async function ServicesTab() {
  const additionalServices = (await getAllAdditionalServices()) || [];

  return (
    <TabsContent value="services" className="space-y-4">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <Button>Ajouter</Button>
        </div>

        {/* @ts-ignore */}
 
      </div>
    </TabsContent>
  );
}
