import React from "react";

import PageContext from "./PageContext";
import PageCountContext from "./PageCountContext";
import useSessionStorage from "../hooks/useSessionStorage";

const ContextProvider = ({ children }) => {
  const [page, setPage] = useSessionStorage("offset", 0);
  const [pageCount, setPageCount] = React.useState(1);

  return (
    <PageContext.Provider value={{ page, setPage: offset => setPage(offset) }}>
      <PageCountContext.Provider
        value={{ pageCount, setPageCount: count => setPageCount(count) }}
      >
        {children}
      </PageCountContext.Provider>
    </PageContext.Provider>
  );
};

export default ContextProvider;
