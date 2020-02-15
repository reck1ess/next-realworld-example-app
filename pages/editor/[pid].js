import fetch from "isomorphic-unfetch";
import Router, { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import api from "../../lib/api";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import editorReducer from "../../lib/utils/editorReducer";
import storage from "../../lib/utils/storage";

const UpdateArticleEditor = ({ articles: initialArticles }) => {
  const initialState = {
    title: initialArticles.article.title,
    description: initialArticles.article.description,
    body: initialArticles.article.body,
    tagList: initialArticles.article.tagList
  };

  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [posting, dispatch] = React.useReducer(editorReducer, initialState);
  const { data: currentUser } = useSWR("user", storage);
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const handleTitle = e =>
    dispatch({ type: "SET_TITLE", text: e.target.value });
  const handleDescription = e =>
    dispatch({ type: "SET_DESCRIPTION", text: e.target.value });
  const handleBody = e => dispatch({ type: "SET_BODY", text: e.target.value });
  const addTag = tag => dispatch({ type: "ADD_TAG", tag: tag });
  const removeTag = tag => dispatch({ type: "REMOVE_TAG", tag: tag });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const { ok, data } = await fetch(`${SERVER_BASE_URL}/articles/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(currentUser.token)}`
      },
      body: JSON.stringify({ article: posting })
    });

    setLoading(false);
    setErrors(!ok ? data.errors : []);

    if (ok) {
      Router.push(`/`);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={posting.title}
                    onChange={handleTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={posting.description}
                    onChange={handleDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={posting.body}
                    onChange={handleBody}
                  />
                </fieldset>

                <TagInput
                  tagList={posting.tagList}
                  addTag={addTag}
                  removeTag={removeTag}
                />

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  Update Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateArticleEditor.getInitialProps = async ({ query: { pid } }) => {
  const articles = await api.Articles.get(pid);
  return { articles };
};

export default UpdateArticleEditor;
