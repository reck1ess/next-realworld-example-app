import axios from "axios";
import React from "react";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";
import useRequest from "../lib/hooks/useRequest";
import { SERVER_BASE_URL } from "../lib/utils/constant";
import { ArticleList } from "../lib/types/articleType";
import { TagList } from "../lib/types/tagType";

const Home = ({ articles: initialArticles, tags: initialTags }) => {
  const { data: fetchedArticles } = useRequest(
    { url: `${SERVER_BASE_URL}/articles` },
    {
      initialData: initialArticles,
    }
  );
  const { data: fetchedTags } = useRequest(
    { url: `${SERVER_BASE_URL}/tags` },
    {
      initialData: initialTags,
    }
  );

  const { articles }: ArticleList = fetchedArticles || initialArticles;
  const { tags }: TagList = fetchedTags || initialTags;

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <MainView articles={articles} />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data: articles } = await axios.get(`${SERVER_BASE_URL}/articles`);
  const { data: tags } = await axios.get(`${SERVER_BASE_URL}/tags`);
  return { articles, tags };
};

export default Home;
