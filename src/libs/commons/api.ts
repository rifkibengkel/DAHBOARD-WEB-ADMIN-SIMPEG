import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, isAxiosError } from "axios";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";
import { SIMPEG_API } from "./constants";

type GetServerSidePropsWithSession = {
  (context: GetServerSidePropsContext, session: SessionInit): ReturnType<GetServerSideProps>;
};

export const api = axios.create({
  baseURL: process.env.SIMPEG_API,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const apiException = (error: unknown, res: NextApiResponse) => {
  if (isAxiosError(error)) {
    return res.status(error.response?.status || 500).json(error.response?.data);
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export const apiExceptionSSR = async ({ error, req, res }: { error: unknown; req: NextApiRequest; res: NextApiResponse }) => {
  if (isAxiosError(error) && error.status === 403) {
    console.log(error, "ERROR");

    const session = await getIronSession<SessionInit>(req, res, sessionOptions);
    session.destroy();
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  throw new Error("Internal Server Error");
};

export const apiSSR = (getServerSidePropsFunc: GetServerSidePropsWithSession) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;

    const session = await getIronSession<SessionInit>(req, res, sessionOptions);

    if (!session.isLoggedIn) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    try {
      return await getServerSidePropsFunc(context, session);
    } catch (error) {
      return apiExceptionSSR({
        error,
        req: req as NextApiRequest,
        res: res as NextApiResponse,
      });
    }
  };
};

export const apiSWR = (url: string) => api.get(url).then((res) => res.data);
