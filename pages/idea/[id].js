import Layout from 'components/Layout';
import IdeaDetails from 'containers/IdeaAndSolutionContainer/IdeaDetails';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import { homeContent } from 'styles/home.module.scss';

export default function IdeaDetail() {
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <IdeaDetails />
        </div>
      </div>
    </Layout>
  );
}
