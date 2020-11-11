import IdeaAndSolutionContainer from 'components/IdeaAndSolutionContainer';
import { useRouter } from 'next/router';

import DetailIdea from 'components/IdeaAndSolutionContainer/DetailIdea';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import { hidden } from './styles.module.scss';

const IdeaAndSolutionLayout = () => {
  const { pathname } = useRouter();
  const isIdeaPageRoute = pathname === '/idea';

  return (
    <div className="main-content">
      <div className="pb-4">
        <PointBadgeWrapper />
      </div>
      <div className="inner-section pb-5">
        <div className="d-flex justify-content-between">
          <div className={`${!isIdeaPageRoute ? hidden : undefined}`}>
            <IdeaAndSolutionContainer />
          </div>
          <div className={`${isIdeaPageRoute ? hidden : undefined}`}>
            <DetailIdea />
          </div>
        </div>
      </div>
    </div>
  );
};

IdeaAndSolutionLayout.propTypes = {};

export default IdeaAndSolutionLayout;
