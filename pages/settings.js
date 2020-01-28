import React from "react";
import Router from "next/router";

import SettingsForm from "../components/profile/settingsForm";

const Settings = () => {
  const handleLogout = async e => {
    e.preventDefault();
    const user = window.localStorage.getItem(`user`);
    if (!user || Object.keys(user).length === 0) return;

    window.localStorage.removeItem(`user`);

    Router.push(`/`);
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingsForm />
            <hr />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
