import fetch from "isomorphic-unfetch";

const updateOptions = options => {
  const update = { ...options };
  if (typeof window === "undefined") return;

  if (!window.localStorage.user) return;
  const user = JSON.parse(window.localStorage.user);

  if (!!user.token) {
    update.headers = {
      ...update.headers,
      Authorization: `Token ${user.token}`
    };
  }
  return update;
};

export default async function(...args) {
  const res = await fetch(...args, updateOptions());
  return res.json();
}
