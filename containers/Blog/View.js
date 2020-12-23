import BlogCard from 'components/BlogCard';

import useBlog from 'hooks/useBlog';
import BlogLoader from './Loader';
import { blogWrapper } from './styles.module.scss';

const BlogContainer = () => {
  const { isLoading, error, data } = useBlog({ url: '/blogs' });
  const blogs = data.result || [];
  return (
    <div className="inner-section">
      <div className="d-flex align-items-center mb-4">
        <h1 className="h3">Cerita Markoding</h1>
      </div>
      <div className={blogWrapper}>
        {isLoading && <BlogLoader />}
        {!isLoading && blogs.length && !error ? (
          blogs.map((blog) => (
            <div key={blog.id} className="w-100">
              <BlogCard
                key={blog.id}
                imageUrl={
                  blog.imageUrl ||
                  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg'
                }
                title={blog.title}
                description={blog.description}
                date={blog.date}
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
