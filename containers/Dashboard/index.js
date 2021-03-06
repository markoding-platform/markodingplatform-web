import { arrayOf, shape, string, number } from 'prop-types';
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
import useMarkodingSubmission from 'hooks/useMarkodingSubmission';
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
  btnSeeProfile,
} from './styles.module.scss';

const DashboardContainer = ({
  user,
  email,
  skillBadges,
  skillPoint,
  markodingPoint,
  bio,
  name,
  imageUrl,
}) => {
  const { idea: ideaUser } = user;
  const mPoint = skillPoint + markodingPoint;
  const { isOpenSubmission } = useMarkodingSubmission();
  const { profileType = '' } = user?.profile || {};
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
    url: '/api/course?limit=6&offset=0',
  });

  const handleClickEditIdea = () => {
    push(`/register-idea`);
  };

  const handleGoToEditProfile = () => {
    push('/dashboard/profile/settings');
  };
  const handleGoToProfile = () => {
    push(`/user/${user?.id}`);
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
                src={imageUrl || Avatar}
              />
              <div className={`px-3 ${profileSection}`}>
                <p className={contentTitle}>{name}</p>
                <p className="m-0">{email}</p>
                <p className="m-0 font-weight-bold">{bio}</p>
                <Button
                  className={`bg-info ${btnEditProfile}`}
                  onClick={handleGoToEditProfile}
                >
                  Edit Profile
                </Button>
                <Button
                  // className={`bg-info ${btnEditProfile}`}
                  variant={`outline-primary ${btnSeeProfile}`}
                  onClick={handleGoToProfile}
                >
                  Lihat Profile
                </Button>
              </div>
            </div>
          </div>
          <div className={wrapperStats}>
            <MyStats title="MBadge" total={skillBadges.length} />
            <MyStats title="MPoint" total={mPoint} />
          </div>
        </div>
      </div>
      <Panel title="Badges">
        {skillBadges.length ? (
          <div className={badgeContainer}>
            {skillBadges.map((badge = {}) => (
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
        <>
          {Object.keys(idea).length > 0 && (
            <Panel title="Ide Solusi Saya">
              <SnippetIdea
                ideaId={ideaUser.id}
                imageIdea={imageIdea}
                solutionVision={solutionVision}
                solutionName={solutionName}
                likeCount={totalLikes}
                totalComments={totalComments}
                isOpenSubmission={isOpenSubmission}
              />
            </Panel>
          )}
          {Object.keys(idea).length < 1 && isOpenSubmission && (
            <Panel title="Ide Solusi Saya">
              <div className={ideaSnippetWrapper}>
                <h4 className="text-center py-5 text-3rd">
                  Anda Belum Memiliki Ide Solusi
                </h4>
                <Button className={btnRegister} onClick={handleClickEditIdea}>
                  Registrasi ide solusi
                </Button>
              </div>
            </Panel>
          )}
        </>
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

DashboardContainer.defaultProps = {
  skillPoint: 0,
  markodingPoint: 0,
  skillBadges: [],
};

DashboardContainer.propTypes = {
  user: shape({
    id: '',
    name: '',
    profile: {},
  }).isRequired,
  skillBadges: arrayOf(
    shape({
      id: string,
      name: string,
      pictureUrl: string,
      openBadgeId: string,
      badgerUrl: string,
      certificateUrl: string,
    })
  ),
  imageUrl: string.isRequired,
  email: string.isRequired,
  skillPoint: number,
  markodingPoint: number,
  bio: string.isRequired,
  name: string.isRequired,
};

export default DashboardContainer;
