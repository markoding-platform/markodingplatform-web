const userMap = (user) => {
  const { id, name, email, profile = {}, imageUrl, markodingPoint } = user;
  const { profileType, schoolName, workingPosition, companyName } =
    profile || {};
  let bio = '';
  if (profileType === 'teacher') {
    bio = `Guru di ${schoolName}`;
  } else if (profileType === 'mentor' && workingPosition && companyName) {
    bio = `${workingPosition} di ${companyName}`;
  } else {
    bio = `Siswa di ${schoolName}`;
  }
  return {
    id: id || '',
    name: name || '',
    bio,
    markodingPoint: markodingPoint || 0,
    email: email || '',
    imageUrl: imageUrl || '',
  };
};

export default userMap;
