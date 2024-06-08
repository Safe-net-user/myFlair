'use client';

import type { ReactNode } from 'react';
import type { Session, User } from 'next-auth';

import { useState } from 'react';

import { UserContext } from '@/contexts/user';

export default function UserContextProvider({
  children,
  session,
}: Readonly<{ children: ReactNode; session: Session | null }>) {
  const [user, setUser] = useState<User | undefined>(session?.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
