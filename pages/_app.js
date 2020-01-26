import React from "react";
import useSWR from "swr";

import { SERVER_BASE_URL } from "../lib/utils/constant";
import fetcher from "../lib/utils/fetcher";
import Layout from "../components/common/Layout";
import api from "../lib/api";

export default ({ Component, pageProps }) => {
  React.useEffect(() => {
    const { data } = api.Auth.current();

    if (!!data) {
      const { user } = data;
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
