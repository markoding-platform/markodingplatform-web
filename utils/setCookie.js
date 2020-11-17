import cookie from 'cookie';

/**
 *
 * @param data Array[{label, value, age}]
 */

export default function setCookie(data) {
  data.forEach((d) => {
    document.cookie = cookie.serialize(d.label, d.value, {
      sameSite: false,
      path: '/',
      maxAge: d.age,
      domain: process.env.DOMAIN,
    });
  });
}
