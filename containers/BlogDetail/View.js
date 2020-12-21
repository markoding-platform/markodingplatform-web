import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useBlog from 'hooks/useBlog';
import BlogDetailLoader from './Loader';

dayjs.locale('id');

const BlogDetailContainer = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data = {} } = useBlog({ url: `/blogs/${slug}` });

  const blog = data.result || {};
  console.log('masuk detail', data);
  if (isLoading) {
    return <BlogDetailLoader />;
  }

  return (
    <div className="inner-section">
      <div className="d-flex align-items-center mb-4">
        <h1 className="h3">Cerita Markoding</h1>
      </div>
      <div>
        <Image
          src={
            blog.imgUrl ||
            'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg'
          }
          alt={blog.title}
          layout="responsive"
          width={957}
          height={457}
          className="rounded"
        />
        <h1 className="h3 mt-4">{blog.title}</h1>
        <div className="text-muted">
          {dayjs(blog.date).format('dddd, DD MMM YYYY')}
        </div>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
};

export default BlogDetailContainer;
