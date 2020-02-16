import React from "react";

import Layout from "../components/common/Layout";
import ContextProvider from "../lib/context";

export default ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
};
