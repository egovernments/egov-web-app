export const prepareSearchUrl = (search, id) => {
  const { url: searchUrl, searchKey } = search;
  return `${searchUrl}?${searchKey}=${id}`;
};
