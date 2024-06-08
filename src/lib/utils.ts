import type { ClassValue } from 'clsx';

import * as bcrypt from 'bcryptjs';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const hash = (a: string): string => bcrypt.hashSync(a, 10);

export const compare = (a: string, b: string): boolean =>
  bcrypt.compareSync(a, b);

type StyleObject = {
  [key: string]: string;
};

export const translate = (a: string) =>
  a
    .split(';')
    .map((c) => c.split(':'))
    .reduce((p: StyleObject, c) => {
      let [k, v] = c;
      k = k.replace(/-./g, (b) => b.toUpperCase()[1]);
      p[k] = v;
      return p;
    }, {});

export const DEFAULT_ERROR = 'Une erreur est survenue !';
export const CREDENTIALS_SIGNIN_ERROR = 'E-mail ou mot de passe invalide !';
export const CREDENTIALS_SIGNUP_ERROR = 'Des informations sont invalides !';
