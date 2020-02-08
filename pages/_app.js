import React from "react";

import ContextProvider from "../lib/context";
import Layout from "../components/common/Layout";

export default ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
};
