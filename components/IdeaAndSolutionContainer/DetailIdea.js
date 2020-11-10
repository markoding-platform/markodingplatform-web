import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const dummyBlog = [
  {
    id: 1,
    imageUrl:
      'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
    title: 'Merdeka Belajar',
  },
  {
    id: 2,
    imageUrl:
      'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
    title: 'Belajar coding is fun',
  },
  {
    id: 3,
    imageUrl:
      'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
    title: 'Merdeka Belajar 2',
  },
];
const DetailIdea = () => {
  const { query } = useRouter();

  const [blogContent, setBlogContent] = useState({});

  useEffect(() => {
    function getDummyBlogById() {
      const content = dummyBlog.find((c) => c.id === Number(query.id)) || {};
      if (Object.keys(content).length) {
        setBlogContent(content);
      }
    }
    if (query.id) {
      getDummyBlogById();
    } else {
      setBlogContent(dummyBlog[0]);
    }
  }, [query.id]);

  if (!Object.keys(blogContent).length) {
    return 'Loading...';
  }

  return (
    <div>
      <div>
        <h4>{blogContent.title}</h4>
      </div>
      <div>
        <Image
          src={blogContent.imageUrl}
          alt={blogContent.title}
          width={500}
          height={200}
        />
      </div>
      <div>
        <p>
          We hold weekly group mentoring sessions in schools and communities in
          marginalized area in Indonesia.
        </p>
        <p>
          We engage professional programmers and senior IT university students
          as mentors and volunteers.
        </p>
        <p>
          Our curriculum is created in collaboration with IT educators and
          employers to deliver industry-relevant and up-to-date knowledge.
        </p>
      </div>
    </div>
  );
};

DetailIdea.defaultProps = {};

DetailIdea.propTypes = {};

export default DetailIdea;
