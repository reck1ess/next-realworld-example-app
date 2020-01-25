import pathToRegexp from "path-to-regexp";

export const activePath = (currentPath, path, options) => {
  const regexPath = pathToRegexp(path, options);

  const result = regexPath.exec(currentPath);
  return result;
};
