import Layout from 'components/Layout';
import DetailIdea from 'components/IdeaAndSolutionContainer/DetailIdea';
import PointBadgeWrapper from 'components/PointBadgeWrapper';

export default function IdeaDetail() {
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <DetailIdea />
        </div>
      </div>
    </Layout>
  );
}
