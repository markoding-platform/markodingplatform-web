import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import useErrorHandler from 'hooks/useErrorHandler';
import LeaderBoardContainer from 'containers/Home/LeaderBoards';
import ErrorFallback from 'components/ErrorFallback';

import HomeTopCarousel from './HomeTopCarousel';
import EventWidget from './EventWidget';
import CourseWidget from './CourseWidget/CourseWidget';
import GalleryIdeaWidget from './GalleryIdeaWidget';
import BlogWidget from './BlogWidget';
import ForumWidget from './ForumWidget';
import PartnersWidget from './PartnersWidget';
import TopAlertHome from './TopAlert';

const HomeContainer = () => {
  const { logError } = useErrorHandler();
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <TopAlertHome />
        <HomeTopCarousel />
        <EventWidget />
        <GalleryIdeaWidget />
        <CourseWidget />
        <BlogWidget />
        <ForumWidget />
        <LeaderBoardContainer />
        <PartnersWidget />
      </ErrorBoundary>
    </>
  );
};

export default HomeContainer;
