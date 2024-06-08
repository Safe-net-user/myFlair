import type {
  Account,
  Cart,
  Order,
  Review,
  TwoFactorConfirmation,
  UserRole,
} from '@prisma/client';

import NextAuth from 'next-auth';

import { Address, Preferences } from '.';

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    stripeCustomerId?: string;
    image: string;
    gallery: string[];
    service?: string;
    role: UserRole;
    username: string;
    firstName: string;
    lastName: string;
    address: Address;
    enterprise: string;
    homeServiceOnly: boolean;
    email: string;
    emailVerified?: Date;
    password: string;
    phone: string;
    website?: string;
    isTwoFactorEnabled: boolean;
    // accounts: Account[];
    twoFactorConfirmation?: TwoFactorConfirmation;
    orders: Order[];
    reviews: Review[];
    cart?: Cart;
    preferences: Preferences;
    createdAt: Date;
    updatedAt?: Date;
  }
}

export {};
