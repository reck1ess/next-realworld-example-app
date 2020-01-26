import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <React.Fragment>
    <Navbar />
    {children}
    <Footer />
  </React.Fragment>
);

export default Layout;
