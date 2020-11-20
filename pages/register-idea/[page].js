import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import RegisterIdeaSolutionContainer from 'components/RegisterIdeaSolutionContainer';

export default function RegisterIdeaSecondPage() {
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <RegisterIdeaSolutionContainer page={2} />
        </div>
      </div>
    </Layout>
  );
}
