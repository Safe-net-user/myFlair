declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_FROM_EMAIL: string;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};
