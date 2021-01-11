import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import MyIdeaAndSolutionContainer from 'components/MyIdeaAndSolutionContainer';

export default function Dashboard() {
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <MyIdeaAndSolutionContainer />
        </div>
      </div>
    </Layout>
  );
}
