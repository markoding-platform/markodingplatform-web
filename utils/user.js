import getCookie from 'utils/getCookie';

export const User = (ctxReq) => {
  const profile = getCookie('userProfile', ctxReq) || null;
  return {
    id: getCookie('userID', ctxReq),
    name: getCookie('userName', ctxReq),
    profile: profile !== null ? JSON.parse(profile) : null,
  };
};
