import React from "react";
import { useRouter } from "next/router";
import useSWR, { trigger } from "swr";

import CustomLink from "../common/CustomLink";
import CustomImage from "../common/CustomImage";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import { SERVER_BASE_URL } from "../../lib/utils/constant";

const CommentInput = () => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const [content, setContent] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      `${SERVER_BASE_URL}/articles/${encodeURIComponent(pid)}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser.token)}`
        },
        body: JSON.stringify({
          comment: {
            body: content
          }
        })
      }
    );
    setLoading(false);
    setContent("");
    trigger(`${SERVER_BASE_URL}/articles/${pid}/comments`);
  };

  if (!isLoggedIn) {
    return (
      <p>
        <CustomLink href="/user/login">Sign in</CustomLink>
        &nbsp;or&nbsp;
        <CustomLink href="/user/register">sign up</CustomLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="card-footer">
        <CustomImage
          className="comment-author-img"
          src={currentUser.image}
          alt="Comment author's profile image"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
