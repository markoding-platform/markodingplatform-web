import React from 'react';

import SectionCardWrapper from 'components/SectionCardWrapper';
import CourseCard from 'components/CourseCard';
import useCourse from 'hooks/useCourse';
import WidgetLoader from '../WidgetLoader';

const CourseWidget = () => {
  const { courses, isLoading } = useCourse({
    url: '/api/course?limit=6&offset=1',
  });

  return (
    <>
      {isLoading && <WidgetLoader />}
      <div className="pb-5">
        <SectionCardWrapper title="Kelas Online" link="/course">
          {!isLoading &&
            courses.length > 0 &&
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
