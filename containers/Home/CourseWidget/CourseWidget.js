import React from 'react';
import useSWR from 'swr';

import SkilvulFetch from 'libraries/SkilvulFetch';
import SectionCardWrapper from 'components/SectionCardWrapper';
import CourseCard from 'components/CourseCard';
import WidgetLoader from '../WidgetLoader';
import courseMap from '../../../map/courseMap';

const CourseWidget = () => {
  let courses = [];
  const { data: courseRes, error } = useSWR(
    '/api/course?limit=6&offset=1',
    SkilvulFetch
  );
  const isLoading = !courseRes && !error;
  if (courseRes && courseRes.products) {
    courses = courseRes.products.map(courseMap);
  }

  return (
    <>
      {isLoading && <WidgetLoader />}
      <div className="pb-5">
        <SectionCardWrapper title="Kelas Online" link="/course">
          {courses &&
            courses.map((course) => (
              <CourseCard
                key={course.id}
                imageUrl={course.imageUrl}
                title={course.title}
                description={course.description}
                link={course.link}
              />
            ))}
        </SectionCardWrapper>
      </div>
    </>
  );
};

export default CourseWidget;
