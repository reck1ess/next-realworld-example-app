import React from "react";

import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";
import DeleteButton from "./DeleteButton";
import useIsMounted from "../../lib/hooks/useIsMounted";

const Comment = ({ comment }) => {
  const isMounted = useIsMounted();
  const currentUser = isMounted && window.localStorage.getItem(`user`);
  const canModify =
    currentUser && currentUser.username === comment.author.username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <CustomLink
          href={`/@${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt="Comment author's profile image"
          />
        </CustomLink>
        &nbsp;
        <CustomLink
          href={`/@${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </CustomLink>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <Maybe test={canModify}>
          <DeleteButton commentId={comment.id} />
        </Maybe>
      </div>
    </div>
  );
};

export default Comment;
