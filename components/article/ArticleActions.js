import fetch from "isomorphic-unfetch";
import Router, { useRouter } from "next/router";
import React from "react";
import useSWR, { trigger } from "swr";

import CustomLink from "../common/CustomLink";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const ArticleActions = ({ article }) => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const handleDelete = async () => {
    if (!isLoggedIn) return;

    await fetch(`${SERVER_BASE_URL}/articles/${pid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${currentUser.token}`
      }
    });
    trigger(`${SERVER_BASE_URL}/articles/${pid}`);
    Router.push(`/`);
  };

  const canModify =
    isLoggedIn && currentUser.username === article.author.username;

  return !canModify ? (
    <span />
  ) : (
    <span>
      <CustomLink
        href={`/editor/${article.slug}`}
        className="btn btn-outline-secondary btn-sm"
      >
        <i className="ion-edit" /> Edit Article
      </CustomLink>

      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        <i className="ion-trash-a" /> Delete Article
      </button>
    </span>
  );
};

export default ArticleActions;
