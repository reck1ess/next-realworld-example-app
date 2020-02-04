import React from "react";

const TagInput = ({ tagList, addTag, removeTag }) => {
  const [tags, setTags] = React.useState("");

  const changeTagInput = e => setTags(e.target.value);

  const handleTagInputKeyDown = e => {
    switch (e.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // Comma
        if (e.keyCode !== 9) e.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };

  const handleAddTag = () => {
    if (!!tags) {
      addTag(tags.trim());
      setTags("");
    }
  };

  const handleRemoveTag = tag => {
    removeTag(tag);
  };

  console.log("====================================");
  console.log("tagList: ", tagList);
  console.log("====================================");

  return (
    <React.Fragment>
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          value={tags}
          onChange={changeTagInput}
          onBlur={handleAddTag}
          onKeyDown={handleTagInputKeyDown}
        />

        <div className="tag-list"></div>
      </fieldset>
    </React.Fragment>
  );
};

export default TagInput;
