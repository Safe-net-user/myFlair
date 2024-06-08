'use client';

import { buy } from '@/actions/buy';
import { useUserContext } from '@/contexts/user';

export default function Buy() {
  const { user } = useUserContext();

  return (
    <form>
      <button formAction={buy}>Acheter</button>
    </form>
  );
}
