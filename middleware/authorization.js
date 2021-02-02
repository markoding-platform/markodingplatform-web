export function checkAuthorization() {
  return async (req, res, next) => {
    const {
      headers: { authorization },
    } = req;
    const authSplit = authorization.split(' ');
    const auth = authSplit.length > 0 ? authSplit[1] : null;
    console.log('auah', auth);
    if (auth === '' || auth === null || auth === undefined)
      return res.status(401).send('Unauthorization');
    next();
  };
}
