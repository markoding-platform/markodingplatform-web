import { number } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import MarkodingFetch from 'libraries/MarkodingFetch';
import Avatar from 'public/assets/avatar-min.png';
import BoxLoader from 'components/Shimmer/Box';
import YoutubeIframe from 'components/YoutubeIframe';
import useIdeaSolution from '../hooks/useIdeaSolution';
import { ideaImage } from '../style.module.scss';
import {
  ideaSection,
  teamInfo,
  infoItem,
  voteBtn,
  videoWrapper,
} from './style.module.scss';

import Teams from '../Teams';

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
  const ideaId = query.id;
  const { data } = useIdeaSolution({ url: `/ideas/${ideaId}` });
  const { data: teamsResult } = useIdeaSolution({
    url: `/ideas/${ideaId}/team`,
  });
  const idea = data?.result || {};
  const teams = teamsResult?.result || []; // TODO: data userprofile belum dipopulate, hanya balikin userid
  console.log({ teams });
  const imageIdea = idea.solutionSupportingPhotos?.[0] || '';

  const handleVoteIdea = async () => {
    const voteResult = await MarkodingFetch(`/ideas/${ideaId}/like`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        isLike: true,
      }),
    });
    if (voteResult.ok) {
      await mutate(`/ideas`);
      return toast.success(<p className="m-0 pl-3">Berhasil vote ide</p>, {
        autoClose: 3000,
      });
    }
    return toast.error(<p className="m-0 pl-3">Ooops! Gagal vote ide</p>, {
      autoClose: 3000,
    });
  };

  return (
    <div>
      <div className="pb-2">
        <h4>{idea.solutionName}</h4>
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
        <div className="position-relative">
          {imageIdea ? (
            <Image
              src={imageIdea}
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
          <p className="info__text m-0">{idea.teamStatus}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Nama Sekolah</p>
          <p className="info__text m-0">{idea.schoolName}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Tipe Solusi Digital</p>
          <p className="info__text m-0">{idea.solutionType}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Bidang Masalah</p>
          <p className="info__text m-0">{idea.problemArea}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Masalah yang ingin diselesaikan</p>
          <p className="info__text m-0">{idea.problemSelection}</p>
        </div>
        <div className={infoItem}>
          <p className="text-secondary m-0">Target Customer</p>
          <p className="info__text m-0">{idea.targetCustomer}</p>
        </div>
      </div>
      <hr />
      <Teams items={additionalTeams} />
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
            <div className={videoWrapper}>
              <YoutubeIframe solutionPitchUrl={idea.solutionPitchUrl} />
            </div>
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
