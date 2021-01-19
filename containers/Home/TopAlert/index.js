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
  const isStudent = profile?.profileType === 'student';
  const isShowInfoRegisterIdea = !ideaId && isStudent;

  return (
    <div className="inner-section">
      <AlertComponent open={isShowInfoRegisterIdea} variant="info">
        <p>
          <span>Kamu belum mengirimkan ide solusimu, </span>
          <Link href="/register-idea">Klik disini</Link>
          <span> untuk mengajukan idemu.</span>
        </p>
      </AlertComponent>
    </div>
  );
};

export default memo(TopAlertHome);
