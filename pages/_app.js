import React from "react";

import Layout from "../components/common/Layout";

export default ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);
