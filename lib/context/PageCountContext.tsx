import React from "react";

export type PageCountDispatch = React.Dispatch<any>;

interface Props {
  children: React.ReactNode;
}

const PageCountStateContext = React.createContext<number | undefined>(
  undefined
);

const PageCountDispatchContext = React.createContext<
  PageCountDispatch | undefined
>(undefined);

const PageCountContextProvider = ({ children }: Props) => {
  const [pageCount, setPageCount] = React.useState(1);
  return (
    <PageCountDispatchContext.Provider value={setPageCount}>
      <PageCountStateContext.Provider value={pageCount}>
        {children}
      </PageCountStateContext.Provider>
    </PageCountDispatchContext.Provider>
  );
};

export const usePageCountState = () => {
  const state = React.useContext(PageCountStateContext);
  if (!state) throw new Error("PageCountContextProvider not found");
  return state;
};

export const usePageCountDispatch = () => {
  const dispatch = React.useContext(PageCountDispatchContext);
  if (!dispatch) throw new Error("PageCountContextProvider not found");
  return dispatch;
};

export default PageCountContextProvider;
