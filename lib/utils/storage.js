const storage = async key => {
  const value = localStorage.getItem(key);
  return !!value ? JSON.parse(value) : undefined;
};

export default storage;
