export function schoolGradeMap(data) {
  const { id, grade } = data;
  return {
    key: id,
    name: grade,
  };
}

export function schoolTypeMap(data) {
  const { id, type } = data;
  return {
    key: id,
    name: type,
  };
}

export function locationSchoolMap(data) {
  const { id, name } = data;
  return {
    key: id,
    name,
  };
}
