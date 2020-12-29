import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import Alert from 'react-bootstrap/Alert';

import useErrorHandler from 'hooks/useErrorHandler';
import LeaderBoardContainer from 'containers/Home/LeaderBoards';
import ErrorFallback from 'components/ErrorFallback';
import HomeTopCarousel from './HomeTopCarousel';
import EventWidget from './EventWidget';
import CourseWidget from './CourseWidget/CourseWidget';
import GalleryIdeaWidget from './GalleryIdeaWidget';
import BlogWidget from './BlogWidget';
import PartnersWidget from './PartnersWidget';

const HomeContainer = ({ banners }) => {
  const [alertShow, setAlertShow] = useState(true);
  const { logError } = useErrorHandler();
  return (
    <>
      <div className="inner-section">
        <Alert
          show={alertShow}
          variant="primary"
          onClose={() => setAlertShow(false)}
          dismissible
        >
          <p className="mb-0">Lengkapi Profile mu</p>
        </Alert>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <HomeTopCarousel banners={banners} />
        <EventWidget />
        <GalleryIdeaWidget />
        <CourseWidget />
        <BlogWidget />
        <LeaderBoardContainer />
        <PartnersWidget />
      </ErrorBoundary>
    </>
  );
};

HomeContainer.defaultProps = {
  banners: [
    {
      id: 'one',
      title: 'dummy one',
      src:
        'https://image.freepik.com/free-photo/teacher-pointing-her-with-copy-space_23-2148668633.jpg',
      link: '/todo',
    },
    {
      id: 'two',
      title: 'dummy two',
      src:
        'https://image.freepik.com/free-photo/back-school-concept-books-colored-pencils-clock_155003-9212.jpg',
      link: '/todo',
    },
    {
      id: 'three',
      title: 'dummy three',
      src:
        'https://image.freepik.com/free-photo/young-schoolgirl-eyeglasses-holding-her-books-makes-confused-face_114579-14906.jpg',
      link: '/todo',
    },
  ],
};

HomeContainer.propTypes = {
  banners: PropTypes.instanceOf(Array),
};

export default HomeContainer;
