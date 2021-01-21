import ProgressBar from 'react-bootstrap/ProgressBar';
import { number } from 'prop-types';
import { useRouter } from 'next/router';

import Panel from 'components/Panel';
import CreateTeam from 'containers/AddAndEditIdea/CreateTeam';

import FormIdeaSolution from './FormIdeaSolution';
import SecondFormIdeaSolution from './FormIdeaSolution/SecondForm';

import {
  pagingText,
  progressBar,
  topHeader,
  progressBarWrapper,
} from './styles.module.scss';

const RegisterIdeaSolutionContainer = ({ page, user }) => {
  const { pathname } = useRouter();
  const isEditIdea = pathname.includes('/idea/edit');
  const title = `${isEditIdea ? 'Edit' : 'Registrasi'} Ide Solusi`;
  return (
    <>
      <div className={topHeader}>
        <h2>{title}</h2>
        <div className="w-100 d-flex justify-content-between py-1">
          <div className={progressBarWrapper}>
            <ProgressBar className={progressBar} now={50 * page} />
          </div>
          <div className={pagingText}>
            Page
            <span className="px-1">{page}</span>
            of 2
          </div>
        </div>
      </div>

      {page === 1 && (
        <Panel title="Team">
          <CreateTeam user={user} isEditIdea={isEditIdea} />
        </Panel>
      )}
      {page === 2 ? (
        <SecondFormIdeaSolution isEditIdea={isEditIdea} />
      ) : (
        <FormIdeaSolution user={user} isEditIdea={isEditIdea} />
      )}
    </>
  );
};

RegisterIdeaSolutionContainer.defaultProps = {
  page: 1,
};

RegisterIdeaSolutionContainer.propTypes = {
  page: number,
};

export default RegisterIdeaSolutionContainer;
