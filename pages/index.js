import React from "react";
import useSWR from "swr";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";
import api from "../lib/api";
import fetcher from "../lib/utils/fetcher";
import { SERVER_BASE_URL, APP_NAME } from "../lib/utils/constant";

const Home = ({ data: initialData }) => {
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    const user = window.localStorage.getItem(`user`);

    if (!!user && user.token) {
      setToken(user.token);
    }
  }, []);

  const { data } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher, { initialData });

  return (
    <div className="home-page">
      <Banner token={token} appName={APP_NAME} />

      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={data && data.tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = await api.Tags.getAll();
  return { data };
};

export default Home;
