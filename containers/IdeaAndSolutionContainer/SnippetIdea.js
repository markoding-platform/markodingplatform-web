import { number, string } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import { ideaImage } from './style.module.scss';

const SnippetIdea = ({
  likeCount,
  commentCount,
  imageIdea,
  ideaId,
  solutionVision,
  solutionName,
}) => {
  const { push } = useRouter();

  const handleClickViewIdea = () => {
    push(`/idea/${ideaId}`);
  };

  const handleClickEditIdea = () => {
    push(`/idea/edit/${ideaId}`);
  };
  return (
    <div>
      <div className="py-2 position-relative">
        {imageIdea && (
          <Image
            src={imageIdea}
            alt={solutionName}
            width={500}
            height={220}
            layout="responsive"
            className={ideaImage}
          />
        )}
      </div>
      <div className="pb-4">
        <h4>{solutionName}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: solutionVision }} />
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

SnippetIdea.defaultProps = {
  imageIdea: '',
  ideaId: '',
  solutionVision: '',
  solutionName: '',
  commentCount: 12,
  likeCount: 3,
};

SnippetIdea.propTypes = {
  imageIdea: string,
  ideaId: string,
  solutionName: string,
  solutionVision: string,
  commentCount: number,
  likeCount: number,
};

export default SnippetIdea;
