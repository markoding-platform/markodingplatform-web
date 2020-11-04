import cookie from 'cookie';

export default function getCookie(req, labelOfCookie) {
	const cookies = cookie.parse(
		req && req.headers ? req.headers.cookie || '' : document.cookie
	);
	return cookies[labelOfCookie] || null;
}
