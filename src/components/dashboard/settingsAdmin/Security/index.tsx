import ChangePassword from './UpdatePassword';
import ChangePhone from './UpdatePhone';
import DeleteAccount from './DeleteAccount';

import { TabsContent } from '@/components/tabs';

export default function SecurityTab() {
  return (
    <TabsContent title="Sécurité" value="security">
      <div className="flex flex-col space-y-4">
        <ChangePassword />
        <ChangePhone />
        <DeleteAccount />
      </div>
    </TabsContent>
  );
}
