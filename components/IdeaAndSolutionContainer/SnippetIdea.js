import { useEffect, useState } from 'react';
import { number } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

// import Avatar from 'public/assets/avatar-min.png';
import { ideaImage } from './style.module.scss';

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
const DetailIdea = ({ likeCount, commentCount }) => {
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
      <div className="py-2">
        <Image
          src={blogContent.imageUrl}
          alt={blogContent.title}
          width={500}
          height={200}
          className={ideaImage}
        />
      </div>
      <div className="pb-4">
        <h4>{blogContent.title}</h4>
      </div>
      {/* <div className="d-flex py-2">
        <Image
          src={Avatar}
          alt="avatar-image"
          width={52}
          height={52}
          className={ideaImage}
        />
        <div className="pl-2">
          <h6 className="m-0 pb-2">Ariqah Hasanah</h6>
          <p className="text-3rd m-0">11/11/2020</p>
        </div>
      </div> */}
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
      <div className="d-flex justify-content-between mt-5">
        <div className="d-flex align-items-center justify-content-start">
          <div className="mr-4">
            <BsFillHeartFill />
            <span className="pl-2 text-secondary">{likeCount}</span>
          </div>
          <div className="mr-4">
            <IoMdChatbubbles />
            <span className="pl-2 text-secondary">{commentCount}</span>
          </div>
        </div>
        <div className="d-flex">
          <Button variant="outline-primary mr-3">Lihat</Button>
          <Button className="bg-primary">Edit</Button>
        </div>
      </div>
    </div>
  );
};

DetailIdea.defaultProps = {
  commentCount: 12,
  likeCount: 3,
};

DetailIdea.propTypes = {
  commentCount: number,
  likeCount: number,
};

export default DetailIdea;
