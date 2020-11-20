import ProgressBar from 'react-bootstrap/ProgressBar';
import Panel from 'components/Panel';
import CreateTeam from 'components/RegisterIdeaSolutionContainer/CreateTeam';
import { number } from 'prop-types';
import FormIdeaSolution from './FormIdeaSolution';
import SecondFormIdeaSolution from './FormIdeaSolution/SecondForm';

const RegisterIdeaSolutionContainer = ({ page }) => {
  return (
    <>
      <div className="mb-5">
        <h2>Registrasi Ide Solusi</h2>
        <div className="d-flex py-4">
          <ProgressBar className="w-75" now={50 * page} />
          <div className="text-secondary pb-1">
            Page
            <span className="px-1">{page}</span>
            of 2
          </div>
        </div>
      </div>
      <Panel title="Team">
        <CreateTeam />
      </Panel>
      {page === 2 ? <SecondFormIdeaSolution /> : <FormIdeaSolution />}
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
