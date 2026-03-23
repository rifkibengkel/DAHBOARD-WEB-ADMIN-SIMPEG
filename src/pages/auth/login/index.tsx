import React from "react";
import { GetServerSidePropsContext } from "next";
import { getIronSession } from "iron-session";
import Head from "next/head";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { sessionOptions } from "@/libs/commons";
import { Login, Navbar } from "@/pagesComponents/Auth/Components";

const SnackbarNotification = dynamic(() => import("@/components/Snackbar/Notification"), { ssr: false });

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Simpeg - Login</title>
      </Head>
      <Box
        height="100vh"
        width="100vw"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Navbar />
        <Login />
        <SnackbarNotification />
      </Box>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getIronSession<SessionInit>(context.req, context.res, sessionOptions);

  if (session.isLoggedIn) {
    return {
      redirect: {
        destination: "/redirect",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
