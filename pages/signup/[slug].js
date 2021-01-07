import DynamicSignupContainer from 'containers/SignupContainer';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useEffect } from 'react';
import withAuthSync from '../../hoc/withAuthSync';

const Signup = ({ user }) => {
  useEffect(() => {
    if (!user) {
      Router.push('/');
    }
  }, [user]);
  return (
    <div>
      <DynamicSignupContainer user={user} />
    </div>
  );
};

Signup.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default withAuthSync(Signup);
