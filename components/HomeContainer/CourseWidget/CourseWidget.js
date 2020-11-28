import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import SectionCardWrapper from 'components/SectionCardWrapper';
import CoursesCard from 'components/CoursesCard';

const CourseWidget = ({ courses }) => {
  return (
    <>
      <div className="pb-5">
        <SectionCardWrapper title="Kelas Online" link="/course">
          {courses.map((course) => (
            <CoursesCard
              key={course.id}
              imageUrl={course.src}
              title={`Course ${course.id}`}
              date={course.date}
              time={course.time}
              link={`/course/${course.id}`}
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
      date: string,
      time: string,
      description: string,
    })
  ).isRequired,
};

export default CourseWidget;
