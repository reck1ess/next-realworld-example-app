import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const CommentAPI = {
  create: async (slug, comment) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/articles/${slug}/comments`,
        JSON.stringify({ comment })
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  delete: async (slug, commentId) => {
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  forArticle: (slug) =>
    axios.get(`${SERVER_BASE_URL}/articles/${slug}/comments`),
};

export default CommentAPI;
