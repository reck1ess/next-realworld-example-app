import React from "react";

const Maybe = ({ test, children }) => (
  <React.Fragment>{test && children}</React.Fragment>
);

export default Maybe;
