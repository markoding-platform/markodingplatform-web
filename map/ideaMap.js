export const ideaMap = (data) => {
  if (!data) return {};
  const problemArea = data?.problemArea?.problemArea || '';
  return {
    ...data,
    problemArea,
  };
};
