import BlogCard from 'components/BlogCard';

import useBlog from 'hooks/useBlog';
import BlogLoader from './Loader';
import { blogWrapper } from './styles.module.scss';

const BlogContainer = () => {
  const { error, data } = useBlog({
    url: '/blogs?limit=9&offset=0',
  });
  const result = data?.result || [];
  const isLoading = !result && !error;

  return (
    <div className="inner-section">
      <div className="d-flex align-items-center mb-4">
        <h1 className="h3">Cerita Markoding</h1>
      </div>
      <div className={blogWrapper}>
        {isLoading && <BlogLoader />}
        {!isLoading && result.length && !error ? (
          result.map((blog) => (
            <div key={blog.id} className="w-100">
              <BlogCard
                key={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                description={blog.description}
                date={blog.createdAt}
                link={`/blog/${blog.id}`}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
