import React from 'react';

import SectionCardWrapper from 'components/SectionCardWrapper';
import BlogCard from 'components/BlogCard';
import useBlog from 'hooks/useBlog';
import WidgetLoader from '../WidgetLoader';

const BlogWidget = () => {
  const { isLoading, error, data = {} } = useBlog({
    url: '/blogs?limit=3&offset=0',
  });
  const blogs = data.result || [];
  return (
    <>
      {isLoading && <WidgetLoader />}
      {!isLoading && blogs.length && !error ? (
        <div className="pb-5">
          <SectionCardWrapper title="Cerita Markoding" link="/blog">
            {blogs.map((blog = {}) => (
              <BlogCard
                key={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                date={blog.createdAt}
                description={blog.description}
                link={`/blog/${blog.id}`}
              />
            ))}
          </SectionCardWrapper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogWidget;
