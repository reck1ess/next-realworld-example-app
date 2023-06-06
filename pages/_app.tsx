import Head from "next/head";
import React, { useEffect } from "react";
import { trackPageView } from "../utils/amplitude";
import { useRouter } from 'next/router';

import Layout from "components/common/Layout";
import ContextProvider from "lib/context";
import "styles.css";

if (typeof window !== "undefined") {
  require("lazysizes/plugins/attrchange/ls.attrchange.js");
  require("lazysizes/plugins/respimg/ls.respimg.js");
  require("lazysizes");
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();  
  // To track the initial render, probably a more elegant way to do this
  useEffect(() => {
    trackPageView('/')
  },[])

  useEffect(() => {
    const handleRouteChange = url => {
      trackPageView(url)
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };

  }, [router.events]);

  return(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </>
  );
}

export default MyApp;
