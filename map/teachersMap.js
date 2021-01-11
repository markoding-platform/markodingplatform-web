const teachersMap = (teachers) => {
  if (teachers.length) {
    return teachers.map((item) => ({
      id: item.id,
      name: item.name,
      schoolName: item.profile.schoolName,
    }));
  }
  return [];
};

export default teachersMap;
