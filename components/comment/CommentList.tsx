import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";

import { CommentType } from "../../lib/types/commentType";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";

const CommentList = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data, error } = useSWR(
    `${SERVER_BASE_URL}/articles/${pid}/comments`,
    fetcher
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  if (error)
    return (
      <ErrorMessage message="Cannot load comments related to this article..." />
    );

  const { comments } = data;

  return (
    <div>
      <CommentInput />
      {comments.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
