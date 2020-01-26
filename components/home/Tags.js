import React from "react";

import CustomLink from "../common/CustomLink";
import LoadingSpinner from "../common/LoadingSpinner";

const Tags = ({ tags }) => {
  if (!tags) return <LoadingSpinner />;

  return (
    <div className="tag-list">
      {tags.map(tag => {
        return (
          <CustomLink
            key={tag}
            href={`/tab=tag&tag=${tag}`}
            className="tag-default tag-pill"
          >
            {tag}
          </CustomLink>
        );
      })}
    </div>
  );
};

export default Tags;
