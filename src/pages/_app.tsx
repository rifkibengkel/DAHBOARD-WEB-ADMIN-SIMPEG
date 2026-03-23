import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SWRConfig } from "swr/_internal";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { UtilsProvider } from "@/contexts";
import { apiSWR } from "@/libs/commons";
import "@/styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppCacheProvider {...props}>
      <UtilsProvider>
        <SWRConfig value={{ fetcher: apiSWR }}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </SWRConfig>
      </UtilsProvider>
    </AppCacheProvider>
  );
};

export default App;
