import { TabsContent } from '@/components/ui/tabs';

export default function ClientsTab() {
  return (
    <TabsContent value="clients" className="space-y-4">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
        </div>
      </div>
    </TabsContent>
  );
}
