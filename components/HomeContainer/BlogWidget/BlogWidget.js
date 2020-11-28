import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import SectionCardWrapper from 'components/SectionCardWrapper';
import BlogCard from 'components/BlogCard';

const BlogWidget = ({ blogs }) => {
  return (
    <>
      <div className="pb-5">
        <SectionCardWrapper title="Cerita Markoding" link="/blog">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              imageUrl={blog.src}
              title={`Blog ${blog.id}`}
              date={blog.date}
              description={blog.description}
              link={`/blog/${blog.id}`}
            />
          ))}
        </SectionCardWrapper>
      </div>
    </>
  );
};

BlogWidget.propTypes = {
  blogs: arrayOf(
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

export default BlogWidget;
