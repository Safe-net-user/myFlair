'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { useUserContext } from '@/contexts/user';

import Cart from './Cart';
import Notifications from './Notifications';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import MyFlairBlack from '@/../public/logos/myflair-black.png';
import { Telescope } from 'lucide-react';

const links = [
  {
    title: 'Location',
    value: 'https://www.myflair.fr/#espace',
  },
  {
    title: 'Formation',
    value: 'https://www.myflair.fr/formation/',
  },
  {
    title: 'Gestion Planning',
    value: 'https://www.myflair.fr/gestion-planning',
  },
  {
    title: 'Business Boosters',
    value: '/shop/business-boosters',
  },
];

export default function Header({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'auth' }>) {
  const { user } = useUserContext();

  return (
    <header>
      <div className="hidden h-16 items-center justify-between border-b px-4 md:flex">
        <Link href="/">
          <Image
            alt="MyFlair"
            className="h-8 w-auto"
            height={0}
            src={MyFlairBlack}
            width={0}
          />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.title}>
                <Link href={link.value}>
                  <Button role="link" variant="link">
                    {link.title}
                  </Button>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className={`flex items-center ${user && 'space-x-4'}`}>
          <Link href="/back-up">
            <Button variant="ghost" size="icon">
              <Telescope className="h-4 w-4" />
            </Button>
          </Link>

          {variant === 'auth' ? (
            <div></div>
          ) : user ? (
            <>
              <Cart />
              <Notifications />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image!} />
                      <AvatarFallback className="bg-black text-white">
                        {user?.firstName.charAt(0) + user?.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 max-w-96"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={`/dashboard/${user?.role.toLowerCase()}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer !bg-destructive !text-destructive-foreground hover:!bg-destructive/90"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: '/auth/sign-in',
                      })
                    }
                  >
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button className="ml-4" onClick={() => signIn()}>
              Se connecter
            </Button>
          )}
        </div>
      </div>

      <div className="flex h-16 items-center justify-between border-b px-4 md:hidden">
        <Link href="/">
          <Image
            alt="MyFlair"
            className="h-8 w-auto"
            height={0}
            src={MyFlairBlack}
            width={0}
          />
        </Link>

        <div className={`flex items-center ${user && 'space-x-4'}`}>
          <Link href="/back-up">
            <Button variant="ghost" size="icon">
              <Telescope className="h-4 w-4" />
            </Button>
          </Link>

          {variant === 'auth' ? (
            <div></div>
          ) : user ? (
            <>
              <Cart />
              <Notifications />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image!} />
                      <AvatarFallback className="bg-black text-white">
                        {user?.firstName.charAt(0) + user?.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={`/dashboard/${user?.role.toLowerCase()}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer !bg-destructive !text-destructive-foreground hover:!bg-destructive/90"
                    onClick={() =>
                      signOut({
                        redirect: true,
                        callbackUrl: '/auth/sign-in',
                      })
                    }
                  >
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button className="mx-4" onClick={() => signIn()}>
              Se connecter
            </Button>
          )}
          <Sheet>
            <div className="space-x-4">
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <HamburgerMenuIcon className="h-4 w-4" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span>MyFlair</span>
                  <span className="sr-only">MyFlair</span>
                </Link>
                {links.map((link) => (
                  <Link
                    key={link.value}
                    href={link.value}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Button variant="link">{link.title}</Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
