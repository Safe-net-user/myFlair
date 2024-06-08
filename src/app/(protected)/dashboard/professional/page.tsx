import { Tabs } from '@/components/tabs';
import {
  Overview,
  Services,
  Reservations,
  Clients,
  Availabilities,
  Orders,
  Subscriptions,
  Settings,
} from '@/components/dashboard/professional';

const tabs = [
  {
    title: 'Aperçu',
    value: 'overview',
    component: <Overview />,
  },
  {
    title: 'Services',
    value: 'services',
    component: <Services />,
  },
  {
    title: 'Réservations',
    value: 'reservations',
    component: <Reservations />,
  },
  {
    title: 'Clients',
    value: 'clients',
    component: <Clients />,
  },
  {
    title: 'Disponibilités',
    value: 'availabilities',
    component: <Availabilities />,
  },
  {
    title: 'Commandes',
    value: 'orders',
    component: <Orders />,
  },
  {
    title: 'Abonnements',
    value: 'subscriptions',
    component: <Subscriptions />,
  },
  {
    title: 'Paramètres',
    value: 'settings',
    component: <Settings />,
  },
];

export default function ProfessionalDashboard() {
  return <Tabs tabs={tabs} />;
}
