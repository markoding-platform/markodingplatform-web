import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import SectionCardWrapper from 'components/SectionCardWrapper';
import CourseCard from 'components/CourseCard';

const CourseWidget = ({ courses }) => {
  return (
    <>
      <div className="pb-5">
        <SectionCardWrapper title="Kelas Online" link="/course">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              imageUrl={course.src}
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

CourseWidget.propTypes = {
  courses: arrayOf(
    shape({
      id: string,
      title: string,
      src: string,
      link: string,
      description: string,
    })
  ).isRequired,
};

export default CourseWidget;
