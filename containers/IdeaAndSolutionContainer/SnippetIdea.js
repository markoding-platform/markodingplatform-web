import { number } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import useIdeaSolution from 'hooks/useIdeaSolution';
import { ideaImage } from './style.module.scss';

const DetailIdea = ({ likeCount, commentCount, ideaId }) => {
  const { push } = useRouter();
  const { data } = useIdeaSolution({ url: `/ideas/${ideaId}` });
  const idea = data?.result || {};

  const imageIdea = idea.solutionSupportingPhotos?.[0] || '';

  const handleClickViewIdea = () => {
    push(`/idea/${ideaId}`);
  };

  const handleClickEditIdea = () => {
    push(`/idea/edit/${ideaId}`);
  };
  return (
    <div>
      <div className="py-2">
        {imageIdea && (
          <Image
            src={imageIdea}
            alt={idea.solutionName}
            width={500}
            height={300}
            layout="responsive"
            className={ideaImage}
          />
        )}
      </div>
      <div className="pb-4">
        <h4>{idea.solutionName}</h4>
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
      <div dangerouslySetInnerHTML={{ __html: idea.solutionVision }} />
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
          <Button variant="outline-primary mr-3" onClick={handleClickViewIdea}>
            Lihat
          </Button>
          <Button className="bg-primary" onClick={handleClickEditIdea}>
            Edit
          </Button>
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
