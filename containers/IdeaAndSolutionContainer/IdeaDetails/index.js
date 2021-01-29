import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import MarkodingFetch from 'libraries/MarkodingFetch';
import BoxLoader from 'components/Shimmer/Box';
import BlockAccessModal from 'components/BlockAccessModal';
import ProfileCard from 'components/ProfileCard';
import YoutubeIframe from 'components/YoutubeIframe';
import useIdeaSolution from 'hooks/useIdeaSolution';
import noImage from 'public/assets/no-image.png';
import { teamMap } from 'map/teamMap';
import { ideaMap } from 'map/ideaMap';
import { profileTypeEnum } from '../constant';

import { ideaImage } from '../style.module.scss';
import {
  ideaSection,
  teamInfo,
  infoItem,
  voteBtn,
  videoWrapper,
  teamsWrapper,
} from './style.module.scss';

const IdeaDetails = () => {
  const { query } = useRouter();
  const ideaId = query.id;

  const { data } = useIdeaSolution({ url: `/ideas/${ideaId}` });
  const { data: teamsResult } = useIdeaSolution({
    url: `/ideas/${ideaId}/users`,
  });
  // TODO handle loading state UI
  const idea = ideaMap(data?.result) || {};
  const teams = teamMap(teamsResult?.result || []);
  const [showBlockAccess, setShowBlockAccess] = useState(false);
  const { totalLikes, totalComments } = idea;

  const imageIdea = idea.solutionSupportingPhotos?.[0] || '';

  const teamMember = useMemo(() => {
    if (teams.length) {
      return teams.filter((member) => member.profileType === 'student');
    }
    return [];
  }, [teams]);

  const facilitators = useMemo(() => {
    if (teams.length) {
      return teams.filter((member) => member.profileType !== 'student');
    }
    return [];
  }, [teams]);

  const handleVoteIdea = async () => {
    const voteResult = await MarkodingFetch(`/ideas/${ideaId}/toggle-like`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        isLike: true,
      }),
    });
    if (voteResult.ok) {
      await mutate(`/ideas/${ideaId}`);
      return toast.success(<p className="m-0 pl-3">Berhasil vote ide</p>, {
        autoClose: 3000,
      });
    }
    if (voteResult.status === 400) {
      return setShowBlockAccess(true);
    }
    return toast.error(<p className="m-0 pl-3">Ooops! Gagal vote ide</p>, {
      autoClose: 3000,
    });
  };

  return (
    <>
      <div>
        <div className="pb-2">
          <h4>{idea.solutionName}</h4>
        </div>
        <div className="py-2">
          <div className="position-relative">
            {Object.keys(idea).length ? (
              <Image
                src={imageIdea || noImage}
                alt={idea.title}
                width={500}
                height={320}
                className={ideaImage}
                layout="responsive"
              />
            ) : (
              <BoxLoader height="320" />
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-4">
            <BsFillHeartFill />
            <span className="pl-2 text-secondary">{totalLikes}</span>
          </div>
          <div className="mr-4">
            <IoMdChatbubbles />
            <span className="pl-2 text-secondary">{totalComments}</span>
          </div>
        </div>
        <hr />
        <div className={teamsWrapper}>
          {teamMember.map((t) => (
            <ProfileCard
              key={t.id}
              title={t.isLeader ? 'Ketua Tim' : 'Anggota'}
              primaryText={t.name}
              secondaryText={`Siswa ${t.schoolGradeName}`}
            />
          ))}
        </div>
        <hr />
        <div className={teamInfo}>
          <div className={infoItem}>
            <p className="text-3rd m-0">Status Tim</p>
            <p className="info__text m-0">{idea.status}</p>
          </div>
          <div className={infoItem}>
            <p className="text-3rd m-0">Nama Sekolah</p>
            <p className="info__text m-0">{idea.schoolName}</p>
          </div>
          <div className={infoItem}>
            <p className="text-3rd m-0">Tipe Solusi Digital</p>
            <p className="info__text m-0">{idea.solutionType}</p>
          </div>
          <div className={infoItem}>
            <p className="text-3rd m-0">Bidang Masalah</p>
            <p className="info__text m-0">{idea.problemArea}</p>
          </div>
          <div className={infoItem}>
            <p className="text-3rd m-0">Masalah yang ingin diselesaikan</p>
            <p className="info__text m-0">{idea.problemSelection}</p>
          </div>
          <div className={infoItem}>
            <p className="text-3rd m-0">Target Customer</p>
            <p className="info__text m-0">{idea.targetCustomer}</p>
          </div>
        </div>
        <hr />
        <div className={teamsWrapper}>
          {facilitators.map((t) => (
            <ProfileCard
              key={t.id}
              title={profileTypeEnum[t.profileType]}
              primaryText={t.name}
              secondaryText={t.companyName}
            />
          ))}
        </div>
        <hr />
        <div>
          <div className={ideaSection} id="problemReason">
            <h4>Alasan Masalah</h4>
            <p className="text-secondary m-0">{idea.problemReasoning}</p>
          </div>
          <div className={ideaSection} id="solutionSummary">
            <h4>Solusi Singkat</h4>
            <p className="text-secondary m-0">{idea.solutionVision}</p>
          </div>
          <div className={ideaSection} id="solutionVision">
            <h4>Ide Solusi</h4>
            <p className="text-secondary m-0">{idea.solutionMission}</p>
          </div>
          {idea.solutionPitchUrl && (
            <div className={ideaSection}>
              <h4>Link Video</h4>
              <YoutubeIframe
                solutionPitchUrl={idea.solutionPitchUrl}
                className={videoWrapper}
              />
            </div>
          )}
          <div className={ideaSection}>
            <h4>Target Customer</h4>
            <p className="text-secondary m-0">{idea.targetCustomer}</p>
          </div>
          <div className={ideaSection}>
            <h4>Kelebihan Ide Solusi</h4>
            <p className="text-secondary m-0">{idea.solutionBenefit}</p>
          </div>
          <div className={ideaSection}>
            <h4>Kendala</h4>
            <p className="text-secondary m-0">{idea.solutionObstacle}</p>
          </div>
          <div className={ideaSection}>
            <h4>Kolaborasi</h4>
            <p className="text-secondary m-0">{idea.potentialCollaboration}</p>
          </div>
        </div>
        <div>
          <Button className={voteBtn} onClick={handleVoteIdea}>
            Vote Ide Solusi
          </Button>
        </div>
      </div>
      <BlockAccessModal
        show={showBlockAccess}
        onHide={() => setShowBlockAccess(false)}
      />
    </>
  );
};

export default IdeaDetails;
