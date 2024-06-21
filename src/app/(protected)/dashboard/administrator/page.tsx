import { Tabs } from '@/components/tabs';
import { Overview, Shop, Settings, Client, Product, } from '@/components/dashboard/admin';

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
    title: 'Espace Client',
    value: 'clientArea',
    component: <Client />,
  },
  {
    title: 'Produits',
    value: 'product',
    component: <Product />,
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
