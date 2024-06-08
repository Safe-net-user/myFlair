import { Tabs } from '@/components/tabs';
import {
  Overview,
  Orders,
  Reservations,
  Reviews,
  Settings,
} from '@/components/dashboard/personal';

const tabs = [
  {
    title: 'Aperçu',
    value: 'overview',
    component: <Overview />,
  },
  {
    title: 'Réservations',
    value: 'reservations',
    component: <Reservations />,
  },
  {
    title: 'Commandes',
    value: 'orders',
    component: <Orders />,
  },
  {
    title: 'Avis',
    value: 'reviews',
    component: <Reviews />,
  },
  {
    title: 'Paramètres',
    value: 'settings',
    component: <Settings />,
  },
];

export default function PersonalDashboard() {
  return <Tabs tabs={tabs} />;
}
