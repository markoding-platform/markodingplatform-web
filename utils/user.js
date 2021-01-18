import getCookie from 'utils/getCookie';

export const User = (ctxReq) => {
  const profile = getCookie('userProfile', ctxReq) || null;
  const idea = getCookie('userIdea', ctxReq) || null;
  return {
    id: getCookie('userID', ctxReq),
    name: getCookie('userName', ctxReq),
    profile: profile !== null ? JSON.parse(profile) : null,
    idea: idea !== null ? JSON.parse(idea) : null,
  };
};
