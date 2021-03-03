import DynamicProfileRouteContainer from 'containers/ProfileRouteContainer';

import { shape } from 'prop-types';

import withAuthSync from 'hoc/withAuthSync';

const ProfileRoute = ({ user }) => {
  return <DynamicProfileRouteContainer user={user} />;
};

ProfileRoute.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(ProfileRoute);
