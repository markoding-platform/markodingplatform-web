import Layout from 'components/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import IdeaAndSolutionContainer from 'containers/IdeaAndSolutionContainer';
import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';

import { homeContent } from 'styles/home.module.scss';

export default function Idea() {
  const { logError } = useErrorHandler();
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <IdeaAndSolutionContainer />
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
}
