import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import IdeaAndSolutionContainer from 'containers/IdeaAndSolutionContainer';

export default function Idea() {
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <IdeaAndSolutionContainer />
        </div>
      </div>
    </Layout>
  );
}
