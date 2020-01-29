import fetch from "isomorphic-unfetch";

import fetcher from "./utils/fetcher";
import { SERVER_BASE_URL } from "./utils/constant";
import { limit } from "./utils/limit";
import { omitSlug } from "./utils/omitSlug";

const Articles = {
  all: (page, limit = 10) =>
    fetcher(`${SERVER_BASE_URL}/articles?${limit(limit, page)}`),

  byAuthor: (author, page, limit = 5) =>
    fetcher(
      `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(author)}&${limit(
        limit,
        page
      )}`
    ),

  byTag: (tag, page, limit = 10) =>
    fetcher(
      `${SERVER_BASE_URL}/articles?tag=${encodeURIComponent(tag)}&${limit(
        limit,
        page
      )}`
    ),

  del: slug =>
    fetch(`${SERVER_BASE_URL}/articles/${slug}`, {
      method: "DELETE"
    }),

  favorite: slug =>
    fetch(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
      method: "POST"
    }),

  favoritedBy: (author, page) =>
    fetcher(
      `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        author
      )}&${limit(5, page)}`
    ),

  feed: (page, limit = 10) =>
    fetcher(`${SERVER_BASE_URL}/articles/feed?${limit(limit, page)}`),

  get: slug => fetcher(`${SERVER_BASE_URL}/articles/${slug}`),

  unfavorite: slug =>
    fetch(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
      method: "DELETE"
    }),

  update: article =>
    fetch(`${SERVER_BASE_URL}/articles/${article.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ article: omitSlug(article) })
    }),

  create: article =>
    fetch(`${SERVER_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ article })
    })
};

const Auth = {
  current: async () => {
    const user = window.localStorage.getItem(`user`);
    const jwt = user && user.token;

    const response = await fetch(`/user`, {
      method: "GET",
      headers: {
        Authorization: `Token ${encodeURIComponent(jwt)}`
      }
    });
    const data = await response.json();

    return {
      ok: response.ok,
      data
    };
  },

  login: async (email, password) => {
    const response = await fetch(`${SERVER_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { email, password } })
    });
    const data = await response.json();

    return {
      ok: response.ok,
      data
    };
  },

  register: async (username, email, password) => {
    const response = await fetch(`${SERVER_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: { username, email, password } })
    });
    const data = await response.json();

    return {
      ok: response.ok,
      data
    };
  },

  save: async user => {
    const response = await fetch(`${SERVER_BASE_URL}/user`, {
      method: "PUT",
      body: JSON.stringify({ user })
    });
    const data = await response.json();

    return {
      ok: response.ok,
      data
    };
  }
};

const Comments = {
  create: async (slug, comment) => {
    const response = await fetch(
      `${SERVER_BASE_URL}/articles/${slug}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ comment })
      }
    );
    const data = await response.json();

    return {
      ok: response.ok,
      data
    };
  },

  delete: async (slug, commentId) => {
    const response = await fetch(
      `${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`,
      {
        method: "DELETE"
      }
    );

    return {
      ok: response.ok
    };
  },

  forArticle: slug => fetcher(`${SERVER_BASE_URL}/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    fetch(`${SERVER_BASE_URL}/profiles/${username}/follow`, {
      method: "POST"
    }),

  get: username => fetcher(`${SERVER_BASE_URL}/profiles/${username}`),

  unfollow: username =>
    fetch(`${SERVER_BASE_URL}/profiles/${username}/follow`, {
      method: "DELETE"
    })
};

const Tags = {
  getAll: () => fetcher(`${SERVER_BASE_URL}/tags`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags
};
