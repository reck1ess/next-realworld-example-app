import React from "react";

const TagInput = ({ tagList, addTag, removeTag }) => {
  const [tag, setTag] = React.useState("");

  const changeTagInput = (e) => setTag(e.target.value);

  const handleTagInputKeyDown = (e) => {
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
    if (!!tag) {
      addTag(tag);
      setTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    removeTag(tag);
  };

  return (
    <>
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          value={tag}
          onChange={changeTagInput}
          onBlur={handleAddTag}
          onKeyDown={handleTagInputKeyDown}
        />

        <div className="tag-list">
          {tagList.map((tag, index) => (
            <span className="tag-default tag-pill" key={index}>
              <i
                className="ion-close-round"
                onClick={() => handleRemoveTag(tag)}
              />
              {tag}
            </span>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default TagInput;
