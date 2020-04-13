import Head from "next/head";
import React from "react";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";

const Home = () => (
  <>
    <Head>
      <title>HOME | NEXT REALWORLD</title>
      <meta
        name="description"
        content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
      />
    </Head>
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;
