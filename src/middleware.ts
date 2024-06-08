import NextAuth from 'next-auth';
import { UserRole } from '@prisma/client';

import authConfig from '@/auth.config';
import { auth as getUser } from '@/auth';

const { auth } = NextAuth(authConfig);

export default auth(async (request) => {
  const { nextUrl } = request;

  const user = (await getUser())?.user;

  if (user && /auth/.test(nextUrl.pathname))
    return Response.redirect(new URL('/', nextUrl));

  if (
    (!user && /steps/.test(nextUrl.pathname)) ||
    (!user && /dashboard/.test(nextUrl.pathname))
  )
    return Response.redirect(new URL('/auth/sign-in', nextUrl));

  if (
    (/personal/.test(nextUrl.pathname) && user?.role !== UserRole.PERSONAL) ||
    (/professional/.test(nextUrl.pathname) &&
      user?.role !== UserRole.PROFESSIONAL) ||
    (/administrator/.test(nextUrl.pathname) &&
      user?.role !== UserRole.ADMINISTRATOR)
  )
    return Response.redirect(new URL('/', nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
