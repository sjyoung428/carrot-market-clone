import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

export const withAPISession = (callback: any) => {
  return withIronSessionApiRoute(callback, cookieOptions);
};

export const withSsrSession = (callback: any) => {
  return withIronSessionSsr(callback, cookieOptions);
};
