import marked from "marked";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ArticleMeta from "../../components/article/ArticleMeta";
import CommentList from "../../components/comment/CommentList";
import ErrorMessage from "../../components/common/ErrorMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import api from "../../lib/api";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";

const Article = ({ data: initialData }) => {
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const {
    data: articleData,
    error: articleError
  } = useSWR(
    `${SERVER_BASE_URL}/articles/${encodeURIComponent(pid)}`,
    fetcher,
    { initialData }
  );

  if (!articleData) {
    return <LoadingSpinner />;
  }

  if (articleError) return <ErrorMessage message="Cannot load an article..." />;

  const { article } = articleData;

  const markup = {
    __html: marked(article.body, { sanitize: true })
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup} />
            <ul className="tag-list">
              {article.tagList.map(tag => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
};

Article.getInitialProps = async ({ query: { pid } }) => {
  const { data } = await api.Articles.get(pid);
  return { data };
};

export default Article;
