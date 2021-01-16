import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';

import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';

import useIdeaSolution from 'hooks/useIdeaSolution';
import useCourse from 'hooks/useCourse';
import Panel from 'components/Panel';
import Badges from 'components/Badges';
import SnippetIdea from 'containers/IdeaAndSolutionContainer/SnippetIdea';
import CourseCard from 'components/CourseCard';
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
  ideaSnippetWrapper,
  btnRegister,
} from './styles.module.scss';

const MyIdeaAndSolutionContainer = () => {
  const badges = [];
  const { push } = useRouter();
  const ideaUser = {
    id: 'dfba8c76-d1ab-4b4f-b6e3-8beb0fde1bf3',
    isDraft: false,
  };

  const profile = useMemo(() => {
    if (canUseDOM) {
      const username = getCookie('userName') || '';
      return {
        username,
      };
    }
    return {};
  }, []);

  const { id } = ideaUser;

  const { data } = useIdeaSolution({
    url: `/ideas/${id}`,
    isSkip: !id,
  });
  const idea = data?.result || {};

  const imageIdea = idea.solutionSupportingPhotos?.[0] || '';
  const { solutionVision, solutionName } = idea;

  const { courses, isLoading: loadingCourses } = useCourse({
    url: '/api/course?limit=6&offset=1',
  });

  const handleClickEditIdea = () => {
    push(`/register-idea`);
  };

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
                <p className={contentTitle}>{profile.username}</p>
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
        {badges.length ? (
          <div className="d-flex">
            <Badges name="Javascript" />
          </div>
        ) : (
          <h4 className="text-center py-5 text-3rd">
            Anda Belum Memiliki Badges
          </h4>
        )}
      </Panel>
      <Panel title="Ide Solusi Saya">
        {Object.keys(idea).length ? (
          <SnippetIdea
            ideaId={ideaUser.id}
            imageIdea={imageIdea}
            solutionVision={solutionVision}
            solutionName={solutionName}
          />
        ) : (
          <div className={ideaSnippetWrapper}>
            <h4 className="text-center py-5 text-3rd">
              Anda Belum Memiliki Ide Solusi
            </h4>
            <Button className={btnRegister} onClick={handleClickEditIdea}>
              Registrasi ide solusi
            </Button>
          </div>
        )}
      </Panel>

      <Panel title="Kelas Online">
        {!loadingCourses && courses.length > 0 ? (
          <div className="d-flex">
            {courses.map((course) => (
              <div key={course.id} className={courseCardWrapper}>
                <CourseCard
                  imageUrl={course.src}
                  title={course.title}
                  description={course.description}
                  link={course.link}
                />
              </div>
            ))}
          </div>
        ) : (
          <h4 className="text-center py-5 text-3rd">
            Anda Belum Memiliki Kelas Online
          </h4>
        )}
      </Panel>
    </>
  );
};

export default MyIdeaAndSolutionContainer;
