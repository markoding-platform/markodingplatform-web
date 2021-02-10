const userMap = (user) => {
  const { id, name, profile = {}, imageUrl } = user;
  let bio = '';
  if (profile.profileType === 'teacher') {
    bio = `Guru di ${profile.schoolName}`;
  } else if (profile.profileType === 'mentor') {
    bio = `${profile.expertise} di ${profile.companyName}`;
  } else {
    bio = `Siswa di ${profile.schoolName}`;
  }
  return {
    id,
    name,
    bio,
    imageUrl: imageUrl || '/assets/avatar-min.png',
  };
};

export default userMap;
