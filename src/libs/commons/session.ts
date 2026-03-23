import { SessionOptions } from "iron-session";
import { SIMPEG_COOKIES_KEY, SIMPEG_SECRET_KEY } from "./constants";

export const sessionInit: SessionInit = {
  isLoggedIn: false,
  token: "",
};

export const sessionOptions: SessionOptions = {
  password: SIMPEG_SECRET_KEY,
  cookieName: SIMPEG_COOKIES_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
