import { arrayOf, shape, string } from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';

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
  badgeContainer,
  wrapperStats,
  courseCardWrapper,
  ideaSnippetWrapper,
  btnRegister,
  styCourses,
} from './styles.module.scss';

const DashboardContainer = ({ user, skilBadge, email }) => {
  const { idea: ideaUser } = user;

  const { profileType = '', schoolName } = user?.profile;
  const { push } = useRouter();

  const { id } = ideaUser || {};

  const { data = {} } = useIdeaSolution({
    url: `/ideas/${id}`,
    isSkip: !id,
  });

  const idea = data.ok ? data?.result : {};

  const imageIdea = idea.solutionSupportingPhotos?.[0] || '';
  const { solutionVision, solutionName, totalLikes, totalComments } = idea;

  const { courses, isLoading: loadingCourses } = useCourse({
    url: '/api/course?limit=6&offset=1',
  });

  const handleClickEditIdea = () => {
    push(`/register-idea`);
  };

  const handleGoToProfile = () => {
    push('/dashboard/profile');
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
                <p className={contentTitle}>{user.name}</p>
                <p className="m-0">{email}</p>
                <p className="m-0 font-weight-bold">{schoolName}</p>
                <Button
                  className={`bg-info ${btnEditProfile}`}
                  onClick={handleGoToProfile}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div className={wrapperStats}>
            <MyStats title="MBadge" />
            <MyStats title="MPoint" />
          </div>
        </div>
      </div>
      <Panel title="Badges">
        {skilBadge.length ? (
          <div className={badgeContainer}>
            {skilBadge.map((badge = {}) => (
              <Badges
                key={badge.id}
                name={badge.name}
                imgUrl={Avatar}
                link={badge.badgeUrl}
              />
            ))}
          </div>
        ) : (
          <h4 className="text-center py-5 text-3rd">
            Anda Belum Memiliki Badges
          </h4>
        )}
      </Panel>
      {profileType === 'student' && (
        <Panel title="Ide Solusi Saya">
          {Object.keys(idea).length ? (
            <SnippetIdea
              ideaId={ideaUser.id}
              imageIdea={imageIdea}
              solutionVision={solutionVision}
              solutionName={solutionName}
              likeCount={totalLikes}
              totalComments={totalComments}
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
      )}
      <Panel title="Kelas Online">
        {!loadingCourses && courses.length > 0 ? (
          <div className={styCourses}>
            {courses.map((course) => (
              <div key={course.id} className={courseCardWrapper}>
                <CourseCard
                  imageUrl={course.imageUrl}
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

DashboardContainer.propTypes = {
  user: shape({
    id: '',
    name: '',
    profile: {},
  }).isRequired,
  skilBadge: arrayOf(
    shape({
      id: string,
      name: string,
      pictureUrl: string,
      openBadgeId: string,
      badgerUrl: string,
      certificateUrl: string,
    })
  ).isRequired,
  email: string.isRequired,
};

export default DashboardContainer;
