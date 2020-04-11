const checkLogin = (currentUser) =>
  !!currentUser &&
  currentUser?.constructor === Object &&
  Object.keys(currentUser).length !== 0;

export default checkLogin;
