'use server';

import type {
  Notification,
  Order,
  Prisma,
  Reservation,
  Review,
  User,
} from '@prisma/client';

import * as z from 'zod';

import { ReservationStatus } from '@prisma/client';

import { hash } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { updatePasswordSchema, updatePhoneSchema } from '@/schemas';

const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
export const getIdbyUser = async (username: string): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: true
    }
  });

  return user ? user.id : null; 
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const parsedEmail = z.string().email().safeParse(email);

  if (parsedEmail.success) {
    return await prisma.user.findFirst({
      where: {
        email: parsedEmail.data,
      },
      include: {
        cart: true,
      },
    });
  } else {
    return null;
  }
};

export const updateUserByUserId = async (
  id: string,
  values: any,
): Promise<boolean> => {
  let success;

  try {
    success = await prisma.user.update({
      where: {
        id,
      },
      data: values,
    });
  } catch (_) {}

  return !!success;
};

export const updateUserByUserForgotPassword = async (
  forgotPassword: string,
  password: string,
): Promise<boolean> => {
  let success;

  try {
    success = await prisma.user.update({
      where: {
        forgotPassword,
      },
      data: {
        password: hash(password),
      },
    });
  } catch (_) {}

  return !!success;
};

export const updatePasswordByUserId = async (
  id: string,
  passwords: z.infer<typeof updatePasswordSchema>,
): Promise<boolean> => {
  const user = await getUserById(id);

  if (!user) return false;

  if (
    passwords.current === passwords.new ||
    hash(passwords.current) === user.password ||
    hash(passwords.new) === user.password
  )
    return false;

  let success;

  try {
    success = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hash(passwords.new),
      },
    });
  } catch (_) {}

  return !!success;
};

export const updatePhoneByUserId = async (
  id: string,
  phones: z.infer<typeof updatePhoneSchema>,
): Promise<boolean> => {
  const user = await getUserById(id);
  if (!user) return false;

  if (
    phones.current === phones.new ||
    phones.current === user.password ||
    phones.new === user.password
  )
    return false;

  let success;

  try {
    success = await prisma.user.update({
      where: {
        id,
      },
      data: {
        phone: phones.new,
      },
    });
  } catch (_) {}

  return !!success;
};

export const deleteUserById = async (id: string): Promise<boolean> => {
  let success;

  try {
    success = await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (_) {}

  return !!success;
};

export const addItemByCartId = async (id: string, item: any) => {
  let success;

  try {
  } catch (_) {}

  return !!success;
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
  });
};

export const getReservationsByUserId = async (
  userId: string,
): Promise<Reservation[]> => {
  return await prisma.reservation.findMany({
    where: {
      personalId: userId,
    },
  });
};

export const getReviewsByUserId = async (userId: string): Promise<Review[]> => {
  return await prisma.review.findMany({
    where: {
      userId,
    },
  });
};

export const getNotificationsByUserId = async (
  userId: string,
): Promise<Notification[]> => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
  });
};

type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export const getCartByUserId = async (
  userId: string,
): Promise<CartWithItems | null> => {
  return await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
  });
};

export const cancelReservationById = async (id: string, reason: string) => {
  let success;

  try {
    success = await prisma.reservation.update({
      where: {
        id,
      },
      data: {
        reason,
        status: ReservationStatus.CANCELED,
      },
    });
  } catch (_) {
    return false;
  }

  return !!success;
};

export const updateUserDatePreferencesByUserId = async (
  id: string,
  values: any,
) => {
  let success;

  try {
    success = await prisma.user.update({
      where: {
        id,
      },
      data: {
        preferences: {
          date: {
            ...values,
          },
        },
      },
    });
  } catch (_) {
    return false;
  }

  return !!success;
};
