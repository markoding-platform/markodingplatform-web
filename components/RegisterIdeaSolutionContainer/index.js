import Panel from 'components/Panel';
import CreateTeam from 'components/RegisterIdeaSolutionContainer/CreateTeam';
import FormIdeaSolution from './FormIdeaSolution';

const RegisterIdeaSolutionContainer = () => {
  return (
    <>
      <Panel title="Team">
        <CreateTeam />
      </Panel>
      <FormIdeaSolution />
    </>
  );
};

export default RegisterIdeaSolutionContainer;
