import React from "react";
import Router from 'next/router';

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

  React.useEffect(() => {
    const user = window.localStorage.getItem(`user`);
    if (!user || Object.keys(user).length === 0) return;
    setUserInfo({ ...userInfo, ...user });
  }, []);

  const updateState = field => e => {
    const state = userInfo;
    const newState = { ...state, [field]: e.target.value };
    setUserInfo(newState);
  };


  const submitForm = e => {
    e.preventDefault();
    setLoading(true);

    const user = { ...userInfo };
    if (!user.password) {
      delete user.password;
    }

    const { ok, data } = await api.Auth.save(user);

    setLoading(false);
    setErrors(!ok ? data.errors.body : []);

    if (data && data.user)
      window.localStorage.setItem(`user`, data && JSON.stringify(data.user));

    if (ok) {
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
