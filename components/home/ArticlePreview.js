import Link from "next/link";
import React from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import CustomLink from "../common/CustomLink";
import CustomImage from "../common/CustomImage";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import PageContext from "../../lib/context/PageContext";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const ArticlePreview = ({ article }) => {
  const { setPage } = React.useContext(PageContext);

  const [preview, setPreview] = React.useState(article);
  const [hover, setHover] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const handleClickFavorite = async slug => {
    if (!isLoggedIn) return;

    setPreview({
      ...preview,
      favorited: !preview.favorited,
      favoritesCount: preview.favorited
        ? preview.favoritesCount - 1
        : preview.favoritesCount + 1
    });

    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/articles/${slug}/favorite`,
        {
          method: `${preview.favorited ? "DELETE" : "POST"}`,
          headers: {
            Authorization: `Token ${currentUser.token}`
          }
        }
      );
    } catch (error) {
      setPreview({
        ...preview,
        favorited: !preview.favorited,
        favoritesCount: preview.favorited
          ? preview.favoritesCount - 1
          : preview.favoritesCount + 1
      });
    }
  };

  if (!article) return;

  return (
    <div className="article-preview" style={{ padding: "1.5rem 0.5rem" }}>
      <div className="article-meta">
        <CustomLink href={`/profile/${preview.author.username}`}>
          <CustomImage
            src={preview.author.image}
            alt="author's profile image"
          />
        </CustomLink>

        <div className="info">
          <CustomLink
            className="author"
            href={`/profile/${preview.author.username}`}
          >
            <span onClick={() => setPage(0)}>{preview.author.username}</span>
          </CustomLink>
          <span className="date">
            {new Date(preview.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button
            className={
              preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
            }
            onClick={() => handleClickFavorite(preview.slug)}
          >
            <i className="ion-heart" /> {preview.favoritesCount}
          </button>
        </div>
      </div>

      <CustomLink href={`/article/${preview.slug}`} className="preview-link">
        <h1>{preview.title}</h1>
        <p>{preview.description}</p>
        <span>Read more...</span>
        <ul className="tag-list" style={{ maxWidth: "100%" }}>
          {preview.tagList.map((tag, index) => {
            return (
              <Link href={`/?tag=${tag}`} key={index}>
                <li
                  className="tag-default tag-pill tag-outline"
                  onClick={e => e.stopPropagation()}
                  onMouseOver={() => {
                    setHover(true);
                    setCurrentIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                    setCurrentIndex(-1);
                  }}
                  style={{
                    borderColor:
                      hover && currentIndex === index ? "#5cb85c" : "initial"
                  }}
                >
                  <span
                    style={{
                      color:
                        hover && currentIndex === index ? "#5cb85c" : "inherit"
                    }}
                    onClick={() => setPage(0)}
                  >
                    {tag}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </CustomLink>
    </div>
  );
};

export default ArticlePreview;
