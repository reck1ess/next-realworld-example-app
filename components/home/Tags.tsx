import React from "react";

import CustomLink from "../common/CustomLink";
import LoadingSpinner from "../common/LoadingSpinner";
import { usePageDispatch } from "../../lib/context/PageContext";

const Tags = ({ tags }) => {
  const setPage = usePageDispatch();
  const handleClick = React.useCallback(() => setPage(0), []);

  if (!tags) return <LoadingSpinner />;

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <CustomLink
          key={tag}
          href={`/?tag=${tag}`}
          as={`/?tag=${tag}`}
          className="tag-default tag-pill"
        >
          <span onClick={handleClick}>{tag}</span>
        </CustomLink>
      ))}
    </div>
  );
};

export default Tags;
