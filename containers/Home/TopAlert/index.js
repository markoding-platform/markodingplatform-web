import { memo } from 'react';
import Link from 'next/link';

import AlertComponent from 'components/Alert';

import canUseDOM from 'utils/canUseDOM';
import getCookie from 'utils/getCookie';

const TopAlertHome = () => {
  const userIdea = canUseDOM && getCookie('userIdea');
  const userProfile = canUseDOM && getCookie('userProfile');
  const idea = userIdea ? JSON.parse(userIdea) : {};
  const profile = userProfile ? JSON.parse(userProfile) : {};

  const ideaId = idea?.id || '';
  const isDraft = idea?.isDraft || false;
  const isStudent = profile?.profileType === 'student';
  const isShowInfoRegisterIdea = !ideaId && isStudent;
  const isShowInfoCompleteIdea = ideaId && isDraft && isStudent;

  return (
    <div className="inner-section">
      <AlertComponent
        open={isShowInfoRegisterIdea || isShowInfoCompleteIdea}
        variant="danger"
      >
        {isShowInfoCompleteIdea ? (
          <p>
            <span>Lengkapi dan submit ide solusimu, </span>
            <Link href={`/idea/edit/${ideaId}`}>
              <a href={`/idea/edit/${ideaId}`} className="font-weight-bold">
                Klik disini
              </a>
            </Link>
            <span> untuk edit ide solusimu.</span>
          </p>
        ) : (
          <p>
            <span>Kamu belum mengirimkan ide solusimu, </span>
            <Link href="/register-idea">
              <a href="/register-idea" className="font-weight-bold">
                Klik disini
              </a>
            </Link>
            <span> untuk mengajukan idemu.</span>
          </p>
        )}
      </AlertComponent>
    </div>
  );
};

export default memo(TopAlertHome);
