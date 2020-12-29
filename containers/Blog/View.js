import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogCard from 'components/BlogCard';
import useBlog from 'hooks/useBlog';
import BlogLoader from './Loader';

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
      <Row>
        {isLoading && <BlogLoader />}
        {!isLoading && result.length && !error ? (
          result.map((blog) => (
            <Col key={blog.id} xs={6} lg={4}>
              <BlogCard
                key={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                description={blog.description}
                date={blog.createdAt}
                link={`/blog/${blog.id}`}
              />
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
};

export default BlogContainer;
