export const getQuery = (limit: number, page: number): string =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;
