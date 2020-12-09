import cookie from 'cookie';

/**
 * can only be used from the client side
 * @param data Array[{label, value, age}]
 */

export default function setCookie(data) {
  try {
    data.forEach((d) => {
      document.cookie = cookie.serialize(d.label, d.value, {
        sameSite: false,
        path: '/',
        maxAge: d.age,
        domain: process.env.DOMAIN,
      });
    });
  } catch (e) {
    console.log(e);
  }
}
