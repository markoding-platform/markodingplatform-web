import { node } from 'prop-types';
import IdeaAndSolutionContainer from 'components/IdeaAndSolutionContainer';

const IdeaAndSolutionLayout = ({ children }) => {
  return (
    <div className="d-flex justify-content-between">
      <IdeaAndSolutionContainer />
      <div>{children}</div>
    </div>
  );
};

IdeaAndSolutionLayout.propTypes = {
  children: node.isRequired,
};

export default IdeaAndSolutionLayout;
