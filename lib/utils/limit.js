export const limit = (limit, page) =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;
