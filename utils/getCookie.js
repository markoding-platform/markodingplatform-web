import cookie from 'cookie';

/**
 *
 * @param req Object of request data
 * @param labelOfCookie String of cookie name/label
 */

export default function getCookie(labelOfCookie, req = {}) {
  const cookies = cookie.parse(
    req && req.headers ? req.headers.cookie || '' : document.cookie
  );
  return cookies[labelOfCookie] || null;
}
