export const problemAreaMap = (data) => {
  if (!data) return [];
  return data.map((problem) => {
    const defaultPAStartIndex = 3;
    return {
      id: defaultPAStartIndex + problem.id,
      name: problem.problemArea,
      value: problem.id,
    };
  });
};
