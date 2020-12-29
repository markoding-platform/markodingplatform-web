import React, { useState } from 'react';
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

const HomeContainer = () => {
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
        <HomeTopCarousel />
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

export default HomeContainer;
