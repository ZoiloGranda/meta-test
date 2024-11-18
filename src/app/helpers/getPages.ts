export const getPages = (
  currentResults: number,
  PAGE_LIMIT: number,
  currentPage: number,
): number[] => {
  if (currentResults === PAGE_LIMIT) {
    return currentPage >= 2
      ? [currentPage - 1, currentPage, currentPage + 1]
      : [currentPage, currentPage + 1];
  }
  return [currentPage];
};
