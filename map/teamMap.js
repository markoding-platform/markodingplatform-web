export const teamMap = (data) => {
  if (!data.length) return [];
  const team = data.map(({ user = {}, isLeader }) => {
    const { profile = {} } = user;
    return {
      userId: user.id,
      name: user.name || '',
      imageUrl: user.imageUrl || '',
      schoolName: profile.schoolName || '',
      schoolGradeName: profile.schoolGradeName || '',
      profileType: profile.profileType || '',
      companyName: profile.companyName || '',
      isLeader,
    };
  });
  return team;
};
