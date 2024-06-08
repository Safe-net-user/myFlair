import type { NextAuthConfig } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { compare } from '@/lib/utils';
import { signInSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

const authConfig = {
  providers: [
    CredentialsProvider({
      /* @ts-ignore */
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          try {
            const user = await getUserByEmail(email);

            if (!user?.password) return null;

            if (compare(password, user.password)) return user;
          } catch (_) {}
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
