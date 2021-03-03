import DynamicProfileRouteContainer from 'containers/ProfileRouteContainer';
import { shape } from 'prop-types';

import withAuthSync from 'hoc/withAuthSync';

const ProfileSettings = ({ user }) => {
  return <DynamicProfileRouteContainer user={user} />;
};

ProfileSettings.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(ProfileSettings);
