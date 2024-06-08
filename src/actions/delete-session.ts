'use server';

import { cookies } from 'next/headers';

export const deleteSession = () => {
  cookies()
    .getAll()
    .map((cookie) => {
      cookies().delete(cookie.name);
    });
};
