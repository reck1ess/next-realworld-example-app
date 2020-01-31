import Router from "next/router";
import React from "react";
import useSWR, { mutate } from "swr";

import storage from "../../lib/utils/storage";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import ListErrors from "../common/ListErrors";

const SettingsForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: ""
  });

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    setUserInfo({ ...userInfo, ...currentUser });
  }, []);

  const updateState = field => e => {
    const state = userInfo;
    const newState = { ...state, [field]: e.target.value };
    setUserInfo(newState);
  };

  const submitForm = async e => {
    e.preventDefault();
    setLoading(true);

    const user = { ...userInfo };

    if (!user.password) {
      delete user.password;
    }

    const response = await fetch(`${SERVER_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${currentUser.token}`
      },
      body: JSON.stringify({ user })
    });
    const data = await response.json();

    setLoading(false);
    setErrors(!response.ok ? data.errors.body : []);

    if (data && data.user) {
      window.localStorage.setItem("user", data.user);
      mutate("user", data.user);
    }

    if (response.ok) {
      Router.push(`/`);
    }
  };

  return (
    <React.Fragment>
      <ListErrors errors={errors} />
      <form onSubmit={submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={userInfo.image}
              onChange={updateState("image")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userInfo.username}
              onChange={updateState("username")}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={userInfo.bio}
              onChange={updateState("bio")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={updateState("email")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={userInfo.password}
              onChange={updateState("password")}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export default SettingsForm;
