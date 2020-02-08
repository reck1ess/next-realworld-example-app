import React from "react";

import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";
import LoadingSpinner from "../common/LoadingSpinner";

const ArticleList = ({ loading, articles, currentPage, onSetPage }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles &&
        articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))}

      <Pagination currentPage={currentPage} onSetPage={onSetPage} />
    </div>
  );
};

export default ArticleList;
