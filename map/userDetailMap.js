const userDetailMap = (user) => {
  const { id, name, email, imageUrl, profile = {} } = user;
  let bio = '';
  if (profile.profileType === 'teacher') {
    bio = `Guru di ${profile.schoolName}`;
  } else if (profile.profileType === 'mentor') {
    bio = `${profile.expertise} di ${profile.companyName}`;
  } else {
    bio = `Siswa di ${profile.schoolName}`;
  }
  return {
    slug: id,
    name,
    email,
    title: bio,
    imageUrl: imageUrl || '',
    bio: '',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    type: profile.profileType,
  };
};

export default userDetailMap;
