const userMap = (user) => {
  const { id, name, email, profile = {}, imageUrl, markodingPoint } = user;
  let bio = '';
  if (profile.profileType === 'teacher') {
    bio = `Guru di ${profile.schoolName}`;
  } else if (profile.profileType === 'mentor') {
    bio = `${profile.expertise} di ${profile.companyName}`;
  } else {
    bio = `Siswa di ${profile.schoolName}`;
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
