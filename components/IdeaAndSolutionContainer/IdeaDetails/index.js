import { useEffect, useState } from 'react';
import { number } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import Avatar from 'public/assets/avatar-min.png';
import { ideaImage } from '../style.module.scss';
import { ideaSection, teamInfo, infoItem, voteBtn } from './style.module.scss';

import Teams from '../Teams';
import data from './mocks';

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

const dummyTeams = [
  {
    id: 0,
    title: 'Ketua Tim',
    name: 'Ariqah Hasanah',
    studentStatus: 'Siswa SMK',
  },
  {
    id: 1,
    title: 'Anggota 2',
    name: 'Ariqah Hasanah',
    studentStatus: 'Siswa SMK',
  },
  {
    id: 2,
    title: 'Anggota 3',
    name: 'Ariqah Hasanah',
    studentStatus: 'Siswa SMK',
  },
];

const additionalTeams = [
  {
    id: 0,
    title: 'Guru',
    name: 'Kak Hasnah',
    studentStatus: 'Guru SMK',
  },
  {
    id: 1,
    title: 'Mentor',
    name: 'Ariqah Hasanah',
    studentStatus: 'Gojek',
  },
];
const IdeaDetails = ({ likeCount, commentCount }) => {
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
      <div className="pb-2">
        <h4>{blogContent.title}</h4>
      </div>
      <div className="d-flex py-2">
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
      </div>
      <div className="py-2">
        <Image
          src={blogContent.imageUrl}
          alt={blogContent.title}
          width={500}
          height={320}
          className={ideaImage}
          layout="responsive"
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="mr-4">
          <BsFillHeartFill />
          <span className="pl-2 text-secondary">{likeCount}</span>
        </div>
        <div className="mr-4">
          <IoMdChatbubbles />
          <span className="pl-2 text-secondary">{commentCount}</span>
        </div>
      </div>
      <hr />
      <Teams items={dummyTeams} />
      <hr />
      <div className={teamInfo}>
        <div className={infoItem}>
          <p className="text-secondary m-0">Status Tim</p>
          <p className="info__text m-0">{data.teamStatus}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Nama Sekolah</p>
          <p className="info__text m-0">{data.school}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Tipe Solusi Digital</p>
          <p className="info__text m-0">{data.solutionType}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Bidang Masalah</p>
          <p className="info__text m-0">{data.problemArea}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Masalah yang ingin diselesaikan</p>
          <p className="info__text m-0">{data.problemSelection}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Targe Customer</p>
          <p className="info__text m-0">{data.targetCustomer}</p>
        </div>
      </div>
      <hr />
      <Teams items={additionalTeams} />
      <hr />
      <div>
        <div className={ideaSection} id="problemReason">
          <h4>Alasan Masalah</h4>
          <p className="text-secondary m-0">{data.problemReason}</p>
        </div>
        <div className={ideaSection} id="solutionSummary">
          <h4>Solusi Singkat</h4>
          <p className="text-secondary m-0">{data.solutionSummary}</p>
        </div>
        <div className={ideaSection} id="solutionVision">
          <h4>Ide Solusi</h4>
          <p className="text-secondary m-0">{data.solutionVision}</p>
        </div>
        <div className={ideaSection}>
          <h4>Link Video</h4>
        </div>
        <div className={ideaSection}>
          <h4>Target Customer</h4>
          <p className="text-secondary m-0">{data.targetCustomer}</p>
        </div>
        <div className={ideaSection}>
          <h4>Kelebihan Ide Solusi</h4>
          <p className="text-secondary m-0">{data.solutionBenefit}</p>
        </div>
        <div className={ideaSection}>
          <h4>Kendala</h4>
          <p className="text-secondary m-0">{data.solutionObstacle}</p>
        </div>
        <div className={ideaSection}>
          <h4>Kolaborasi</h4>
          <p className="text-secondary m-0">{data.potentialCollaboration}</p>
        </div>
      </div>
      <div>
        <Button className={voteBtn}>Vote Ide Solusi</Button>
      </div>
    </div>
  );
};

IdeaDetails.defaultProps = {
  commentCount: 12,
  likeCount: 3,
};

IdeaDetails.propTypes = {
  commentCount: number,
  likeCount: number,
};

export default IdeaDetails;