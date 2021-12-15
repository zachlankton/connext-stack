import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "src/store/index";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DotLoader from "react-spinners/DotLoader";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function LoadingSpinner() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const handleRouteChange = () => setIsLoading(true);
  const routeChangeComplete = () => setIsLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", routeChangeComplete);
    setIsLoading(false);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", routeChangeComplete);
      document.removeEventListener("DOMContentLoaded", routeChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      {isLoading && (
        <div className="global-overlay">
          <DotLoader loading={isLoading} css={override} size={150} />
          <h3 style={{ textAlign: "center" }}>Loading ... </h3>
        </div>
      )}
    </>
  );
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>Connext Stack!</title>
        <meta name="description" content="A Connext Stack Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/colors.css" />
      </Head>

      <LoadingSpinner />
      <ReduxProvider store={store}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
