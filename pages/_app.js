import React from "react";

import PageContext from "../lib/context/PageContext";
import Layout from "../components/common/Layout";
import useSessionStorage from "../lib/hooks/useSessionStorage";

export default ({ Component, pageProps }) => {
  const [page, setPage] = useSessionStorage("offset", 0);

  return (
    <PageContext.Provider value={{ page, setPage: offset => setPage(offset) }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PageContext.Provider>
  );
};
