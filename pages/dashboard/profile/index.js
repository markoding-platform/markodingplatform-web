import DynamicProfileRouteContainer from 'containers/ProfileRouteContainer';
import { useRouter } from 'next/router';
import { shape } from 'prop-types';

import withAuthSync from 'hoc/withAuthSync';

const ProfileRoute = ({ user }) => {
  const { pathname } = useRouter();
  let isEditProfile = false;
  if (pathname.includes('/settings')) {
    isEditProfile = true;
  }

  return (
    <DynamicProfileRouteContainer isEditProfile={isEditProfile} user={user} />
  );
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
