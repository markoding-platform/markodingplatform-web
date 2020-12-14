import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import Alert from 'react-bootstrap/Alert';

import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';
import HomeTopCarousel from './HomeTopCarousel';
import EventWidget from './EventWidget';
import CourseWidget from './CourseWidget/CourseWidget';
import GalleryIdeaWidget from './GalleryIdeaWidget';
import BlogWidget from './BlogWidget';

const HomeContainer = ({ banners, dataDummy, courses }) => {
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
        <EventWidget events={dataDummy} />
        <GalleryIdeaWidget ideas={dataDummy} />
        <CourseWidget courses={courses} />
        <BlogWidget blogs={dataDummy} />
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
  dataDummy: [
    {
      id: 'one',
      title: 'Event One',
      src:
        'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
      link: '/todo',
      date: '25 April 2021',
      time: '2PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
    {
      id: 'two',
      title: 'Event Two',
      src:
        'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
      link: '/todo',
      date: '3 Mei 2021',
      time: '1PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
    {
      id: 'three',
      title: 'Event Three',
      src:
        'https://image.freepik.com/free-photo/smiling-teacher-with-drink-classroom_23-2148201042.jpg',
      link: '/todo',
      date: '25 Jun 2021',
      time: '1PM - 4PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
  ],
  courses: [],
};

HomeContainer.propTypes = {
  banners: PropTypes.instanceOf(Array),
  dataDummy: PropTypes.instanceOf(Array),
  courses: PropTypes.instanceOf(Array),
};

export default HomeContainer;
