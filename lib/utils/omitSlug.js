export const omitSlug = article =>
  Object.assign({}, article, { slug: undefined });
