import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import AnnouncementContainer from 'containers/AnnouncementContainer';
import BlockAccessModal from 'components/BlockAccessModal';
import Router from 'next/router';
import React from 'react';
import withAuthSync from '../../hoc/withAuthSync';

const Announcement = ({ user }) => {
  return (
    <Layout activeMenu="/information">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <AnnouncementContainer />
        </div>
      </div>
      {!user && (
        <BlockAccessModal
          show
          onHide={() => {
            Router.push('/');
          }}
        />
      )}
    </Layout>
  );
};

Announcement.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default withAuthSync(Announcement);
