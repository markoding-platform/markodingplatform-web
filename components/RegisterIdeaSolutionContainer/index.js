import ProgressBar from 'react-bootstrap/ProgressBar';
import { number } from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';

import Panel from 'components/Panel';
import CreateTeam from 'components/RegisterIdeaSolutionContainer/CreateTeam';

import FormIdeaSolution from './FormIdeaSolution';
import SecondFormIdeaSolution from './FormIdeaSolution/SecondForm';
import {
  pagingText,
  progressBar,
  topHeader,
  progressBarWrapper,
} from './styles.module.scss';

const RegisterIdeaSolutionContainer = ({ page }) => {
  const methods = useForm();
  return (
    <>
      <div className={topHeader}>
        <h2>Registrasi Ide Solusi</h2>
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

      <FormProvider {...methods}>
        {page === 1 && (
          <Panel title="Team">
            <CreateTeam />
          </Panel>
        )}
        {page === 2 ? <SecondFormIdeaSolution /> : <FormIdeaSolution />}
      </FormProvider>
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
