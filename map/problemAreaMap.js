export const problemAreaMap = (data) => {
  if (!data) return [];
  return data.map((problem) => {
    return {
      id: problem.id,
      name: problem.problemArea,
      value: problem.id,
    };
  });
};
