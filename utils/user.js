import getCookie from 'utils/getCookie';

export const User = (ctxReq) => {
  return {
    name: getCookie('userName', ctxReq),
    email: getCookie('userEmail', ctxReq),
    id: getCookie('userID', ctxReq),
    exId: getCookie('externalID', ctxReq),
  };
};
