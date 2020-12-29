const compare = (a, b) => {
  const aSort = Number(a.sort);
  const bSort = Number(b.sort);
  if (aSort < bSort) {
    return -1;
  }
  if (aSort > bSort) {
    return 1;
  }
  return 0;
};
export const bannerMap = (banners) => {
  if (!banners) return [];
  return banners.sort(compare);
};
