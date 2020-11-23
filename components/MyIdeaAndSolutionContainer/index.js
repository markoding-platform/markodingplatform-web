import { arrayOf, shape, string } from 'prop-types';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';

import Panel from 'components/Panel';
import Badges from 'components/Badges';
import SnippetIdea from 'components/IdeaAndSolutionContainer/SnippetIdea';
import CoursesCard from 'components/CoursesCard';
import Avatar from 'public/assets/avatar-min.png';
import MyStats from './MyStats';

import {
  paper,
  profileCard,
  profileSection,
  contentTitle,
  btnEditProfile,
  wrapperStats,
  courseCardWrapper,
} from './styles.module.scss';

const MyIdeaAndSolutionContainer = ({ courses }) => {
  return (
    <>
      <div>
        <div className={`${paper} px-4 py-4`}>
          <div>
            <div className={profileCard}>
              <Image
                width={132}
                height={132}
                layout="fixed"
                className="rounded-circle"
                src={Avatar}
              />
              <div className={`px-3 ${profileSection}`}>
                <p className={contentTitle}>Amanda Simandjuntak</p>
                <p className="m-0">Co-founder Markoding</p>
                <Button className={`bg-info ${btnEditProfile}`}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div className={wrapperStats}>
            <MyStats />
            <MyStats />
          </div>
        </div>
      </div>
      <Panel title="Badges">
        <div className="d-flex">
          <Badges name="Javascript" />
          <Badges name="React JS" />
        </div>
      </Panel>
      <Panel title="Ide Solusi Saya">
        <SnippetIdea />
      </Panel>
      <Panel title="Kelas Online">
        <div className="d-flex">
          {courses.map((course) => (
            <div key={course.id} className={courseCardWrapper}>
              <CoursesCard
                imageUrl={course.src}
                title={course.title}
                description={course.description}
                link={course.link}
              />
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
};

MyIdeaAndSolutionContainer.defaultProps = {
  courses: [
    {
      id: 'one',
      title: 'Javascript Dasar',
      src:
        'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
      link: '/todo',
      date: '25 April 2021',
      time: '2PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
    {
      id: 'two',
      title: 'Markoding MasterClass',
      src:
        'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
      link: '/todo',
      date: '3 Mei 2021',
      time: '1PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
  ],
};

MyIdeaAndSolutionContainer.propTypes = {
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
  ),
};
export default MyIdeaAndSolutionContainer;
