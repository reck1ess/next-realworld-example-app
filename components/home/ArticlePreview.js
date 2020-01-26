import React from "react";
import Link from "next/link";

import api from "../../lib/api";
import CustomLink from "../common/CustomLink";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const ArticlePreview = ({ article }) => {
  const handleClickFavorite = e => {
    e.preventDefault();
    if (article.favorited) {
      api.Articles.unfavorite(article.slug);
    } else {
      api.Articles.favorite(article.slug);
    }
  };

  const favoriteButtonClass = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  if (!article) return;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <CustomLink href={`/@${article.author.username}`}>
          <img src={article.author.image} alt="" />
        </CustomLink>

        <div className="info">
          <CustomLink className="author" href={`/@${article.author.username}`}>
            {article.author.username}
          </CustomLink>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClickFavorite}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <CustomLink href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </CustomLink>
    </div>
  );
};

export default ArticlePreview;
