import { Tabs } from '@/components/tabs';
import { Overview, Shop, Settings } from '@/components/dashboard/admin';

const tabs = [
  {
    title: 'Aperçu',
    value: 'overview',
    component: <Overview />,
  },
  {
    title: 'Boutique',
    value: 'shop',
    component: <Shop />,
  },
  {
    title: 'Paramètres',
    value: 'settings',
    component: <Settings />,
  },
];

export default function AdminDashboard() {
  return <Tabs tabs={tabs} />;
}
