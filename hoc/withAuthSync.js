import getCookie from 'utils/getCookie';
import { SSO } from 'utils/auth';
import { User } from 'utils/user';

const auth = async (ctx) => {
  const token = await getCookie('markodingToken', ctx.req);
  if (!token) {
    await SSO(ctx);
  }

  return User(ctx ? ctx.req : null);
};

const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const user = await auth(ctx);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, user };
  };

  return Wrapper;
};

export default withAuthSync;
