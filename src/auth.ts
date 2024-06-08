import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';
import authConfig from '@/auth.config';
import { getUserByEmail } from '@/data/user';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    /* @ts-ignore */
    async session({ session }) {
      if (!session) return;

      /* @ts-ignore */
      session.user = await getUserByEmail(session.user.email);

      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
